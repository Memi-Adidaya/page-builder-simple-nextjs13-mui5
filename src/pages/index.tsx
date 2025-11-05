"use client";
import React, { useState, useCallback, ReactNode, useEffect } from "react";
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { ComponentSidebar } from "../views/editor/ComponentSidebar";
import { Canvas } from "../views/editor/Canvas";
import { PropsSidebar } from "../views/editor/PropsSidebar";
import { PageSidebar } from "../views/editor/PageSidebar";
import { Header } from "../views/editor/Header";
import { componentRegistry } from "../hooks/page-builder/registry/registry";
import type { Section, ComponentKey, PageStyles } from "../types/types";
import BlankLayout from "../layouts/BlankLayout";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { loadStateFromLocalStorage } from "../hooks/page-builder/hooks/loadLayoutFromLocalStorage";
import defaultPageStyles from "src/types/initialPageTypes";

export const LOCAL_STORAGE_KEY = "homepageLayout";


const findItemRecursive = (
  sections: Section[],
  id: string
): { item: Section; parent: Section[]; index: number } | null => {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.id === id) {
      return { item: section, parent: sections, index: i };
    }
    if (section.columns) {
      for (const column of section.columns) {
        const found = findItemRecursive(column, id);
        if (found) {
          return found;
        }
      }
    }
  }

  return null;
};

const removeItemRecursive = (sections: Section[], id: string): Section[] => {
  return sections.reduce((acc, section) => {
    if (section.id === id) {
      return acc; // Skip item
    }
    if (section.columns) {
      const newColumns = section.columns.map((column) =>
        removeItemRecursive(column, id)
      );
      acc.push({ ...section, columns: newColumns });
    } else {
      acc.push(section);
    }

    return acc;
  }, [] as Section[]);
};

const insertItemRecursive = (
  sections: Section[],
  overId: string,
  item: Section,
  position: "before" | "after"
): Section[] => {
  // Handle drop into an empty column container first
  const isContainerDrop = overId.includes("-col-");
  if (isContainerDrop) {
    return sections.map((section) => {
      if (!section.columns) return section;

      let columnFound = false;
      const newColumns = section.columns.map((column, colIndex) => {
        if (`${section.id}-col-${colIndex}` === overId) {
          columnFound = true;

          // For container drops, always add to the end
          return [...column, item];
        }

        return column;
      });

      if (columnFound) return { ...section, columns: newColumns };

      // Recurse if not found at this level
      return {
        ...section,
        columns: section.columns.map((col) =>
          insertItemRecursive(col, overId, item, position)
        ),
      };
    });
  }

  // Handle drop next to an existing item
  const overIndex = sections.findIndex((sec) => sec.id === overId);
  if (overIndex !== -1) {
    const newSections = [...sections];

    // Add after the item we dropped on
    const insertionIndex = position === "before" ? overIndex : overIndex + 1;
    newSections.splice(insertionIndex, 0, item);

    return newSections;
  }

  // If not found at current level, recurse into columns
  return sections.map((section) => {
    if (!section.columns) return section;

    return {
      ...section,
      columns: section.columns.map((col) =>
        insertItemRecursive(col, overId, item, position)
      ),
    };
  });
};

const updatePropsRecursive = (
  sections: Section[],
  id: string,
  newProps: Record<string, any>
): Section[] => {
  return sections.map((section) => {
    if (section.id === id) {
      // Replace the entire props object to ensure consistency
      return { ...section, props: newProps };
    }
    if (section.columns) {
      const newColumns = section.columns.map((column) =>
        updatePropsRecursive(column, id, newProps)
      );

      return { ...section, columns: newColumns };
    }

    return section;
  });
};

const moveItemRecursive = (
  sections: Section[],
  id: string,
  direction: "up" | "down"
): Section[] => {
  let itemFoundAndMoved = false;

  const processLevel = (levelSections: Section[]): Section[] => {
    if (itemFoundAndMoved) return levelSections;

    const index = levelSections.findIndex((s) => s.id === id);

    if (index !== -1) {
      if (direction === "up" && index > 0) {
        const newSections = [...levelSections];
        [newSections[index - 1], newSections[index]] = [
          newSections[index],
          newSections[index - 1],
        ]; // Swap
        itemFoundAndMoved = true;

        return newSections;
      }
      if (direction === "down" && index < levelSections.length - 1) {
        const newSections = [...levelSections];
        [newSections[index + 1], newSections[index]] = [
          newSections[index],
          newSections[index + 1],
        ]; // Swap
        itemFoundAndMoved = true;

        return newSections;
      }

      return levelSections;
    }

    // If not found, recurse into columns
    return levelSections.map((section) => {
      if (!section.columns) return section;

      return {
        ...section,
        columns: section.columns.map((col) => processLevel(col)),
      };
    });
  };

  return processLevel(sections);
};

export default function App() {
  const [sections, setSections] = useState<Section[]>([]);
  const [pageStyles, setPageStyles] = useState<PageStyles>(defaultPageStyles);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    setSections(savedState.sections);
    setPageStyles(savedState.pageStyles);
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  // Auto-save to localStorage whenever sections or pageStyles change
  useEffect(() => {
    try {
      const dataToSave = JSON.stringify({ sections, pageStyles });
      localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error("Failed to auto-save layout to localStorage:", error);
    }
  }, [sections, pageStyles]);

  const handleRemoveSection = useCallback(
    (id: string) => {
      setSections((prevSections) => removeItemRecursive(prevSections, id));
      if (selectedSectionId === id) {
        setSelectedSectionId(null);
      }
    },
    [selectedSectionId]
  );

  const handleUpdateSectionProps = useCallback(
    (id: string, newProps: Record<string, any>) => {
      setSections((prevSections) =>
        updatePropsRecursive(prevSections, id, newProps)
      );
    },
    []
  );

  const handleSelectSection = useCallback((id: string | null) => {
    setSelectedSectionId(id);
  }, []);

  const handleMoveSection = useCallback(
    (sectionId: string, direction: "up" | "down") => {
      setSections((prevSections) =>
        moveItemRecursive(prevSections, sectionId, direction)
      );
    },
    []
  );

  const handleUpdatePageStyles = useCallback(
    (newStyles: Partial<PageStyles>) => {
      setPageStyles((prev) => ({ ...prev, ...newStyles }));
    },
    []
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? (over.id as string) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const isSidebarComponent = active.data.current?.isSidebarComponent;

    // --- Dragging from Sidebar to add ---
    if (isSidebarComponent) {
      const componentType = active.id as ComponentKey;
      const componentConfig = componentRegistry[componentType];
      if (!componentConfig) return;

      const newSection: Section = {
        id: uuidv4(),
        type: componentType,
        props: { ...componentConfig.defaultProps },
        ...(componentConfig.isLayout
          ? { columns: componentConfig.defaultProps.columns.map(() => []) }
          : {}),
      };

      setSections((prevSections) => {
        // Handle drop at the root level (on canvas or on another root item)
        if (
          overId === "canvas-drop-zone" ||
          prevSections.some((s) => s.id === overId)
        ) {
          const overIndex = prevSections.findIndex((s) => s.id === overId);
          const newIndex =
            overIndex !== -1 ? overIndex + 1 : prevSections.length;
          const newSections = [...prevSections];
          newSections.splice(newIndex, 0, newSection);

          return newSections;
        }

        // Otherwise, it's a nested drop, handle recursively
        return insertItemRecursive(prevSections, overId, newSection, "after");
      });
      setSelectedSectionId(newSection.id);

      return;
    }

    // --- Reordering existing components ---
    if (activeId !== overId) {
      setSections((prevSections) => {
        const activeItemData = findItemRecursive(prevSections, activeId);
        const overItemData = findItemRecursive(prevSections, overId);

        const movedItem = activeItemData?.item;
        if (!movedItem) return prevSections;

        // First, remove the item from its original position
        const treeWithoutItem = removeItemRecursive(prevSections, activeId);

        // Determine the drop position ('before' or 'after')
        let position: "before" | "after" = "after"; // Default to 'after'
        const areInSameContainer =
          activeItemData &&
          overItemData &&
          activeItemData.parent === overItemData.parent;

        if (areInSameContainer) {
          // If the active item's original index is greater than the target's, we're dragging up.
          if (activeItemData.index > overItemData.index) {
            position = "before";
          }
        } else if (overItemData) {
          // When dragging between different columns, inserting 'before' often feels more intuitive.
          position = "before";
        }

        // If dropping on the main canvas drop zone, always add to the end.
        if (overId === "canvas-drop-zone") {
          return [...treeWithoutItem, movedItem];
        }

        return insertItemRecursive(
          treeWithoutItem,
          overId,
          movedItem,
          position
        );
      });
    }
  };

  const selectedSection =
    findItemRecursive(sections, selectedSectionId || "")?.item || null;

  return (
    <BlankLayout>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveId(null);
          setOverId(null);
        }}
      >
        {/* Root Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh", // Ganti maxHeight dengan height
            width: "100vw",
            fontFamily: "Roboto",
            overflow: "hidden",
            margin: 0,
            padding: 0,
          }}
        >
          {/* Header */}
          <Header
            sections={sections}
            setSections={setSections}
            isPreviewMode={isPreviewMode}
            setIsPreviewMode={setIsPreviewMode}
          />

          {/* Main Content Area */}
          <Box sx={{ display: "flex", overflow: "hidden" }}>
            {/* Sidebar kiri (komponen) */}
            {!isPreviewMode && <ComponentSidebar />}

            {/* Canvas Utama */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                bgcolor: grey[700],
                p: [4, 3, 4, 3],
                transition: "all 0.3s ease-in-out",
              }}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <Box sx={{ minHeight: "100vh", height: "auto" }}>
                  <Canvas
                    sections={sections}
                    pageStyles={pageStyles}
                    selectedSectionId={selectedSectionId}
                    onSelectSection={handleSelectSection}
                    onRemoveSection={handleRemoveSection}
                    onUpdateSectionProps={handleUpdateSectionProps}
                    onMoveSection={handleMoveSection}
                    activeId={activeId}
                    overId={overId}
                    isPreviewMode={isPreviewMode}
                  />
                </Box>
              </SortableContext>
            </Box>

            {/* Sidebar kanan (props / page styles) */}
            {!isPreviewMode &&
              (selectedSection ? (
                <PropsSidebar
                  key={selectedSection.id}
                  section={selectedSection}
                  onUpdateProps={handleUpdateSectionProps}
                />
              ) : (
                <PageSidebar
                  styles={pageStyles}
                  onUpdateStyles={handleUpdatePageStyles}
                />
              ))}
          </Box>
        </Box>
      </DndContext>
    </BlankLayout>
  );
}

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableSection } from "./SortableSection";
import type { Section, PageStyles } from "../../types/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CanvasProps {
  sections: Section[];
  pageStyles: PageStyles;
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onRemoveSection: (id: string) => void;
  onUpdateSectionProps: (id: string, newProps: Record<string, any>) => void;
  activeId: string | null;
  overId: string | null;
  isPreviewMode: boolean;
  onMoveSection: (id: string, direction: "up" | "down") => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  sections,
  pageStyles,
  selectedSectionId,
  onSelectSection,
  onRemoveSection,
  onUpdateSectionProps,
  activeId,
  overId,
  isPreviewMode,
  onMoveSection,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  const canvasStyle: React.CSSProperties = {
    padding: `${pageStyles.padding}px`,
    margin: `${pageStyles.margin}px auto`,
    minHeight: `${pageStyles.minHeight}${pageStyles.minHeightUnit}`,
    maxHeight:
      pageStyles.maxHeight > 0
        ? `${pageStyles.maxHeight}${pageStyles.maxHeightUnit}`
        : "none",
  };

  return (
    <Box
      id="canvas-render-area"
      ref={setNodeRef}
      sx={{
        width: "95%",
        bgcolor: "background.paper",
        boxShadow: 6,
        borderRadius: 2,
        minHeight: "100vh",
        height: "auto",
        transition: "all 0.2s ease-in-out",
      }}
      style={canvasStyle}
      onClick={() => onSelectSection(null)}
    >
      {sections.length > 0 ? (
        sections.map((section) => (
          <SortableSection
            key={section.id}
            section={section}
            isSelected={section.id === selectedSectionId}
            onSelect={onSelectSection}
            onRemove={onRemoveSection}
            onUpdateSectionProps={onUpdateSectionProps}
            onMoveSection={onMoveSection}
            isPreviewMode={isPreviewMode}
            selectedSectionId={selectedSectionId}
            onSelectSection={onSelectSection}
            onRemoveSection={onRemoveSection}
            activeId={activeId}
            overId={overId}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "24rem", // h-96
            borderWidth: 2,
            borderStyle: "dashed",
            borderRadius: 2,
            transition: "all 0.2s ease-in-out",
            borderColor: isOver && activeId ? "primary.main" : "grey.400",
            bgcolor: isOver && activeId ? "primary.lighter" : "transparent",
          }}
        >
          <Typography
            sx={{
              transition: "color 0.2s ease-in-out",
              color: isOver && activeId ? "primary.main" : "text.secondary",
              fontWeight: isOver && activeId ? 600 : 400,
            }}
          >
            Drag components here to start building your page.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

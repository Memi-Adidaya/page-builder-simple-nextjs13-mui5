import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { componentRegistry } from '../../hooks/page-builder/registry/registry'
import type { Section } from '../../types/types'
import { Box, IconButton } from '@mui/material'
import IconifyIcon from '../../components/icon'

interface SortableSectionProps {
  section: Section
  isSelected: boolean
  onSelect: (id: string) => void
  onRemove: (id: string) => void
  onMoveSection?: (id: string, direction: 'up' | 'down') => void
  onUpdateSectionProps?: (id: string, newProps: Record<string, any>) => void
  isPreviewMode?: boolean
  activeId?: string | null
  overId?: string | null
  // Props to pass down to nested layouts
  selectedSectionId?: string | null
  onSelectSection?: (id: string) => void
  onRemoveSection?: (id: string) => void
}

export const SortableSection: React.FC<SortableSectionProps> = ({
  section,
  isSelected,
  onSelect,
  onRemove,
  onMoveSection,
  onUpdateSectionProps,
  isPreviewMode,
  activeId,
  overId,
  selectedSectionId,
  onSelectSection,
  onRemoveSection
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
    data: {
      isSidebarComponent: false,
      sectionId: section.id
    }
  })

  const [hovered, setHovered] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const componentConfig = componentRegistry[section.type]
  if (!componentConfig) {
    return <div>Unknown component type: {section.type}</div>
  }
  const ComponentToRender = componentConfig.component

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onSelect(section.id)
  }

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onRemove(section.id)
  }

  const handleMoveClick = (e: React.MouseEvent<HTMLButtonElement>, direction: 'up' | 'down') => {
    e.stopPropagation()
    onMoveSection?.(section.id, direction)
  }

  // const borderClass = isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-blue-300'
  const borderStyles = !isPreviewMode
    ? isSelected
      ? {
          outline: '1px dotted #3B82F6', // blue-500
          outlineOffset: '2px'
        }
      : {
          outlineOffset: '2px',
          transition: 'outline-color 0.2s ease',
          '&:hover': {
            outline: '1px solid #93C5FD', // blue-300
            outlineOffset: '2px'
          }
        }
    : {}

  // Prepare props for the component to be rendered.
  const componentProps: Record<string, any> = {
    ...section.props,
    id: section.id,
    isPreviewMode: isPreviewMode,
    activeId: activeId,
    overId: overId
  }

  // Only pass editor-specific props when NOT in preview mode.
  if (!isPreviewMode) {
    componentProps.selectedSectionId = selectedSectionId
    componentProps.onSelectSection = onSelectSection
    componentProps.onRemoveSection = onRemoveSection
    componentProps.onUpdateProps = onUpdateSectionProps
    componentProps.onMoveSection = onMoveSection
  }

  if (componentConfig.isLayout) {
    componentProps.columns = section.columns
  }

  const isBeingOver = overId === section.id
  const isSelf = activeId === section.id

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={setNodeRef}
      onClick={handleContainerClick}
      sx={{
        position: 'relative',
        borderRadius: 1, // ≈ rounded-md
        my: 1, // ≈ my-2
        transition: 'all 0.2s ease',
        ...borderStyles,
        '&:hover': {
          borderColor: !isPreviewMode ? '#2563EB' : undefined // hover-blue-600
        }
      }}
      style={style}
    >
      {!isPreviewMode && isBeingOver && !isSelf && (
        <Box
          className='drop-indicator' // opsional, kalau masih mau selector CSS
          sx={{
            position: 'absolute',
            left: 8, // left-2 → 0.5rem = 8px
            right: 8, // right-2 → 0.5rem = 8px
            height: 4, // h-1 → 0.25rem = 4px
            bgcolor: 'primary.main', // bg-blue-500 → pakai warna utama theme
            borderRadius: '9999px', // rounded-full
            zIndex: 20,
            pointerEvents: 'none'
          }}
          style={{ bottom: '-5px' }} // Position it in the margin between components
        />
      )}
      {!isPreviewMode && (
        <>
          <IconButton
            aria-label='Move Up section'
            onClick={e => handleMoveClick(e, 'up')}
            sx={{
              position: 'absolute',
              top: 8, // top-2 → 8px
              right: 128, // right-2 → 8px
              zIndex: 10,
              height: 28, // h-7 → 1.75rem
              width: 28, // w-7
              bgcolor: '#1F2937', // bg-gray-800
              color: '#fff', // text-white
              borderRadius: '50%', // rounded-full
              boxShadow: theme => theme.shadows[4], // shadow-lg
              opacity: hovered ? 1 : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#B91C1C' // hover:bg-red-700
              }
            }}
          >
            <IconifyIcon icon={'mdi:chevron-up'} />
          </IconButton>
        </>
      )}
      {!isPreviewMode && (
        <>
          <IconButton
            aria-label='Move Down section'
            onClick={e => handleMoveClick(e, 'down')}
            sx={{
              position: 'absolute',
              top: 8, // top-2 → 8px
              right: 88, // right-2 → 8px
              zIndex: 10,
              height: 28, // h-7 → 1.75rem
              width: 28, // w-7
              bgcolor: '#1F2937', // bg-gray-800
              color: '#fff', // text-white
              borderRadius: '50%', // rounded-full
              boxShadow: theme => theme.shadows[4], // shadow-lg
              opacity: hovered ? 1 : 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#B91C1C' // hover:bg-red-700
              }
            }}
          >
            <IconifyIcon icon={'mdi:chevron-down'} />
          </IconButton>
        </>
      )}
      {!isPreviewMode && (
        <Box
          {...attributes}
          {...listeners}
          aria-label='Drag section'
          sx={{
            position: 'absolute',
            top: 8, // top-2 → 0.5rem
            right: 48, // right-12 → 3rem
            zIndex: 10,
            height: 28, // h-7 → 1.75rem
            width: 28, // w-7 → 1.75rem
            bgcolor: '#1F2937', // bg-gray-800
            color: '#ffffffff', // text-white
            borderRadius: 1, // rounded-md ≈ 4px
            cursor: 'move',
            opacity: hovered ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme => theme.shadows[4], // shadow-lg
            transition: 'opacity 0.3s ease'
          }}
        >
          <IconifyIcon icon={'mdi:drag-horizontal-variant'} />
        </Box>
      )}
      {!isPreviewMode && (
        <IconButton
          onClick={handleRemoveClick}
          aria-label='Remove section'
          sx={{
            position: 'absolute',
            top: 8, // top-2 → 8px
            right: 8, // right-2 → 8px
            zIndex: 10,
            height: 28, // h-7 → 1.75rem
            width: 28, // w-7
            bgcolor: '#DC2626', // bg-red-600
            color: '#fff', // text-white
            borderRadius: '50%', // rounded-full
            boxShadow: theme => theme.shadows[4], // shadow-lg
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease, background-color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#B91C1C' // hover:bg-red-700
            }
          }}
        >
          <IconifyIcon icon={'mdi:close-thick'} fontSize={'2rem'} />
        </IconButton>
      )}
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: 2, // rounded-md ≈ 8px
          pointerEvents: componentConfig.isLayout ? 'auto' : 'none'
        }}
      >
        <ComponentToRender {...componentProps} />
      </Box>
    </Box>
  )
}

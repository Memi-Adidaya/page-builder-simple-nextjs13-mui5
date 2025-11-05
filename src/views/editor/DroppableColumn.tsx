import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableSection } from './SortableSection'
import type { Section } from '../../types/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface DroppableColumnProps {
  id: string
  items: Section[]
  selectedSectionId?: string | null
  onSelectSection?: (id: string) => void
  onRemoveSection?: (id: string) => void
  onUpdateSectionProps?: (id: string, newProps: Record<string, any>) => void
  isPreviewMode?: boolean
  activeId?: string | null
  overId?: string | null
  onMoveSection?: (id: string, direction: 'up' | 'down') => void
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  items,
  selectedSectionId,
  onSelectSection,
  onRemoveSection,
  onUpdateSectionProps,
  isPreviewMode,
  activeId,
  overId,
  onMoveSection
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      isContainer: true,
      parent: id
    }
  })

  const dropZoneStyle: React.CSSProperties = {
    minHeight: '10rem',
    outline: isOver && activeId ? '2px dashed #4F46E5' : '2px dashed #D1D5DB',
    outlineOffset: '4px',
    borderRadius: '0.5rem',
    backgroundColor: isOver && activeId ? 'rgba(79, 70, 229, 0.05)' : '#F9FAFB',
    transition: 'outline-color 0.2s, background-color 0.2s',
    padding: '8px'
  }

  return (
    <Box ref={setNodeRef} style={dropZoneStyle}>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {items.length > 0 ? (
          items.map(section => (
            <SortableSection
              key={section.id}
              section={section}
              isSelected={section.id === selectedSectionId}
              onSelect={onSelectSection!}
              onRemove={onRemoveSection!}
              onUpdateSectionProps={onUpdateSectionProps}
              onMoveSection={onMoveSection}
              isPreviewMode={isPreviewMode}
              onSelectSection={onSelectSection}
              onRemoveSection={onRemoveSection}
              selectedSectionId={selectedSectionId}
              activeId={activeId}
              overId={overId}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              userSelect: 'none',
              width: '100%'
            }}
          >
            <Typography textAlign={'center'} variant='body2' sx={{ color: 'grey.400' }}>
              Drop components here
            </Typography>
          </Box>
        )}
      </SortableContext>
    </Box>
  )
}


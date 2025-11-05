'use client'

import React from 'react'
import  {DroppableColumn}  from '../../../views/editor/DroppableColumn'
import { PreviewRenderer } from '../../../views/editor/PreviewRenderer'
import type { Section } from '../../../types/types'
import { Box } from '@mui/material'

interface ThreeColumnLayoutProps {
  id: string
  columns: Section[][]
  backgroundColor: string
  gap: number
  padding: number
  // Editor-related props are now optional
  isPreviewMode?: boolean
  activeId?: string | null
  overId?: string | null
  selectedSectionId?: string | null
  onSelectSection?: (id: string) => void
  onRemoveSection?: (id: string) => void
  onUpdateSectionProps?: (id: string, newProps: Record<string, any>) => void
  onMoveSection?: (id: string, direction: 'up' | 'down') => void
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  id,
  columns,
  backgroundColor,
  gap,
  padding,
  selectedSectionId,
  onSelectSection,
  onRemoveSection,
  onUpdateSectionProps,
  onMoveSection,
  isPreviewMode,
  activeId,
  overId
}) => {
  const firstColumnItems = columns?.[0] || []
  const secondColumnItems = columns?.[1] || []
  const thirdColumnItems = columns?.[2] || []

  return (
    <div style={{ backgroundColor: backgroundColor, padding: `${padding}px` }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}
        gap={`${gap}px`}
      >
        {isPreviewMode ? (
          <>
            <div>
              <PreviewRenderer sections={firstColumnItems} />
            </div>
            <div>
              <PreviewRenderer sections={secondColumnItems} />
            </div>
            <div>
              <PreviewRenderer sections={thirdColumnItems} />
            </div>
          </>
        ) : (
          <>
            <DroppableColumn
              id={`${id}-col-0`}
              items={firstColumnItems}
              selectedSectionId={selectedSectionId}
              onSelectSection={onSelectSection}
              onRemoveSection={onRemoveSection}
              onUpdateSectionProps={onUpdateSectionProps}
              onMoveSection={onMoveSection}
              activeId={activeId}
              overId={overId}
              isPreviewMode={isPreviewMode}
            />
            <DroppableColumn
              id={`${id}-col-1`}
              items={secondColumnItems}
              selectedSectionId={selectedSectionId}
              onSelectSection={onSelectSection}
              onRemoveSection={onRemoveSection}
              onUpdateSectionProps={onUpdateSectionProps}
              onMoveSection={onMoveSection}
              activeId={activeId}
              overId={overId}
              isPreviewMode={isPreviewMode}
            />
            <DroppableColumn
              id={`${id}-col-2`}
              items={thirdColumnItems}
              selectedSectionId={selectedSectionId}
              onSelectSection={onSelectSection}
              onRemoveSection={onRemoveSection}
              onUpdateSectionProps={onUpdateSectionProps}
              onMoveSection={onMoveSection}
              activeId={activeId}
              overId={overId}
              isPreviewMode={isPreviewMode}
            />
          </>
        )}
      </Box>
    </div>
  )
}

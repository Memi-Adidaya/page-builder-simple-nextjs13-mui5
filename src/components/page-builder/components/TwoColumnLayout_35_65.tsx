'use client'

import React from 'react'
// FIX: Added file extensions to imports to fix module resolution errors.
import  {DroppableColumn}  from '../../../views/editor/DroppableColumn'
import { PreviewRenderer } from '../../../views/editor/PreviewRenderer'
import type { Section } from '../../../types/types'
import { Box } from '@mui/material'

interface TwoColumnLayoutProps {
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

export const TwoColumnLayout35_65: React.FC<TwoColumnLayoutProps> = ({
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

  return (
    <Box style={{ backgroundColor: backgroundColor, padding: `${padding}px` }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '35% 63.5%'
        }}
        gap={`${gap}px`}
      >
        {isPreviewMode ? (
          <>
            <Box>
              <PreviewRenderer sections={firstColumnItems} />
            </Box>
            <Box>
              <PreviewRenderer sections={secondColumnItems} />
            </Box>
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
          </>
        )}
      </Box>
    </Box>
  )
}

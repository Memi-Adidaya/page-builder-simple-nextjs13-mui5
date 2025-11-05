'use client'

import React from 'react'
import  {DroppableColumn}  from '../../../views/editor/DroppableColumn'
import { PreviewRenderer } from '../../../views/editor/PreviewRenderer'
import type { Section } from '../../../types/types'
import { Box, Container, Stack } from '@mui/material'




interface ContainerProps {
  id: string
  columns: Section[][]
  backgroundColor: string
  padding: number
  gap: number
  isPreviewMode?: boolean
  activeId?: string | null
  overId?: string | null
  selectedSectionId?: string | null
  onSelectSection?: (id: string) => void
  onRemoveSection?: (id: string) => void
  onUpdateSectionProps?: (id: string, newProps: Record<string, any>) => void
  onMoveSection?: (id: string, direction: 'up' | 'down') => void
}

export const ContainerLayout: React.FC<ContainerProps> = ({
  id,
  columns,
  backgroundColor,
  padding,
  gap,
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

  return (
    <Container
      sx={{
        backgroundColor: backgroundColor,
        padding: `${padding}px`,
        flexGrow: 1
      }}
    >
      <Box sx={{ height: '100%' }}>
        <Stack spacing={gap}>
          {isPreviewMode ? (
            <>
              <PreviewRenderer sections={firstColumnItems} />
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
            </>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

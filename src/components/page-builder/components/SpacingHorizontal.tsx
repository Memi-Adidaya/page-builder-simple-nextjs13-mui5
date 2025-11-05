'use client'

import { Box, Typography } from '@mui/material'
import React from 'react'

interface SpacingHorizontalProps {
  gap: number
  isPreviewMode?: boolean
}

export const SpacingHorizontal = ({ gap, isPreviewMode }: SpacingHorizontalProps) => {
  if (!isPreviewMode) {
    return (
      <Box
        sx={{
          height: `${gap}px`,
          bgcolor: 'rgba(200,200,200,.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        <Typography variant='caption' textAlign={'center'}>
          H-Space
        </Typography>
      </Box>
    )
  }

  return <Box sx={{ height: `${gap}px` }}></Box>
}

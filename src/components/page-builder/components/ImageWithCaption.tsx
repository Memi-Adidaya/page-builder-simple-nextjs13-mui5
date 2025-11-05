'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

interface ImageWithCaptionProps {
  src: string
  alt: string
  caption: string
  objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  height: number
  borderRadius: number
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  src,
  alt,
  caption,
  objectFit = 'cover',
  height = 300,
  borderRadius = 3
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: `${height}px`
      }}
      borderRadius={borderRadius}
    >
      <Box
        component='img'
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          position: 'relative'
        }}
      />
      {caption && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            p: 1,
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          <Typography variant='body2' sx={{ m: 0 }} color={'#fff'}>
            {caption}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

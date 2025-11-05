'use client'

import { Box, Typography } from '@mui/material'
import React from 'react'

interface YouTubeVideoProps {
  youtubeUrl: string
  aspectRatio: '16:9' | '4:3' | '1:1' | '9:16'
  autoplay: boolean
  showControls: boolean
  loop: boolean
}

const extractVideoId = (url: string): string | null => {
  if (!url) return null

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  youtubeUrl,
  aspectRatio = '16:9',
  autoplay = false,
  showControls = true,
  loop = false
}) => {
  const videoId = extractVideoId(youtubeUrl)

  if (!videoId) {
    return (
      <Box
        sx={{
          bgcolor: 'grey.200',
          color: 'grey.600',
          p: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300
        }}
      >
        <Typography>Please enter a valid YouTube URL in the properties panel.</Typography>
      </Box>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${
    showControls ? 1 : 0
  }&loop=${loop ? 1 : 0}${loop ? `&playlist=${videoId}` : ''}&rel=0`

  const getAspectRatioPadding = () => {
    switch (aspectRatio) {
      case '16:9':
        return '56.25%' // 9 / 16
      case '4:3':
        return '75%' // 3 / 4
      case '1:1':
        return '100%' // 1 / 1
      case '9:16':
        return '177.77%' // 16 / 9
      default:
        return '56.25%'
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: getAspectRatioPadding() // misalnya "56.25%" untuk 16:9
      }}
    >
      <Box
        component='iframe'
        src={embedUrl}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }}
      />
    </Box>
  )
}

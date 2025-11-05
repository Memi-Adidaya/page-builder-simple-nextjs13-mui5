'use client'

import { Box, Typography } from '@mui/material'

import React, { useEffect } from 'react'
import CardImgTopLinkMode from '../../card-image-top/link-mode'

// Helper to dynamically load Google Fonts
if (typeof window !== 'undefined') {
  ;(window as any).loadedFonts = new Set()
}

const loadGoogleFont = (fontFamily: string) => {
  const loadedFonts = (window as any).loadedFonts
  if (!fontFamily || loadedFonts.has(fontFamily)) {
    return
  }
  const fontQuery = fontFamily.replace(/ /g, '+')
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@400;700&display=swap`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
  loadedFonts.add(fontFamily)
}

interface Card {
  imageUrl: string
  title: string
  subtitle: string
  slug: string
}

interface SuccessStoryProps {
  title: string
  subtitle: string
  fontFamily: string
  titleFontSize: number
  titleColor: string
  subtitleFontFamily: string
  subtitleFontSize: number
  subtitleColor: string
  backgroundColor: string
  padding: number
  cards: Card[]
}

export const SuccessStory: React.FC<SuccessStoryProps> = ({
  title,
  subtitle,
  fontFamily,
  titleFontSize,
  titleColor,
  subtitleFontFamily,
  subtitleFontSize,
  subtitleColor,
  backgroundColor,
  padding,
  cards = []
}) => {
  useEffect(() => {
    if (fontFamily) loadGoogleFont(fontFamily)
    if (subtitleFontFamily) loadGoogleFont(subtitleFontFamily)
  }, [fontFamily, subtitleFontFamily])

  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: `${padding}px`
  }

  const titleStyle: React.CSSProperties = {
    fontFamily: fontFamily ? `'${fontFamily}', sans-serif` : undefined,
    fontSize: `${titleFontSize}px !important`,
    color: titleColor
  }

  const subtitleStyle: React.CSSProperties = {
    fontFamily: subtitleFontFamily ? `'${subtitleFontFamily}', sans-serif` : undefined,
    fontSize: `${subtitleFontSize}px`,
    color: subtitleColor
  }

  return (
    <Box sx={{ pointerEvents: 'auto', ...containerStyle }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', maxWidth: '48rem', mx: 'auto', mb: 6 }}>
        <Typography variant='h4' fontWeight='bold' sx={{ mb: 2, ...titleStyle }}>
          {title}
        </Typography>
        <Typography variant='subtitle1' sx={{ opacity: 0.8, ...subtitleStyle }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          maxWidth: '90rem',
          mx: 'auto'
        }}
      >
        {cards.map((card, index) => (
          <>
            <CardImgTopLinkMode
              key={index}
              url={card.slug}
              title={card.title}
              image={card.imageUrl}
              description={card.subtitle}
            />
          </>
        ))}
      </Box>
    </Box>
  )
}

'use client'
import React, { useEffect } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import IconifyIcon from '../../icon'

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

interface FeatureListProps {
  title: string
  items: string[]
  titleFontSize: number
  itemFontSize: number
  titleFontFamily: string
  backgroundColor: string
  titleFontColor: string
  itemsFontColor: string
  itemFontFamily: string
  iconColor: string
  backgroundColorItem: string
  padding: number
  borderRadius: number
}

const FeatureList: React.FC<FeatureListProps> = ({
  title,
  items,
  titleFontSize,
  titleFontFamily,
  padding,
  borderRadius,
  backgroundColor,
  titleFontColor,
  itemsFontColor,
  itemFontFamily,
  itemFontSize,
  iconColor,
  backgroundColorItem
}) => {
  useEffect(() => {
    if (titleFontFamily) loadGoogleFont(titleFontFamily)
  }, [titleFontFamily])

  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`
  }

  const titleStyle: React.CSSProperties = {
    fontSize: `${titleFontSize}px !important`,
    fontFamily: titleFontFamily ? `'${titleFontFamily}', sans-serif` : undefined,
    color: titleFontColor
  }

  const itemStyle: React.CSSProperties = {
    fontSize: `${itemFontSize}px !important`,
    fontFamily: itemFontFamily ? `'${itemFontFamily}', sans-serif` : undefined,
    color: itemsFontColor
  }

  return (
    <Box sx={{ ...containerStyle }} width={'100%'}>
      <Typography variant='h5' align='center' fontWeight='bold' color='text.primary' sx={{ mb: 4, ...titleStyle }}>
        {title}
      </Typography>

      <Grid container spacing={4} className='match-height'>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: 2,
                borderRadius: 1,
                bgcolor: backgroundColorItem,
                '& svg': {
                  ml: 1,
                  mr: 2
                }
              }}
            >
              <IconifyIcon icon={'mdi:check'} key={index} color={iconColor} />
              <Typography variant='body1' sx={{ ...itemStyle }}>
                {item}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}


export default FeatureList
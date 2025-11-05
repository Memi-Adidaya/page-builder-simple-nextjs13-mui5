'use client'

import React, { useEffect } from 'react'
import DOMPurify from 'dompurify'
import { Box } from '@mui/material'


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

interface ParagraphProps {
  id: string
  text: string
  fontFamily: string
  fontSize: number
  textColor: string
  textAlign: 'left' | 'center' | 'right' | 'justify'
  lineHeight: number
  padding: number
  isPreviewMode?: boolean
  onUpdateProps?: (id: string, newProps: Record<string, any>) => void
}

export const Paragraph: React.FC<ParagraphProps> = props => {
  const { id, text, fontFamily, fontSize, textColor, textAlign, lineHeight, padding, isPreviewMode, onUpdateProps } =
    props

  const cleanHTML = DOMPurify.sanitize(text)

  useEffect(() => {
    if (fontFamily) loadGoogleFont(fontFamily)
  }, [fontFamily])

  const handleTextChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    if (isPreviewMode || !onUpdateProps) return

    const newText = e.currentTarget.innerText
    if (newText !== text) {
      onUpdateProps(id, { ...props, text: newText })
    }
  }

  const paragraphStyle: React.CSSProperties = {
    fontFamily: fontFamily ? `'${fontFamily}', sans-serif` : undefined,
    fontSize: `${fontSize || 16}px`,
    color: textColor,
    textAlign: textAlign,
    lineHeight: lineHeight,
    padding: `${padding}px !important`,
    whiteSpace: 'pre-wrap', // Preserve line breaks from textarea
    wordBreak: 'break-word',
    textDecoration: 'none',
    pointerEvents: isPreviewMode ? 'auto' : 'none'
  }

  return (
    <Box
      sx={{ ...paragraphStyle, pointerEvents: 'auto' }}
      onBlur={handleTextChange}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  )
}

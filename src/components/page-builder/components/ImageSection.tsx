'use client'

import React from 'react'

interface ImageSectionProps {
  src: string
  alt: string
  padding: number
  objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  height: number
}

export const ImageSection: React.FC<ImageSectionProps> = ({ src, alt, padding, objectFit = 'cover', height = 400 }) => {
  return (
    <div style={{ padding: `${padding}px` }}>
      <img src={src} alt={alt} style={{ height: `${height}px`, objectFit, width: '100%', display: 'block' }} />
    </div>
  )
}

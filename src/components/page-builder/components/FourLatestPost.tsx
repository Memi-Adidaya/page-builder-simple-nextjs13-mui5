'use client'

import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardImgTop from '../../card-image-top'
import CardImgTopLinkMode from '../../card-image-top/link-mode'

interface Post {
  title: string
  excerpt: string
  imageUrl: string
  publishedAt: string
  slug: string
}

interface FourLatestPostProps {
  title?: string
  isPreviewMode?: boolean
  limit?: number
  textAlign: string
  padding: number
  fontFamily: string
  titleColor: string
}

export const FourLatestPost: React.FC<FourLatestPostProps> = ({
  limit,
  title = 'Latest Posts',
  isPreviewMode,
  textAlign,
  padding,
  fontFamily,
  titleColor
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const now = new Date().toLocaleDateString()

  // Jika sedang di editor, jangan fetch data
  useEffect(() => {
    if (!isPreviewMode) return
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts/latest?limit=${limit}`)
        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()
        setPosts(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [limit, isPreviewMode])

  // Mode editor → tampilkan placeholder saja
  if (!isPreviewMode) {
    return (
      <Box sx={{ py: padding, bgcolor: 'transparent' }}>
        <Typography
          variant='h5'
          align='center'
          fontWeight='bold'
          sx={{ mb: 6, fontWeight: 600, textAlign: textAlign, fontFamily: fontFamily, color: titleColor }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}
        >
          {[1, 2, 3, 4].map(index => (
            <CardImgTop
              key={index}
              title={`Latest Post ${index}`}
              description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              image={'https://placehold.co/400x300'}
              createdAt={now}
            />
          ))}
        </Box>
      </Box>
    )
  }

  // Mode publik
  if (loading)
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress size={24} />
      </Box>
    )

  if (error)
    return (
      <Box p={4}>
        <Typography color='error'>{error}</Typography>
      </Box>
    )

  return (
    <Box sx={{ py: padding, bgcolor: 'transparent' }}>
      <Typography
        variant='h5'
        align='center'
        fontWeight='bold'
        sx={{ mb: 6, textAlign: textAlign, p: padding, fontFamily: fontFamily, color: titleColor }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {posts.map((post, index) => (
          <CardImgTopLinkMode
            key={index}
            title={post?.title}
            description={post?.excerpt}
            image={post?.imageUrl}
            publishedAt={post?.publishedAt}
            url={post?.slug}
            isPreviewMode={isPreviewMode}
          />
        ))}
      </Box>
    </Box>
  )
}

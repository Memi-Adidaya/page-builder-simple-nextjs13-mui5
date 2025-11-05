'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Link from 'next/link'
import { blueGrey } from '@mui/material/colors'

interface ThreeLatestPostProps {
  limit?: number
  padding: number
  title?: string
  textAlign: string
  showExcerpt?: boolean
  showDate?: boolean
  isPreviewMode?: boolean
  fontFamily: string
  titleColor: string
}

interface Post {
  id: string
  title: string
  excerpt: string
  slug: string
  publishedAt: string
}

export default function ThreeLatestPost({
  limit = 3,
  title = 'Latest Posts',
  showExcerpt = true,
  showDate = true,
  isPreviewMode,
  textAlign,
  padding,
  fontFamily,
  titleColor
}: ThreeLatestPostProps) {
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
      <Box sx={{ bgcolor: 'transparent', py: `${padding}px` }}>
        <Typography
          variant='h5'
          sx={{ mb: 3, fontWeight: 600, textAlign: textAlign, color: titleColor, fontFamily: fontFamily }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }
          }}
        >
          {[1, 2, 3].map(post => (
            <Box
              key={post}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2,
                bgcolor: 'white',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': { boxShadow: 3 }
              }}
            >
              <Box component={Link} href={`#`} style={{ textDecoration: 'none' }}>
                <Typography color={blueGrey[700]} variant='body1' sx={{ fontWeight: 600 }}>
                  {`Latest Post ${post}`}
                </Typography>
              </Box>

              {showDate && (
                <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                  {now}
                </Typography>
              )}

              {showExcerpt && (
                <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
                  {'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                </Typography>
              )}
            </Box>
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
    <Box sx={{ bgcolor: 'transparent', py: padding }}>
      <Typography
        variant='h5'
        sx={{ mb: 3, fontWeight: 600, textAlign: textAlign, color: titleColor, fontFamily: fontFamily }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          zIndex: 99999,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(3, 1fr)'
          }
        }}
      >
        {posts.map(post => (
          <Box
            key={post.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              p: 2,
              bgcolor: 'white',
              transition: 'box-shadow 0.2s ease-in-out',
              '&:hover': { boxShadow: 3 }
            }}
          >
            <Box
              component={Link}
              href={`/posts/${post.slug}`}
              style={{
                textDecoration: 'none',
                pointerEvents: isPreviewMode ? 'auto' : 'none',
                cursor: isPreviewMode ? 'pointer' : 'default'
              }}
            >
              <Typography color={blueGrey[700]} variant='body1' sx={{ fontWeight: 600 }}>
                {post.title}
              </Typography>
            </Box>

            {showDate && (
              <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </Typography>
            )}

            {showExcerpt && (
              <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
                {post.excerpt}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

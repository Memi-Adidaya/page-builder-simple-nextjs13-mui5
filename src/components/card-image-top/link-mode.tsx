import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { blueGrey } from '@mui/material/colors'
import { SxProps, Theme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Link from 'next/link'

export interface ICardImgTopLinkMode {
  image: string
  title: string
  description?: string
  url: string
  sx?: SxProps<Theme>
  isPreviewMode?: boolean
  publishedAt?: string
}

const CardImgTopLinkMode: React.FC<ICardImgTopLinkMode> = ({
  image,
  title,
  description,
  sx,
  url = '#',
  isPreviewMode,
  publishedAt
}) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          '& .overlay': {
            opacity: 0.8
          }
        },
        ...sx
      }}
    >
      <Box position={'relative'}>
        <CardMedia
          className='overlay'
          sx={{ height: '10rem', transition: 'opacity 300ms ease-in-out' }}
          image={image}
        />
        {publishedAt != undefined && (
          <Box
            width={'85px'}
            height={'20px'}
            borderRadius={'15px'}
            position={'absolute'}
            bottom={5}
            right={5}
            bgcolor={'rgba(0,0,0,.4)'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant='caption' color={'common.white'}>
              {new Date(publishedAt).toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </Box>
      <CardContent>
        <Box
          component={Link}
          href={`/posts/${url}`}
          style={{
            textDecoration: 'none',
            pointerEvents: isPreviewMode ? 'auto' : 'none',
            cursor: isPreviewMode ? 'pointer' : 'default',
            zIndex: 9999
          }}
        >
          <Typography color={blueGrey[700]} variant='body1' sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        {description && <Typography variant='body2'>{description}</Typography>}
      </CardContent>
    </Card>
  )
}

export default CardImgTopLinkMode

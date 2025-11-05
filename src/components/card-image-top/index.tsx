import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { blueGrey } from '@mui/material/colors'
import { SxProps, Theme } from '@mui/material/styles'
import { Box } from '@mui/material'

export interface ICardImgTop {
  image: string
  title: string
  description?: string
  onButtonClick?: () => void
  sx?: SxProps<Theme>
  createdAt?: string
}

const CardImgTop: React.FC<ICardImgTop> = ({ image, title, description, onButtonClick, sx, createdAt }) => {
  return (
    <Card
      onClick={onButtonClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          '& .overlay': {
            opacity: 0.8
          }
        },
        position: 'relative',
        ...sx
      }}
    >
      <Box position={'relative'}>
        {createdAt && (
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
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        )}
        <CardMedia
          className='overlay'
          sx={{ height: '10rem', transition: 'opacity 300ms ease-in-out' }}
          image={image}
        />
      </Box>
      <CardContent>
        <Typography color={blueGrey[700]} variant='body1' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {description && <Typography variant='body2'>{description}</Typography>}
      </CardContent>
    </Card>
  )
}

export default CardImgTop

import React, { useState } from 'react'

// FIX: Corrected import paths for module resolution.
import type { Section } from '../../types/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { LOCAL_STORAGE_KEY } from '../../pages'
import { Divider } from '@mui/material'
import ConfirmationDialog from '../../components/confirmations/confirmation-dialog-1'
import ToastMessage from '../../components/notify-custom/v2'
import IconifyIcon from '../../components/icon'

interface HeaderProps {
  sections: Section[]
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
  isPreviewMode: boolean
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ sections, setSections, isPreviewMode }) => {
  const theme = useTheme()
  const [confirm, setConfirm] = useState(false)

  const handleSave = () => {
    // Prepare data for the backend by removing client-side only IDs.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const backendData = sections.map(({ id, ...rest }) => rest)
    const backendJsonString = JSON.stringify(backendData, null, 2)

    // Log the clean JSON structure to the console.
    console.log('--- JSON Structure for Backend ---')
    console.log(backendJsonString)
    console.log('---------------------------------')

    try {
      // The existing localStorage save will keep the IDs for client-side loading.
      const dataToSave = JSON.stringify(sections, null, 2)
      localStorage.setItem('homepageLayout', dataToSave)

      ToastMessage({
        customID: String(Math.random()),
        message: 'Layout saved successfully',
        position: 'bottom-left',
        isSuccess: true,
        autoClose: 5000
      })
    } catch (error) {
      console.error('Failed to save layout:', error)
      ToastMessage({
        customID: String(Math.random()),
        message: 'Failed to save layout.',
        position: 'bottom-left',
        isSuccess: true,
        autoClose: 5000
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const loadedSections = JSON.parse(savedData)
        setSections(loadedSections)
        alert('Layout loaded successfully!')
      } else {
        alert('No saved layout found.')
      }
    } catch (error) {
      console.error('Failed to load layout:', error)
      alert('Failed to load layout. The data may be corrupted.')
    }
  }

  const purgeLayout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    ToastMessage({
      customID: String(Math.random()),
      message: 'Skema layout telah dihapus dari memori.',
      position: 'bottom-left',
      isSuccess: true,
      autoClose: 5000
    })
    setConfirm(false)
  }

  return (
    <>
      <Box
        component='header'
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 2,
          p: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* Kiri: Logo dan Judul */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { md: 'row', xs: 'column' } }}>
          <Box
            component='svg'
            xmlns='http://www.w3.org/2000/svg'
            sx={{ width: 32, height: 32, color: theme.palette.primary.main }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            />
          </Box>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
            display={{ xs: 'none', md: 'block' }}
          >
            Dynamic CMS Builder
          </Typography>
        </Box>

        {/* Kanan: Tombol Aksi */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            size='small'
            startIcon={<IconifyIcon icon={'mdi:content-save'} />}
          >
            Save
          </Button>

          <Button
            variant='outlined'
            LinkComponent={'a'}
            href='/page-builder/render'
            target='_blank'
            title='Preview Window'
            size='small'
            startIcon={<IconifyIcon icon={'mdi:dock-window'} />}
          >
            {'Preview'}
          </Button>
          <Divider orientation='vertical' variant='middle' flexItem />

          <Button
            disabled={isPreviewMode}
            variant='outlined'
            color='error'
            size='small'
            onClick={() => {
              setConfirm(true)
            }}
            startIcon={<IconifyIcon icon={'mdi:delete-outline'} />}
          >
            Purge
          </Button>
        </Box>
      </Box>

      <ConfirmationDialog
        key={'alert purge'}
        title={'Caution!'}
        data={
          "You're about to delete the layout scheme from memory. The layout scheme will be lost when you refresh this page."
        }
        open={confirm}
        handleClose={() => {
          setConfirm(false)
        }}
        actionHandler={purgeLayout}
        buttonText={{ oke: 'Continue', cancel: 'Cancel' }}
      />
    </>
  )
}

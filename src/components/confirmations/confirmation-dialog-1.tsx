// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, IconButton, Typography } from '@mui/material'
import IconifyIcon from '../icon'

interface IDialog {
  handleClose: () => void
  actionHandler: () => void
  open: boolean
  data?: React.ReactNode
  title: React.ReactNode
  buttonText: { oke: string; cancel: string }
  loading?: boolean
  disabled?: boolean
  maxWidth?: 'sm' | 'md' | 'lg'
}

const ConfirmationDialog = ({
  handleClose,
  actionHandler,
  open,
  data,
  title,
  buttonText,
  loading = false,
  disabled = false,
  maxWidth = 'sm'
}: IDialog) => {
  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        fullWidth
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='h6'>{title}</Typography>
            <IconButton title='Help Topic' LinkComponent={'a'} href='https://www.google.com' target='_blank'>
              <IconifyIcon icon={'mdi:help-circle'} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography variant='body2'>{data}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button color='warning' onClick={handleClose}>
            {buttonText.cancel}
          </Button>

          <LoadingButton
            disabled={disabled}
            size='small'
            loading={loading}
            loadingPosition='start'
            onClick={actionHandler}
            startIcon={<IconifyIcon icon='mdi:warning-circle' />}
            variant='outlined'
            color='info'
            sx={{
              minWidth: '80px'
            }}
          >
            {buttonText.oke}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog

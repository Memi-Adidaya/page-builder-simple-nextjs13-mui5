// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Button } from '@mui/material'

interface IDialog {
  handleClose: () => void
  actionHandler: () => void
  open: boolean
  data?: React.ReactNode
  title: React.ReactNode
  buttonText: string
  color?: 'error' | 'warning' | 'info' | 'success'
}

const AlertDialog = ({ handleClose, actionHandler, open, data, title, buttonText, color = 'error' }: IDialog) => {
  return (
    <>
      <Dialog
        maxWidth='sm'
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
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{data}</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button
            size='small'
            onClick={actionHandler}
            variant='contained'
            color={color}
            sx={{
              minWidth: '80px'
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AlertDialog

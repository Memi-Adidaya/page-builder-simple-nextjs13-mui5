import toast from 'react-hot-toast'

interface ToastMessageProps {
  isSuccess: boolean
  message: string
}

const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    duration: 5000,
    style: {
      minWidth: '380px'
    }
  })
}
const notifyFailure = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    duration: 5000,
    style: {
      minWidth: '380'
    }
  })
}

const CustomToastMessage = ({ isSuccess, message }: ToastMessageProps) => {
  if (isSuccess) {
    notifySuccess(message)
  } else {
    notifyFailure(message)
  }
}
export default CustomToastMessage

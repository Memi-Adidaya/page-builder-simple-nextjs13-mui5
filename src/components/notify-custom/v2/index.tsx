import { ReactNode } from 'react'
import { toast as toastify } from 'react-toastify'

interface ToastMessageProps {
  isSuccess?: boolean | null
  message: ReactNode
  customID: string
  autoClose?: number
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
}

const notifySuccess = (message: ReactNode, customID: string, autoClose: number, position: any) => {
  toastify.success(message, {
    position: position,
    toastId: customID,
    autoClose: autoClose
  })
}

const notifyFailure = (message: ReactNode, customID: string, autoClose: number, position: any) => {
  toastify.error(message, {
    position: position,
    toastId: customID,
    autoClose: autoClose
  })
}

const notifyWarning = (message: any, customID: string, autoClose: number, position: any) => {
  toastify.info(message, {
    position: position,
    toastId: customID,
    autoClose: autoClose
  })
}

const ToastMessage = ({
  isSuccess,
  message,
  customID,
  autoClose = 1000,
  position = 'top-center'
}: ToastMessageProps) => {
  if (isSuccess === true) {
    notifySuccess(message, customID, autoClose, position)
  } else if (isSuccess === false) {
    notifyFailure(message, customID, autoClose, position)
  } else {
    notifyWarning(message, customID, autoClose, position)
  }
}
export default ToastMessage

import React, { useEffect, useCallback, CSSProperties, memo } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { useToast, ToastMessage } from '../../../context/toast'
import { Container } from './styles'

interface ToastProps {
  toast: ToastMessage
  style: CSSProperties
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast()

  const closeToast = useCallback(() => removeToast(toast.id), [
    removeToast,
    toast.id
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast()
    }, 4000)

    return (): void => {
      clearTimeout(timer)
    }
  }, [closeToast])

  return (
    <Container type={toast.type} style={style}>
      {icons[toast.type]}

      <div>
        <strong>{toast.title}</strong>
        <p>{toast.description}</p>
      </div>

      <button type="button" onClick={closeToast}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default memo(Toast)

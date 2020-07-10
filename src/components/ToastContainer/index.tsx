import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { useTransition } from 'react-spring'

import { ToastMessage } from '../../context/toast'
import { Container } from './styles'
import Toast from './Toast'

interface ToastContainerProps {
  toasts: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const transitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
    config: {
      duration: 200
    }
  })

  return createPortal(
    <Container>
      {transitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>,
    document.body
  )
}

export default memo(ToastContainer)

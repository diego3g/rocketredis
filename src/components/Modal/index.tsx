import React, { useState, useCallback, useEffect } from 'react'
import ReactModal from 'react-modal'

import { Container } from './styles'

export interface ModalProps {
  visible?: boolean;
  onRequestClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  visible = false,
  onRequestClose,
  children
}) => {
  const [isOpen, setIsOpen] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsOpen(visible)
    }
  }, [visible])

  const handleModalClose = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    }

    setIsOpen(false)
  }, [])

  return (

    <ReactModal
      appElement={document.getElementById('modal') as HTMLElement}
      shouldCloseOnEsc={true}
      onRequestClose={handleModalClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      isOpen={isOpen}
    >
      <Container>
        {children}
      </Container>
    </ReactModal>
  )
}

export default Modal

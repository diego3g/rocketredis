import React, { useRef, useCallback, memo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { FiTrash } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useSetRecoilState } from 'recoil'

import { IConnection, connectionsState } from '../../../atoms/connections'
import Button from '../../../components/Button'
import Input from '../../../components/Form/Input'
import Modal, { SharedModalProps } from '../../../components/Modal'
import { useToast } from '../../../context/toast'
import { deleteAndGetConnections } from '../../../services/connection/DeleteConnectionService'
import { TextContent, ActionsContainer, ButtonGroup } from './styles'

interface ConnectionModalProps extends SharedModalProps {
  connectionToDelete: IConnection
}

interface DeleteConnectionFormData {
  confirmation: string
}

const DeleteConnectionModal: React.FC<ConnectionModalProps> = ({
  visible,
  onRequestClose,
  connectionToDelete
}) => {
  const formRef = useRef<FormHandles>(null)
  const { t } = useTranslation('deleteConnection')
  const { addToast } = useToast()
  const setConnections = useSetRecoilState(connectionsState)

  const [deleteConnectionLoading, toggleDeleteConnectionLoading] = useToggle(
    false
  )

  const handleCloseModal = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    }
  }, [onRequestClose])

  const handleDeleteConnection = useCallback(
    async ({ confirmation: deleteConfirmation }: DeleteConnectionFormData) => {
      try {
        toggleDeleteConnectionLoading()

        formRef.current?.setErrors({})

        if (deleteConfirmation !== 'DELETE') {
          formRef.current?.setErrors({
            confirmation: t('form.unconfirmedDeletionError')
          })

          return
        }

        const connections = deleteAndGetConnections(connectionToDelete)

        setConnections(connections)

        addToast({
          type: 'success',
          title: 'Connection deleted',
          description: 'This connection will not be available anymore.'
        })

        handleCloseModal()
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Error deleting connection',
          description: error.message || 'Unexpected error occurred, try again.'
        })
      } finally {
        toggleDeleteConnectionLoading()
      }
    },
    [
      toggleDeleteConnectionLoading,
      t,
      addToast,
      connectionToDelete,
      setConnections,
      handleCloseModal
    ]
  )

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <h1>{t('title')}</h1>

      <TextContent>
        <p>
          <Trans
            t={t}
            i18nKey="deletingConnectionMessage"
            values={{ name: connectionToDelete.name }}
          >
            The connection <strong>{name}</strong> will be permanently deleted.
          </Trans>
        </p>

        <p>
          <Trans t={t} i18nKey="confirmDeletionMessage" />
        </p>
      </TextContent>

      <Form ref={formRef} onSubmit={handleDeleteConnection}>
        <Input name="confirmation" />

        <ActionsContainer>
          <ButtonGroup>
            <Button onClick={handleCloseModal} type="button" color="opaque">
              {t('form.cancel')}
            </Button>

            <Button loading={deleteConnectionLoading} type="submit" color="red">
              <FiTrash />
              {t('form.confirmDeletion')}
            </Button>
          </ButtonGroup>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default memo(DeleteConnectionModal)

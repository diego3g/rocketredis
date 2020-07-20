import React, { useRef, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiActivity, FiSave } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useSetRecoilState } from 'recoil'
import * as Yup from 'yup'

import { IConnection, connectionsState } from '../../../atoms/connections'
import Button from '../../../components/Button'
import Input from '../../../components/Form/Input'
import Modal, { SharedModalProps } from '../../../components/Modal'
import { useToast } from '../../../context/toast'
import { createAndGetConnections } from '../../../services/connection/CreateConnectionService'
import { testConnection } from '../../../services/connection/TestConnectionService'
import { updateAndGetConnections } from '../../../services/connection/UpdateConnectionService'
import getValidationErrors from '../../../utils/getValidationErrors'
import {
  ActionsContainer,
  ButtonGroup,
  InputGroup,
  TestConnectionButton
} from './styles'

interface ConnectionModalProps extends SharedModalProps {
  connectionToEdit?: IConnection
}

interface ConnectionFormData {
  name: string
  host: string
  port: string
  password: string
}

const ConnectionFormModal: React.FC<ConnectionModalProps> = ({
  visible,
  onRequestClose,
  connectionToEdit
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const setConnections = useSetRecoilState(connectionsState)
  const { t } = useTranslation('connectionForm')

  const [testConnectionLoading, toggleTestConnectionLoading] = useToggle(false)
  const [createConnectionLoading, toggleCreateConnectionLoading] = useToggle(
    false
  )

  const handleCloseModal = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    }
  }, [onRequestClose])

  const handleCreateOrUpdateConnection = useCallback(
    async (data: ConnectionFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          host: Yup.string().required(),
          port: Yup.number().required(),
          password: Yup.string()
        })

        toggleCreateConnectionLoading()

        await schema.validate(data, {
          abortEarly: false
        })

        const { name, host, port, password } = data

        try {
          const connectionData = {
            name,
            host,
            port: Number(port),
            password
          }

          const connections = connectionToEdit
            ? updateAndGetConnections(connectionToEdit, connectionData)
            : createAndGetConnections(connectionData)

          setConnections(connections)

          addToast({
            type: 'success',
            title: 'Connection saved',
            description: 'You can now connect to your database!'
          })

          handleCloseModal()
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Error saving connection',
            description: err.message || 'Unexpected error occurred, try again.'
          })
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }
      } finally {
        toggleCreateConnectionLoading()
      }
    },
    [
      addToast,
      setConnections,
      toggleCreateConnectionLoading,
      connectionToEdit,
      handleCloseModal
    ]
  )

  const handleTestConnection = useCallback(async () => {
    if (!formRef.current) {
      return
    }

    const {
      host,
      port,
      password
    } = formRef.current.getData() as ConnectionFormData

    try {
      formRef.current?.setErrors({})
      toggleTestConnectionLoading()
      const schema = Yup.object().shape({
        host: Yup.string().required(),
        port: Yup.number().required(),
        password: Yup.string()
      })
      const data = {
        host,
        port
      }

      await schema.validate(data, {
        abortEarly: false
      })

      await testConnection({
        host,
        port: Number(port),
        password
      })

      addToast({
        type: 'success',
        title: 'Connection successful',
        description: 'Urrray... You can save your connection now!'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      } else {
        addToast({
          type: 'error',
          title: 'Error on connection',
          description: 'Error estabilishing connection with your Redis server'
        })
      }
    } finally {
      toggleTestConnectionLoading()
    }
  }, [addToast, toggleTestConnectionLoading])

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <h1>
        {connectionToEdit ? t('editConnectionTitle') : t('newConnectionTitle')}
      </h1>

      <Form
        initialData={{
          name: connectionToEdit?.name,
          host: connectionToEdit?.host || 'localhost',
          port: connectionToEdit?.port || '6379'
        }}
        ref={formRef}
        onSubmit={handleCreateOrUpdateConnection}
      >
        <Input name="name" label={t('form.name')} />

        <InputGroup>
          <Input name="host" label={t('form.host')} />
          <Input name="port" label={t('form.port')} />
        </InputGroup>

        <Input
          type="password"
          name="password"
          label={t('form.password')}
          hint={t('form.passwordHint')}
        />

        <ActionsContainer>
          <TestConnectionButton
            loading={testConnectionLoading}
            color="pink"
            onClick={handleTestConnection}
          >
            <FiActivity />
            {t('form.test')}
          </TestConnectionButton>

          <ButtonGroup>
            <Button onClick={handleCloseModal} type="button" color="opaque">
              {t('form.cancel')}
            </Button>
            <Button
              loading={createConnectionLoading}
              type="submit"
              color="purple"
            >
              <FiSave />
              {t('form.save')}
            </Button>
          </ButtonGroup>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default memo(ConnectionFormModal)

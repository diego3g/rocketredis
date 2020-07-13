import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiActivity, FiSave } from 'react-icons/fi'
import { useToggle } from 'react-use'
import * as Yup from 'yup'

import { useToast } from '../../context/toast'
import { testConnection } from '../../services/connection/TestConnectionService'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../Button'
import Input from '../Form/Input'
import Modal, { ModalProps } from '../Modal'
import {
  ActionsContainer,
  ButtonGroup,
  InputGroup,
  TestConnectionButton
} from './styles'

interface ConnectionFormData {
  name: string
  host: string
  port: string
  password: string
}

const NewConnectionModal: React.FC<ModalProps> = ({
  visible,
  onRequestClose
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { t } = useTranslation()

  const [testConnectionLoading, toggleTestConnectionLoading] = useToggle(false)
  const [createConnectionLoading, toggleCreateConnectionLoading] = useToggle(
    false
  )

  const handleCreateConnection = useCallback(
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }
      } finally {
        toggleCreateConnectionLoading()
      }
    },
    []
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
        const message = err.message
        if (message.search('WRONGPASS')) {
          addToast({
            type: 'error',
            title: 'Error on connection',
            description: 'Damn it, wrong password maybe 1234?'
          })
        } else {
          addToast({
            type: 'error',
            title: 'Error on connection',
            description: 'Error estabilishing connection with your Redis server'
          })
        }
      }
    } finally {
      toggleTestConnectionLoading()
    }
  }, [])

  const handleCancel = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    }
  }, [])

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <h1>{t('newConnection.title')}</h1>

      <Form
        initialData={{
          host: 'localhost',
          port: '6379'
        }}
        ref={formRef}
        onSubmit={handleCreateConnection}
      >
        <Input name="name" label={t('newConnection.connectionName')} />

        <InputGroup>
          <Input name="host" label={t('newConnection.host')} />
          <Input name="port" label={t('newConnection.port')} />
        </InputGroup>

        <Input
          type="password"
          name="password"
          label={t('newConnection.password')}
          hint={t('newConnection.passwordHint')}
        />

        <ActionsContainer>
          <TestConnectionButton
            loading={testConnectionLoading}
            color="pink"
            onClick={handleTestConnection}
          >
            <FiActivity />
            {t('newConnection.testConnectionButtonLabel')}
          </TestConnectionButton>

          <ButtonGroup>
            <Button onClick={handleCancel} type="button" color="opaque">
              {t('newConnection.cancelButtonLabel')}
            </Button>
            <Button
              loading={createConnectionLoading}
              type="submit"
              color="purple"
            >
              <FiSave />
              {t('newConnection.saveButtonLabel')}
            </Button>
          </ButtonGroup>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default NewConnectionModal

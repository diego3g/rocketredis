import React, { useCallback, useRef } from 'react'
import Modal, { ModalProps } from '../Modal'
import Button from '../Button'
import { Form } from '@unform/web'
import { useToggle } from 'react-use'

import { ActionsContainer } from './styles'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import Input from '../Form/Input'
import InputGroup from '../Form/InputGroup'
import { createRedisConnection } from '../../services/connection/RedisConnectionService'
import { useToast } from '../../context/toast'
import { Redis } from 'ioredis'

interface ConnectionFormData {
  host: string;
  port: number;
  password: string;
}

const NewConnectionModal: React.FC<ModalProps> = ({ visible, onRequestClose: storeNewConnection, ...rest }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [isTestConnectionLoading, toggleTestConnectionLoading] = useToggle(false)
  const [isCreateConnectionLoading, toggleCreateConnectionLoading] = useToggle(false)

  const extractConnectionParamsFromForm = (): ConnectionFormData => {
    const { host, port, password } = (formRef.current?.getData() ?? {}) as ConnectionFormData

    return {
      host: String(host),
      password: String(password),
      port: Number(port)
    }
  }

  const showErrorMessage = (err: unknown) => {
    addToast({
      type: 'error',
      title: 'Error occurred',
      description: `${err}`
    })
  }

  const handleCreateConnection = useCallback(() => {
    toggleCreateConnectionLoading()

    const showSuccessMessageAndStoreConnection = (connection: Redis) => {
      addToast({
        type: 'success',
        title: 'Connection stored'
      })

      storeNewConnection && storeNewConnection(connection)
    }

    createRedisConnection(extractConnectionParamsFromForm())
      .then(showSuccessMessageAndStoreConnection)
      .catch(showErrorMessage)
      .finally(toggleCreateConnectionLoading)
  }, [])

  const handleTestConnection = useCallback(() => {
    const showSuccessMessage = () => {
      addToast({
        type: 'success',
        title: 'Successfully',
        description: 'Urrray... You can save your connection now!'
      })
    }

    toggleTestConnectionLoading()

    createRedisConnection(extractConnectionParamsFromForm())
      .then(showSuccessMessage)
      .catch(showErrorMessage)
      .finally(toggleTestConnectionLoading)
  }, [])

  return (
    <Modal visible={visible} {...rest}>
      <h1>New connection</h1>

      <Form
        initialData={{
          host: 'localhost',
          port: '6379'
        }}
        ref={formRef}
        onSubmit={handleCreateConnection}
      >
        <InputGroup>
          <Input name="host" label="Host" />
          <Input name="port" label="Port" />
        </InputGroup>

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Leave empty for no password"
        />

        <ActionsContainer>
          <Button loading={isTestConnectionLoading} color="purple" onClick={handleTestConnection}>
            <FiActivity />
            Testar conexão
          </Button>
          <Button loading={isCreateConnectionLoading} type="submit" color="pink">
            <FiPlus />
          Salvar
          </Button>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default NewConnectionModal

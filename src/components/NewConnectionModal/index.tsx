import React, { useRef } from 'react'
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
  name: string;
  db: number
}

type NewConnectionModalProps = ModalProps & {
  onStoreNewConnection: (createdConnection: Redis) => void,
  storedConnections: Array<Redis>
}

const NewConnectionModal: React.FC<NewConnectionModalProps> = ({
  visible,
  storedConnections,
  onStoreNewConnection,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [isTestConnectionLoading, toggleTestConnectionLoading] = useToggle(false)
  const [isCreateConnectionLoading, toggleCreateConnectionLoading] = useToggle(false)

  const extractFormData = (): ConnectionFormData => {
    const {
      host,
      port,
      password,
      name,
      db
    } = (formRef.current?.getData() ?? {}) as ConnectionFormData

    return {
      host: String(host),
      password: String(password),
      port: Number(port),
      name: String(name),
      db: Number(db)
    }
  }

  const showErrorMessage = (err: unknown) => {
    addToast({
      type: 'error',
      title: 'Error occurred',
      description: `${err}`
    })
  }

  const getValidationError = (formData: ConnectionFormData): string | true => {
    const propertiesToValidate: Array<keyof ConnectionFormData> = ['host', 'name', 'port']
    const invalidProperties = propertiesToValidate.filter(prop => !formData[prop])

    if (invalidProperties.length) {
      // TODO: replace with automatic single|plural conversions
      const single = `Please, make sure parameter ${invalidProperties[0]} is valid`
      const plural = `Please, make sure parameters ${invalidProperties.join(', ')} are valid`

      return invalidProperties.length === 1 ? single : plural
    }

    const alreadyStored = storedConnections.find(c => {
      const options = c.options

      return options.name === formData.name &&
        options.host === formData.host &&
        options.port === formData.port &&
        options.db === formData.db
    })

    if (alreadyStored) {
      return 'You already have same connection'
    }

    return true
  }

  const handleCreateConnection = () => {
    const formData = extractFormData()
    const validationError = getValidationError(formData)

    // killme pls
    if (typeof validationError === 'string') {
      showErrorMessage(validationError)
      return
    }

    const showSuccessMessageAndStoreConnection = (connection: Redis) => {
      addToast({
        type: 'success',
        title: 'Connection stored'
      })

      onStoreNewConnection(connection)
    }

    toggleCreateConnectionLoading()

    createRedisConnection(formData)
      .then(showSuccessMessageAndStoreConnection)
      .catch(showErrorMessage)
      .finally(toggleCreateConnectionLoading)
  }

  const handleTestConnection = () => {
    const showSuccessMessage = () => {
      addToast({
        type: 'success',
        title: 'Successfully',
        description: 'Urrray... You can store your connection now!'
      })
    }

    toggleTestConnectionLoading()

    createRedisConnection(extractFormData())
      .then(showSuccessMessage)
      .catch(showErrorMessage)
      .finally(toggleTestConnectionLoading)
  }

  return (
    <Modal visible={visible} {...rest}>
      <h1>New connection</h1>

      <Form
        initialData={{
          host: 'localhost',
          port: '6379',
          name: `Connection ${storedConnections.length + 1}`,
          db: 0
        }}
        ref={formRef}
        onSubmit={handleCreateConnection}
      >
        <InputGroup>
          <Input name="host" label="Host" />
          <Input name="port" label="Port" />
          <Input name="db" label="Db index" min={0} type={'number'} />
        </InputGroup>

        <Input name="name" label="Name" />

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

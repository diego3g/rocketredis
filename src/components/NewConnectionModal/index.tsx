import React, { useRef, useCallback } from 'react'
import Modal, { ModalProps } from '../Modal'
import Button from '../Button'
import { Form } from '@unform/web'
import { useToggle } from 'react-use'

import { ActionsContainer } from './styles'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import Input from '../Form/Input'
import InputGroup from '../Form/InputGroup'
import { testConnection } from '../../services/connection/TestConnectionService'
import { useToast } from '../../context/toast'

interface ConnectionFormData {
  host: string;
  port: string;
  password: string;

  sshHost: string;
  sshPort: string;
  sshUser: string;
  sshPassword: string;
}

const NewConnectionModal: React.FC<ModalProps> = ({ visible, ...rest }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [testConnectionLoading, toggleTestConnectionLoading] = useToggle(false)
  const [createConnectionLoading, toggleCreateConnectionLoading] = useToggle(false)

  const handleCreateConnection = useCallback((data: ConnectionFormData) => {
    console.log(data)
  }, [])

  const handleTestConnection = useCallback(() => {
    if (!formRef.current) { return }

    const { host, port, password, sshHost, sshPort, sshUser, sshPassword } = formRef.current.getData() as ConnectionFormData

    toggleTestConnectionLoading()

    testConnection({
      host,
      port: Number(port),
      password,

      useSsh: !!(sshHost && sshUser && sshPort),
      sshHost,
      sshPort: Number(sshPort),
      sshUser,
      sshPassword
    }).then(() => {
      addToast({
        type: 'success',
        title: 'Connection successful',
        description: 'Urrray... You can save your connection now!'
      })
    }).catch(() => {
      addToast({
        type: 'error',
        title: 'Error on connection',
        description: 'Error estabilishing connection with your Redis server'
      })
    }).finally(() => {
      toggleTestConnectionLoading()
    })
  }, [])

  return (
    <Modal visible={visible} {...rest}>
      <h1>New connection</h1>

      <Form
        initialData={{
          host: 'localhost',
          port: '6379',
          sshPort: '22'
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

        <br />
        <InputGroup>
          <Input name="sshHost" label="SSH Host" />
          <Input name="sshPort" label="SSH Port" />
        </InputGroup>

        <Input name="sshUser" label="SSH User" />
        <Input
          type="password"
          name="sshPassword"
          label="SSH Password"
        />

        <ActionsContainer>
          <Button loading={testConnectionLoading} color="purple" onClick={handleTestConnection}>
            <FiActivity />
            Testar conexão
          </Button>
          <Button loading={createConnectionLoading} type="submit" color="pink">
            <FiPlus />
          Salvar
          </Button>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default NewConnectionModal

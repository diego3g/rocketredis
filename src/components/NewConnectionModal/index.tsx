import React, { useRef, useCallback } from 'react'
import Modal, { ModalProps } from '../Modal'
import Button from '../Button'
import { Form } from '@unform/web'

import { ActionsContainer } from './styles'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import Input from '../Form/Input'
import InputGroup from '../Form/InputGroup'

interface ConnectionFormData {
  host: string;
  port: string;
  password: string;
}

const NewConnectionModal: React.FC<ModalProps> = ({ visible, ...rest }) => {
  const formRef = useRef<FormHandles>(null)

  const handleCreateConnection = useCallback((data: ConnectionFormData) => {
    console.log(data)
  }, [])

  const handleTestConnection = useCallback(() => {
    if (!formRef.current) { return }

    const data = formRef.current.getData() as ConnectionFormData

    console.log(data)
  }, [])

  return (
    <Modal visible={visible} {...rest}>
      <h1>Criar conexão</h1>

      <Form
        initialData={{
          host: '127.0.0.1',
          port: '6379',
          database: '0',
          family: '4'
        }}
        ref={formRef}
        onSubmit={handleCreateConnection}
      >
        <InputGroup>
          <Input name="host" label="Host" />
          <Input name="port" label="Port" />
        </InputGroup>

        <Input name="password" label="Password" placeholder="Leave empty for no password" />

        <hr />

        <InputGroup>
          <Input name="family" label="Family (4 or 6)" />
          <Input name="database" label="Database" />
        </InputGroup>

        <ActionsContainer>
          <Button color="purple" onClick={handleTestConnection}>
            <FiActivity />
          Testar conexão
          </Button>
          <Button type="submit" color="pink">
            <FiPlus />
          Salvar
          </Button>
        </ActionsContainer>
      </Form>
    </Modal>
  )
}

export default NewConnectionModal

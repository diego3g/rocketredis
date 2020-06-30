import React from 'react'
import { FiPlus } from 'react-icons/fi'

import { Container, Connections } from './styles'

const Sidebar: React.FC = () => {
  return (
    <Container>
      <Connections>
        <header>
          <strong>CONNECTIONS</strong>
          <button type="button">
            <FiPlus />
          </button>
        </header>
      </Connections>
    </Container>
  )
}

export default Sidebar

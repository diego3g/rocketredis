import React from 'react'
import { FiPlus } from 'react-icons/fi'

import { Container, Connections } from './styles'

const Sidebar: React.FC = () => {
  return (
    <Container
      width={300}
      height={Infinity}
      minConstraints={[240, Infinity]}
      maxConstraints={[300, Infinity]}
      className="app-sidebar"
    >
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

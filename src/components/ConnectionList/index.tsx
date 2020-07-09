import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'
import { useRecoilState } from 'recoil'

import { connectionsState } from '../../atoms/connections'
import NewConnectionModal from '../NewConnectionModal'
import { Container, Connections } from './styles'

const ConnectionList: React.FC = () => {
  const [connections] = useRecoilState(connectionsState)
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)

  return (
    <>
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
            <button type="button" onClick={toggleCreateModalOpen}>
              <FiPlusCircle />
            </button>
          </header>

          <ul>
            {connections.map(connection => (
              <li key={connection.name}>{connection.name}</li>
            ))}
          </ul>
        </Connections>
      </Container>

      <NewConnectionModal
        visible={isCreateModalOpen}
        onRequestClose={toggleCreateModalOpen}
      />
    </>
  )
}

export default ConnectionList

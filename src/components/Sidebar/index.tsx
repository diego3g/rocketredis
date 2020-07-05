import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { Container, Connections, ConnectionsList } from './styles'
import NewConnectionModal from '../NewConnectionModal'
import { Redis } from 'ioredis'

const Sidebar: React.FC = () => {
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)

  // TODO: store connections into storage aka Redux (or other store utility) and/or sync with File system's storage
  const [connections, storeConnection] = useState<Redis[]>([])

  const storeNewConnectionAndCloseModal = (connection: Redis) => {
    storeConnection(connections => [...connections, connection])

    // TODO: doesn't work
    toggleCreateModalOpen(false)
  }

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
            <strong>CONNECTIONS {connections.length}</strong>
            <button type="button" onClick={toggleCreateModalOpen}>
              <FiPlusCircle />
            </button>
          </header>
          <ConnectionsList>
            {connections.map((connection, key) =>
              <div key={key}>
                <div><b>Status</b>: {connection.status}</div>
                <div><b>Name</b>: {connection.options.name}</div>
              </div>
            )}
          </ConnectionsList>
        </Connections>
      </Container>

      <NewConnectionModal
        visible={isCreateModalOpen}
        storedConnections={connections}
        onRequestClose={toggleCreateModalOpen}
        onStoreNewConnection={storeNewConnectionAndCloseModal}
      />
    </>
  )
}

export default Sidebar

import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { Container, Connections, Connection } from './styles'
import NewConnectionModal from '../NewConnectionModal'
import { Redis } from 'ioredis'

const Sidebar: React.FC = () => {
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)

  // TODO: store connections into storage aka Redux (or other store utility) and/or sync with File system's storage
  const [connections, storeConnection] = useState<Redis[]>([])

  const storeNewConnectionAndCloseModal = (connection?: unknown) => {
    if (isRedisConnection(connection)) {
      storeConnection(connections => [...connections, connection])
    }

    toggleCreateModalOpen()
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
          <div>
            {connections.map((connection, key) =>
              <Connection key={key}>
                <div>Status: {connection.status}</div>
              </Connection>
            )}
          </div>
        </Connections>
      </Container>

      <NewConnectionModal visible={isCreateModalOpen} onRequestClose={storeNewConnectionAndCloseModal} />
    </>
  )
}

export default Sidebar

function isRedisConnection<T> (connection?: UnknownRecord | unknown): connection is Redis {
  if (!connection) {
    return false
  }

  // dirty hack, https://github.com/Microsoft/TypeScript/issues/21732
  const conn = connection as UnknownRecord

  const hasHostAndPort = (connection: UnknownRecord): boolean => {
    return 'host' in connection && 'port' in connection
  }

  return conn.options
    ? hasHostAndPort(conn.options as UnknownRecord)
    : hasHostAndPort(conn)
}

type UnknownRecord = Record<string, unknown>

import React, { useState, useCallback } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { Container, Connections, ConnectionsList, FilterContainer } from './styles'
import NewConnectionModal from '../NewConnectionModal'
import { Redis } from 'ioredis'

const Sidebar: React.FC = () => {
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)

  // TODO: store connections into storage aka Redux (or other store utility) and/or sync with File system's storage
  const [connections, storeConnection] = useState<Redis[]>([])
  const [filter, setFilter] = useState<string>('')

  const storeNewConnectionAndCloseModal = (connection: Redis) => {
    storeConnection(connections => [...connections, connection])

    // TODO: doesn't work
    toggleCreateModalOpen(false)
  }

  const filterConnections = useCallback((connection: Redis): boolean => {
    const valueToFilter = filter.toLowerCase()

    if (!valueToFilter) {
      return true
    }

    const paramsToFilter = [
      connection.options.name,
      connection.options.host
    ]

    return !!paramsToFilter
      .map(p => p?.toLowerCase())
      .find(n => n?.includes(valueToFilter))
  }, [filter, connections])

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
          {connections.length > 1 &&
            <FilterContainer>
              <input
                onChange={e => setFilter(e.target.value.trim())}
                placeholder="Type to filter"
                type="text"
              />
            </FilterContainer>
          }
          <ConnectionsList>
            {connections.filter(filterConnections).map((connection, key) =>
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

import React, { memo } from 'react'
import { FiPlusCircle, FiDatabase, FiChevronRight } from 'react-icons/fi'
import { useToggle } from 'react-use'
import { useRecoilState } from 'recoil'

import { connectionsState } from '../../atoms/connections'
import NewConnectionModal from '../NewConnectionModal'
import {
  Container,
  Connections,
  Connection,
  DatabaseList,
  ConnectionError
} from './styles'

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
              <Connection
                key={connection.name}
                connected={connection.name === 'Another one'}
                errored={connection.name === 'Doge'}
              >
                <button type="button">
                  <FiDatabase />
                  {connection.name}
                  <FiChevronRight />
                </button>

                {connection.name === 'Another one' && (
                  <DatabaseList>
                    <button type="button">
                      <strong>db0</strong>
                      <span>132 keys</span>
                    </button>
                    <button type="button">
                      <strong>db1</strong>
                      <span>25 keys</span>
                    </button>
                    <button type="button">
                      <strong>db2</strong>
                      <span>0 keys</span>
                    </button>
                    <button type="button">
                      <strong>db3</strong>
                      <span>4 keys</span>
                    </button>
                  </DatabaseList>
                )}

                {connection.name === 'Doge' && (
                  <ConnectionError>
                    Connection failed. <button type="button">Retry?</button>
                  </ConnectionError>
                )}
              </Connection>
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

export default memo(ConnectionList)

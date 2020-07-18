import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import {
  FiDatabase,
  FiChevronRight,
  FiLoader,
  FiActivity,
  FiMinusCircle,
  FiEdit2,
  FiRefreshCcw,
  FiTrash
} from 'react-icons/fi'
import { useToggle } from 'react-use'
import { useRecoilState } from 'recoil'

import {
  IConnection,
  currentConnectionState,
  IDatabase,
  currentDatabaseState
} from '../../../atoms/connections'
import { loadConnectionDatabases } from '../../../services/connection/LoadConnectionDatabases'
import DeleteConnectionModal from '../DeleteConnectionModal'
import NewConnectionModal from '../NewConnectionModal'
import {
  Container,
  DatabaseList,
  ConnectionError,
  Database,
  Loading
} from './styles'

interface IConnectionProps {
  connection: IConnection
}

const Connection: React.FC<IConnectionProps> = ({ connection }) => {
  const [currentConnection, setCurrentConnection] = useRecoilState(
    currentConnectionState
  )
  const [currentDatabase, setCurrentDatabase] = useRecoilState(
    currentDatabaseState
  )
  const [databases, setDatabases] = useState<IDatabase[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnectionFailed, setIsConnectionFailed] = useState(false)
  const [isEditModalOpen, toggleEditModalOpen] = useToggle(false)
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle(false)

  useEffect(() => {
    if (currentConnection) {
      setIsConnectionFailed(false)
    }
  }, [currentConnection])

  const isConnected = useMemo(() => {
    return currentConnection?.name === connection.name
  }, [currentConnection?.name, connection.name])

  const handleConnect = useCallback(async () => {
    if (!isConnected) {
      setIsConnecting(true)
      setCurrentConnection(undefined)

      try {
        const databases = await loadConnectionDatabases(connection)

        setDatabases(databases)
        setCurrentConnection(connection)
        setCurrentDatabase(undefined)
      } catch {
        setIsConnectionFailed(true)
      } finally {
        setIsConnecting(false)
      }
    }
  }, [isConnected, connection, setCurrentConnection, setCurrentDatabase])

  const handleDisconnect = useCallback(async () => {
    setCurrentConnection(undefined)
    setCurrentDatabase(undefined)
  }, [setCurrentConnection, setCurrentDatabase])

  const handleRefreshDatabases = useCallback(async () => {
    try {
      setIsConnecting(true)

      const databases = await loadConnectionDatabases(connection)

      setDatabases(databases)
    } catch {
      setIsConnectionFailed(true)
    } finally {
      setIsConnecting(false)
    }
  }, [connection])

  const postSavingConnection = useCallback(async () => {
    toggleEditModalOpen()
    setCurrentConnection(undefined)
    setCurrentDatabase(undefined)
    setIsConnectionFailed(false)
  }, [toggleEditModalOpen, setCurrentConnection, setCurrentDatabase])

  const postDeletingConnection = useCallback(async () => {
    toggleDeleteModalOpen()
    setCurrentConnection(undefined)
    setCurrentDatabase(undefined)
  }, [toggleDeleteModalOpen, setCurrentConnection, setCurrentDatabase])

  const handleSelectDatabase = useCallback(
    (database: IDatabase) => {
      setCurrentDatabase(database)
    },
    [setCurrentDatabase]
  )

  return (
    <>
      <Container
        key={connection.name}
        connected={isConnected}
        errored={isConnectionFailed}
      >
        <ContextMenuTrigger id={`connection_actions_menu:${connection.name}`}>
          <button type="button" disabled={isConnected} onClick={handleConnect}>
            {isConnecting ? (
              <Loading>
                <FiLoader />
              </Loading>
            ) : (
              <FiDatabase />
            )}
            {connection.name}
            <FiChevronRight />
          </button>
        </ContextMenuTrigger>

        <ContextMenu
          id={`connection_actions_menu:${connection.name}`}
          className="connection-actions-menu"
        >
          {isConnected ? (
            <MenuItem onClick={handleDisconnect}>
              <FiMinusCircle />
              Disconnect
            </MenuItem>
          ) : (
            <MenuItem onClick={handleConnect}>
              <FiActivity />
              Connect
            </MenuItem>
          )}

          <MenuItem onClick={toggleEditModalOpen}>
            <FiEdit2 />
            Edit settings
          </MenuItem>

          {isConnected && (
            <MenuItem onClick={handleRefreshDatabases}>
              <FiRefreshCcw />
              Refresh databases
            </MenuItem>
          )}

          <MenuItem onClick={toggleDeleteModalOpen}>
            <FiTrash />
            Delete connection
          </MenuItem>
        </ContextMenu>

        {isConnected && !!databases.length && (
          <DatabaseList>
            {databases.map(database => (
              <Database
                connected={currentDatabase?.name === database.name}
                key={database.name}
                onClick={() => handleSelectDatabase(database)}
                type="button"
              >
                <strong>{database.name}</strong>
                <span>{database.keys} keys</span>
              </Database>
            ))}
          </DatabaseList>
        )}

        {isConnectionFailed && (
          <ConnectionError>
            Connection failed.{' '}
            <button type="button" onClick={handleConnect}>
              Retry?
            </button>
          </ConnectionError>
        )}
      </Container>

      <NewConnectionModal
        visible={isEditModalOpen}
        onRequestClose={postSavingConnection}
        connectionToEdit={connection}
      />

      <DeleteConnectionModal
        visible={isDeleteModalOpen}
        onRequestClose={postDeletingConnection}
        connectionToDelete={connection}
      />
    </>
  )
}

export default memo(Connection)

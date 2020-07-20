import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import { useTranslation } from 'react-i18next'
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

import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  IConnection,
  currentConnectionState,
  IDatabase,
  currentDatabaseState,
  currentKeyState
} from '../../../atoms/connections'
import { useToast } from '../../../context/toast'
import { loadConnectionDatabases } from '../../../services/connection/LoadConnectionDatabases'
import {
  initializeConnection,
  terminateConnection
} from '../../../services/RedisConnection'
import ConnectionFormModal from '../ConnectionFormModal'
import DeleteConnectionModal from '../DeleteConnectionModal'
import {
  Container,
  DatabaseList,
  ConnectionError,
  Database,
  Loading,
  ConnectButton,
  DisconnectButton
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
  const setCurrentKey = useSetRecoilState(currentKeyState)
  const [databases, setDatabases] = useState<IDatabase[]>([])
  const [connectionLoading, setConnectionLoading] = useState(false)
  const [isConnectionFailed, setIsConnectionFailed] = useState(false)
  const [isEditModalOpen, toggleEditModalOpen] = useToggle(false)
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle(false)
  const { t } = useTranslation('connection')

  const { addToast } = useToast()

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
      setConnectionLoading(true)
      setCurrentConnection(undefined)
      setCurrentDatabase(undefined)
      setCurrentKey(undefined)

      try {
        const databases = await loadConnectionDatabases(connection)

        setDatabases(databases)
        setCurrentConnection(connection)
        setCurrentDatabase(undefined)
      } catch {
        setIsConnectionFailed(true)
      } finally {
        setConnectionLoading(false)
      }
    }
  }, [
    connection,
    isConnected,
    setCurrentConnection,
    setCurrentDatabase,
    setCurrentKey
  ])

  const handleDisconnect = useCallback(async () => {
    setCurrentConnection(undefined)
    setCurrentDatabase(undefined)
    terminateConnection()
  }, [setCurrentConnection, setCurrentDatabase])

  const handleRefreshDatabases = useCallback(async () => {
    try {
      setConnectionLoading(true)

      const databases = await loadConnectionDatabases(connection)

      setDatabases(databases)
    } catch {
      setIsConnectionFailed(true)
    } finally {
      setConnectionLoading(false)
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
    terminateConnection()
  }, [toggleDeleteModalOpen, setCurrentConnection, setCurrentDatabase])

  const handleSelectDatabase = useCallback(
    async (database: IDatabase) => {
      if (!currentConnection) {
        return
      }

      try {
        await initializeConnection(currentConnection, database)

        setCurrentDatabase(database)
        setCurrentKey(undefined)
      } catch {
        addToast({
          type: 'error',
          title: 'Failed to connect to database',
          description:
            'A connection to this Redis database could not be established.'
        })
      }
    },
    [currentConnection, addToast, setCurrentDatabase, setCurrentKey]
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
            {connectionLoading ? (
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
              <DisconnectButton>
                <FiMinusCircle />
                {t('contextMenu.disconnect')}
              </DisconnectButton>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleConnect}>
              <ConnectButton>
                <FiActivity />
                {t('contextMenu.connect')}
              </ConnectButton>
            </MenuItem>
          )}

          <MenuItem onClick={toggleEditModalOpen}>
            <FiEdit2 />
            {t('contextMenu.editSettings')}
          </MenuItem>

          {isConnected && (
            <MenuItem onClick={handleRefreshDatabases}>
              <FiRefreshCcw />
              {t('contextMenu.refreshDatabases')}
            </MenuItem>
          )}

          <MenuItem onClick={toggleDeleteModalOpen}>
            <FiTrash />
            {t('contextMenu.deleteConnection')}
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
                <span>
                  {database.keys} {t('keys')}
                </span>
              </Database>
            ))}
          </DatabaseList>
        )}

        {isConnectionFailed && (
          <ConnectionError>
            {t('connectionFailed')}{' '}
            <button type="button" onClick={handleConnect}>
              {t('retry')}
            </button>
          </ConnectionError>
        )}
      </Container>

      <ConnectionFormModal
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

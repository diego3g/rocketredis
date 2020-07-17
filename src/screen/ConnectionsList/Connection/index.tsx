import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiDatabase, FiChevronRight, FiLoader } from 'react-icons/fi'

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
import { initializeConnection } from '../../../services/RedisConnection'
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
  const setCurrentKey = useSetRecoilState(currentKeyState)
  const [databases, setDatabases] = useState<IDatabase[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnectionFailed, setIsConnectionFailed] = useState(false)
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
      setIsConnecting(true)
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
        setIsConnecting(false)
      }
    }
  }, [
    connection,
    isConnected,
    setCurrentConnection,
    setCurrentDatabase,
    setCurrentKey
  ])

  const handleSelectDatabase = useCallback(
    async (database: IDatabase) => {
      if (!currentConnection) {
        return
      }

      try {
        await initializeConnection(currentConnection, database)

        setCurrentDatabase(database)
      } catch {
        addToast({
          type: 'error',
          title: 'Failed to connect to database',
          description:
            'A connection to this Redis database could not be established.'
        })
      }
    },
    [currentConnection, addToast, setCurrentDatabase]
  )

  return (
    <Container
      key={connection.name}
      connected={isConnected}
      errored={isConnectionFailed}
    >
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
  )
}

export default memo(Connection)

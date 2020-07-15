import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { FiDatabase, FiChevronRight, FiLoader } from 'react-icons/fi'
import { useRecoilState } from 'recoil'

import {
  IConnection,
  currentConnectionState,
  IDatabase,
  currentDatabaseState
} from '../../../atoms/connections'
import { loadConnectionDatabases } from '../../../services/connection/LoadConnectionDatabases'
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

  useEffect(() => {
    if (currentConnection) {
      setIsConnectionFailed(false)
    }
  }, [currentConnection])

  const isConnected = useMemo(() => {
    return currentConnection?.name === connection.name
  }, [currentConnection?.name])

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
  }, [])

  const handleSelectDatabase = useCallback((database: IDatabase) => {
    setCurrentDatabase(database)
  }, [])

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
  )
}

export default memo(Connection)

import Redis, { Redis as RedisConnection } from 'ioredis'

import { IConnection, IDatabase } from '../atoms/connections'

let connection: RedisConnection | undefined

function initializeConnection(
  connectionOptions: IConnection,
  database: IDatabase
): Promise<void> {
  if (connection) {
    connection.disconnect()
  }

  return new Promise((resolve, reject) => {
    connection = new Redis(connectionOptions.port, connectionOptions.host, {
      enableReadyCheck: true,
      connectTimeout: 3000,
      password: connectionOptions.password,
      db: database.index,
      retryStrategy() {
        return null
      }
    })

    connection.once('ready', async () => {
      resolve()
    })

    connection.once('error', () => {
      reject(new Error())
    })
  })
}

export { connection, initializeConnection }

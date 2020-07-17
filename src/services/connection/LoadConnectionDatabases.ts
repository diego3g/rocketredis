import Redis from 'ioredis'

import { IConnection, IDatabase } from '../../atoms/connections'

export function loadConnectionDatabases(
  connection: IConnection
): Promise<IDatabase[]> {
  return new Promise((resolve, reject) => {
    const redis = new Redis(connection.port, connection.host, {
      enableReadyCheck: true,
      connectTimeout: 3000,
      password: connection.password,
      retryStrategy() {
        return null
      }
    })

    redis.once('ready', async () => {
      const databasesRaw = await redis.info('keyspace')

      const connectionDatabases = databasesRaw
        .split('\n')
        .slice(1)
        .reduce((databases: IDatabase[] = [], databaseLine) => {
          const matched = /db([0-9]{1,}):keys=([0-9]{1,}).+/gi.exec(
            databaseLine
          )

          if (matched) {
            const [, index, keys] = matched

            return [
              ...databases,
              {
                name: `db${index}`,
                index: Number(index),
                keys: Number(keys)
              }
            ]
          }

          return databases
        }, [])

      resolve(connectionDatabases)

      redis.disconnect()
    })

    redis.once('error', () => {
      reject(new Error())
    })
  })
}

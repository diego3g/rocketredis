import Redis, { RedisOptions } from 'ioredis'

export function testConnection(options: RedisOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const connection = new Redis(options.port, options.host, {
      enableReadyCheck: true,
      connectTimeout: 3000,
      password: options.password,
      retryStrategy() {
        return null
      }
    })

    connection.once('ready', () => {
      resolve()

      connection.disconnect()
    })

    connection.once('error', () => {
      reject(new Error())
    })
  })
}

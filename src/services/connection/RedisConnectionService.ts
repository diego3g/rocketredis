import Redis, { RedisOptions, Redis as TRedis } from 'ioredis'

export function createRedisConnection (options: RedisOptions): Promise<TRedis> {
  return new Promise((resolve, reject) => {
    const connection = new Redis({
      enableReadyCheck: true,
      connectTimeout: 3000,
      retryStrategy: () => null,
      ...options
    })

    connection.once('ready', () => {
      resolve(connection)
    })

    connection.once('error', error => {
      reject(error instanceof Error ? error : new Error(error))
    })
  })
}

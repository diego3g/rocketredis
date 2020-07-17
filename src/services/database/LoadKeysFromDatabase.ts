import { connection } from '../RedisConnection'

export async function loadKeysFromDatabase(): Promise<string[]> {
  if (!connection) {
    throw new Error('Redis connection not established')
  }

  const keys = connection.keys('*')

  return keys
}

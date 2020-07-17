import { connection } from '../RedisConnection'

export interface IKeyContent {
  content: string | null
  type: 'hash' | 'list' | 'string'
}

export async function loadKeyContent(key: string): Promise<IKeyContent> {
  if (!connection) {
    throw new Error('Redis connection not established')
  }

  const keyType = await connection.type(key)
  const type = keyType as IKeyContent['type']

  let content: string | null = ''

  if (!['hash', 'list', 'string'].includes(type)) {
    throw new Error('Key type not supported yet.')
  }

  switch (type) {
    case 'hash': {
      const hashValue = await connection.hgetall(key)

      content = JSON.stringify(hashValue)
      break
    }
    case 'list': {
      const listValue = await connection.lrange(key, 0, -1)

      content = JSON.stringify(listValue)
      break
    }
    default: {
      content = await connection.get(key)
    }
  }

  return {
    content,
    type
  }
}

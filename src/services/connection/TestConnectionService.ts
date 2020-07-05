import { Redis } from 'ioredis'
import redisConnection from './RedisConnection'

interface IRedisConnectionOptions {
  host: string;
  port: number;
  password?: string;
  useSsh?: boolean;
  sshHost?: string;
  sshPort?: number;
  sshUser?: string;
  sshKey?: string;
  sshKeyPassphrase?: string;
  sshPassword?: string;
}

export function testConnection (options: IRedisConnectionOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    redisConnection(options)
      .then((connection: any) => {
        connection.once('ready', () => {
          resolve()
          connection.disconnect()
        })

        connection.once('error', () => {
          reject(new Error())
        })
      }).catch((error) => {
        reject(error)
      })
  })
}

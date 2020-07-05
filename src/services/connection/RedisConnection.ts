import net from 'net'
import { Client } from 'ssh2'
import Redis from 'ioredis'

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

function getRedisConnectionInstace (options: IRedisConnectionOptions, overrideOptions?: IRedisConnectionOptions) {
  const instance = new Redis({
    ...options || {},
    ...overrideOptions || {},
    enableReadyCheck: true,
    connectTimeout: 3000,
    retryStrategy () {
      return null
    }
  })
  return instance
}

export default function redisConnection (options: IRedisConnectionOptions) {
  return new Promise(function (resolve, reject) {
    if (!options.useSsh) {
      return resolve(getRedisConnectionInstace(options))
    }

    const connectionSshClient = new Client()

    connectionSshClient.on('ready', function () {
      const server: any = net.createServer(function (socket: any) {
        connectionSshClient.forwardOut(socket.remoteAddress, socket.remotePort, options.host, options.port, function (error, stream) {
          if (error) {
            socket.end()
            return console.error('')
          }

          socket.pipe(stream).pipe(socket)
        })
      }).listen(0, function () {
        return resolve(getRedisConnectionInstace(options, {
          host: '127.0.0.1',
          port: server.address().port
        }))
      })
    })

    connectionSshClient.on('error', function (error) {
      console.error(error)
      return reject(error)
    })

    try {
      const sshConnectionConfig = {
        host: options.sshHost,
        port: options.sshPort,
        username: options.sshUser
      }

      if (options.sshKey) {
        return connectionSshClient.connect({ ...sshConnectionConfig, ...{ privateKey: options.sshKey, passphrase: options.sshKeyPassphrase } })
      }
      return connectionSshClient.connect({ ...sshConnectionConfig, ...{ password: options.sshPassword } })
    } catch (error) {
      console.error(error)
      return reject(error)
    }
  })
}

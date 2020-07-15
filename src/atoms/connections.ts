import { atom } from 'recoil'

import { connections } from '../store/connections'

export interface IConnection {
  name: string
  host: string
  port: number
  password: string
}

export interface IDatabase {
  name: string
  keys: number
}

export const connectionsState = atom<IConnection[]>({
  key: 'connections',
  default: connections.get('connections') as IConnection[]
})

export const currentConnectionState = atom<IConnection | undefined>({
  key: 'currentConnection',
  default: undefined
})

export const currentDatabaseState = atom<IDatabase | undefined>({
  key: 'currentDatabase',
  default: undefined
})

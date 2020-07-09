import { atom } from 'recoil'

import { connections } from '../store/connections'

export interface IConnection {
  name: string
  host: string
  port: number
  password: string
}

export const connectionsState = atom<IConnection[]>({
  key: 'connections',
  default: connections.get('connections') as IConnection[]
})

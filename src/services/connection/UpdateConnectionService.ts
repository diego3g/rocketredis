import { IConnection } from '../../atoms/connections'
import { connections } from '../../store/connections'

export function updateAndGetConnections(
  oldConnection: IConnection,
  newConnection: IConnection
): IConnection[] {
  const currentConnections = connections.get('connections') as Array<
    IConnection
  >

  const foundIndex = currentConnections.findIndex(
    findConnection => findConnection.name === oldConnection.name
  )

  if (foundIndex > -1) {
    currentConnections[foundIndex] = newConnection
  }

  connections.set('connections', currentConnections)

  return currentConnections
}

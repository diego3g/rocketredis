import { IConnection } from '../../atoms/connections'
import { connections } from '../../store/connections'

export function createAndGetConnections(
  connection: IConnection
): IConnection[] {
  const currentConnections = connections.get('connections') as Array<
    IConnection
  >

  const exists = currentConnections.find(
    findConnection => findConnection.name === connection.name
  )

  if (exists) {
    throw new Error('Connection name already exists.')
  }

  const updatedConnections = [...currentConnections, connection]

  connections.set('connections', updatedConnections)

  return updatedConnections
}

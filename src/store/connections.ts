import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

export const connections = new Store({
  encryptionKey: '',
  schema: {
    connections: {
      type: JSONSchemaType.Array,
      default: [],
      items: {
        type: JSONSchemaType.Object,
        default: {},
        properties: {
          name: {
            type: JSONSchemaType.String,
            default: ''
          },
          host: {
            type: JSONSchemaType.String,
            default: 'localhost'
          },
          port: {
            type: JSONSchemaType.Number,
            default: 6379
          },
          password: {
            type: JSONSchemaType.String,
            default: ''
          }
        }
      }
    }
  }
})

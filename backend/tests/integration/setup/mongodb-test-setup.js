import MongoDb from '../../../src/infrastructure/mongodb'
import { registerMongooseSchemas } from '../../../src/database/schemas'

const connect = cb => {
  MongoDb.connect(err => {
    if (!err) {
      registerMongooseSchemas()
    }
    cb(err)
  })
}

const dropTables = cb => {
  MongoDb.dropDatabase(err => cb(err))
}

const disconnect = cb => {
  MongoDb.disconnect(err => cb(err))
}

export default {
  connect,
  dropTables,
  disconnect
}

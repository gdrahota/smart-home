import mongoose from 'mongoose'
import config from '../../config/server'

// Use native promises in mongoose
mongoose.Promise = global.Promise

const connect = cb =>
  mongoose.connect(
    config.mongoDb.url,
    config.mongoDb.options,
    err => cb(err)
  )

const disconnect = cb => mongoose.connection.close(err => cb(err))

const dropDatabase = cb => mongoose.connection.dropDatabase(err => cb(err))

export default {
  connect,
  disconnect,
  dropDatabase
}

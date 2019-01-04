import mongoose from 'mongoose'
import config from '../../config/server'

// Use native promises in mongoose
mongoose.Promise = global.Promise

const connect = async () => mongoose.connect(config.mongoDb.url, config.mongoDb.options)

const disconnect = async () => mongoose.connection.close()

const dropDatabase = () => mongoose.connection.dropDatabase()

export default {
  connect,
  disconnect,
  dropDatabase
}

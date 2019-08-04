import mongoose from 'mongoose'
import config from '../../config/server'

// Use native promises in mongoose
mongoose.Promise = global.Promise

const _connect = () => {
  console.log('trying to connect to mongodb....')
  return mongoose.connect(config.mongoDb.url, config.mongoDb.options)
}

let notConnected = true
let retriesLeft = 10

const connect = async () =>
  new Promise(async (resolve, reject) => {
    while (notConnected && retriesLeft > 0) {
      try {
        await _connect()
        console.log('connected !')
        notConnected = false
        resolve()
      } catch (err) {
        console.log('ERROR', err)
        await new Promise(resolve => setTimeout(resolve, 3000))
        retriesLeft--
        console.log('retriesLeft', retriesLeft)
        if (retriesLeft === 0) {
          reject()
        }
      }
    }
  })

const disconnect = async () => mongoose.connection.close()

const dropDatabase = () => mongoose.connection.dropDatabase()

export default {
  connect,
  disconnect,
  dropDatabase
}

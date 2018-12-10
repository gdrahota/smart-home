import MongoOplog from "mongo-oplog"
import async from 'async'
import { getCommand, removeCommand } from './data-access'

export const connectToOplog = (config, eibd) => {
  const oplog = MongoOplog(config.mongoDb.oplog.url, { coll: config.mongoDb.oplog.collection })
  oplog.tail(() => {
    console.log('oplog started')
    oplog.on('insert', doc => {
      console.log('insert', doc)
      const nsParts = doc.ns.split('.')
      const collection = nsParts[1]

      if (collection === 'command-queue') {
        async.waterfall([
          cb2 => getCommand(doc.o._id, (err, command) => {
            console.log(err, command)
            cb2(err, command)
          }),
          (command, cb2) => {
            console.log('to bus', command.targetAddress, command.payload, 'DPT' + command.dataType)
            eibd.write(command.targetAddress, command.payload, 'DPT' + command.dataType)
            cb2()
          },
          cb2 => removeCommand(doc.o._id, cb2)
        ])
      }
    })
  })
}

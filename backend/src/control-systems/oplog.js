import MongoOplog from "mongo-oplog"
import { getCommand, removeCommand } from './data-access'
import { connection } from './eibd-api'

export const connectToOplog = config =>
  new Promise((resolve, reject) => {
    const oplog = MongoOplog(config.mongoDb.oplog.url, { coll: config.mongoDb.oplog.collection })
    oplog.tail().then(
      () => {
        console.log('oplog started')
        resolve(oplog)
      }
    ).catch(err => {
      console.error('CANNOT connect to oplog!', err)
      reject(err)
    })
  })

export const handleOplog = oplog => {
  oplog.on('insert', async doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    if (collection === 'command-queue') {
      try {
        const command = await getCommand(doc.o._id)

        // this callback is only being called if the command had been sent onto the knx bus successfully
        const cbRemoveCommandAndAskForFeedback = async () => {
          try {
            // remove command
            await removeCommand(doc.o._id)

            // in case the device doesn't offer to send a feedback on a different address, then this helps a lot :)
            await new Promise(resolve => setTimeout(resolve, 500))
            connection.read(command.targetAddress, (src, responseValue) => {
              console.log('feedback requested', src, responseValue)
            })
          }
          catch (err) {
            console.log('=> ', new Date().getMilliseconds(), ' command NOT handed over to bus', err)
          }
        }

        console.log(command, doc)

        if (command) {
          console.log(command.commandType + ' to bus', command.targetAddress, 'DPT' + command.dataType, command.payload + ' =>')
          if (command.commandType === 'writeValue') {
            connection.write(command.targetAddress, command.payload, 'DPT' + command.dataType, cbRemoveCommandAndAskForFeedback)
          } else {
            await cbRemoveCommandAndAskForFeedback()
          }
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  })
}

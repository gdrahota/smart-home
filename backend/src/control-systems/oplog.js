import { addCommand, getEndPoints, getNextCommand, removeCommand } from './data-access'
import { connection } from './eibd-api'
import async from 'async'

const cbAskForFeedback = command =>
  new Promise(async (resolveBig, rejectBig) => {
    try {
      await connection.read(command.targetAddress)
      await removeCommand(command._id)
      resolveBig()
    }
    catch (err) {
      console.log('[ERROR]', new Date().getMilliseconds(), ' command NOT handed over to bus', err)
      rejectBig(err)
    }
  })

const sendToBus = command =>
  connection.write(
    command.targetAddress,
    command.payload,
    'DPT' + command.dataType
  )

const processNextCommand = () =>
  new Promise(async (resolve, reject) => {
    try {
      const command = await getNextCommand()
      if (!command) {
        resolve()
        return
      }

      if (command.commandType === 'writeValue') {
        await sendToBus(command)
        await new Promise(resolve => setTimeout(resolve, 200))
      } else {
        await connection.read(command.targetAddress)
      }

      await cbAskForFeedback(command)
      resolve()
    }
    catch (err) {
      reject(err)
    }
  })

export const startCommandQueueWatcher = () => {
  const run = next => {
    processNextCommand().then(
      () => new Promise(resolve => setTimeout(resolve, 200)).then(() => next())
    )
  }

  async.forever(run, err => {
    console.log('ERROR', err)
  })

  console.log('| commandQueueWatcher started')
}

export const requestAllDataPointValues = async controlSystemId => {
  const endPoints = await getEndPoints(controlSystemId)
  endPoints.forEach(endPoint => {
    const command = {
      commandType: 'readValue',
      targetAddress: endPoint.address
    }
    addCommand(command)
  })
}

const disconnect = (code) => {
  console.log('Shutting down knx adapter due to exit signal', code)

  if (connection) {
    console.info('Disconnecting from knx adapter...')
    connection.Disconnect()
  }

  process.exit(1)
}

process.on('SIGTERM', disconnect)
process.on('SIGINT', disconnect)
process.on('uncaughtException', disconnect)
process.on('exit', disconnect)

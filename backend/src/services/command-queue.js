import Repository from '../repository/any-collection'

const collection = 'command-queue'

const sendCommand = async payload => {
  try {
    let query
    query = { control: payload.control, endPoint: payload.endPoint }
    const controlDataPoint = await Repository('control-data-points').findOne(query)

    if (controlDataPoint) {
      query = { _id: controlDataPoint.dataPoint }
      const dataPoint = await Repository('data-points').findOne(query)

      const command = {
        commandType: payload.commandType,
        targetAddress: dataPoint.address,
        dataType: dataPoint.dataType,
        payload: payload.value
      }

      console.log('sendCommand', command)

      await Repository(collection).upsertCommand(command)
    }
  }
  catch (err) {
    console.log(err)
  }
}

export const CommandQueueService = {
  sendCommand
}

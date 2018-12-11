import async from 'async'
import Repository from '../repository/any-collection'

const collection = 'command-queue'

const sendCommand = (payload, cb) => {
  async.waterfall(
    [
      cb1 => {
        // get the control data point
        const query = { control: payload.control, endPoint: payload.endPoint }

        const cb = (err, items) => {
          if (items.length === 1) {
            cb1(null, items[0])
          } else {
            cb1('CONTROL_DATA_POINT_NOT_FOUND', query)
          }
        }

        Repository('control-data-points').find(query, cb)
      },
      (controlDataPoint, cb1) => {
        // get the data point
        const query = { _id: controlDataPoint.dataPoint }

        const cb = (err, items) => {
          items.length === 1
            ? cb1(null, items[0])
            : cb1('DATA_POINT_NOT_FOUND', query)
        }

        Repository('data-points').find(query, cb)
      },
      (dataPoint, cb1) => {
        // construct and save command
        const command = {
          targetAddress: dataPoint.address,
          dataType: dataPoint.dataType,
          payload: payload.value
        }

        console.log(command)
        Repository(collection).upsertCommand(command, cb1)
      }
    ],
    err => cb(err)
  )
}

export const CommandQueueService = {
  sendCommand
}

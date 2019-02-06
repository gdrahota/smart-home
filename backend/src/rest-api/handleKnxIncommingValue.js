import knxDataPoints from 'knx-datapoints'
import { ControlService } from '../services/controls'
import { ControlDataPointService } from '../services/control-data-points'
import { DataPointService } from '../services/data-points'
import { ValuesFromKnxService } from '../services/values-from-knx'

const handleControlValue = async (control, endPoint, value) => {
  const controlData = { ...control, values: control.values ? control.values : {} }
  controlData.values[endPoint] = {
    value,
    timestamp: new Date()
  }

  await ControlService.update(controlData)
}

export const handleKnxValue = async docId => {
  const valueFromKnx = await ValuesFromKnxService.findOne({ _id: docId })

  try {

    if (!valueFromKnx) {
      console.log('unknown valueFromKnc._id', docId)
      return
    }

    const query = {
      address: valueFromKnx.address,
      controlSystem: valueFromKnx.controlSystem
    }

    const dataPoint = await DataPointService.findOne(query).lean()

    if (dataPoint) {
      const update = {
        ...dataPoint,
        value: knxDataPoints.decode(dataPoint.dataType, valueFromKnx.rawValue),
        valueUpdated: valueFromKnx.timestamp
      }

      await DataPointService.update(update)

      let query = { dataPoint: dataPoint._id }

      const controlDataPoints = await ControlDataPointService.find(query)

      if (controlDataPoints) {
        controlDataPoints.forEach(async controlDataPoint => {
          query = { _id: controlDataPoint.control }
          const control = await ControlService.findOne(query).lean()

          if (control) {
            await handleControlValue(control, controlDataPoint.endPoint, update.value)
          }
        })
      } else {
        console.log('=> No data point registered with this address', valueFromKnx)
      }

      // remove the doc, so we know that this data point is registered in our app (but not necessary used in any control)
      await ValuesFromKnxService.remove(docId)
    }
  }
  catch (err) {
    console.log(err, valueFromKnx)
  }
}

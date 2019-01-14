import knxDataPoints from 'knx-datapoints'
import { ControlService } from '../services/controls'
import { ControlDataPointService } from '../services/control-data-points'
import { DataPointService } from '../services/data-points'
import { ValuesFromKnxService } from '../services/values-from-knx'

const handleControlValue = async (control, endPoint, value, address) => {
  const controlData = { ...control, values: control.values ? control.values : {} }
  controlData.values[endPoint] = {
    value,
    timestamp: new Date()
  }

  //console.log(endPoint, address, endPoint, value, controlData.values)
  await ControlService.update(controlData)
}

export const handleKnxValue = async doc => {
  try {
    const valueFromKnx = await ValuesFromKnxService.findOne(doc.o2)

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
      await ValuesFromKnxService.remove(dataPoint._id)

      let query = { dataPoint: dataPoint._id }

      const controlDataPoint = await ControlDataPointService.findOne(query)

      if (controlDataPoint) {
        query = { _id: controlDataPoint.control }
        const control = await ControlService.findOne(query).lean()
        if (control) {
          await handleControlValue(control, controlDataPoint.endPoint, update.value, valueFromKnx.address)
        }
      }
    } else {
      console.log('no data point found for address', valueFromKnx.address)
    }
  }
  catch (err) {
    console.log(err)
  }
}

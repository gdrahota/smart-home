import knxDataPoints from 'knx-datapoints'
import { ControlService } from '../services/controls'
import { ControlDataPointService } from '../services/control-data-points'
import { DataPointService } from '../services/data-points'
import { ValuesFromKnxService } from '../services/values-from-knx'

const handleControlValue = async (control, endPoint, value, address) => {
  //console.log(control.name, address, endPoint, value)
  const controlData = { ...control, valueUpdated: new Date() }
  switch (control.controlType) {
    case 'lightSwitch':
      controlData.values = value
      break
    case 'lightDimmer':
      if (['dim', 'dim-response'].indexOf(endPoint) !== -1) {
        controlData.values = value
      }
      break
    case 'shutter':
      if (['shutter-position-set', 'shutter-position-response'].indexOf(endPoint) !== -1) {
        controlData.values = value
      }
      break
    case 'rtc':
      if (!controlData.values) {
        controlData.values = {}
      }
      switch (endPoint) {
        case 'switch-response':
          controlData.values.state = value
          break
        case 'temp-target-value':
          controlData.values.target = value
          break
        case 'temp-current-value':
          controlData.values.current = value
          break
      }
      break
    default:
  }

  console.log(endPoint, address, endPoint, value, controlData.values)
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
    }
  }
  catch (err) {
    console.log(err)
  }
}

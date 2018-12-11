import async from 'async'
import knxDataPoints from 'knx-datapoints'
import { DataPointService } from '../services/data-points'

const knx = require('knx')

export const connectToKnx = (serverConfig, cb) => {
  const connection = new knx.Connection({
    // ip address and port of the KNX router or interface
    ipAddr: serverConfig.host, ipPort: serverConfig.port,
    // the KNX physical address we'd like to use
    physAddr: '1.0.250',
    // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
    loglevel: 'info',
    // do not automatically connect, but use connection.Connect() to establish connection
    //manualConnect: true,
    // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
    forceTunneling: true,
    // wait at least 10 millisec between each datagram
    minimumDelay: 10,
    // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
    suppress_ack_ldatareq: false,
    manualConnect: false,
    //define your event handlers here:
    handlers: {
      // wait for connection establishment before sending anything!
      connected: () => {
        console.log('connected to knx')
      },
      // get notified for all KNX events:
      event: (evt, src, dest, value) => {
        //console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value)
        async.waterfall(
          [
            cb1 => {
              console.log({ address: dest })
              DataPointService.find({ address: dest }, cb1)
            },
            (dataPoint, cb1) => {
              cb1((!dataPoint || dataPoint.length === 1) ? null : 'DATA_POINT_NOT_FOUND', dataPoint[0])
            },
            (dataPoint, cb1) => {
              const decodedValue = knxDataPoints.decode(dataPoint.dataType, value)
              const updatedDataPoint = { ...JSON.parse(JSON.stringify(dataPoint)), value: decodedValue }
              console.log('  ')
              console.log(dest, decodedValue)
              DataPointService.update(updatedDataPoint, cb1)
            }
          ], err => {
            if (err) {
              console.log(err)
            }
          }
        )
      },
      // get notified on connection errors
      err: connStatus => {
        console.log("**** ERROR: %j", connStatus)
      }
    }
  })

  cb(null, connection)
}

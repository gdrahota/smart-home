import { ValuesFromKnxService } from '../services/values-from-knx'

export const connectToKnx = async serverConfig =>
  new Promise((resolve, reject) => {
    const knx = require('knx')
    console.log('serverConfig', serverConfig)
    const connection = new knx.Connection({
      debug: false,
      // ip address and port of the KNX router or interface
      ipAddr: serverConfig.host, ipPort: serverConfig.port,
      // the KNX physical address we'd like to use
      physAddr: '1.0.201',
      // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
      loglevel: 'info',
      // do not automatically connect, but use connection.Connect() to establish connection
      //manualConnect: true,
      // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
      forceTunneling: false,
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
          resolve(connection)
        },
        // get notified for all KNX events:
        event: (evt, src, dest, value) => {
          //console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value)
          const valueFromKnx = {
            controlSystem: serverConfig._id,
            address: dest,
            rawValue: value,
            timestamp: Date()
          }

          const upsertQuery = { address: dest }
          ValuesFromKnxService.upsert(valueFromKnx, upsertQuery, () => {}).then().catch()
          console.log('=> event', dest, value)
        }
      },
      // get notified on connection errors
      err: connStatus => {
        console.log("connection to knx FAILED!", connStatus)
        reject(connStatus)
      }
    })
  })


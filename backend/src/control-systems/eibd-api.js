import { KnxEventService } from '../services/knx-events'
import { ValuesFromKnxService } from '../services/values-from-knx'
import moment from 'moment'

let config

const saveEventToDb = (evt, src, dest, value) => {
  //console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value)
  console.log('<= ', moment().format('HH:mm:ss'), evt, src, dest, value)

  // upsert doc in 'values-from-knx'
  const valueFromKnx = {
    controlSystem: config._id,
    address: dest,
    rawValue: value,
    timestamp: Date()
  }

  const upsertQuery = { address: dest }

  ValuesFromKnxService
    .upsert(valueFromKnx, upsertQuery)
    .then()
    .catch()

  // insert into 'knx-events'
  const knxEvent = {
    controlSystem: config._id,
    address: dest,
    rawValue: value,
    eventType: evt,
    timestamp: Date()
  }

  KnxEventService
    .add(knxEvent)
    .then()
    .catch()
}

export let connection

export const connectToKnx = async serverConfig => {
  config = serverConfig

  const sanitizeHostAddress = address => {
    return address.split('.').map(item => parseInt(item)).join('.')
  }

  new Promise((resolve, reject) => {
    const knx = require('knx')
    connection = new knx.Connection({
      debug: false,
      // ip address and port of the KNX router or interface
      ipAddr: sanitizeHostAddress(serverConfig.host),
      ipPort: serverConfig.port,

      // the KNX physical address we'd like to use
      physAddr: '1.0.201',

      // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
      loglevel: 'info',

      // do not automatically connect, but use connection.Connect() to establish connection
      //manualConnect: true,
      // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
      forceTunneling: false,

      // wait at least 10 millisec between each datagram
      minimumDelay: 20,

      // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
      suppress_ack_ldatareq: false,

      manualConnect: true,

      //define your event handlers here:
      handlers: {
        // wait for connection establishment before sending anything!
        connected: () => {
          console.log('connected to knx')
          resolve(connection)
        },

        // get notified for all KNX events:
        event: (evt, src, dest, value) => saveEventToDb(evt, src, dest, value),
        //GroupValue_Response: (src, dest, value) => saveEventToDb('response', src, dest, value),
        //GroupValue_Write: (src, dest, value) => saveEventToDb('write', src, dest, value),
        //GroupValue_Read: (src, dest) => saveEventToDb('read', src, dest, null),
      },
      // get notified on connection errors
      err: connStatus => {
        console.log("connection to knx FAILED!", connStatus)
        reject(connStatus)
      }
    })

    return connection.Connect()
  })
}

const disconnect = () => {
  console.info('Exit/kill signal received. Disconnection from knx adapter.')
  connection.Disconnect()
}

process.on('SIGTERM', disconnect)
process.on('SIGINT', disconnect)
process.on('uncaughtException', disconnect)


const knx = require('knx')

export const connect = (serverConfig, cb) => {
  const connection = new knx.Connection({
    // ip address and port of the KNX router or interface
    ipAddr: serverConfig.host, ipPort: serverConfig.port,
    // the KNX physical address we'd like to use
    physAddr: '1.0.250',
    // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
    loglevel: 'info',
    // do not automatically connect, but use connection.Connect() to establish connection
    manualConnect: true,
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
        cb(null, connection)
      },
      // get notified for all KNX events:
      event: (evt, src, dest, value) => {
        console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value)
      },
      // get notified on connection errors
      err: connStatus => {
        console.log("**** ERROR: %j", connStatus)
        cb(err)
      }
    }
  })
}

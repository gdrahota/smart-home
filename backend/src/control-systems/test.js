/*
function stringToHex (str) {

  //converting string into buffer
  let bufStr = Buffer.from(str, 'utf8');

  //with buffer, you can convert it into hex with following code
  return bufStr.toString('hex');

}

const hexToBinary = require('hex-to-binary')

const start = new Date()
const hexString = 12

console.log(hexToBinary(hexString))

const testArray = []

for (let i = 0; i < 100000; i++) {
  testArray.push(hexToBinary((hexString + i).toString()))
}

const end = new Date()

console.log('duration', end - start, testArray.length)

var buf = new Buffer(4)
len = buf.write(String.fromCharCode(12 + 48))

console.log("Octets written : " + len)

console.log(buf.toJSON())
*/

require('events').EventEmitter.prototype._maxListeners = 100

const KnxListener = require("knx-listener")
const knxDatapoints = require('knx-datapoints')

// 1. Initialize bus listener
const client = new KnxListener.BusListener()

// helper to terminate tunnel
const die = () => {
  return client.disconnect().then(
    () => process.exit(),
    () => process.exit()
  )
}

// 2. Establish tunneling with recovery time of 1s
client.bind("192.168.0.89", 3671, { timeout: 1000, })

// 3. Print processed queries to the console
client.on("query", data => {
  let payload = '-'
  const rawPayload = data.data
  if (rawPayload instanceof Buffer) {
    switch (rawPayload.length) {
      case 1:
        payload = knxDatapoints.decode('5.004', rawPayload)
        console.log(' = 1 % =', JSON.stringify(payload) + ' %')
        break
      case 2:
        payload = knxDatapoints.decode('9.001', rawPayload)
        console.log(' = 2 =', payload + ' °C')
        break
      default:
        payload = rawPayload.toString()
    }
  } else if (rawPayload instanceof Uint8Array) {
    payload = rawPayload
  }
  console.log('data', KnxListener.num2knxAddr(data.dest), KnxListener.num2knxAddr(data.source), payload, data.data, data.action)
});

client.ready(() => {
  // 4. When connection is established
  // 5. Send read telegram and receive response with data
  //client.read(KnxListener.knxAddr2num("2/1/1")).then((res) => {
  //  console.log("Remote responded with", res);
  //}, (err) => {
  //  console.error("Request failed", err);
  //});
  // 6. Send write telegram with data 0xFF to the group address 0/0/2
  //client.write([0x10], KnxListener.knxAddr2num("2/2/23")).then(() => {
  //  console.log("Success");
  //}, (err) => {
  //  console.error("Request failed", err);
  //})
})

// ctrl+c to exit
process.on('SIGINT', die);

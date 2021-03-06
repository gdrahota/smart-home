import express from 'express'
import http from 'http'
import MongoDb from './infrastructure/mongodb'
import { registerMongooseSchemas } from './database/schemas'
import { serveStaticFiles } from './infrastructure/static-files'
import { bindWebSocketToServer } from './infrastructure/websocket'
import { registerEndpoints } from './rest-api'
import { connectToOplog, handleOplog } from './rest-api/oplog'
import { startCronJob } from './cron'
import { startKnxAdapters } from './infrastructure/spawn-process-per-knx-control-system'
import { loadDefaultDocs } from './database/import-default-docs'

const siofu = require('socketio-file-upload')

const app = express()
const server = http.createServer(app)

/*
const options = {
  rejectUnauthorized: false,
  key: fs.readFileSync('./config/cert/server.key'),
  cert: fs.readFileSync('./config/cert/server.crt')
}
*/

const start = async () => {
  try {
    // mongodb
    await MongoDb.connect()
    registerMongooseSchemas()
    loadDefaultDocs()

    // add file upload fn to stack
    app.use(siofu.router)

    await bindWebSocketToServer(server, app)

    serveStaticFiles(app)

    registerEndpoints()

    await connectToOplog()

    handleOplog()

    startCronJob()

    const subProcesses = await startKnxAdapters()
    console.log('starting', subProcesses.length, 'knx adapter(s)...')
    console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')
    console.log('')
  } catch (err) {
    console.log('=> ERROR during server startup:')
    console.log(err)
    console.log('========= SERVER STARTUP STOPPED ========')
    process.exit(1)
  }
}

// start the app
(async () => await start())()

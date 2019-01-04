import express from 'express'
import http from 'http'
import fs from 'fs'
import MongoDb from './infrastructure/mongodb'
import { registerMongooseSchemas } from './database/schemas'
import { bindWebSocketToServer } from './infrastructure/websocket'
import { serveStaticFiles } from './infrastructure/static-files'
import { registerEndpoints } from './rest-api'
import { connectToOplog, handleOplog } from './rest-api/oplog'

const app = express()
const server = http.createServer(app)

const options = {
  rejectUnauthorized: false,
  key: fs.readFileSync('./config/cert/server.key'),
  cert: fs.readFileSync('./config/cert/server.crt')
}

const start = async () => {
  try {
    await MongoDb.connect()
    registerMongooseSchemas()
    serveStaticFiles()
    await bindWebSocketToServer(server)
    registerEndpoints()
    const oplog = await connectToOplog()
    handleOplog(oplog)

    console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')
    console.log('')
  }
  catch (err) {
    console.log('=> ERROR during server startup:')
    console.log(err)
    console.log('========= SERVER STARTUP STOPPED ========')
    process.exit(1)
  }
}

// start the app
(async () => await start())()

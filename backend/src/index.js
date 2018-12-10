import express from 'express'
import async from 'async'
import http from 'http'
import fs from 'fs'
import MongoDb from './infrastructure/mongodb'
import { registerMongooseSchemas } from './database/schemas'
import { bindWebSocketToServer } from './infrastructure/websocket'
import { serveStaticFiles } from './infrastructure/static-files'
import { registerEndpoints } from './rest-api'

const app = express()
const server = http.createServer(app)

const options = {
  rejectUnauthorized: false,
  key: fs.readFileSync('./config/cert/server.key'),
  cert: fs.readFileSync('./config/cert/server.crt')
}

async.series([
    cb1 => MongoDb.connect(err => cb1(err)),
    cb1 => registerMongooseSchemas(() => cb1()),
    cb1 => serveStaticFiles(app, () => cb1()),
    cb1 => bindWebSocketToServer(server, err => cb1(err)),
    cb1 => registerEndpoints(() => cb1())
  ],
  err => {
    if (err) {
      console.log('=> ERROR during server startup:')
      console.log(err)
      console.log('========= SERVER STARTUP STOPPED ========')
      process.exit(1)
    } else {
      console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')
      console.log('')
    }
  }
)

// Workaround:
// When using CTRL + C to terminate the node process,
// the process hangs due to a bug in node-oracledb.
process.on('SIGINT', () => process.exit(0))

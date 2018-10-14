const mysql = require('mysql')
import config from '../../config/server'

let connection = null

const connect = cb => {
  const option = {
    host: config.mySqlDb.server,
    user: config.mySqlDb.user,
    password: config.mySqlDb.password,
    database: config.mySqlDb.database
  }

  connection = mysql.createConnection(option)
  connection.connect(err => cb(err))
}

const disconnect = () =>
  new Promise((resolve, reject) => {
    connection.end(err => {
      if (err) {
        console.error('error connecting: ', err.stack)
        reject(err.stack)
      } else {
        resolve()
      }
    })

  })

const query = sqlStr =>
  new Promise((resolve, reject) => {
    connection.query(sqlStr, (error, results) => {
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) {
        console.error('error in query: ', error)
        reject(error)
      } else {
        resolve(results)
      }
    })
  })

export default {
  connect,
  disconnect,
  query
}

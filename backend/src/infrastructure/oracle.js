import oracleDb from 'oracledb'
import config from '../../config/server'

let oraConnection = {}

// Get a non-pooled connection
const connect = cb => {
  const oraConfig = {
    user: config.oracleDb.user,
    password: config.oracleDb.password,
    connectString: config.oracleDb.connectString
  }

  oracleDb.outFormat = oracleDb.OBJECT

  oracleDb.getConnection(
    oraConfig,
    (err, connection) => {
      oraConnection = connection
      cb(err)
    }
  )
}

const disconnect = () =>
  new Promise((resolve, reject) => {
    oraConnection.close()
      .then(
        () => resolve(),
        err => reject(err)
      )
  })

// Helper for executing sql query
const query = sqlStr =>
  new Promise((resolve, reject) => {
    oraConnection.execute(sqlStr, {}, { autoCommit: true }, (err, result) => {
      if (err) {
        // see: https://github.com/oracle/node-oracledb/blob/master/doc/api.md#errorobj
        reject(err.message)
      }
      // in some cases when there are problems with the connection or query
      // the database-driver might not throw an error but returns 'undefined'
      if (result) {
        if (result.hasOwnProperty('rows')) {
          resolve(result.rows)
        } else {
          reject('encountered a problem with the database')
        }
      } else {
        reject('encountered a problem with the database')
      }

    })
  })

export default {
  connect,
  disconnect,
  query
}

import mssql from 'mssql'
import config from '../../config/server'

let msSqlConnection

const connect = async cb => {
  msSqlConnection = await mssql.connect(config.msSqlDb, err => cb(err))

  mssql.on('error', err => {
    console.log('MsSql Error', err)
  })
}

const disconnect = cb => msSqlConnection.close(() => cb())

const query = sqlStr =>
  new Promise((resolve, reject) => {
    msSqlConnection
      .request()
      .query(sqlStr)
      .then(result => resolve(result))
      .catch(err => reject(err.message))
  })

export default {
  connect,
  disconnect,
  query
}

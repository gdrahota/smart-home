import MsSql from '../../../src/infrastructure/mssql'
import config from '../../../config/server'

const connect = cb => {
  MsSql.connect(err => cb(err))
}

  const createTestDataTable = cb => {
  const createTableBaseStations = '' +
    'CREATE TABLE ' + config.msSqlDb.tables.baseStations + ' (\n' +
    'BS_ID int NOT NULL, \n' +
    'BS_DateTime varchar(50) NULL, \n' +
    'BS_Bezeichnung varchar(50) NULL, \n' +
    'BS_Ort varchar(50) NULL, \n' +
    'BS_Adresse varchar(50) NULL, \n' +
    'BS_User varchar(50) NULL, \n' +
    'BS_Grund varchar(50) NULL, \n' +
    'BS_Queue varchar(50) NULL\n' +
    ');'

  MsSql
    .query(createTableBaseStations)
    .then(() => cb())
    .catch(err => {
      console.log(err)
      cb(err)
    })
}

const createTestData = cb => {
  // create sample-entries in MsSql database
  const query = '' +
    'INSERT INTO ' + config.msSqlDb.tables.baseStations +
    ' (BS_ID, BS_DateTime, BS_Bezeichnung, BS_Ort, BS_Adresse, BS_User, BS_Grund, BS_Queue) ' +
    'VALUES ' +
    '(1, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Dortmund\', null, \'Norbert Dickel\', \'Inspektion\', null), ' +
    '(2, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Hamburg\', null, \'Hans Hansen\', \'Wartung\', null), ' +
    '(3, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Berlin\', null, \'Dieter Dose\', \'Inspektion\', null);'

  MsSql.query(query)
    .then(() => cb())
    .catch(err => {
      cb(err)
      console.log(err)
    })
}


const dropTables = cb => {
  const dropTableBaseStations = 'DROP TABLE IF EXISTS ' + config.msSqlDb.tables.baseStations
  MsSql
    .query(dropTableBaseStations)
    .then(() => cb())
    .catch(err => cb(err))
}

const disconnect = cb => {
  MsSql.disconnect(err => cb(err))
}

export default {
  connect,
  createTestDataTable,
  createTestData,
  dropTables,
  disconnect
}

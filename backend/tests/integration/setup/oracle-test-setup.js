import Oracle from '../../../src/infrastructure/oracle'
import config from '../../../config/server'

const connect = () => {
  return new Promise((resolve, reject) => {
    Oracle.connect()
      .then(
        () => resolve(),
        err => reject(err)
      )
  })
}

const dropTables = () => {
  return new Promise((resolve, reject) => {

    // Drop table: Prevent errors if table does not exist yet
    const dropTableNetworkElements = '' +
      'DECLARE\n' +
      '  l_cnt  NUMBER;\n' +
      'BEGIN  \n' +
      '  SELECT count(*)\n' +
      '    INTO l_cnt\n' +
      '    FROM user_tables\n' +
      '   WHERE table_name = \'' + config.oracleDb.tables.networkElements + '\';\n' +
      '  IF l_cnt = 1 THEN\n' +
      '      EXECUTE IMMEDIATE \'DROP TABLE ' + config.oracleDb.tables.networkElements + '\';\n' +
      '  END IF;\n' +
      'END;'

    const createNewTableNetworkElements = '' +
      'CREATE TABLE ' + config.oracleDb.tables.networkElements + ' (\n' +
      'NODE varchar2(32 BYTE), \n' +
      'IP_ADRESSE varchar2(100 BYTE), \n' +
      'EXT_BEZEICHNUNG varchar2(40 BYTE), \n' +
      'ROOTNE varchar2(32 BYTE), \n' +
      'CELL_ID varchar2(32 BYTE), \n' +
      'SITE varchar2(64 BYTE), \n' +
      'KETTE varchar2(256 BYTE), \n' +
      'STATUS varchar2(20 BYTE), \n' +
      'KUNDE varchar2(64 BYTE), \n' +
      'KTREGION varchar2(40 BYTE), \n' +
      'NOC varchar2(10 BYTE), \n' +
      'REGION varchar2(32 BYTE), \n' +
      'ANSCHRIFT varchar2(255 BYTE), \n' +
      'PLZ varchar2(16 BYTE), \n' +
      'ORT varchar2(64 BYTE), \n' +
      'STRASSE varchar2(255 BYTE), \n' +
      'STRECKENNUMMER number(10,0), \n' +
      'STRECKEN_KM number, \n' +
      'X_KOORD number(10,3), \n' +
      'Y_KOORD number(10,3), \n' +
      'VERFAHREN varchar2(80 BYTE), \n' +
      'SLPL_NAME varchar2(32 BYTE), \n' +
      'SL varchar2(5 BYTE), \n' +
      'PL varchar2(5 BYTE), \n' +
      'HERSTELLER varchar2(64 BYTE), \n' +
      'GERAETE_KUERZEL varchar2(16 BYTE), \n' +
      'MODELL varchar2(64 BYTE), \n' +
      'TYP varchar2(64 BYTE), \n' +
      'EBA_AUSSENSTELLE varchar2(64 BYTE), \n' +
      'SERVICE varchar2(16 BYTE)\n' +
      ')'

    Oracle.query(dropTableNetworkElements)
      .then(() => Oracle.query(createNewTableNetworkElements))
      .then(() => resolve())
      .catch(err => reject(err))

  })
}

const disconnect = () => {
  return new Promise((resolve, reject) => {
    Oracle.disconnect()
      .then(
        () => resolve(),
        err => console.log('could not close connection', err)
      )
  })
}

export default {
  connect,
  dropTables,
  disconnect
}

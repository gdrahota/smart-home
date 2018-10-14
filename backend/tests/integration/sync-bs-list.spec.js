import MongoDbTestSetup from './setup/mongodb-test-setup'
import MsSqlTestSetup from './setup/mssql-test-setup'
import ExpressServerTestSetup from './setup/express-server-test-setup'
import async from 'async'
import config from '../../config/server'
import MsSql from '../../src/infrastructure/mssql'
// import ValueStoreRepository from '../../src/database/repository/value-store-repository'

beforeAll(done => {
  async.series(
    [
      cb1 => MongoDbTestSetup.connect(err => cb1(err)),
      cb1 => MsSqlTestSetup.connect(err => cb1(err)),
      cb1 => ExpressServerTestSetup.start(err => cb1(err))
    ],
    err => {
      if (err) {
        console.log('ERROR in beforeAll', err)
      }
      done()
    }
  )
})

beforeEach(done => {
  async.series(
    [
      cb1 => MongoDbTestSetup.dropTables(err => cb1(err)),
      cb1 => MsSqlTestSetup.dropTables(err => cb1(err)),
      cb1 => MsSqlTestSetup.createTestDataTable(err => cb1(err)),
      cb1 => MsSqlTestSetup.createTestData(err => cb1(err))
    ],
    err => {
      if (err) {
        console.log('ERROR in beforeEach', err)
      }
      done()
    }
  )
})

afterEach(done => {
  async.series(
    [],
    err => {
      if (err) {
        console.log('ERROR in afterEach', err)
      }
      done()
    }
  )
})

afterAll(done => {
  async.series(
    [
      cb1 => MongoDbTestSetup.disconnect(err => cb1(err)),
      cb1 => MsSqlTestSetup.disconnect(err => cb1(err)),
      cb1 => ExpressServerTestSetup.stop(err => cb1(err))
    ],
    err => {
      if (err) {
        console.log('ERROR in afterAll', err)
      }
      done()
    }
  )
})

describe('sync-bs-list', () => {

  test('guido', done => {
    expect.assertions(1)

    const query = 'SELECT * FROM ' + config.msSqlDb.tables.baseStations
    MsSql.query(query)
      .then(docs => {
        expect(docs.recordset.length).toBe(3)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail(err)
      })
  })

  // test('syncBsList() should create two enterListEntries if entries are not yet imported', done => {
  //   // set lastImportedRecordId
  //   async.series(
  //     [
  //       cb => ValueStoreRepository
  //         .createEntry('lastImportedRecordId', '1')
  //         .then(() => cb())
  //         .catch(err => cb(err)),
  //       cb => syncBsList()
  //         .then(cb())
  //         .catch(err => cb(err)),
  //       cb => {
  //         // assert: check if new entries were created in MongoDB
  //         let enterListEntries = []
  //
  //         mongoose.model('enterListEntry')
  //           .find()
  //           .then(enterListEntries => {
  //             expect(enterListEntries.length).toBe(2)
  //             expect(enterListEntries[0].foreignId).toBe(2)
  //             expect(enterListEntries[0].person).toBe('Hans Hansen')
  //             expect(enterListEntries[1].foreignId).toBe(3)
  //             expect(enterListEntries[1].person).toBe('Dieter Dose')
  //             cb()
  //           })
  //           .catch(err => cb(err))
  //       },
  //       cb => {
  //         ValueStoreRepository
  //           .getEntry('lastImportedRecordId')
  //           .then(entry => {
  //             expect(entry.name).toBe('lastImportedRecordId')
  //             expect(entry.value).toBe('3')
  //           })
  //       }
  //     ],
  //     err => {
  //       console.log(err)
  //       done()
  //     }
  //   )
  // })
  //
  // test('syncBsList() should not create any enterListEntries if newest entry is already imported', async () => {
  //   // set lastImportedRecordId
  //   await ValueStoreRepository.createEntry('lastImportedRecordId', '3')
  //
  //   // create sample-entries in MsSql database
  //   const query = '' +
  //     'INSERT INTO ' + config.msSqlDb.tables.baseStations +
  //     ' (BS_ID, BS_DateTime, BS_Bezeichnung, BS_Ort, BS_Adresse, BS_User, BS_Grund, BS_Queue) ' +
  //     'VALUES ' +
  //     '(1, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Dortmund\', null, \'Norbert Dickel\', \'Inspektion\', null), ' +
  //     '(2, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Hamburg\', null, \'Hans Hansen\', \'Wartung\', null), ' +
  //     '(3, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Berlin\', null, \'Dieter Dose\', \'Inspektion\', null);'
  //
  //   await MsSql.query(query)
  //
  //   // call job
  //   await syncBsList()
  //
  //   // assert: check if new entries were created in MongoDB
  //   let enterListEntries = []
  //
  //   await mongoose.model('enterListEntry')
  //     .find({})
  //     .lean()
  //     .then(result => enterListEntries = result)
  //
  //   expect(enterListEntries.length).toBe(0)
  //
  //   // assert: check if lastImportedRecordId was changed
  //   let entry = []
  //
  //   await ValueStoreRepository.getEntry('lastImportedRecordId')
  //     .then(doc => entry = doc)
  //
  //   expect(entry.name).toBe('lastImportedRecordId')
  //   expect(entry.value).toBe('3')
  //
  // })
  //
  // test('syncBsList() should not create any enterListEntries if the sql-query returns no results', async () => {
  //   // set lastImportedRecordId
  //   await ValueStoreRepository.createEntry('lastImportedRecordId', '1')
  //
  //   // call job
  //   await syncBsList()
  //
  //   // assert: check if new entries were created in MongoDB
  //   let enterListEntries = []
  //
  //   await mongoose.model('enterListEntry')
  //     .find({})
  //     .lean()
  //     .then(result => enterListEntries = result)
  //
  //   expect(enterListEntries.length).toBe(0)
  //
  //   // assert: check if lastImportedRecordId was changed
  //   let entry = []
  //
  //   await ValueStoreRepository.getEntry('lastImportedRecordId')
  //     .then(doc => entry = doc)
  //
  //   expect(entry.name).toBe('lastImportedRecordId')
  //   expect(entry.value).toBe('1')
  //
  // })
  //
  // test('syncBsList() should not create any enterListEntries if the sql-query produces an error', async () => {
  //   // set lastImportedRecordId
  //   await ValueStoreRepository.createEntry('lastImportedRecordId', '1')
  //
  //   // mock error
  //   const mock1 = jest
  //     .spyOn(BsListService, 'selectAllRecordsWithIdGreaterThan')
  //     .mockRejectedValue('Connection is closed.')
  //
  //   // call job
  //   let errorMessage = ''
  //   await syncBsList()
  //     .catch(err => {
  //       errorMessage = err
  //     })
  //
  //   // assert: check error message
  //   expect(errorMessage).toBe('Connection is closed.')
  //
  //   // assert: check if new entries were created in MongoDB
  //   let enterListEntries = []
  //
  //   await mongoose.model('enterListEntry')
  //     .find({})
  //     .lean()
  //     .then(result => enterListEntries = result)
  //
  //   expect(enterListEntries.length).toBe(0)
  //
  //   // assert: check if lastImportedRecordId was increased
  //   let entry = []
  //
  //   await ValueStoreRepository.getEntry('lastImportedRecordId')
  //     .then(doc => entry = doc)
  //
  //   expect(entry.name).toBe('lastImportedRecordId')
  //   expect(entry.value).toBe('1')
  //
  //   jest.restoreAllMocks()
  // })
  //
  // test('syncBsList() should not create any enterListEntries if the facility-id is missing', async () => {
  //
  //   // set lastImportedRecordId
  //   await ValueStoreRepository.createEntry('lastImportedRecordId', '0')
  //
  //   // create sample-entries in MsSql database
  //   const query = '' +
  //     'INSERT INTO ' + config.msSqlDb.tables.baseStations +
  //     ' (BS_ID, BS_DateTime, BS_Bezeichnung, BS_Ort, BS_Adresse, BS_User, BS_Grund, BS_Queue) ' +
  //     'VALUES ' +
  //     '(1, \'2018-07-31 14:30:10.000\', null, \'Dortmund\', null, \'Norbert Dickel\', \'Inspektion\', null), ' +
  //     '(2, \'2018-07-31 14:30:10.000\', \'\', \'Hamburg\', null, \'Hans Hansen\', \'Wartung\', null);'
  //
  //   await MsSql.query(query)
  //
  //   // call job
  //   await syncBsList()
  //
  //   // assert: check if new entries were created in MongoDB
  //   let enterListEntries = []
  //
  //   await mongoose.model('enterListEntry')
  //     .find({})
  //     .lean()
  //     .then(result => enterListEntries = result)
  //
  //   expect(enterListEntries.length).toBe(0)
  //
  //   // assert: check if lastImportedRecordId was increased
  //   let entry = []
  //
  //   await ValueStoreRepository.getEntry('lastImportedRecordId')
  //     .then(doc => entry = doc)
  //
  //   // lastImportedRecordId should have been increased to avoid re-import
  //   expect(entry.name).toBe('lastImportedRecordId')
  //   expect(entry.value).toBe('2')
  // })
  //
  // test('syncBsList() should create one correctly formatted enterListEntry if the records person and purpose are missing', async () => {
  //
  //   // set lastImportedRecordId
  //   await ValueStoreRepository.createEntry('lastImportedRecordId', '0')
  //
  //   // create sample-entries in MsSql database
  //   const query = '' +
  //     'INSERT INTO ' + config.msSqlDb.tables.baseStations +
  //     ' (BS_ID, BS_DateTime, BS_Bezeichnung, BS_Ort, BS_Adresse, BS_User, BS_Grund, BS_Queue) ' +
  //     'VALUES ' +
  //     '(1, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Dortmund\', null, \'\', \'\', null), ' +
  //     '(2, \'2018-07-31 14:30:10.000\', \'BS_12345\', \'Hamburg\', null, null, null, null);'
  //
  //   await MsSql.query(query)
  //
  //   // call job
  //   await syncBsList()
  //
  //   // assert: check if new entries were created in MongoDB
  //   let enterListEntries = []
  //
  //   await mongoose.model('enterListEntry')
  //     .find({})
  //     .lean()
  //     .then(result => enterListEntries = result)
  //
  //   expect(enterListEntries.length).toBe(2)
  //   expect(enterListEntries[0].purpose).toBe('Zutritt/Sonstige')
  //   expect(enterListEntries[0].person).toBe('???')
  //   expect(enterListEntries[1].purpose).toBe('Zutritt/Sonstige')
  //   expect(enterListEntries[1].person).toBe('???')
  //
  // })

})

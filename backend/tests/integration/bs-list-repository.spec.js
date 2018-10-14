import MsSql from '../../src/infrastructure/mssql'
import BsListRepository from '../../src/database/repository/bs-list-repository'
import MsSqlTestSetup from './setup/mssql-test-setup'
import config from '../../config/server'
import async from 'async'

beforeAll(done => {
  MsSqlTestSetup.connect(() => {
    done()
  })
})

beforeEach(done => {
  async.series(
    [
      cb => MsSqlTestSetup.dropTables(err => cb(err)),
      cb => MsSqlTestSetup.createTestDataTable(err => cb(err)),
      cb => {
        const query = '' +
          'insert into ' + config.msSqlDb.tables.baseStations + ' (BS_ID, BS_Grund) ' +
          'VALUES ' +
          '(1, \'Inspektion\'), ' +
          '(2, \'Batterietest\'), ' +
          '(3, \'Wartung\');'

        MsSql
          .query(query)
          .then(() => {
            cb()
          })
          .catch(err => {
            cb(err)
          })
      }
    ],
    err => {
      if (err) {
        console.error('ERROR in beforeEach', err)
      }
      done()
    }
  )
})

afterAll(done => {
  MsSqlTestSetup.disconnect(() => done())
})

describe('bs-list-repository', () => {
  test('selectAllRecordsWithIdGreaterThan() should return correct number of records', done => {
    BsListRepository
      .selectAllRecordsWithIdGreaterThan(2)
      .then(docs => {
        expect(docs.length).toBe(1)
        expect(docs[0].foreignId).toBe(3)
        expect(docs[0].purpose).toBe('Wartung')
        done()
      })
      .catch(err => {
        console.log('err', err)
        expect(1).toBe(2)
        done()
      })
  })
})

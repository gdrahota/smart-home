import ClientRepository from '../../src/database/repository/client-repository'
import MongoDbTestSetup from './setup/mongodb-test-setup'
import mongoose from 'mongoose'
import 'moment-timezone'
import async from 'async'

// remember that the month here is zero-indexed, eg. 7 means august
const expirationDate1 = new Date(2018, 7, 11, 10, 0, 0)
const expirationDate2 = new Date(2018, 8, 11, 10, 0, 0)
const expirationDate3 = new Date(2018, 9, 11, 10, 0, 0)
const expirationDate4 = new Date(2018, 9, 11, 9, 0, 0)
const expirationDate5 = new Date(2018, 7, 11, 9, 0, 0)

beforeAll(done => {
  MongoDbTestSetup.connect(err => done(err))
})

beforeEach(done => {
  async.series(
    [
      cb => MongoDbTestSetup.dropTables(err => cb(err)),
      cb => {
        const user = {
          accountName: 'hanshansen',
          mail: 'hans.hansen@db-training.de',
          groups: ['BF OSS']
        }
        createClient('client-id-1', user, 'socket-id-1', expirationDate1, () => cb())
      },
      cb => {
        const user = {
          accountName: 'account-name-2',
          mail: 'hans.hansen@db-training.de',
          groups: ['BF OSS']
        }
        createClient('client-id-2', user, 'socket-id-2', expirationDate2, () => cb())
      },
      cb => {
        const user = {
          accountName: 'account-name-3',
          mail: 'hans.hansen@db-training.de',
          groups: ['BF OSS']
        }
        createClient('client-id-3', user, 'socket-id-3', expirationDate3, () => cb())
      },
    ],
    err => {
      if (err) {
        console.error('ERROR in beforeEach')
      }
      done()
    }
  )

})

afterAll(done => {
  MongoDbTestSetup.disconnect(err => done(err))
})

const createClient = (clientId, user, socketId, expires, cb) => {
  ClientRepository.add(clientId, user, socketId, expires)
    .then(result => cb(null, result))
    .catch(err => cb(err))
}

describe('client-repository', () => {

  test('there should be 3 clients', done => {
    mongoose
      .model('client')
      .find()
      .lean()
      .exec((err, clients) => {
        expect(clients.length).toBe(3)
        expect(clients[0].user.accountName).toBe('hanshansen')
        done()
      })
  })

  test('relogin() should return a client object if client is already connected', done => {
    ClientRepository.relogin('socket-id-new', 'client-id-3', new Date(2018, 10, 12, 8, 0, 0), (err, client) => {
      if (err) {
        console.log('===== ERROR', err)
        expect(1).toBe(2)
        done()
      } else {
        expect(client.clientId).toBe('client-id-3')
        expect(client.socketId.length).toBe(2)
        expect(client.socketId[0]).toBe('socket-id-3')
        expect(client.socketId[1]).toBe('socket-id-new')
        done()
      }
    })
  })

  test('relogin() should return null if client is not yet connected', done => {
    let loggedInClient = {}
    ClientRepository.relogin('socket-id-new', 'client-id-new', new Date(), (err, client) => {
      loggedInClient = client
      expect(loggedInClient).toBe(null)
      done()
    })
  })

  test('logOutClientsWithExpiredExpirationDate() should remove all but one client', done => {
    ClientRepository.logOutExpired(expirationDate4, () => {
      mongoose.model('client')
        .find()
        .exec((err, clients) => {
          expect(err).toBe(null)
          expect(clients.length).toBe(1)
          done()
        })
    })
  })

  test('logOutClientsWithExpiredExpirationDate() shall NOT remove any client', done => {
    ClientRepository.logOutExpired(expirationDate5, () => {
      mongoose.model('client')
        .find()
        .exec((err, clients) => {
          expect(err).toBe(null)
          expect(clients.length).toBe(3)
          done()
        })
    })
  })
})

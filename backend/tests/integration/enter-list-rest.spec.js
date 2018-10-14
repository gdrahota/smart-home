/*
import io from 'socket.io-client'
import config from '../../config/server'
import ExpressServerTestSetup from './setup/express-server-test-setup'
import MongoDbTestSetup from './setup/mongodb-test-setup'
import EnterListService from '../../src/services/enter-list-service'
import async from 'async'

beforeAll(done =>
  async.series(
    [
      cb => MongoDbTestSetup.connect(err => cb(err)),
      cb => ExpressServerTestSetup.start(err => cb(err))
    ],
    err => {
      if (err) {
        console.error('ERROR in beforeEach')
      } else {
        console.log('beforeAll done')
      }
      done()
    }
  )
)

afterAll(done =>
  async.series(
    [
      cb => MongoDbTestSetup.disconnect(err => cb(err)),
      cb => ExpressServerTestSetup.stop(err => cb(err))
    ],
    err => {
      if (err) {
        console.error('ERROR in beforeEach')
      } else {
        console.log('afterAll done')
      }
      done()
    }
  )
)

const connectNewClient = () => {
  let socketURL = 'http://localhost:' + config.server.port

  let options = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
  }

  return io.connect(socketURL, options)
}

describe('enter-list-rest', () => {
  beforeEach(done => MongoDbTestSetup.dropTables(() => {
    console.log('beforeEach done')
    done()
  }))

  test('get.enterListEntries should emit event with enterListEntries as payload', done => {
    const client1 = connectNewClient()

    // mock response
    const mock1 = jest
      .spyOn(EnterListService, 'getEnterListEntries')
      .mockResolvedValue([
        {
          foreignId: 1,
          person: 'Norbert Dickel'
        }
      ])

    client1.on('connect', () => {
      expect(client1.connected).toBe(true)

      // trigger event
      client1.emit('get.enterListEntries', null)

      // expect response
      client1.on('get_enter_list_entries', enterListEntries => {
        expect(mock1).toHaveBeenCalledTimes(1)
        expect(enterListEntries.length).toBe(1)
        expect(enterListEntries[0].person).toBe('Norbert Dickel')

        client1.disconnect()
        expect(client1.connected).toBe(false)
        done()
        jest.restoreAllMocks()
      })
    })
  })

  // test('add.enterListEntries should emit event to all connected clients', (done) => {
  //   const client1 = connectNewClient()
  //   const newEnterListEntry = {
  //     foreignId: 1,
  //     person: 'Peter Peterson'
  //   }
  //
  //   // mock repository method
  //   jest
  //     .spyOn(EnterListService, 'addEnterListEntry')
  //     .mockResolvedValue(newEnterListEntry)
  //
  //   // connect first client
  //   client1.on('connect', () => {
  //     expect(client1.connected).toBe(true)
  //
  //     // connect second client
  //     const client2 = connectNewClient()
  //
  //     client2.on('connect', () => {
  //       expect(client2.connected).toBe(true)
  //
  //       // client1: emit event
  //       client1.emit('add.enterListEntry', newEnterListEntry)
  //
  //       // client2: expect received event
  //       client2.on('add_enter_list_entry', enterListEntry => {
  //         expect(enterListEntry.person).toBe('Peter Peterson')
  //
  //         client1.disconnect()
  //         client2.disconnect()
  //         expect(client1.connected).toBe(false)
  //         expect(client2.connected).toBe(false)
  //         done()
  //         jest.restoreAllMocks()
  //       })
  //
  //     })
  //
  //   })
  //
  // })
})
*/

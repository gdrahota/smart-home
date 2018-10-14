import MongoDbTestSetup from './setup/mongodb-test-setup'
import OracleTestSetup from './setup/oracle-test-setup'
import Oracle from '../../src/infrastructure/oracle'
import { syncNetworkElements } from '../../src/jobs/sync-network-elements'
import mongoose from 'mongoose'
import NetworkElementService from '../../src/services/network-element-service'
import config from '../../config/server'

// beforeAll(async () => {
//   await MongoDbTestSetup.connect()
//   await OracleTestSetup.connect()
// })
//
// beforeEach(async () => {
//   await MongoDbTestSetup.dropTables()
//   await OracleTestSetup.dropTables()
// })
//
// afterAll(async () => {
//   await MongoDbTestSetup.disconnect()
//   await OracleTestSetup.disconnect()
// })
//
// describe('sync-network-elements', () => {
//
//   test('syncNetworkElements() should copy network-elements to MongoDB', async () => {
//
//     // Multiple inserts in one single statement is not working...
//     const createSampleNetworkElement1 = 'INSERT INTO ' + config.oracleDb.tables.networkElements + '(NODE, ORT) VALUES(\'1\', \'Dortmund\')'
//     const createSampleNetworkElement2 = 'INSERT INTO ' + config.oracleDb.tables.networkElements + '(NODE, ORT) VALUES(\'2\', \'Berlin\')'
//     const createSampleNetworkElement3 = 'INSERT INTO ' + config.oracleDb.tables.networkElements + '(NODE, ORT) VALUES(\'3\', \'Hamburg\')'
//
//     await Oracle.query(createSampleNetworkElement1)
//       .then(() => Oracle.query(createSampleNetworkElement2))
//       .then(() => Oracle.query(createSampleNetworkElement3))
//
//     // run job
//     await syncNetworkElements()
//
//     // assert: check if network-elements got copied to MongoDB
//     let syncedNetworkElements = []
//
//     await mongoose.model('networkElement')
//       .find({})
//       .lean()
//       .then(result => syncedNetworkElements = result)
//
//     expect(syncedNetworkElements.length).toBe(3)
//     expect(syncedNetworkElements[0].ORT).toBe('Dortmund')
//     expect(syncedNetworkElements[1].ORT).toBe('Berlin')
//     expect(syncedNetworkElements[2].ORT).toBe('Hamburg')
//   })
//
//   test('syncNetworkElements() should not drop existing data if oracle-query produces an error', async () => {
//
//     // create record
//     const networkElement = {
//       NODE: '1',
//       ORT: 'Dortmund'
//     }
//     await NetworkElementService.addNetworkElement(networkElement)
//
//     // mock error
//     const mock1 = jest
//       .spyOn(NetworkElementService, 'getNetworkElementsFromSource')
//       .mockRejectedValue('ORA-03128 connection is in blocking mode')
//
//     // run job
//     // promise should be rejected due to database-error
//     // catch error -> otherwise jest test will automatically fail (when promise gets rejected)
//     let errorMessage = ''
//     await syncNetworkElements()
//       .catch(err => errorMessage = err)
//
//     expect(mock1).toHaveBeenCalledTimes(1)
//     expect(errorMessage).toBe('ORA-03128 connection is in blocking mode')
//
//     // assert: check if network-elements got deleted
//     let syncedNetworkElements = []
//
//     await mongoose.model('networkElement')
//       .find({})
//       .lean()
//       .then(result => syncedNetworkElements = result)
//
//     expect(syncedNetworkElements.length).toBe(1)
//     expect(syncedNetworkElements[0].ORT).toBe('Dortmund')
//
//     jest.restoreAllMocks()
//   })
//
//   test('syncNetworkElements() should not drop existing data if oracle-query returns empty result', async () => {
//
//     // create record
//     const networkElement = {
//       NODE: '1',
//       ORT: 'Dortmund'
//     }
//     await NetworkElementService.addNetworkElement(networkElement)
//
//     // mock
//     const mock1 = jest
//       .spyOn(NetworkElementService, 'getNetworkElementsFromSource')
//       .mockResolvedValue(null)
//
//     // run job
//     // catch error -> otherwise jest test will automatically fail (when promise gets rejected)
//     await syncNetworkElements()
//       .catch(err => {})
//
//     expect(mock1).toHaveBeenCalledTimes(1)
//
//     // assert: check if network-elements got deleted
//     let syncedNetworkElements = []
//
//     await mongoose.model('networkElement')
//       .find({})
//       .lean()
//       .then(result => syncedNetworkElements = result)
//
//     expect(syncedNetworkElements.length).toBe(1)
//     expect(syncedNetworkElements[0].ORT).toBe('Dortmund')
//
//     jest.restoreAllMocks()
//   })
//
// })

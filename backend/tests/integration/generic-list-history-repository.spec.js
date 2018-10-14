// import GenericListHistoryRepository from '../../src/database/repository/generic-list-history-repository'
// import MongoDbTestSetup from './setup/mongodb-test-setup'
// import mongoose from 'mongoose'
// import moment from 'moment/moment'
// import 'moment-timezone'
//
// beforeAll(async () => {
//   await MongoDbTestSetup.connect()
// })
//
// beforeEach(async () => {
//   await MongoDbTestSetup.dropTables()
// })
//
// afterAll(async () => {
//   await MongoDbTestSetup.disconnect()
// })
//
// describe('generic-list-history-repository', () => {
//
//   test('addDocument() should add a document', async () => {
//
//     const document = {
//       spalte1: 'A',
//       spalte2: 100,
//       spalte3: 'xyz'
//     }
//
//     await GenericListHistoryRepository.addDocument('99', document)
//
//     // assert
//     let listDocuments = []
//
//     await mongoose.model('genericListHistoryDocument99')
//       .find({})
//       .lean()
//       .then(result => listDocuments = result)
//
//     expect(listDocuments.length).toBe(1)
//   })
//
//   test('deleteDocumentsOlderThanDate() should delete two documents', async () => {
//
//     // should be deleted
//     const document1 = {
//       spalte1: 'A',
//       spalte2: 100,
//       spalte3: 'xyz',
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-27T08:00:00', 'Europe/Berlin'))
//     }
//
//     // should be deleted
//     const document2 = {
//       spalte1: 'B',
//       spalte2: 200,
//       spalte3: 'xyz',
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-28T08:00:00', 'Europe/Berlin'))
//     }
//
//     const document3 = {
//       spalte1: 'C',
//       spalte2: 300,
//       spalte3: 'xyz',
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-29T08:00:00', 'Europe/Berlin'))
//     }
//
//     await GenericListHistoryRepository.addDocument('33', document1)
//     await GenericListHistoryRepository.addDocument('33', document2)
//     await GenericListHistoryRepository.addDocument('33', document3)
//
//     const actualDate = moment.tz('2018-08-28T10:00:00', 'Europe/Berlin')
//
//     await GenericListHistoryRepository.deleteDocumentsOlderThanDate('33', actualDate)
//
//     // assert
//     let listDocuments = []
//
//     await mongoose.model('genericListHistoryDocument33')
//       .find({})
//       .lean()
//       .then(result => listDocuments = result)
//
//     expect(listDocuments.length).toBe(1)
//   })
//
//   test('dropDocumentsCollection() should drop collection', async () => {
//
//     const archivedDocument1 = {
//       spalte1: 'A',
//       spalte2: 100
//     }
//
//     const archivedDocument2 = {
//       spalte1: 'B',
//       spalte2: 200
//     }
//
//     await GenericListHistoryRepository.addDocument('999', archivedDocument1)
//     await GenericListHistoryRepository.addDocument('999', archivedDocument2)
//
//     let documentsBeforeDeletion = []
//
//     await mongoose.model('genericListHistoryDocument999')
//       .find({})
//       .lean()
//       .then(result => documentsBeforeDeletion = result)
//
//     // assert that 2 documents got created
//     expect(documentsBeforeDeletion.length).toBe(2)
//
//     await GenericListHistoryRepository.dropDocumentsCollection('999')
//
//     let documentsAfterDeletion = []
//
//     await mongoose.model('genericListHistoryDocument999')
//       .find({})
//       .lean()
//       .then(result => documentsAfterDeletion = result)
//
//     // assert that 2 documents got created
//     expect(documentsAfterDeletion.length).toBe(0)
//   })
//
// })

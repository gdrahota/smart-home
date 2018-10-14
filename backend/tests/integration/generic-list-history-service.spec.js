// import MongoDbTestSetup from './setup/mongodb-test-setup'
// import GenericListHistoryRepository from '../../src/database/repository/generic-list-history-repository'
// import GenericListService from '../../src/services/generic-list-service'
// import GenericListHistoryService from '../../src/services/generic-list-history-service'
// import moment from 'moment/moment'
// import 'moment-timezone'
// import mongoose from 'mongoose'
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
// describe('generic-list-history-service', () => {
//
//   test('deleteGenericListHistoryEntriesOlderThanDays() should remove two documents', async () => {
//     // add default lists
//     const list1 = {
//       label: 'Liste 1',
//       deleteButtonLabel: 'Löschen',
//       minutesBeforeMoveToHistory: '0',
//       daysBeforeRemoveFromHistory: '5',
//       columns: []
//     }
//
//     const list2 = {
//       label: 'Liste 2',
//       deleteButtonLabel: 'Löschen',
//       minutesBeforeMoveToHistory: '0',
//       daysBeforeRemoveFromHistory: '10',
//       columns: []
//     }
//
//     let listId1 = null
//     let listId2 = null
//
//     await new Promise((resolve, reject) => {
//       GenericListService.addList(list1, (err, list) => {
//         listId1 = list._id
//         resolve()
//       })
//     })
//
//     await new Promise((resolve, reject) => {
//       GenericListService.addList(list2, (err, list) => {
//         listId2 = list._id
//         resolve()
//       })
//     })
//
//     // await GenericListService.addList(list2)
//     //   .then(list => listId2 = list._id)
//
//     // should be deleted
//     const document1 = {
//       spalte1: 'A',
//       spalte2: 100,
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-20T08:00:00', 'Europe/Berlin'))
//     }
//
//     const document2 = {
//       spalte1: 'B',
//       spalte2: 200,
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-28T08:00:00', 'Europe/Berlin'))
//     }
//
//     // should be deleted
//     const document3 = {
//       spalte1: 'C',
//       spalte2: 300,
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-10T08:00:00', 'Europe/Berlin'))
//     }
//
//     const document4 = {
//       spalte1: 'D',
//       spalte2: 400,
//       status: 'deleted',
//       deletedAt: new Date(moment.tz('2018-08-24T08:00:00', 'Europe/Berlin'))
//     }
//
//     await GenericListHistoryRepository.addDocument(listId1, document1)
//     await GenericListHistoryRepository.addDocument(listId1, document2)
//     await GenericListHistoryRepository.addDocument(listId2, document3)
//     await GenericListHistoryRepository.addDocument(listId2, document4)
//
//     // run service & inject mock-date
//     Date.now = jest.fn()
//       .mockReturnValue(moment.tz('2018-08-30T10:00:00', 'Europe/Berlin'))
//
//     await GenericListHistoryService.deleteGenericListHistoryEntriesOlderThanDays()
//
//     // check if entries got deleted
//     let list1Documents = []
//     let list2Documents = []
//
//     await mongoose.model('genericListHistoryDocument' + listId1)
//       .find({})
//       .lean()
//       .then(result => list1Documents = result)
//
//     await mongoose.model('genericListHistoryDocument' + listId2)
//       .find({})
//       .lean()
//       .then(result => list2Documents = result)
//
//     expect(list1Documents.length).toBe(1)
//     expect(list2Documents.length).toBe(1)
//
//     jest.restoreAllMocks()
//   })
//
// })

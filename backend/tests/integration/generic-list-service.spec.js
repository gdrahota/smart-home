// import MongoDbTestSetup from './setup/mongodb-test-setup'
// import GenericListRepository from '../../src/database/repository/generic-list-repository'
// import GenericListHistoryRepository from '../../src/database/repository/generic-list-history-repository'
// import GenericListService from '../../src/services/generic-list-service'
// import moment from 'moment/moment'
// import 'moment-timezone'
// import ExpressServerTestSetup from './setup/express-server-test-setup'
// import async from 'async'
//
// beforeAll(done => {
//   async.series(
//     [
//       cb1 => MongoDbTestSetup.connect(err => cb1(err)),
//       cb1 => ExpressServerTestSetup.start(err => cb1(err))
//     ],
//     err => {
//       if (err) {
//         console.log('ERROR in beforeAll', err)
//       }
//       done()
//     }
//   )
// })
//
// beforeEach(done => {
//   MongoDbTestSetup.dropTables((err) => done(err))
// })
//
// afterAll(done => {
//   async.series(
//     [
//       cb1 => MongoDbTestSetup.disconnect(err => cb1(err)),
//       cb1 => ExpressServerTestSetup.stop(err => cb1(err))
//     ],
//     err => {
//       if (err) {
//         console.log('ERROR in afterAll', err)
//       }
//       done()
//     }
//   )
// })
//
// describe('generic-list-service', () => {
//
//   test('getList() should return a list and its items', async () => {
//     // create new list
//     const list = {
//       label: 'Neue Liste',
//       deleteButtonLabel: 'Löschen',
//       minutesBeforeMoveToHistory: '0',
//       daysBeforeRemoveFromHistory: '730',
//       columns: [
//         {
//           label: 'Netzwerkelement',
//           type: 'String',
//           filterable: true,
//           sortable: false,
//           editable: false,
//           width: 1,
//           options: []
//         }
//       ]
//     }
//
//     let newlyCreatedList = {}
//
//     await GenericListRepository.addList(list)
//       .then(result => newlyCreatedList = result)
//
//     // add documents
//     const document1 = {
//       spalte1: 'BS_53578',
//       spalte2: 500,
//       spalte3: 'xyz'
//     }
//
//     const document2 = {
//       spalte1: 'BS_86790',
//       spalte2: 0,
//       spalte3: 'abc'
//     }
//
//     await GenericListRepository.addDocument(newlyCreatedList._id, document1)
//     await GenericListRepository.addDocument(newlyCreatedList._id, document2)
//
//     let listWithItems = {}
//
//     await GenericListService.getList(newlyCreatedList._id)
//       .then(result => listWithItems = result)
//
//     expect(listWithItems.items.length).toBe(2)
//     expect(listWithItems.items[0].spalte1).toBe('BS_53578')
//     expect(listWithItems.items[1].spalte1).toBe('BS_86790')
//   })
//
//   test('getAllLists() should return all lists and its items', async () => {
//     // create new list
//     const list1 = {
//       label: 'Liste1',
//       deleteButtonLabel: 'Löschen',
//       minutesBeforeMoveToHistory: '0',
//       daysBeforeRemoveFromHistory: '730',
//       columns: [
//         {
//           label: 'Netzwerkelement',
//           type: 'String',
//           filterable: true,
//           sortable: false,
//           editable: false,
//           width: 1,
//           options: []
//         }
//       ]
//     }
//
//     const list2 = {
//       label: 'Liste2',
//       deleteButtonLabel: 'Entfernen',
//       minutesBeforeMoveToHistory: '0',
//       daysBeforeRemoveFromHistory: '730',
//       columns: [
//         {
//           label: 'Ort',
//           type: 'String',
//           filterable: true,
//           sortable: false,
//           editable: false,
//           width: 1,
//           options: []
//         }
//       ]
//     }
//
//     let createdList1 = {}
//     let createdList2 = {}
//
//     await GenericListRepository.addList(list1)
//       .then(result => createdList1 = result)
//
//     await GenericListRepository.addList(list2)
//       .then(result => createdList2 = result)
//
//     // add documents
//     const document1 = {
//       spalte1: 'BS_53578',
//       spalte2: 500,
//       spalte3: 'aaa'
//     }
//
//     const document2 = {
//       spalte1: 'BS_86790',
//       spalte2: 0,
//       spalte3: 'bbb'
//     }
//
//     const document3 = {
//       spalte1: 'BS_27568',
//       spalte2: 0,
//       spalte3: 'ccc'
//     }
//
//     const document4 = {
//       spalte1: 'BS_17567',
//       spalte2: 0,
//       spalte3: 'ddd'
//     }
//
//     await GenericListRepository.addDocument(createdList1._id, document1)
//     await GenericListRepository.addDocument(createdList1._id, document2)
//     await GenericListRepository.addDocument(createdList2._id, document3)
//     await GenericListRepository.addDocument(createdList2._id, document4)
//
//     let allListsWithItems = []
//
//     await GenericListService.getAllLists()
//       .then(result => allListsWithItems = result)
//
//     expect(allListsWithItems.length).toBe(2)
//     expect(allListsWithItems[0].items.length).toBe(2)
//     expect(allListsWithItems[0].items[0].spalte3).toBe('aaa')
//     expect(allListsWithItems[0].items[1].spalte3).toBe('bbb')
//     expect(allListsWithItems[1].items.length).toBe(2)
//     expect(allListsWithItems[1].items[0].spalte3).toBe('ccc')
//     expect(allListsWithItems[1].items[1].spalte3).toBe('ddd')
//   })
//
//   test('archiveDeletedDocuments() should move deleted documents to another collection', async () => {
//
//     const list1 = {
//       label: 'Liste1',
//       deleteButtonLabel: 'Löschen',
//       minutesBeforeMoveToHistory: '10',
//       daysBeforeRemoveFromHistory: '10',
//       columns: []
//     }
//
//     const list2 = {
//       label: 'Liste2',
//       deleteButtonLabel: 'Entfernen',
//       minutesBeforeMoveToHistory: '120',
//       daysBeforeRemoveFromHistory: '10',
//       columns: []
//     }
//
//     let createdList1 = {}
//     let createdList2 = {}
//
//     await GenericListRepository.addList(list1)
//       .then(result => createdList1 = result)
//
//     await GenericListRepository.addList(list2)
//       .then(result => createdList2 = result)
//
//     // add documents
//     const document1 = {
//       spalte1: 'eins',
//       spalte2: 100
//     }
//
//     const document2 = {
//       spalte1: 'zwei',
//       spalte2: 200
//     }
//
//     const document3 = {
//       spalte1: 'drei',
//       spalte2: 300
//     }
//
//     const document4 = {
//       spalte1: 'vier',
//       spalte2: 400
//     }
//
//     let documentToDeleteId1 = null
//     let documentToDeleteId2 = null
//
//     await GenericListRepository.addDocument(createdList1._id, document1)
//     await GenericListRepository.addDocument(createdList1._id, document2)
//       .then(doc => documentToDeleteId1 = doc._id)
//
//     await GenericListRepository.addDocument(createdList2._id, document3)
//     await GenericListRepository.addDocument(createdList2._id, document4)
//       .then(doc => documentToDeleteId2 = doc._id)
//
//     // delete one document from each list & inject fake deletion dates
//     Date.now = jest.fn()
//       .mockReturnValue(moment.tz('2018-08-20T10:00:00', 'Europe/Berlin'))
//     await GenericListRepository.deleteDocument(createdList1._id, documentToDeleteId1)
//
//     Date.now
//       .mockReturnValueOnce(moment.tz('2018-08-20T11:00:00', 'Europe/Berlin'))
//     await GenericListRepository.deleteDocument(createdList2._id, documentToDeleteId2)
//
//     // call service & inject fake actual date
//     Date.now
//       .mockReturnValue(moment.tz('2018-08-20T18:00:00', 'Europe/Berlin'))
//
//     await GenericListService.archiveDeletedDocuments()
//
//     // assert that documents were removed
//     let updatedList1 = []
//     let updatedList2 = []
//
//     await GenericListRepository.getAllDocumentsInList(createdList1._id)
//       .then(result => updatedList1 = result)
//
//     await GenericListRepository.getAllDocumentsInList(createdList2._id)
//       .then(result => updatedList2 = result)
//
//     expect(updatedList1.length).toBe(1)
//     expect(updatedList2.length).toBe(1)
//
//     // assert that documents were copied to history list
//     let historyDocuments1 = []
//     let historyDocuments2 = []
//
//     await GenericListHistoryRepository.getAllDocumentsInList(createdList1._id)
//       .then(result => historyDocuments1 = result)
//
//     await GenericListHistoryRepository.getAllDocumentsInList(createdList2._id)
//       .then(result => historyDocuments2 = result)
//
//     expect(historyDocuments1.length).toBe(1)
//     expect(historyDocuments2.length).toBe(1)
//   })
//
// })

import EnterListRepository from '../../src/database/repository/enter-list-repository'
import MongoDbTestSetup from './setup/mongodb-test-setup'
import mongoose from 'mongoose'
import moment from 'moment/moment'
import 'moment-timezone'
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
// describe('enter-list-repository', () => {
//
//   test('getEnterListEntriesOlderThanDate() should return one document', async () => {
//
//     const entries = [
//       {
//         foreignId: 111,
//         facility: {
//           facilityId: 'F-1',
//           postCode: '44575',
//           city: 'Castrop-Rauxel',
//           street: 'Gaswerkstraße',
//           site: 'CR111',
//           noc: 'NOC BLN'
//         },
//         enteredAt: moment.tz('2018-08-06T08:00:00', 'Europe/Berlin'),
//         leftAt: moment.tz('2018-08-06T09:00:00', 'Europe/Berlin'),
//         person: 'Dirk Brause',
//         purpose: 'Wartung',
//         status: 'verlassen',
//         batteryTestStatus: 'gestartet',
//         notes: 'die Rote Lampe geht nicht',
//         createdBy: 'manually by user'
//       },
//       {
//         foreignId: 222,
//         facility: {
//           facilityId: 'F-2',
//           postCode: '44147',
//           city: 'Dortmund',
//           street: 'Möllerbrücke',
//           site: 'DO111',
//           noc: 'NOC BLN'
//         },
//         enteredAt: moment.tz('2018-08-06T14:30:00', 'Europe/Berlin'),
//         leftAt: moment.tz('2018-08-06T14:50:00', 'Europe/Berlin'),
//         person: 'Peter Hansen',
//         purpose: 'Batterietest',
//         status: 'verlassen',
//         batteryTestStatus: 'gestartet',
//         notes: 'alles ok',
//         createdBy: 'manually by user'
//       }
//     ]
//
//     // enter sample data
//     await mongoose
//       .model('enterListEntry')
//       .insertMany(entries)
//
//     let entry = null
//
//     const actualDate = moment.tz('2018-08-06T10:00:00', 'Europe/Berlin')
//
//     await EnterListRepository.getEnterListEntriesOlderThanDate(actualDate)
//       .then(result => entry = result)
//
//     expect(entry.length).toBe(1)
//   })
//
//   test('addEnterListEntry() should add a new entry and set the correct creation date', async () => {
//
//     const entry = {
//       foreignId: 99,
//       person: 'Hans Hansen',
//       status: 'betreten',
//       purpose: 'mal gucken',
//       facility: {
//         facilityId: '123',
//         postCode: '44147',
//         city: 'Dortmund',
//         street: 'Hansastraße 1',
//         site: '458578976',
//         noc: 'NOC BLN'
//       }
//     }
//
//     // inject mock-date
//     Date.now = jest.fn()
//       .mockReturnValue(moment.tz('2018-09-05T10:00:00', 'Europe/Berlin'))
//
//     let savedEntry = {}
//
//     await EnterListRepository.addEnterListEntry(entry)
//       .then(result => savedEntry = result)
//
//       expect(moment(savedEntry.enteredAt).local().format('YYYY-MM-DD HH:mm:ss')).toBe('2018-09-05 10:00:00')
//
//     jest.restoreAllMocks()
//   })
//
// })

// import MongoDbTestSetup from './setup/mongodb-test-setup'
// import EnterListService from '../../src/services/enter-list-service'
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
// describe('enter-list-service', () => {
//
//   test('archiveEnterListEntries() should move one entry to history', async () => {
//
//     const entries = [
//       { // FALSE
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
//         person: 'Dieter Meyer',
//         purpose: 'Wartung',
//         status: 'betreten',
//         batteryTestStatus: 'gestartet',
//         notes: 'test',
//         createdBy: 'manually by user'
//       },
//       { // TRUE
//         foreignId: 222,
//         facility: {
//           facilityId: 'F-2',
//           postCode: '44147',
//           city: 'Dortmund',
//           street: 'Möllerbrücke',
//           site: 'DO111',
//           noc: 'NOC BLN'
//         },
//         enteredAt: moment.tz('2018-08-05T13:30:00', 'Europe/Berlin'),
//         leftAt: moment.tz('2018-08-05T14:00:00', 'Europe/Berlin'),
//         person: 'Helga Müller',
//         purpose: 'Batterietest',
//         status: 'verlassen',
//         batteryTestStatus: 'gestartet',
//         notes: 'ok',
//         createdBy: 'manually by user'
//       },
//       { // FALSE
//         foreignId: 333,
//         facility: {
//           facilityId: 'F-2',
//           postCode: '50667',
//           city: 'Köln',
//           street: 'Friesenstraße',
//           site: 'CO111',
//           noc: 'NOC BLN'
//         },
//         enteredAt: moment.tz('2018-08-05T16:30:00', 'Europe/Berlin'),
//         leftAt: moment.tz('2018-08-05T18:30:00', 'Europe/Berlin'),
//         person: 'Peter Fischer',
//         purpose: 'Batterietest',
//         status: 'verlassen',
//         batteryTestStatus: 'gestartet',
//         notes: 'ok',
//         createdBy: 'manually by user'
//       }
//     ]
//
//     await mongoose
//       .model('enterListEntry')
//       .insertMany(entries)
//
//     const fakeDate = moment.tz('2018-08-06T18:00:00', 'Europe/Berlin')
//
//     // inject fake date
//     Date.now = jest.fn()
//       .mockReturnValue(fakeDate)
//
//     let enterListEntries = []
//     let enterListHistoryEntries = []
//
//     await EnterListService.archiveEnterListEntries()
//
//     await mongoose.model('enterListEntry')
//       .find({})
//       .lean()
//       .then(result => enterListEntries = result)
//
//     await mongoose.model('enterListHistoryEntry')
//       .find({})
//       .lean()
//       .then(result => enterListHistoryEntries = result)
//
//     expect(Date.now).toHaveBeenCalled()
//     expect(enterListEntries.length).toBe(2)
//     expect(enterListHistoryEntries.length).toBe(1)
//     expect(enterListHistoryEntries[0].facilityId).toBe('F-2')
//   })
//
// })
//

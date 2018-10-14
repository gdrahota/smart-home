import EnterListHistoryRepository from '../../src/database/repository/enter-list-history-repository'
import MongoDbTestSetup from './setup/mongodb-test-setup'
import mongoose from 'mongoose'
import moment from 'moment/moment'
import 'moment-timezone'

beforeAll(done => {
  MongoDbTestSetup.connect(() => done())
})

beforeEach(done => {
  MongoDbTestSetup.dropTables(() => done())
})

afterAll(done => {
  MongoDbTestSetup.disconnect(() => done())
})

describe('enter-list-history-repository', () => {

  test('deleteEnterListHistoryEntriesOlderThanDate() should delete two documents', async () => {
    const entries = [
      {
        foreignId: 111,
        facilityId: 'BS12345',
        enteredAt: moment.tz('2017-05-06T08:00:00', 'Europe/Berlin'),
        leftAt: moment.tz('2017-05-06T09:00:00', 'Europe/Berlin'),
        person: 'Dirk Brause',
        purpose: 'Wartung',
        status: 'verlassen',
        batteryTestStatus: 'gestartet',
        notes: 'alles ok',
        createdBy: 'ivr'
      },
      {
        foreignId: 222,
        facilityId: 'BS12345',
        enteredAt: moment.tz('2018-08-06T14:30:00', 'Europe/Berlin'),
        leftAt: moment.tz('2018-08-06T14:50:00', 'Europe/Berlin'),
        person: 'Peter Hansen',
        purpose: 'Batterietest',
        status: 'verlassen',
        batteryTestStatus: 'gestartet',
        notes: 'alles ok',
        createdBy: 'manually by user'
      },
      {
        foreignId: 333,
        facilityId: 'BS12345',
        enteredAt: moment.tz('2017-03-06T14:30:00', 'Europe/Berlin'),
        leftAt: moment.tz('2017-03-06T14:50:00', 'Europe/Berlin'),
        person: 'Luise Koschinski',
        purpose: 'Batterietest',
        status: 'verlassen',
        batteryTestStatus: 'gestartet',
        notes: 'alles ok',
        createdBy: 'manually by user'
      }
    ]

    // enter sample data
    await mongoose
      .model('enterListHistoryEntry')
      .insertMany(entries)

    let entry = null

    const actualDate = moment.tz('2017-08-06T10:00:00', 'Europe/Berlin')

    await EnterListHistoryRepository.deleteEnterListHistoryEntriesOlderThanDate(actualDate)

    let enterListHistoryEntries = []

    await mongoose.model('enterListHistoryEntry')
      .find({})
      .lean()
      .then(result => enterListHistoryEntries = result)

    expect(enterListHistoryEntries.length).toBe(1)
  })
})

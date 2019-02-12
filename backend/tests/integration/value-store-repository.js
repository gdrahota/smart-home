import ValueStoreRepository from '../../src/database/repository/value-store-repository'
import MongoDbTestSetup from './setup/mongodb-test-setup'

beforeAll(done => {
  MongoDbTestSetup.connect(() => done())
})

beforeEach(done => {
  MongoDbTestSetup.dropTables(() => done())
})

afterAll(done => {
  MongoDbTestSetup.disconnect(() => done())
})

describe('value-store-repository', () => {

  test('createEntry() should create a new document', async () => {
    let entry = null

    await ValueStoreRepository.createEntry('some', 'test')
    await ValueStoreRepository.getEntry('some')
      .then(doc => {
        entry = doc
      })

    expect(entry.name).toBe('some')
    expect(entry.value).toBe('test')
  })

  test('getEntry() should return the correct document', async () => {
    let entry = null

    await ValueStoreRepository.createEntry('A', '123')
    await ValueStoreRepository.getEntry('A')
      .then(doc => {
          entry = doc
        },
        (err) => {
          console.log('err', err)
        })

    expect(entry.name).toBe('A')
    expect(entry.value).toBe('123')
  })

  test('updateEntry() should update the correct document', async () => {
    let entry = null

    await ValueStoreRepository.createEntry('testEntry', '1')
    await ValueStoreRepository.updateEntry('testEntry', '2')
    await ValueStoreRepository.getEntry('testEntry')
      .then(doc => {
          entry = doc
        },
        (err) => {
          console.log('err', err)
        })

    expect(entry.name).toBe('testEntry')
    expect(entry.value).toBe('2')
  })

})

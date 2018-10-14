import GenericListRepository from '../../src/database/repository/generic-list-repository'
import MongoDbTestSetup from './setup/mongodb-test-setup'
import mongoose from 'mongoose'
import moment from 'moment'
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

describe('generic-list-repository', () => {

  test('addList() should add a list', async () => {
    const list = {
      label: 'Neue Liste Guido',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    const t = await GenericListRepository.addList(list)

    // assert: check if new entries were created in MongoDB
    let lists = []

    await mongoose.model('genericListDefinition')
      .find({})
      .lean()
      .then(result => lists = result)

    expect(lists.length).toBe(1)
  })

  test('deleteList() should delete a list', async () => {

    const list = {
      label: 'Neue Liste',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    await GenericListRepository.addList(list)

    // assert: check if new entries were created in MongoDB
    let lists = []

    await mongoose.model('genericListDefinition')
      .find({})
      .lean()
      .then(result => lists = result)

    expect(lists.length).toBe(1)

    await GenericListRepository.deleteList(lists[0]._id)

    await mongoose.model('genericListDefinition')
      .find({})
      .lean()
      .then(result => lists = result)

    expect(lists.length).toBe(0)
  })

  test('getAllLists() should return all lists', async () => {

    const list1 = {
      label: 'Neue Liste 1',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    const list2 = {
      label: 'Neue Liste 2',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    await GenericListRepository.addList(list1)
    await GenericListRepository.addList(list2)

    let lists = []

    await GenericListRepository.getAllLists()
      .then(result => lists = result)

    expect(lists.length).toBe(2)
  })

  test('addDocument() should add a document', async () => {

    const document = {
      spalte1: 'BS_53578',
      spalte2: 500,
      spalte3: 'xyz'
    }

    await GenericListRepository.addDocument('99', document)

    // assert
    let listDocuments = []

    await mongoose.model('genericListDocument99')
      .find({})
      .lean()
      .then(result => listDocuments = result)

    expect(listDocuments.length).toBe(1)
  })

  test('deleteDocument() should delete a document', async () => {

    const document = {
      spalte1: 'BS_53578',
      spalte2: 500,
      spalte3: 'xyz'
    }

    await GenericListRepository.addDocument('99', document)

    // assert
    let listDocuments = []

    await mongoose.model('genericListDocument99')
      .find({})
      .lean()
      .then(result => listDocuments = result)

    await GenericListRepository.deleteDocument('99', listDocuments[0]._id)

    await mongoose.model('genericListDocument99')
      .find({})
      .lean()
      .then(result => listDocuments = result)

    expect(listDocuments.length).toBe(1)
    expect(listDocuments[0].status).toBe('deleted')
  })

  test('updateDocument() should update a document', async () => {

    const document = {
      spalte1: 'BS_53578',
      spalte2: 500,
      spalte3: 'xyz'
    }

    await GenericListRepository.addDocument('99', document)

    let documents = []

    await mongoose.model('genericListDocument99')
      .find({})
      .lean()
      .then(result => documents = result)

    expect(documents.length).toBe(1)

    const idOld = documents[0]._id

    const newDocument = {
      _id: idOld,
      spalte1: 'BS_11111',
      spalte2: 100,
      spalte3: 'abc'
    }

    await GenericListRepository.updateDocument('99', newDocument)

    let updatedDocuments = []

    await mongoose.model('genericListDocument99')
      .find({})
      .lean()
      .then(result => updatedDocuments = result)

    const idNew = updatedDocuments[0]._id

    expect(updatedDocuments.length).toBe(1)
    expect(updatedDocuments[0].spalte1).toBe('BS_11111')
    expect(updatedDocuments[0].spalte2).toBe(100)
    expect(updatedDocuments[0].spalte3).toBe('abc')
    expect(idNew).toEqual(idOld)
    // documentId will not get changed – as desired
  })

  test('getAllDocumentsInList() should return all documents', async () => {

    const document1 = {
      spalte1: 'BS_53578',
      spalte2: 500,
      spalte3: 'xyz'
    }

    const document2 = {
      spalte1: 'BS_53578',
      spalte2: 500,
      spalte3: 'xyz'
    }

    await GenericListRepository.addDocument('99', document1)
    await GenericListRepository.addDocument('99', document2)

    let documents = []

    await GenericListRepository.getAllDocumentsInList(99)
      .then(result => documents = result)

    expect(documents.length).toBe(2)
  })

  test('getList() should return the correct list', async () => {

    const list = {
      label: 'Neue Liste',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        },
        {
          label: 'Ort',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    let newList = {}

    await GenericListRepository.addList(list)
      .then(result => newList = result)

    let foundList = {}

    await GenericListRepository.getList(newList._id)
      .then(result => foundList = result)

    expect(typeof foundList).toBe('object')
    expect(foundList.label).toBe('Neue Liste')
  })

  test('updateList() should update a list', async () => {

    const list = {
      label: 'Neue Liste',
      deleteButtonLabel: 'Löschen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '730',
      columns: [
        {
          label: 'Netzwerkelement',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        },
        {
          label: 'Ort',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    await GenericListRepository.addList(list)

    let createdList = []

    await mongoose.model('genericListDefinition')
      .find({})
      .lean()
      .then(result => createdList = result)

    const oldIdOfSecondEntry = createdList[0].columns[1]._id

    const list2 = {
      _id: createdList[0]._id,
      label: 'Neue Liste',
      deleteButtonLabel: 'Entfernen',
      minutesBeforeMoveToHistory: '0',
      daysBeforeRemoveFromHistory: '100',
      columns: [
        {
          label: 'Batteriestatus',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        },
        {
          label: 'Ort',
          type: 'String',
          filterable: true,
          sortable: false,
          editable: false,
          width: 1,
          options: []
        }
      ]
    }

    await GenericListRepository.updateList(list2)

    let updatedList = []

    await mongoose.model('genericListDefinition')
      .find({})
      .lean()
      .then(result => updatedList = result)

    const newIdOfSecondEntry = updatedList[0].columns[1]._id

    expect(updatedList[0].columns.length).toBe(2)
    expect(updatedList[0].deleteButtonLabel).toBe('Entfernen')
    expect(oldIdOfSecondEntry).not.toEqual(newIdOfSecondEntry)
  })

  test('getGenericListDocumentsOlderThanDate() should return two documents', async () => {

    const document1 = {
      spalte1: 'A',
      spalte2: 100
    }

    const document2 = {
      spalte1: 'B',
      spalte2: 200
    }

    await GenericListRepository.addDocument('999', document1)
    await GenericListRepository.addDocument('999', document2)

    let documents = []

    await mongoose.model('genericListDocument999')
      .find({})
      .lean()
      .then(result => documents = result)

    // assert that 2 documents got created
    expect(documents.length).toBe(2)

    // delete second document (set status = 'deleted')
    // inject fake deletion date
    Date.now = jest.fn()
      .mockReturnValue(moment.tz('2018-08-20T18:00:00', 'Europe/Berlin'))

    await GenericListRepository.deleteDocument('999', documents[1]._id)

    // get deleted documents
    let documentsOlderThanDate = []

    const newerDate = moment.tz('2018-08-28T11:00:00', 'Europe/Berlin')

    await GenericListRepository.getDocumentsOlderThanDate('999', newerDate)
      .then(documents => documentsOlderThanDate = documents)

    expect(documentsOlderThanDate.length).toBe(1)

    Date.now.mockReset()
  })

  test('dropDocumentsCollection() should drop collection', async () => {

    const document1 = {
      spalte1: 'A',
      spalte2: 100
    }

    const document2 = {
      spalte1: 'B',
      spalte2: 200
    }

    await GenericListRepository.addDocument('999', document1)
    await GenericListRepository.addDocument('999', document2)

    let documentsBeforeDeletion = []

    await mongoose.model('genericListDocument999')
      .find({})
      .lean()
      .then(result => documentsBeforeDeletion = result)

    // assert that 2 documents got created
    expect(documentsBeforeDeletion.length).toBe(2)

    await GenericListRepository.dropDocumentsCollection('999')

    let documentsAfterDeletion = []

    await mongoose.model('genericListDocument999')
      .find({})
      .lean()
      .then(result => documentsAfterDeletion = result)

    // assert that 2 documents got created
    expect(documentsAfterDeletion.length).toBe(0)
  })

})

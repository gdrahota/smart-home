import Repository from '../repository/any-collection'

const collectionName = 'knx-events'

const add = item => Repository(collectionName).add(item)

const getAll = () => Repository(collectionName).getAll()

const find = searchObj => Repository(collectionName).find(searchObj)

const findOne = searchObj => Repository(collectionName).findOne(searchObj)

export const KnxEventService = {
  add,
  getAll,
  find,
  findOne,
}

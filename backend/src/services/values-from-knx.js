import Repository from '../repository/any-collection'

const collectionName = 'values-from-knx'

const add = (item, cb) => Repository(collectionName).add(item, cb)

const getAll = cb => Repository(collectionName).getAll(cb)

const find = (searchObj, cb) => Repository(collectionName).find(searchObj, cb)

const findOne = searchObj => Repository(collectionName).findOne(searchObj)

const upsert = (item, query, cb) => Repository(collectionName).upsert(item, query, cb)

const remove = id => Repository(collectionName).remove(id)

export const ValuesFromKnxService = {
  add,
  getAll,
  find,
  findOne,
  remove,
  upsert
}

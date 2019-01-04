import Repository from '../repository/any-collection'

const collection = 'data-points'

const getAll = () => Repository(collection).getAll()

const find = searchObj => Repository(collection).find(searchObj)
const findOne = searchObj => Repository(collection).findOne(searchObj)

const add = item => Repository(collection).add(item)
const update = item => Repository(collection).update(item)
const remove = id => Repository(collection).remove(id)

export const DataPointService = {
  add,
  getAll,
  find,
  findOne,
  remove,
  update
}

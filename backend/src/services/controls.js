import Repository from '../repository/any-collection'

const collection = 'controls'

const add = item => Repository(collection).add(item)
const getAll = () => Repository(collection).getAll()
const findOne = searchObj => Repository(collection).findOne(searchObj)
const update = item => Repository(collection).update(item)
const remove = id => Repository(collection).remove(id)

export const ControlService = {
  add,
  getAll,
  findOne,
  remove,
  update
}

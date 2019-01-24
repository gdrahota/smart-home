import Repository from '../repository/any-collection'

const collection = 'facilities'

const add = (facility, cb) => Repository(collection).add(facility, cb)

const getAll = cb => Repository(collection).getAll(cb)

const find = searchObj => Repository(collection).find(searchObj)
const findOne = searchObj => Repository(collection).findOne(searchObj)

const remove = (id, cb) => Repository(collection).remove(id, cb)

const setInactive = (id, cb) => Repository(collection).setInactive(id, cb)

const update = (facility, cb) => Repository(collection).update(facility, cb)

export const FacilityService = {
  add,
  getAll,
  find,
  findOne,
  remove,
  setInactive,
  update
}

import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('data-points').add(facility, cb)

const getAll = cb => Repository('data-points').getAll(cb)

const remove = (id, cb) => Repository('data-points').remove(id, cb)

const update = (facility, cb) => Repository('data-points').update(facility, cb)

export const DataPointService = {
  add,
  getAll,
  remove,
  update
}

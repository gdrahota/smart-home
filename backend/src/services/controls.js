import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('controls').add(facility, cb)

const getAll = cb => Repository('controls').getAll(cb)

const remove = (id, cb) => Repository('controls').remove(id, cb)

const update = (facility, cb) => Repository('controls').update(facility, cb)

export const ControlService = {
  add,
  getAll,
  remove,
  update
}

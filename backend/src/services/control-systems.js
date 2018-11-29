import { controlSystemTypes } from '../database/schemas/control-system'
import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('control-systems').add(facility, cb)

const getAll = cb => Repository('control-systems').getAll(cb)

const update = (facility, cb) => Repository('control-systems').update(facility, cb)

const getTypes = cb => cb(null, controlSystemTypes)

export const ControlSystemService = {
  add,
  getAll,
  update,
  getTypes
}

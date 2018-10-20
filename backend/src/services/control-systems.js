import Repository from '../database/repository/control-systems'
import { controlSystemTypes } from '../database/schemas/control-system'

const add = (facility, cb) => Repository.add(facility, cb)

const getAll = cb => Repository.getAll(cb)

const update = (facility, cb) => Repository.update(facility, cb)

const getTypes = cb => cb(null, controlSystemTypes)

export const ControlSystemService = {
  add,
  getAll,
  update,
  getTypes
}

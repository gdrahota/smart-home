import { controlSystemTypes } from '../database/schemas/control-system'
import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('control-systems').add(facility, cb)

const getAll = () => Repository('control-systems').getAll()

const update = (facility, cb) => Repository('control-systems').update(facility, cb)

const getTypes = () => controlSystemTypes

export const ControlSystemService = {
  add,
  getAll,
  update,
  getTypes
}

import { controlSystemTypes } from '../database/schemas/control-system'
import Repository from '../repository/any-collection'

const add = item => Repository('control-systems').add(item)
const getAll = () => Repository('control-systems').getAll()
const update = item => Repository('control-systems').update(item)
const remove = item => Repository('control-systems').remove(item)
const getTypes = () => controlSystemTypes

export const ControlSystemService = {
  add,
  getAll,
  update,
  remove,
  getTypes
}

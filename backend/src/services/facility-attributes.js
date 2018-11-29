import Repository from '../repository/any-collection'

const add = (item, cb) => Repository('facility-attributes').add(item, cb)

const getAll = cb => Repository('facility-attributes').getAll(cb)

const remove = (id, cb) => Repository('facility-attributes').remove(id, cb)

const update = (facility, cb) => Repository('facility-attributes').update(facility, cb)

export const FacilityAttributesService = {
  add,
  getAll,
  remove,
  update
}

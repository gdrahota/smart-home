import Repository from '../repository/any-collection'

const add = (item, cb) => Repository('facility-attribute-values').add(item, cb)

const getAll = cb => Repository('facility-attribute-values').getAll(cb)

const remove = (id, cb) => Repository('facility-attribute-values').remove(id, cb)

const update = (facility, cb) => Repository('facility-attribute-values').update(facility, cb)

export const FacilityAttributeValuesService = {
  add,
  getAll,
  remove,
  update
}

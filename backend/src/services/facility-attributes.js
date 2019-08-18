import Repository from '../repository/any-collection'

const add = item => Repository('facility-attributes').add(item)

const getAll = cb => Repository('facility-attributes').getAll(cb)

const findOne = searchObj => Repository('facility-attributes').findOne(searchObj)

const remove = (id, cb) => Repository('facility-attributes').remove(id, cb)

const update = (facility, cb) => Repository('facility-attributes').update(facility, cb)

export const FacilityAttributesService = {
  add,
  getAll,
  findOne,
  remove,
  update
}

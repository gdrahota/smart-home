import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('facilities').add(facility, cb)

const getAll = cb => Repository('facilities').getAll(cb)

const remove = (id, cb) => Repository('facilities').remove(id, cb)

const setInactive = (id, cb) => Repository('facilities').setInactive(id, cb)

const update = (facility, cb) => Repository('facilities').update(facility, cb)

export const FacilityService = {
  add,
  getAll,
  remove,
  setInactive,
  update
}

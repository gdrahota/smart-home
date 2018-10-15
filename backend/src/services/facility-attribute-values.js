import FacilityAttributeValuesRepository from '../database/repository/facility-attribute-values'

const add = (item, cb) => FacilityAttributeValuesRepository.add(item, cb)

const getAll = cb => FacilityAttributeValuesRepository.getAll(cb)

const remove = (id, cb) => FacilityAttributeValuesRepository.remove(id, cb)

const update = (facility, cb) => FacilityAttributeValuesRepository.update(facility, cb)

export const FacilityAttributeValuesService = {
  add,
  getAll,
  remove,
  update
}

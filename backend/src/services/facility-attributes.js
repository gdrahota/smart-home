import FacilityAttributesRepository from '../database/repository/facility-attributes'

const add = (item, cb) => FacilityAttributesRepository.add(item, cb)

const getAll = cb => FacilityAttributesRepository.getAll(cb)

const remove = (id, cb) => FacilityAttributesRepository.remove(id, cb)

const update = (facility, cb) => FacilityAttributesRepository.update(facility, cb)

export const FacilityAttributesService = {
  add,
  getAll,
  remove,
  update
}

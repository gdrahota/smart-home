import FacilitiesRepository from '../database/repository/facilities'

const add = (facility, cb) => FacilitiesRepository.add(facility, cb)

const getAll = cb => FacilitiesRepository.getAll(cb)

const remove = (id, cb) => FacilitiesRepository.remove(id, cb)

const setInactive =(id, cb) => FacilitiesRepository.setInactive(id, cb)

export const FacilityService = {
  add,
  getAll,
  remove,
  setInactive
}

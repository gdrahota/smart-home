import DataPointsRepository from '../database/repository/data-points'

const add = (facility, cb) => DataPointsRepository.add(facility, cb)

const getAll = cb => DataPointsRepository.getAll(cb)

const remove = (id, cb) => DataPointsRepository.remove(id, cb)

const update = (facility, cb) => DataPointsRepository.update(facility, cb)

export const DataPointService = {
  add,
  getAll,
  remove,
  update
}

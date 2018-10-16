import ControlDataPointsRepository from '../database/repository/control-data-points'

const getAll = cb => ControlDataPointsRepository.getAll(cb)

const remove = (id, cb) => ControlDataPointsRepository.remove(id, cb)

const upsert = (item, cb) => ControlDataPointsRepository.upsert(item, cb)

export const ControlDataPointService = {
  getAll,
  remove,
  upsert
}

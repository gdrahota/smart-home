import Repository from '../repository/any-collection'

const getAll = cb => Repository('control-data-points').getAll(cb)

const remove = (id, cb) => Repository('control-data-points').remove(id, cb)
const removeControlDataPoint = (control, endPoint, cb) => Repository('control-data-points').removeControlDataPoint(control, endPoint, cb)

const upsert = (item, cb) => Repository('control-data-points').upsert(item, cb)

export const ControlDataPointService = {
  getAll,
  remove,
  upsert,
  removeControlDataPoint
}

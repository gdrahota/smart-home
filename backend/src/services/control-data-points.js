import Repository from '../repository/any-collection'

const collection = 'control-data-points'

const getAll = () => Repository(collection).getAll()
const findOne = searchObj => Repository(collection).findOne(searchObj)
const remove = id => Repository(collection).remove(id)
const removeControlDataPoint = (control, endPoint) => Repository(collection).removeControlDataPoint(control, endPoint)
const upsert = item => Repository(collection).upsert(item, { control: item.control, endPoint: item.endPoint })

export const ControlDataPointService = {
  getAll,
  findOne,
  remove,
  upsert,
  removeControlDataPoint
}

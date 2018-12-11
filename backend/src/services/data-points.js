import Repository from '../repository/any-collection'

const add = (facility, cb) => Repository('data-points').add(facility, cb)

const getAll = cb => Repository('data-points').getAll(cb)

const find = (searchObj, cb) => Repository('data-points').find(searchObj, cb)

const findOne = (searchObj, cb) => Repository('data-points').findOne(searchObj).lean().exec((err, data) => {
  console.log('#', err, data)
  cb(err, data)
})

const remove = (id, cb) => Repository('data-points').remove(id, cb)

const update = (id, cb) => Repository('data-points').update(id, cb)

export const DataPointService = {
  add,
  getAll,
  find,
  findOne,
  remove,
  update
}

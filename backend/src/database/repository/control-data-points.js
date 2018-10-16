import mongoose from 'mongoose'

const getAll = cb =>
  mongoose
    .model('control-data-points')
    .find()
    .exec((err, items) => cb(err, items))

const remove = (query, cb) =>
  mongoose
    .model('control-data-points')
    .remove(query)
    .exec(err => cb(err, query))

const upsert = (item, cb) => {
  const QUERY = {
    control: item.control,
    endPoint: item.endPoint
  }

  const OPTIONS = {
    'new': true,
    upsert: true
  }

  mongoose
    .model('control-data-points')
    .findOneAndUpdate(QUERY, item, OPTIONS)
    .exec((err, response) => cb(err, response))
}

export default {
  getAll,
  remove,
  upsert
}

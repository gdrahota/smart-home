import mongoose from 'mongoose'

const getAll = cb =>
  mongoose
    .model('facilities')
    .find()
    .exec((err, items) => cb(err, items))

const add = (item, cb) =>
  mongoose
    .model('facilities')(item)
    .save((err, item) => cb(err, item))

const remove = (id, cb) =>
  mongoose
    .model('facilities')
    .remove({ leftAt: { $lte: new Date(date) } })
    .exec(err => cb(err, id))

const setInactive = (id, cb) =>
  mongoose
    .model('facilities')
    .update({ _id: id }, { $set: { state: 'inactive' } })
    .exec(err => cb(err, id))

export default {
  getAll,
  add,
  remove,
  setInactive
}

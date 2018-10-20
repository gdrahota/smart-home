import mongoose from 'mongoose'

const getAll = cb =>
  mongoose
    .model('control-systems')
    .find()
    .exec((err, items) => cb(err, items))

const add = (item, cb) =>
  mongoose
    .model('control-systems')(item)
    .save((err, item) => cb(err, item))

const remove = (id, cb) =>
  mongoose
    .model('control-systems')
    .remove({ _id: id })
    .exec(err => cb(err, id))

const update = (item, cb) =>
  mongoose
    .model('control-systems')
    .findOneAndUpdate({ _id: item._id }, item, { new: true })
    .exec((err, response) => cb(err, response))

export default {
  getAll,
  add,
  remove,
  update
}

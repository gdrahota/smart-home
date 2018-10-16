import mongoose from 'mongoose'

const getAll = cb =>
  mongoose
    .model('data-points')
    .find()
    .exec((err, items) => cb(err, items))

const add = (item, cb) =>
  mongoose
    .model('data-points')(item)
    .save((err, item) => cb(err, item))

const remove = (id, cb) =>
  mongoose
    .model('data-points')
    .remove({ _id: id })
    .exec(err => cb(err, id))

const update = (item, cb) =>
  mongoose
    .model('data-points')
    .findOneAndUpdate({ _id: item._id }, item, { new: true })
    .exec((err, response) => cb(err, response))

export default {
  getAll,
  add,
  remove,
  update
}

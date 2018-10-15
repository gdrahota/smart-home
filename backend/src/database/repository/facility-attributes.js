import mongoose from 'mongoose'

const getAll = cb =>
  mongoose
    .model('facility-attributes')
    .find()
    .exec((err, items) => cb(err, items))

const add = (item, cb) =>
  mongoose
    .model('facility-attributes')(item)
    .save((err, item) => cb(err, item))

const remove = (id, cb) =>
  mongoose
    .model('facility-attributes')
    .remove({ _id: id })
    .exec(err => cb(err, id))

const update = (item, cb) =>
  mongoose
    .model('facility-attributes')
    .findOneAndUpdate({ _id: item._id }, item, { new: true })
    .exec((err, response) => cb(err, response))

export default {
  getAll,
  add,
  remove,
  update
}

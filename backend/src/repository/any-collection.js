import mongoose from 'mongoose'

const getAll = collection => cb =>
  mongoose
    .model(collection)
    .find()
    .exec((err, items) => cb(err, items))

const add = collection => (item, cb) =>
  mongoose
    .model(collection)(item)
    .save(err => cb(err))

const remove = collection => (id, cb) =>
  mongoose
    .model(collection)
    .remove({ _id: id })
    .exec(err => cb(err))

const update = collection => (item, cb) => {
  mongoose
    .model(collection)
    .update({ _id: item._id }, item)
    .exec(err => cb(err))
}

const upsert = collection => (item, cb) => {
  const QUERY = {
    control: item.control,
    endPoint: item.endPoint
  }

  const OPTIONS = {
    'new': true,
    upsert: true
  }

  mongoose
    .model(collection)
    .findOneAndUpdate(QUERY, item, OPTIONS)
    .exec(err => cb(err))
}

const find = collection => (searchObj, cb) => {
  mongoose
    .model(collection)
    .find(searchObj)
    .exec((err, items) => cb(err, items))
}

export default collection => {
  return {
    getAll: cb => getAll(collection)(cb),
    upsert: (item, cb) => upsert(collection)(item, cb),
    add: (item, cb) => add(collection)(item, cb),
    remove: (id, cb) => remove(collection)(id, cb),
    update: (item, cb) => update(collection)(item, cb),
    find: (searchObj, cb) => find(collection)(searchObj, cb)
  }
}

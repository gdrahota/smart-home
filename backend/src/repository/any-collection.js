import mongoose from 'mongoose'

const getAll = collection => cb =>
  mongoose
    .model(collection)
    .find()
    .exec(cb)

const add = collection => (item, cb) =>
  mongoose
    .model(collection)(item)
    .save(cb)

const remove = collection => (id, cb) =>
  mongoose
    .model(collection)
    .remove({ _id: id })
    .exec(cb)

const update = collection => (item, cb) => {
  mongoose
    .model(collection)
    .update({ _id: item._id }, item)
    .exec(cb)
}

const upsertCommand = collection => (item, cb) => {
  const query = { targetAddress: item.targetAddress }
  const options = { upsert: true }

  mongoose
    .model(collection)
    .findOneAndUpdate(query, item, options, cb)
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
    .findOneAndUpdate(QUERY, item, OPTIONS, cb)
}

const find = collection => (searchObj, cb) => {
  mongoose
    .model(collection)
    .find(searchObj)
    .exec(cb)
}

const findOne = collection => (searchObj, cb) => {
  mongoose
    .model(collection)
    .findOne(searchObj, cb)
}

const removeControlDataPoint = collection => (control, endPoint, cb) =>
  mongoose
    .model(collection)
    .remove({ control, endPoint })
    .exec(cb)

export default collection => {
  return {
    getAll: cb => getAll(collection)(cb),
    upsert: (item, cb) => upsert(collection)(item, cb),
    upsertCommand: (item, cb) => upsertCommand(collection)(item, cb),
    add: (item, cb) => add(collection)(item, cb),
    remove: (id, cb) => remove(collection)(id, cb),
    update: (item, cb) => update(collection)(item, cb),
    find: (searchObj, cb) => find(collection)(searchObj, cb),
    findOne: (searchObj, cb) => findOne(collection)(searchObj, cb),
    removeControlDataPoint: (control, endPoint, cb) => removeControlDataPoint(collection)(control, endPoint, cb)
  }
}

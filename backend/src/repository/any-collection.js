import mongoose from 'mongoose'

const getAll = collection => () =>
  mongoose
    .model(collection)
    .find()
    .lean()

const add = collection => item =>
  mongoose
    .model(collection)(item)
    .save()

const remove = collection => _id =>
  mongoose
    .model(collection)
    .remove({ _id })

const update = collection => item =>
  mongoose
    .model(collection)
    .update({ _id: item._id }, item)

const upsertCommand = collection => item => {
  const query = { targetAddress: item.targetAddress }
  const options = { upsert: true }

  return mongoose
    .model(collection)
    .findOneAndUpdate(query, item, options)
}

const upsert = collection => (item, query) => {
  const OPTIONS = {
    'new': true,
    upsert: true,
    setDefaultsOnInsert: true,
  }

  return mongoose
    .model(collection)
    .findOneAndUpdate(query, item, OPTIONS)
}

const find = collection => searchObj =>
  mongoose
    .model(collection)
    .find(searchObj)
    .lean()

// do NOT add a trailing .lean() here !
const findOne = collection => searchObj =>
  mongoose
    .model(collection)
    .findOne(searchObj)

const removeControlDataPoint = collection => (control, endPoint) =>
  mongoose
    .model(collection)
    .remove({ control, endPoint })

export default collection => {
  return {
    getAll: () => getAll(collection)(),
    upsert: (item, query) => upsert(collection)(item, query),
    upsertCommand: item => upsertCommand(collection)(item),
    add: item => add(collection)(item),
    remove: id => remove(collection)(id),
    update: item => update(collection)(item),
    find: searchObj => find(collection)(searchObj),
    findOne: searchObj => findOne(collection)(searchObj),
    removeControlDataPoint: (control, endPoint) => removeControlDataPoint(collection)(control, endPoint)
  }
}

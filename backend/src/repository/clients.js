import mongoose from 'mongoose'

const add = (clientId, user, socketId, expires) => {
  const client = { clientId, user, socketId, expires }
  const collection = mongoose.model('client')
  return new collection(client).save()
}

const relogin = (socketId, clientId, expires) => {
  const query = { clientId: clientId }
  const update = { $addToSet: { socketId: socketId }, $set: { expires: expires } }
  const options = { upsert: false, new: true }

  return mongoose.model('client').findOneAndUpdate(query, update, options)
}

const logOut = clientId => {
  const query = { clientId: clientId }
  return mongoose.model('client').deleteOne(query)
}

const logOutExpired = actualDate => {
  const query = { expires: { $lte: new Date(actualDate) } }
  return mongoose.model('client').remove(query)
}

const updateExpirationDate = (socketId, expires) => {
  const query = { socketId: socketId }
  const update = { $set: { expires: expires } }
  return mongoose.model('client').findOneAndUpdate(query, update)
}

export default {
  add,
  relogin,
  logOut,
  updateExpirationDate,
  logOutExpired
}

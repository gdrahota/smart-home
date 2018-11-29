import mongoose from 'mongoose'

const add = (clientId, user, socketId, expires) => {
  const client = {
    clientId, user, socketId, expires
  }

  return new Promise((resolve, reject) => {
    const Client = mongoose.model('client')
    new Client(client)
      .save()
      .then(
        storedClient => resolve(storedClient),
        err => reject(err)
      )
      .catch(err => reject(err))
  })
}

const relogin = (socketId, clientId, expires, cb) => {
  const query = { clientId: clientId }
  const update = {
    $addToSet: {
      socketId: socketId
    },
    $set: {
      expires: expires
    }
  }
  const options = { upsert: false, new: true }

  mongoose.model('client')
    .findOneAndUpdate(query, update, options)
    .lean()
    .exec((err, client) => cb(err, client))
}

const logOut = (clientId, cb) => {
  const query = { clientId: clientId }

  mongoose.model('client')
    .deleteOne(query)
    .exec((err, client) => cb(err, client))
}

const logOutExpired = (actualDate, cb) => {
  const query = {
    expires: {
      $lte: new Date(actualDate)
    }
  }

  mongoose.model('client')
    .remove(query)
    .exec((err, payload) => cb(err, payload))
}

const updateExpirationDate = (socketId, expires) =>
  new Promise((resolve, reject) => {
    const query = { socketId: socketId }
    const update = {
      $set: {
        expires: expires
      }
    }

    mongoose.model('client')
      .findOneAndUpdate(query, update)
      .then(
        client => resolve(client),
        err => reject(err)
      )
  })

export default {
  add,
  relogin,
  logOut,
  updateExpirationDate,
  logOutExpired
}

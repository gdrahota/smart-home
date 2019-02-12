import ClientRepository from '../repository/clients'
import { UserService } from '../services/users'

const login = async ({ username, password }, socketId) => {
  try {
    const query = {
      accountName: username,
      state: 'active',
    }
    const user = await UserService.findOne(query)
    if (!user) {
      throw 'UNKNOWN_USER_OR_WRONG_PASSWORD'
    }

    const isThePasswordCorrect = await user.verifyPassword(password)
    if (isThePasswordCorrect === false) {
      throw 'UNKNOWN_USER_OR_WRONG_PASSWORD'
    }

    // set new lastLoginAt
    user.lastLoginAt = new Date()
    await UserService.update(user)

    const uuid = require('uuid/v4')

    const expires = new Date()
    expires.setHours(expires.getHours() + 4)

    const client = await ClientRepository.add(uuid(), user._id, socketId, expires)
    return { client, user }
  }
  catch (err) {
    throw 'UNKNOWN_USER_OR_WRONG_PASSWORD'
  }
}

const reLogin = async (socketId, clientId) => {
  const expires = new Date()
  expires.setHours(expires.getHours() + 4)

  const client = await ClientRepository.relogin(socketId, clientId, expires)

  if (!client) {
    throw 'UNKNOWN_USER_CLIENT'
  }

  const query = {
    _id: client.userId,
    state: 'active',
  }
  const user = await UserService.findOne(query).lean()

  if (!user) {
    throw 'UNKNOWN_USER'
  }

  // set new lastLoginAt
  user.lastLoginAt = new Date()
  await UserService.update(user)

  return { client, user }
}

const logOut = async clientId => ClientRepository.logOut(clientId)

const logOutExpired = (actualDate, cb) => ClientRepository.logOutExpired(actualDate, err => cb(err))

const updateExpirationDate = socketId => {
  const expires = new Date()
  expires.setHours(expires.getHours() + 4)
  return ClientRepository.updateExpirationDate(socketId, expires)
}

export default {
  login,
  logOut,
  logOutExpired,
  reLogin,
  updateExpirationDate
}

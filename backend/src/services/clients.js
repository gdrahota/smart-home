import ClientRepository from '../repository/clients'
import config from '../../config/server'
import { UserService } from '../services/users'

const AppRolesToLdapRoles = config.appRolesToLdapRoles

const registeredUsers = [
  {
    accountName: 'robert',
    mail: 'robert@taster.de',
    groups: []
  }
]

export const mapLdapGroupsToAppRoles = (appRolesToLdapRoles, userGroups) => {
  const userRights = {}

  Object.keys(appRolesToLdapRoles).forEach(feature => {
    userRights[feature] = {}

    Object
      .keys(appRolesToLdapRoles[feature])
      .forEach(role => {
        userRights[feature][role] = appRolesToLdapRoles[feature][role].some(needed => userGroups.some(userGroup => needed === userGroup))
      })
  })

  return userRights
}

const login = async ({ username, password }, socketId) => {
  try {
    const user = await UserService.findOne({ accountName: username })
    if (!user) {
      throw 'UNKNOWN_USER_OR_WRONG_PASSWORD'
    }

    const isThePasswordCorrect = await user.verifyPassword(password)
    if (isThePasswordCorrect === false) {
      throw 'UNKNOWN_USER_OR_WRONG_PASSWORD'
    }

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

  const user = await UserService.findOne({ _id: client.userId }).lean()
  console.log('re-login', { client, user })

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

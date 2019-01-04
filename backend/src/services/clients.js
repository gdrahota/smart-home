import ClientRepository from '../repository/clients'
import config from '../../config/server'

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

const login = async (credentials, socketId) => {
  try {
    const { username, password } = credentials
    const uuid = require('uuid/v4')

    // local auth
    const user = registeredUsers.find(regUser => regUser.accountName === username)

    if (user) {
      const expires = new Date()
      expires.setHours(expires.getHours() + 4)

      console.log(uuid(), user, socketId, expires)
      return await ClientRepository.add(uuid(), user, socketId, expires)
    }
  }
  catch (err) {
    console.log(err)

    return 'UNKNOWN_USER_OR_WRONG_PASSWORD'
  }
}

const reLogin = async (socketId, clientId) => {
  const expires = new Date()
  expires.setHours(expires.getHours() + 4)

  return ClientRepository.relogin(socketId, clientId, expires)
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

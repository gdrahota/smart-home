import ActiveDirectory from 'activedirectory'
import config from '../../config/server'
import async from 'async'

let ad = {}

let userObj = {
  accountName: '',
  mail: '',
  groups: []
}

const userAuthenticate = (userName, password) =>
  new Promise((resolve, reject) => {
    if (userName.indexOf('@') === -1) {
      // No Email Address provided
      userName += '@' + config.ldap.defaultDomain
    }

    ad.authenticate(userName, password, (err, auth) => {
      if (err) {
        let errStr = 'unknown error'
        try {
          errStr = JSON.stringify(err)
        } catch (e) {
        }

        console.log('LDAP Error', errStr)

        if (errStr.indexOf('data 52e') !== -1 || errStr.indexOf('data 775') !== -1) {
          console.log('Invalid Credentials')
        }
        reject()
      }

      if (auth) {
        console.log('Authentication successful!')
        resolve(userName)
      } else {
        console.log('Authentication failed!')
        reject()
      }
    })
  })

const userGetData = userName =>
  new Promise((resolve, reject) => {

    ad.findUser(userName, true, (err, user) => {

      if (err) {
        console.log('Error getting user data')
        reject(err)
      }

      if (!user) {
        console.log('User not found.')
        reject()
      } else {
        userObj.accountName = user.sAMAccountName
        userObj.mail = user.mail
        resolve(user)
      }
    })
  })

const userAuthorize = user =>
  new Promise((resolve, reject) => {
    let groups = []
    if (config.ldap.userMustBeInGroup.indexOf(',') !== -1) {
      groups = config.ldap.userMustBeInGroup.split(',')
    }

    let isGroupMember = []

    async.eachSeries(groups,
      (group, callback) => ad.isUserMemberOf(
        user.sAMAccountName,
        group,
        (err, isMember) => {

          if (err) {
            callback(err)
          } else {
            isGroupMember.push(isMember)
            callback()
          }
        }),
      err => {
        if (err) {
          reject(err)
        }
        if (isGroupMember.some(elem => elem === true)) {
          resolve(user)
        } else {
          console.log('User is not part of any of the groups')
          reject()
        }
      })
  })

const userGetGroupMembership = user =>
  new Promise((resolve, reject) => {
    ad.getGroupMembershipForUser(
      user.sAMAccountName,
      (err, groups) => {
        if (err) {
          console.log('Could not get Users group membership')
          reject(err)
        }

        for (let group of groups) {
          userObj.groups.push(group.cn)
        }
        resolve()
      })
  })

const authenticate = (userName, password) =>
  new Promise((resolve, reject) => {
    ad = new ActiveDirectory(config.ldap.admin)

    userAuthenticate(userName, password)
      .then(userName => userGetData(userName))
      .then(user => userAuthorize(user))
      .then(user => userGetGroupMembership(user))
      .then(() => resolve(userObj))
      .catch(err => {
        console.log('Error during authentication process', err)
        reject(err)
      })
  })

export default {
  authenticate
}

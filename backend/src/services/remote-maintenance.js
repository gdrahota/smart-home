import RemoteMaintenance from '../database/repository/remote-maintenance'
import RemoteMaintenanceScript from '../database/repository/remote-maintenance-script'
import config from '../../config/server'

const addClearance = clearance =>
  new Promise((resolve, reject) => {
    RemoteMaintenance
      .addClearance(clearance)
      .then(
        clearance => resolve(clearance),
        err => reject(err)
      )
  })

const updateClearance = (clearance, cb) =>
  RemoteMaintenance
    .updateClearance(clearance)
    .then(
      clearance => cb(null, clearance),
      err => cb(err)
    )

const revokeClearance = (clearance, cb) =>
  revokeAccess(clearance)
    .then(
      () => {
        RemoteMaintenance
          .revokeClearance(clearance._id)
          .then(
            () => cb(null, clearance._id),
            () => cb(clearance)
          )
      },
      () => reject(clearance)
    )

const getClearances = cb =>
  RemoteMaintenance
    .getClearances()
    .then(
      results => cb(null, results),
      err => cb(err)
    )

const getReasons = cb =>
  RemoteMaintenance
    .getReasons()
    .then(
      results => cb(null, results),
      err => cb(err)
    )

const getEndpoints = cb =>
  RemoteMaintenance
    .getEndpoint()
    .then(
      results => cb(null, results),
      err => cb(err)
    )

const execute = script =>
  new Promise((resolve, reject) => {
    const exec = require('child_process').exec
    exec(script, (err, stdout, stderr) => {
      if (stderr) {
        reject()
      } else {
        resolve()
      }
    })
  })

const grantAccess = (clearance, cb) =>
  RemoteMaintenanceScript
    .getScriptByName('grantAccess')
    .then(
      script => {
        if (script) {
          const reGroupName = new RegExp(/\[groupName\]/, 'g')
          const reUserName = new RegExp(/\[userName\]/, 'g')
          const reServerName = new RegExp(/\[serverName\]/, 'g')

          const scriptContent = script.script
            .replace(reGroupName, clearance.granted.to.group, 'g')
            .replace(reUserName, clearance.granted.to.user, 'g')
            .replace(reServerName, config.radiusServer.serverName, 'g')

          execute(scriptContent).then(
            response => cb(null, response),
            err => cb(err)
          )

        } else {
          cb('error')
        }
      },
      err => cb(err)
    )

const revokeAccess = clearance =>
  new Promise((resolve, reject) => {
    RemoteMaintenanceScript
      .getScriptByName('denyAccess')
      .then(
        script => {
          if (script) {
            const reGroupName = new RegExp(/\[groupName\]/, 'g')
            const reUserName = new RegExp(/\[userName\]/, 'g')
            const reServerName = new RegExp(/\[serverName\]/, 'g')

            const scriptContent = script.script
              .replace(reGroupName, clearance.granted.to.group, 'g')
              .replace(reUserName, clearance.granted.to.user, 'g')
              .replace(reServerName, config.radiusServer.serverName, 'g')

            execute(scriptContent)
              .then(
                response => resolve(response),
                err => reject(err)
              )

          } else {
            reject()
          }
        },
        err => reject(err)
      )
  })

export default {
  addClearance,
  updateClearance,
  revokeClearance,
  getClearances,
  getEndpoints,
  getReasons,
  grantAccess
}

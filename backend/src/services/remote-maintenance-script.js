import RemoteMaintenanceScript from '../database/repository/remote-maintenance-script'

const update = (clearance, cb) =>
  RemoteMaintenanceScript
    .updateScript(clearance)
    .then(
      clearance => cb(null, clearance),
      err => cb(err)
    )

const getAll = cb =>
  RemoteMaintenanceScript
    .getAllScripts()
    .then(
      results => cb(null, results),
      err => cb(err)
    )

export default {
  getAll,
  update
}

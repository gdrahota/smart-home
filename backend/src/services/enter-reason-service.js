import EnterReasonRepository from '../database/repository/enter-reason-repository'

const getEnterReasons = cb =>
  EnterReasonRepository
    .getEnterReasons()
    .then(
      enterReasons => cb(null, enterReasons),
      err => cb(err)
    )

export default {
  getEnterReasons
}

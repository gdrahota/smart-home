import ControlsRepository from '../database/repository/controls'

const add = (facility, cb) => ControlsRepository.add(facility, cb)

const getAll = cb => ControlsRepository.getAll(cb)

const remove = (id, cb) => ControlsRepository.remove(id, cb)

const update = (facility, cb) => ControlsRepository.update(facility, cb)

export const ControlService = {
  add,
  getAll,
  remove,
  update
}

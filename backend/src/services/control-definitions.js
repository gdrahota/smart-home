import Repository from '../repository/any-collection'

const getAll = () => Repository('control-definitions').getAll()

export const ControlDefinitionService = {
  getAll,
}

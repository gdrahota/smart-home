import Repository from '../repository/any-collection'

const collection = 'users'

const add = item => Repository(collection).add(item)
const getAll = () => Repository(collection).getAll()
const update = item => Repository(collection).update(item)

export const UserService = {
  add,
  getAll,
  update
}

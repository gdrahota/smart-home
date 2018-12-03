import Repository from '../repository/any-collection'

const collection = 'command-queue'

const getAll = cb => Repository(collection).getAll(cb)

const remove = (id, cb) => Repository(collection).remove(id, cb)

const upsert = (item, cb) => {
  const command = {
    targetAddress: item.targetAddress,
    dataType: '1',
    payload: item.value
  }

  const searchCommand = { targetAddress: item.targetAddress }

  Repository(collection).find(searchCommand, (err, items) => {
    if (err) {
      cb(err)
    } else {
      if (items.length === 0) {
        Repository(collection).add(command, err => { cb(err) })
      } else {
        command._id = items[0]._id
        Repository(collection).update(command, err => { cb(err) })
      }
    }
  })
}

const find = (searchObj, cb) => Repository(collection).find(searchObj, cb)

export const CommandQueueService = {
  getAll,
  remove,
  upsert,
  find
}

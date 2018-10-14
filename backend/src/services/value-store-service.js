import ValueStoreRepository from '../database/repository/value-store-repository'

const createEntry = (name, value) =>
  new Promise((resolve, reject) => {
    ValueStoreRepository
      .createEntry(name, value)
      .then(
        entry => resolve(entry),
        err => reject(err)
      )
  })

const getEntry = (name) =>
  new Promise((resolve, reject) => {
    ValueStoreRepository
      .getEntry(name)
      .then(
        entry => resolve(entry),
        err => reject(err)
      )
  })

const updateEntry = (name, value) =>
  new Promise((resolve, reject) => {
    ValueStoreRepository
      .updateEntry(name, value)
      .then(
        entry => resolve(entry),
        err => reject(err)
      )
  })

export default {
  createEntry,
  getEntry,
  updateEntry
}

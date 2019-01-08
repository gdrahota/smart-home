import Repository from '../repository/any-collection'
import { decode } from 'knx-datapoints'

const collectionName = 'knx-events'

const add = item => Repository(collectionName).add(item)

const getAll = () => {
  return new Promise((resolve, reject) => {
    Repository(collectionName)
      .getAll()
      .then(
        events => {
          const response = events.map(
            e => {
              e.possibleValues = []
              try {
                const bufferValue = new Buffer(e.rawValue.buffer, 'base64')
                switch (e.rawValue.length()) {
                  case 1:
                    e.possibleValues.push({ dpt: '5.001', value: decode('5.001', bufferValue), unit: '%' })
                    break
                  case 2:
                    e.possibleValues.push({ dpt: '9.001', value: decode('9.001', bufferValue), unit: '°C' })
                    break
                  default:
                }
              }
              catch (err) {
                console.log('ERROR', err)
              }
              return e
            },
            err => {
              reject(err)
            }
          )
          resolve(response)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

const find = searchObj => Repository(collectionName).find(searchObj)

const findOne = searchObj => Repository(collectionName).findOne(searchObj)

export const KnxEventService = {
  add,
  getAll,
  find,
  findOne,
}

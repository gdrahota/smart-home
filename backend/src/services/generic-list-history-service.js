import GenericListHistoryRepository from '../database/repository/generic-list-history-repository'
import GenericListRepository from '../database/repository/generic-list-repository'
import async from 'async'

const deleteGenericListHistoryEntriesOlderThanDays = () =>
  new Promise((resolve, reject) => {

    // iterate over all existing lists (definitions)
    GenericListRepository
      .getAllLists()
      .then(
        lists => {
          async.eachSeries(lists, (list, callback) => {
            const date = new Date(Date.now())
            date.setDate(date.getDate() - parseInt(list.daysBeforeRemoveFromHistory))

            GenericListHistoryRepository.deleteDocumentsOlderThanDate(list._id, date)
              .then(
                () => {
                  callback()
                },
                err => {
                  // error deleting document
                  callback(err)
                }
              )
          }, err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })

        },
        err => {
          reject(err)
        }
      )

  })

export default {
  deleteGenericListHistoryEntriesOlderThanDays
}

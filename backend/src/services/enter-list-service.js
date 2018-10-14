import async from 'async'
import EnterListRepository from '../database/repository/enter-list-repository'
import EnterListHistoryRepository from '../database/repository/enter-list-history-repository'

const getEnterListEntries = cb =>
  EnterListRepository.getAllEntries()
    .then(
      list => cb(null, list),
      err => cb(err)
    )

// gets called by user action OR job
const addEnterListEntry = enterListEntry =>
  new Promise((resolve, reject) => {
    EnterListRepository
      .addEnterListEntry(enterListEntry)
      .then(
        data => resolve(data),
        err => reject(err)
      )
  })

// gets called by user action
const updateEnterListEntry = (changesInEnterListEntry, cb) => {
  if (changesInEnterListEntry.status === 'verlassen') {
    changesInEnterListEntry['leftAt'] = Date.now()
  }

  EnterListRepository
    .updateEnterListEntry(changesInEnterListEntry)
    .then(
      updatedEntry => cb(null, updatedEntry),
      err => cb(err)
    )
}

const archiveEnterListEntries = () =>
  new Promise((resolve, reject) => {
    const date = Date.now().toDate()
    date.setHours(date.getHours() - 24) // in hours

    EnterListRepository.getEnterListEntriesOlderThanDate(date)
      .then(
        entries => {
          async.eachSeries(entries, (entry, callback) => {
            let savedId = entry._id
            entry['facilityId'] = entry.facility.facilityId
            delete entry._id
            delete entry.__v
            delete entry.person
            delete entry.facility

            EnterListHistoryRepository.addEnterListHistoryEntry(entry)
              .then(newHistoryEntry => {
                  if (newHistoryEntry !== null) {
                    EnterListRepository.removeEnterListEntryById(savedId)
                      .then(
                        () => callback(),
                        () => callback()
                      )
                  } else {
                    callback()
                  }
                },
                err => reject(err)
              )
          }, err => {
            if (err) {
              reject(err)
            }
            // all done
            resolve()
          })
        },
        err => reject(err)
      )
  })

export default {
  getEnterListEntries,
  addEnterListEntry,
  updateEnterListEntry,
  archiveEnterListEntries
}

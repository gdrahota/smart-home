import GenericListRepository from '../database/repository/generic-list-repository'
import GenericListHistoryRepository from '../database/repository/generic-list-history-repository'
import async from 'async'
import { io } from '../infrastructure/websocket'

const getList = listId =>
  new Promise((resolve, reject) => {
    GenericListRepository.getList(listId)
      .then(
        list => {

          GenericListRepository.getAllDocumentsInList(listId)
            .then(
              documents => {

                let listWithData = list.toObject()
                listWithData['items'] = documents
                resolve(listWithData)

              },
              err => reject(err)
            )

        },
        err => reject(err)
      )
  })

const getAllLists = cb =>
  GenericListRepository.getAllLists()
    .then(
      lists => {
        const listsWithDocuments = []

        async.eachSeries(lists, (list, callback) => {
            GenericListRepository.getAllDocumentsInList(list._id)
              .then(
                documents => {
                  const listWithDocuments = list.toObject()
                  listWithDocuments['items'] = documents
                  listsWithDocuments.push(listWithDocuments)
                  callback()
                },
                err => cb(err)
              )

          },
          err => {
            err ? cb(err) : cb(null, listsWithDocuments)
          })
      },
      err => cb(err)
    )

const addList = (list, cb) =>
  GenericListRepository.addList(list)
    .then(
      newList => cb(null, newList),
      err => cb(err)
    )

const updateList = (list, cb) =>
  GenericListRepository.updateList(list)
    .then(
      updatedList => {
        GenericListRepository.getAllDocumentsInList(updatedList._id)
          .then(
            documents => {
              let listWithData = updatedList.toObject()
              listWithData['items'] = documents
              cb(null, listWithData)
            },
            err => cb(err)
          )
      },
      err => cb(err)
    )

const deleteList = (listId, cb) =>
  GenericListRepository.deleteList(listId)
    .then(() => GenericListRepository.dropDocumentsCollection(listId))
    .then(() => GenericListHistoryRepository.dropDocumentsCollection(listId))
    .then(() => cb(null, listId))
    .catch(err => cb(err))

const addDocument = (listId, document, cb) =>
  GenericListRepository.addDocument(listId, document)
    .then(
      newDocument => cb(null, newDocument),
      err => cb(err)
    )

const deleteDocument = (listId, documentId, cb) =>
  GenericListRepository.deleteDocument(listId, documentId)
    .then(
      deletedDocument => cb(null, deletedDocument),
      err => cb(err)
    )

const updateDocument = (listId, document, cb) =>
  GenericListRepository.updateDocument(listId, document)
    .then(
      updatedDocument => cb(updatedDocument),
      err => cb(err)
    )

const archiveDeletedDocuments = () =>
  new Promise((resolve, reject) => {
    GenericListRepository.getAllLists()
      .then(
        lists => {

          async.eachSeries(lists, (list, callback) => {

            let date = new Date(Date.now())
            date.setMinutes(date.getMinutes() - list.minutesBeforeMoveToHistory)

            GenericListRepository.getDocumentsOlderThanDate(list._id, date)
              .then(
                deletedDocuments => {

                  // move documents to history
                  async.eachSeries(deletedDocuments, (deletedDocument, callback2) => {

                    let deletedDocumentId = deletedDocument._id

                    delete deletedDocument._id
                    delete deletedDocument.__v

                    GenericListHistoryRepository.addDocument(list._id, deletedDocument)
                      .then(
                        () => {

                          GenericListRepository.removeDeletedDocument(list._id, deletedDocumentId)
                            .then(
                              () => {
                                // emit to all connected clients
                                const payload = {
                                  listId: list._id,
                                  documentId: deletedDocumentId
                                }
                                io.emit('delete_generic_list_document', payload)
                                callback2()
                              },
                              err => {
                                // error deleting document
                                console.log('error deleting document', err)
                                callback2()
                              }
                            )

                        },
                        err => {
                          // error saving document to history-collection
                          console.log(err)
                        }
                      )

                  }, err => {
                    // error in deletedDocuments iteration, continue anyway
                    if (err) {
                      callback()
                    }
                    callback()
                  })

                },
                // error getting deleted documents
                err => callback(err)
              )

          }, err => {
            // error in list iteration
            if (err) {
              reject(err)
            }
            resolve()
          })

        },
        err => reject(err)
      )
  })

export default {
  getList,
  getAllLists,
  addList,
  updateList,
  deleteList,
  addDocument,
  deleteDocument,
  updateDocument,
  archiveDeletedDocuments
}

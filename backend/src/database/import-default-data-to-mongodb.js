import mongoose from 'mongoose'

export const ensureDefaultDocs = (collectionName, jsonToImport) => {
  return new Promise((resolve, reject) => {
    const model = mongoose.model(collectionName)
    if (jsonToImport) {
      model
        .countDocuments()
        .then(
          numOfDocs => {
            if (numOfDocs === 0) {
              async.eachSeries(
                jsonToImport,
                (doc, cb1) => new model(doc).save(err => cb1(err)),
                err => err ? reject(err) : resolve('==>> default data for "' + collectionName + '" successfully imported')
              )
            } else {
              resolve('==> default data for "' + collectionName + '" already imported')
            }
          },
          err => reject(err)
        )
    } else {
      reject('==> no import file found for ' + collectionName)
    }
  })
}

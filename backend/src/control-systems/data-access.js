import mongoose from 'mongoose'

export const getControlSystemConfig = cb =>
  mongoose
    .model('control-systems')
    .findOne()
    .exec(cb)

export const getCommand = (_id, cb) =>
  mongoose
    .model('command-queue')
    .findOne({ _id })
    .exec((err, command) => {
      if (err) {
        cb(err)
      } else if (!command) {
        cb('NO_DATA_POINT_FOUND')
      } else {
        cb(null, command)
      }
    })

export const getDataPoint = (address, cb) =>
  mongoose
    .model('data-points')
    .findOne({ address })
    .exec((err, dataPoint) => {
      if (err) {
        cb(err)
      } else if (!dataPoint) {
        cb('NO_DATA_POINT_FOUND')
      } else {
        cb(null, dataPoint)
      }
    })

export const removeCommand = (_id, cb) => mongoose.model('command-queue').remove({ _id }, cb)

export const setDataPointValue = (dataPoint, value, cb) => {
  mongoose
    .model('data-points')
    .update({ _id: dataPoint._id }, { $set: { value } }, cb)
}

import mongoose from 'mongoose'

export const getControlSystemConfig = controlSystemId => mongoose.model('control-systems').findOne({ _id: controlSystemId })
export const getEndPoints = controlSystem => mongoose.model('data-points').find({ controlSystem })
export const getNextCommand = () => mongoose.model('command-queue').findOne()
export const removeCommand = _id => mongoose.model('command-queue').remove({ _id })
export const addCommand = command => {
  const model = mongoose.model('command-queue')
  new model(command).save()
}

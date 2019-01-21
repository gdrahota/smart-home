import mongoose from 'mongoose'

export const getControlSystemConfig = async controlSystemId => mongoose.model('control-systems').findOne({ _id: controlSystemId })
export const getCommand = async _id => mongoose.model('command-queue').findOne({ _id })
export const removeCommand = async _id => mongoose.model('command-queue').remove({ _id })

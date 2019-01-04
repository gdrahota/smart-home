import mongoose from 'mongoose'

export const getControlSystemConfig = async () => mongoose.model('control-systems').findOne()

export const getCommand = async _id => mongoose.model('command-queue').findOne({ _id })

export const getDataPoint = async address => mongoose.model('data-points').findOne({ address })

export const removeCommand = async _id => mongoose.model('command-queue').remove({ _id })

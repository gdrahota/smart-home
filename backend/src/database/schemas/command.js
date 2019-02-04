import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const CommandSchema = new Schema({
  control: {
    type: Schema.ObjectId,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: false
  },
  minValue: {
    type: Schema.Types.Mixed,
    required: false
  },
  maxValue: {
    type: Schema.Types.Mixed,
    required: false
  },
})

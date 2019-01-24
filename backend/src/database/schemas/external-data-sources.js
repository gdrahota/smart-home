import mongoose from 'mongoose'

export const TimeUnits = ['second', 'minute', 'hour', 'day']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pollInterval: {
      interval: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: TimeUnits,
        required: true,
      },
    },
    config: {
      type: Schema.Types.Mixed,
      required: true
    },
    commands: {
      type: [String],
      default: () => []
    },
    active: {
      type: Boolean,
      default: true
    },
  }

  const options = { collection: 'external-data-sources', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('external-data-sources', ControlSchema)
  } catch (err) {
  }
}

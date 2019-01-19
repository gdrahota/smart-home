import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const CommandSchema = new Schema({
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
      required: true
    }
  })

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    weekDays: {
      type: Array,
      required: true
    },
    excludeDays: {
      type: Array,
      default: () => []
    },
    time: {
      type: Object,
      required: true
    },
    timeOffset: {
      type: Number,
      default: 0
    },
    allowedTimeFrame: {
      from: {
        type: String,
        default: '00:00'
      },
      till: {
        type: String,
        default: '23:59'
      }
    },
    commands: {
      type: [CommandSchema],
      default: () => []
    },
    active: {
      type: Boolean,
      default: true
    }
  }

  const options = { collection: 'schedules', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('schedules', ControlSchema)
  } catch (err) {
  }
}

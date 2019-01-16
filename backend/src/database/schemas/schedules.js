import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const CommandSchema = new Schema({
    control: {
      type: Schema.ObjectId,
      required: true
    },
    dataType: {
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
        hours: {
          type: Number,
          default: 0
        },
        minutes: {
          type: Number,
          default: 0
        }
      },
      till: {
        hours: {
          type: Number,
          default: 23
        },
        minutes: {
          type: Number,
          default: 59
        }
      },
    },
    commands: {
      type: CommandSchema,
      default: () => []
    },
    state: {
      type: String,
      default: 'active'
    }
  }

  const options = { collection: 'schedules', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('schedules', ControlSchema)
  } catch (err) {
  }
}

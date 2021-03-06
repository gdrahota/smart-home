import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    controlSystem: {
      type: Schema.ObjectId,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      required: true
    },
    value: {
      type: Schema.Types.Mixed,
      required: false
    },
    valueUpdated: {
      type: Date,
      required: false
    }
  }

  const options = { collection: 'data-points', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('data-points', ControlSchema)
  } catch (err) {
  }
}

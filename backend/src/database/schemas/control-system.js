import mongoose from 'mongoose'

export const controlSystemTypes = ['KNX-TP']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'KNX-TP'
    },
    host: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      default: 3671
    }
  }

  const options = { collection: 'control-systems', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('control-systems', ControlSchema)
  } catch (err) {
  }
}

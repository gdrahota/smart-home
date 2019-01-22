import mongoose from 'mongoose'

export const userStates = ['active', 'inactive']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    accountName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      enum: userStates,
      default: 'active'
    },
    groups: {
      type: Array,
      default: () => []
    }
  }

  const options = { collection: 'users', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('users', ControlSchema)
  } catch (err) {
  }
}

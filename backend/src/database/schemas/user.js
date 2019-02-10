import mongoose from 'mongoose'

const passwordPlugin = require('mongoose-bcrypt')

export const userStates = ['active', 'inactive']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    accountName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      bcrypt: true
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

  const UserSchema = new Schema(typeDefinition, options)
  UserSchema.plugin(passwordPlugin)

  try {
    mongoose.model('users', UserSchema)
  } catch (err) {
  }
}

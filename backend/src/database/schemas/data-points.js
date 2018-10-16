import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    address: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    dataType: {
      type: Number,
      required: true
    }
  }

  const options = { collection: 'data-points' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('data-points', ControlSchema)
  } catch (err) {
  }
}

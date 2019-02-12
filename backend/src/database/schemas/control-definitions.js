import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    endPoints: {
      type: Array,
    }
  }

  const options = { collection: 'control-definitions', minimize: false }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('control-definitions', ControlSchema)
  } catch (err) {
  }
}

import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    targetAddress: {
      type: String,
      required: true
    },
    dataType: {
      type: String,
      required: true
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true
    }
  }

  const options = { collection: 'command-queue' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('command-queue', ControlSchema)
  } catch (err) {
  }
}

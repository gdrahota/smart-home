import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    control: {
      type: Schema.ObjectId,
      required: true
    },
    endPoint: {
      type: String,
      required: true
    },
    dataPoint: {
      type: Schema.ObjectId,
      required: true
    }
  }

  const options = { collection: 'control-data-points' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('control-data-points', ControlSchema)
  } catch (err) {
  }
}

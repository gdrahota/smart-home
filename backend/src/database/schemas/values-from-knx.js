import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    controlSystem: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    rawValue: {
      type: Schema.Types.Buffer,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
  }

  const options = { collection: 'values-from-knx' }

  const ValuesFromKnxSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('values-from-knx', ValuesFromKnxSchema)
  } catch (err) {
  }
}

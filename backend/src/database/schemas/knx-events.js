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
      required: false
    },
    eventType: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    }
  }

  const options = {
    collection: 'knx-events',
    timestamps: {},
    capped: { size: 1000000, max: 10000, autoIndexId: true }
  }

  const KnxEventSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('knx-events', KnxEventSchema)
  } catch (err) {
  }
}

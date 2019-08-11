import mongoose from 'mongoose'
import { FacilityAttributeSchema } from './facility-attributes'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const schema = {
    address: {
      postCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
    attributes: [FacilityAttributeSchema],
    state: {
      type: String,
      default: 'active'
    },
  }

  const options = {
    collection: 'facilities',
    timestamps: {}
  }

  const FacilitySchema = new Schema(schema, options)

  // prevent overwriting an existing model during unit testing
  try {
    mongoose.model('facilities', FacilitySchema)
  } catch (err) {
  }
}

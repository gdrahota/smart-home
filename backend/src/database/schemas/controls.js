import mongoose from 'mongoose'
import { FacilityAttributeValueSchema } from './facility-attribute-values'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    facilityId: {
      type: Schema.ObjectId,
      required: true
    },
    attributeValues: [FacilityAttributeValueSchema],
    state: {
      type: String,
      default: 'active'
    }
  }

  const options = { collection: 'controls' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('controls', ControlSchema)
  } catch (err) {
  }
}

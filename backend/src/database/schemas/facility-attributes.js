import mongoose from 'mongoose'
import { FacilityAttributeValueSchema } from './facility-attribute-values'

export let FacilityAttributeSchema

export const registerSchema = () => {
  FacilityAttributeSchema = new mongoose.Schema(
    {
      facilityId: {
        type: mongoose.Schema.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }, { collection: 'facility-attributes', timestamps: {} }
  )

  try {
    mongoose.model('facility-attributes', FacilityAttributeSchema)
  } catch (err) {
  }
}

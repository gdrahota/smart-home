import mongoose from 'mongoose'
import { FacilityAttributeValueSchema } from './facility-attribute-value'

export let FacilityAttributeSchema

export const registerSchema = () => {
  FacilityAttributeSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      values: [FacilityAttributeValueSchema]
    }, { collection: 'facility-attributes' }
  )

  try {
    mongoose.model('facility-attributes', FacilityAttributeSchema)
  } catch (err) {
  }
}

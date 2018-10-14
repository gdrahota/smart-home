import mongoose from 'mongoose'

export let FacilityAttributeValueSchema

export const registerSchema = () => {
  FacilityAttributeValueSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      }
    }, { collection: 'facility-attribute-values' }
  )

  try {
    mongoose.model('facility-attribute-values', FacilityAttributeValueSchema)
  } catch (err) {
  }
}

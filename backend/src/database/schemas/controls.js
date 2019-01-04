import mongoose from 'mongoose'

export const controlStates = ['active', 'inactive']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    facilityId: {
      type: Schema.ObjectId,
      required: true
    },
    technology: {
      type: String,
      default: 'KNX-TP'
    },
    controlType: {
      type: String,
      required: true
    },
    attributeValues: [Schema.ObjectId],
    state: {
      type: controlStates,
      default: 'active'
    },
    values: {
      type: Schema.Types.Mixed,
      required: false
    },
    valueUpdated: {
      type: Date,
      required: false
    }
  }

  const options = { collection: 'controls' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('controls', ControlSchema)
  } catch (err) {
  }
}

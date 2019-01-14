import mongoose from 'mongoose'

export const CommandType = ['readValue', 'writeValue']

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    commandType: {
      type: String,
      enum: CommandType,
      default: 'writeValue'
    },
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
      required: false
    }
  }

  const options = { collection: 'command-queue' }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('command-queue', ControlSchema)
  } catch (err) {
  }
}

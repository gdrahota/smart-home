import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const ClientSchema = new Schema({
    clientId: {
      type: String,
      required: true
    },
    socketId: {
      type: [String],
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    expires: {
      type: mongoose.Schema.Types.Date,
      required: true
    }
  }, { collection: 'client', timestamps: {} })

  // prevent overwriting an existing model during unit testing
  try {
    mongoose.model('client', ClientSchema)
  } catch (error) {
  }
}

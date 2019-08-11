import mongoose from 'mongoose'

export const registerSchema = () => {
  const Schema = mongoose.Schema

  const typeDefinition = {
    name: {
      type: String,
      required: true
    },
    inputPathName: {
      type: String,
      required: true
    },
    outputPathName: {
      type: String,
      required: false
    },
  }

  const options = { collection: 'file-uploads', minimize: false, timestamps: {} }

  const FileUploadSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('file-uploads', FileUploadSchema)
  } catch (err) {
  }
}

import mongoose from 'mongoose'

export const controlSystemTypes = ['KNX-TP']

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
    type: {
      type: String,
      default: 'KNX-TP'
    },
    host: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      default: 3671
    }
  }

  const options = { collection: 'control-systems', timestamps: {} }

  const ControlSchema = new Schema(typeDefinition, options)

  try {
    mongoose.model('control-systems', ControlSchema)
  } catch (err) {
  }
}

const t = {
  "_id": "5c002020c10358643b2ca805",
  "socketId":
    ["T_R8Sf2H-omVT9viAAAC"], "clientId":
    "3be7c4a6-2289-49f8-9577-e71734bb3249", "user":
    {
      "groups":
        ["EnterList", "GenericListUser", "EnterListAddList"], "_id":
        "5c002020c10358643b2ca806", "accountName":
        "robert", "mail":
        "robert.enk@db-training.de"
    }
  ,
  "expires":
    "2018-11-29T21:21:36.574Z", "__v":
    0
}

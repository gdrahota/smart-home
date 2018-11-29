import mongoose from 'mongoose'

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getNext = (socket, cb) => {
  mongoose
    .model('command-queue')
    .find()
    .lean()
    .exec((err, items) => cb(err, items))
}

export default async (socket, cb) => {
  const items = await getNext(socket, (err, items) => {
    const numberOfCommands = items.length

    if (numberOfCommands > 0) {
      for (let i = 0; i < numberOfCommands; i++) {
        const data = { ...items[i], _id: undefined }
        console.log(err, data)
        socket.write(JSON.stringify(data))
      }
    }
  })

  cb()
}

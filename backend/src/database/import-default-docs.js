import mongoose from 'mongoose'

const defaultDocs = [
  {
    collection: 'users',
    items: [
      {
        _id: '5c464965abb000da021fe582',
        firstName: 'SmartHome',
        lastName: 'Administrator',
        state: ['active'],
        groups: ['GlobalAdmin'],
        accountName: 'admin'
      }
    ]
  }
]

export const loadDefaultDocs = () => {

  defaultDocs.forEach(entity => {
    const model = mongoose.model(entity.collection)
    entity.items.forEach(async item => {
      try {
        await new model(item).save()
      }
      catch (e) {
        if (e.code !== 11000) {
          console.log(e)
        }
      }
    })
  })
}

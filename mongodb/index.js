const mongodb = require('mongoose')

mongodb.connect('mongodb://localhost/hshs', { useNewUrlParser: true })
mongodb.set('useCreateIndex', true)

const db = mongodb.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`we're connected!`)
})

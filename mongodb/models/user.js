const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: `来自火星${mongoose.Types.ObjectId()}`
  },
  account: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema, 'user')
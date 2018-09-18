const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: `来自火星${mongoose.Types.ObjectId()}`
  },
  account: {
    type: String,
    required: true,
    unique: true
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
  },
  avator: {
    type: String
  }
})

userSchema.methods.joiValidate = (obj) => {
  const schema = {
    account: Joi.string().min(4).max(18).required(),
    password: Joi.string().min(6).max(20).regex(/[a-zA-Z0-9]{6,20}/).required()
  }
  return Joi.validate(obj, schema)
}

module.exports = mongoose.model('User', userSchema, 'user')
const mongoose = require('mongoose')
const Joi = require('joi')

const todoListSchema = mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    required: true
  }
})

todoListSchema.methods.joiValidate = obj => {
  const schema = {
    value: Joi.required()
  }
  return Joi.validate(obj, schema)
}

module.exports = mongoose.model('todoList', todoListSchema, 'todoList')

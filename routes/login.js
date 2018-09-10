const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../mongodb/models/user')

router.post('/register', (req, res, next) => {
  const body = req.body
  User.findOne({account: body.account}, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else if (doc) {
      res.status(500).json({
        message: '用户已存在'
      })
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        account: body.account,
        password: body.password
      })
      user.save((error, doc) => {
        if (error) {
          res.status(500).json({
            error
          })
        } else {
          res.status(200).json({
            createTime: doc.createTime,
            account: doc.account,
            age: doc.age,
            _id: doc._id
          })
        }
      })
    }
  })
})

router.post('/login', (req, res) => {
  const body = req.body
  User.findOne({account: body.account}, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else if (!doc) {
      res.status(500).json({
        code: '102',
        message: global.RESULT_CODE['102']
      })
    } else if (doc.password !== body.password) {
      res.status(500).json({
        message: '密码不正确'
      })
    } else {
      req.session.user = body.account
      console.log('session ', body.account)
      delete doc.password
      res.status(200).json(doc)
    }
  })
})

module.exports = router
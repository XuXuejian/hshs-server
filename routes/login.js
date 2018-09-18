const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    } else {
      bcrypt.compare(req.body.password, doc.password, (err, result) => {
        if (!result) {
          res.status(500).json({
            message: '密码不正确'
          })
        } else {
          const token = jwt.sign({
            account: req.body.account,
            userId: doc._id
          }, 'secret', {expiresIn: '1h'})
          req.session.user = body.account
          res.status(200).json({
            account: doc.account,
            avator: doc.avator,
            userId: doc._id,
            createTime: doc.createTime,
            token
          })
        }
      })
    }
  })
})

module.exports = router
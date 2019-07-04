const User = require('../mongodb/models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const result = require('./index')

exports.register = (req, res, next) => {
  const body = req.body
  User.findOne({ account: body.account }, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else if (doc) {
      res.status(500).json(result('101'))
    } else {
      const userTem = new User(body)
      const { error } = userTem.joiValidate(body)
      console.log(error)
      if (error) {
        console.log(error.details[0].message)
        res.status(500).json({ error: error.details[0].message })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              ...req.body,
              password: hash
            })
            user.save((error, doc) => {
              if (error) {
                res.status(500).json({
                  error
                })
              } else {
                console.log(doc)
                // const { password, ...restDoc } = doc
                res.status(200).json(
                  result('200', {
                    name: doc.name,
                    _id: doc._id,
                    account: doc.account,
                    createTime: doc.createTime
                  })
                )
              }
            })
          }
        })
      }
    }
  })
}

exports.login = (req, res) => {
  const body = req.body
  User.findOne({ account: body.account }, (err, doc) => {
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
          const token = jwt.sign(
            {
              account: req.body.account,
              userId: doc._id
            },
            'secret',
            { expiresIn: '1h' }
          )
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
}

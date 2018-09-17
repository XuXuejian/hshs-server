const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const User = require('../mongodb/models/user')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({storage})

router.get('/user', (req, res, next) => {
  User.find().select('name age _id').exec().then(docs => {
    res.status(200).json(docs)
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  })
})
router.post('/user', upload.single('avator'), (req, res, next) => {
  console.log('user')
  console.log(req.file)
  console.log(req.body)
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    avator: `uploads/${req.file.filename}`
  })
  user.save((error, doc) => {
    if (error) {
      res.status(500).json({
        error
      })
    } else {
      res.status(200).json(doc)
      // res.status(200).json({
      //   createTime: doc.createTime,
      //   account: doc.account,
      //   age: doc.age,
      //   _id: doc._id
      // })
    }
  })
})
router.get('/user/:userId', (req, res, next) => {
  const userId = req.params.userId
  User.findById(userId).exec().then(doc => {
    console.log(doc)
    if (doc) {
      res.status(200).json(doc)
    } else {
      res.status(404).json({
        message: 'No valid entry found for provided ID'
      })
    }
  }).catch(err => {
    res.status(500).json({error: err})
  })
})
router.delete('/user/:userId', (req, res, next) => {
  const userId = req.params.userId
  User.remove({_id: userId}).exec().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({error})
  })
})
router.put('/user/:userId', (req, res, next) => {
  const userId = req.params.userId
  const body = req.body
  User.updateOne({_id: userId}, {$set: {...body}}).exec().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({error})
  })
})

module.exports = router
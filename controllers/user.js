const User = require('../mongodb/models/user')

exports.getUsers = (req, res, next) => {
  User.find()
    .select('-password -__v')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.uploadAvator = (req, res, next) => {
  User.updateOne(
    { account: req.userData.account },
    { $set: { avator: `uploads/${req.file.filename}` } }
  )
    .exec()
    .then(() => {
      User.findOne({ account: req.userData.account }, (err, doc) => {
        if (err) res.status(500).json({ error: err })
        res.status(200).json(doc)
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

exports.getUserInfo = (req, res, next) => {
  const userId = req.params.userId
  User.findById(userId)
    .select('-password -__v')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID'
        })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId
  User.remove({ _id: userId })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteUsers = (req, res) => {
  const { ids, time } = req.body
  console.log(req.body)
  User.deleteMany({
    $or: [{ _id: { $in: ids } }, { createTime: { $gt: time } }]
  })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.changeUserInfo = (req, res, next) => {
  const userId = req.params.userId
  const body = req.body
  User.updateOne({ _id: userId }, { $set: { ...body } })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

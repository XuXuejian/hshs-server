const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const upload = multer({dest: '/uploads/'})
const User = require('../mongodb/models/user')

router.post('/upload', upload.single('avator'), (req, res, next) => {
  const body = req.body
})

module.exports = router
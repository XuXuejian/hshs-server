const express = require('express')
const router = express.Router()

const downloadController = require('../controllers/download')

router.get('/download_img', downloadController.download_img)

module.exports = router
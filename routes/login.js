const express = require('express')
const router = express.Router()

const loginController = require('../controllers/login')

router.post('/register', loginController.login_register)

router.post('/login', loginController.login_register)

module.exports = router
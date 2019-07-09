const express = require('express')
const router = express.Router()
const multer = require('multer')

const userController = require('../controllers/user')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

router.get('/user', userController.getUsers)
router.post(
  '/user/upload',
  upload.single('avator'),
  userController.uploadAvator
)
router.get('/user/:userId', userController.getUserInfo)
router.delete('/user/:userId', userController.deleteUser)
router.put('/user/:userId', userController.changeUserInfo)
router.delete('/user', userController.deleteUsers)

module.exports = router

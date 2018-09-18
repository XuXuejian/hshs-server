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
const upload = multer({storage})

router.get('/user', userController.user_get_all)
router.post('/user/upload', upload.single('avator'), userController.user_upload_avator)
router.get('/user/:userId', userController.user_get_userInfo)
router.delete('/user/:userId', userController.user_delete_user)
router.put('/user/:userId', userController.user_change_info)

module.exports = router
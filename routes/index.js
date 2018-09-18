const login = require('./login')
const user = require('./user')
const jwt = require('jsonwebtoken')

const handleAuth = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'secret', (err, decoded) => {
    console.log(decoded)
    if (err) {
      res.status(401).json({
        message: 'Auth failed'
      })
    } else {
      req.userData = decoded
      next()
    }
  })
}

module.exports = (app) => {
  app.use('/api', login, handleAuth, user)
}
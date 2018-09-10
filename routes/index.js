const login = require('./login')
const user = require('./user')

function handleLoginSession(req, res, next) {
  console.log('handle session', req.session.user)
  if (!req.session.user) {
    res.status(500).json({
      errMsg: '用户未登录'
    })
  } else {
    next()
  }
}

module.exports = (app) => {
  app.use('/api', login, handleLoginSession, user)
}
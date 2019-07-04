const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const session = require('express-session')
const cors = require('cors')

require('./mongodb')

const routes = require('./routes')

const app = express()

global.RESULT_CODE = {
  '101': '用户已存在',
  '102': '用户不存在',
  '103': '密码不正确',
  '004': '用户不存在',
  '005': '系统错误',
  '006': '用户不存在',
  '007': '用户不存在',
  '008': '用户不存在',
  '009': '用户不存在',
  '010': '用户不存在',
  '011': '用户不存在',
  '012': '用户不存在',
  '200': ''
}

console.log(process.env.NODE_ENV)
const log4js = require('log4js')
const logger = log4js.getLogger('app')
if (process.env.NODE_ENV === 'production') {
  log4js.configure({
    appenders: {
      out: { type: 'console' },
      task: {
        type: 'dateFile',
        filename: 'web.log',
        pattern: '-dd.log',
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: { appenders: ['out', 'app'], level: 'info' }
    }
  })
  app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }))
} else {
  logger.level = 'debug'
  logger.debug('Some debug messages')
  app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(session({
//   secret: 'secret dog',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 30
//   }
// }))

// app.all('*', (req, res, next) => {
//   console.log(req.session.user)
//   if (req.method === 'OPTIONS') {
//     var headers = {}
//     headers["Access-Control-Allow-Origin"] = req.headers.origin
//     headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
//     headers["Access-Control-Allow-Credentials"] = true
//     headers["Access-Control-Max-Age"] = '86400' // 24 hours
//     headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//     res.writeHead(204, headers)
//     res.end()
//   } else {
//     res.header('Access-Control-Allow-Origin', req.headers.origin)
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE, OPTIONS")
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Max-Age', '86400')
//     next()
//   }
// })
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    callback(null, true)
  },
  credentials: true,
  maxAge: 60,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use('/api', cors(corsOptions), (req, res, next) => {
  next()
})

// routes
routes(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(404)
  const error = new Error('Not Found')
  error.status = 404
  // res.status(404)
  next(error)
})

// error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    logger.error('Something went wrong:', err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
} else {
  app.use((err, req, res, next) => {
    logger.error('Something went wrong:', err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

module.exports = app

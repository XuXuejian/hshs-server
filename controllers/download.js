const fs = require('fs')
const path = require('path')

exports.download = (req, res, next) => {
  const file = path.resolve(
    __dirname,
    '../uploads/1537178235759-airdia-airbus.png'
  )
  res.download(file)
}

module.exports = function result(code = 200, data = null) {
  return {
    code,
    data,
    message: global.RESULT_CODE[code],
    success: code.indexOf(2) === 0
  }
}

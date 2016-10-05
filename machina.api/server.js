var express = require('express')
// var i2cBus = require('i2c-bus')
// var pca9685 = require('pca9685').Pca9685Driver
var app = express()

// var options = {
//   i2c: i2cBus.openSync(1),
//   address: 0x60,
//   frequency: 1000,
//   debug: false
// }

// var pwm = new pca9685(options)

app.all('*', function (req, res, next) {

  // Response settings
  var responseSettings = {
    'AccessControlAllowOrigin': req.headers.origin,
    'AccessControlAllowHeaders': 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
    'AccessControlAllowMethods': 'POST, GET, PUT, DELETE, OPTIONS',
    'AccessControlAllowCredentials': true
  }

  // Headers
  res.header('Access-Control-Allow-Credentials', responseSettings.AccessControlAllowCredentials)
  res.header('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin)
  res.header('Access-Control-Allow-Headers', (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : 'x-requested-with')
  res.header('Access-Control-Allow-Methods', (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods)

  if ('OPTIONS' == req.method) {
    res.send(200)
  }
  else {
    next()
  }

})

app.get('/:axis0/:axis1', function (req, res) {

  var axis0sign  = req.params.axis0 > 0
  var axis1sign = req.params.axis1 > 0

  var axis0 = Math.abs(req.params.axis0)
  var axis1 = Math.abs(req.params.axis1)

  var speedMin = 0.003922
  var speedMax = 1
  var microsecondsMin = 100
  var microsecondsMax = 1000

  axis0 = microsecondsMin + ((axis0 - speedMin) * (microsecondsMax - microsecondsMin)/speedMax)
  axis1 = microsecondsMin + ((axis1 - speedMin) * (microsecondsMax - microsecondsMin)/speedMax)

  var direction 
  direction = axis1sign ? 'do tyłu' : 'naprzód'
  if (axis1 == 100) direction = 'neutralny' 
  var turn
  turn =  axis0sign ? 'w prawo' : 'w lewo'
  if (axis0 == 100) turn = 'neutralny'

  res.end(
    'axis0: ' + axis0.toString() +
    '\naxis1: ' + axis1.toString() +
    '\nkierunek: ' + direction +
    '\nskręt: ' + turn)

})

app.listen(8000)
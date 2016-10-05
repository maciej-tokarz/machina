var express = require('express')
var i2cBus = require('i2c-bus')
var pca9685 = require('pca9685').Pca9685Driver
var motors = require('./motors.js')
var app = express()

var options = {
  i2c: i2cBus.openSync(1),
  address: 0x60,
  frequency: 1000,
  debug: false
}

var pwm = new pca9685(options)
var m = new motors()

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

  if ('OPTIONS' == req.method) res.send(200)
  else next()

})

app.get('/:axis0/:axis1', function (req, res) {

  var axis0sign = req.params.axis0 > 0
  var axis1sign = req.params.axis1 > 0

  var axis0 = Math.abs(req.params.axis0)
  var axis1 = Math.abs(req.params.axis1)

  var speedMin = 0.003922
  var speedMax = 1
  var microsecondsMin = 100
  var microsecondsMax = 500

  axis0 = microsecondsMin + ((axis0 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)
  axis1 = microsecondsMin + ((axis1 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)

  var direction
  direction = axis1sign ? 'do tyłu' : 'naprzód'
  if (axis1 < 160) direction = 'neutralny'
  var turn
  turn = axis0sign ? 'w prawo' : 'w lewo'
  if (axis0 < 160) turn = 'neutralny'

  // Wyłącz sterownik w strefie neutralnej
  if (axis0 < 160 && axis1 < 160) pwm.allChannelsOff()
  else {
    // Naprzód
    if (!axis1sign) {
      if (turn == 'w lewo') {
        if (axis0 > 200) {
          m.forwardLeft(pwm, axis0)
          m.forwardRight(pwm, axis1)
        } else m.forward(pwm, axis1)
      }

      if (turn == 'w prawo') {
        if (axis0 > 200) {
          m.forwardLeft(pwm, axis1)
          m.forwardRight(pwm, axis0)
        } else m.forward(pwm, axis1)
      }

      if (turn == 'neutralny') m.forward(pwm, axis1)
    }

    // Do tyłu
    if (axis1sign) {
      if (turn == 'w lewo') {
        if (axis0 > 200) {
          m.backwardsLeft(pwm, axis0)
          m.backwardsRight(pwm, axis1)
        } else m.backwards(pwm, axis1)
      }

      if (turn == 'w prawo') {
        if (axis0 > 200) {
          m.backwardsLeft(pwm, axis1)
          m.backwardsRight(pwm, axis0)
        } else m.backwards(pwm, axis1)
      }

      if (turn == 'neutralny') m.backwards(pwm, axis1)
    }
  }

  res.end(
    'axis0: ' + axis0.toString() +
    '\naxis1: ' + axis1.toString() +
    '\nkierunek: ' + direction +
    '\nskręt: ' + turn)

})

app.listen(8000)
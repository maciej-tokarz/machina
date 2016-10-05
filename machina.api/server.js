var express = require('express')
var pwmController = require('./controllers/pwmController.js')
var moveController = require('./controllers/moveController.js')
var cameraController = require('./controllers/cameraController.js')
var app = express()

var pwmCtrl = new pwmController()
var moveCtrl = new moveController(pwmCtrl.pwm)
var cameraCtrl = new cameraController(pwmCtrl.pwm)
// cameraCtrl.setDefault()

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

app.get('/:axis0/:axis1/:a/:b/:x/:y', function (req, res) {

  moveCtrl.setMotors(req.params.axis0, req.params.axis1)
  cameraCtrl.setMotors(req.params.a, req.params.b, req.params.x, req.params.y)

  res.end(
    'axis0: ' + moveCtrl.axis0.toString() +
    '\naxis1: ' + moveCtrl.axis1.toString() +
    '\nkierunek: ' + moveCtrl.direction +
    '\nskręt: ' + moveCtrl.turn +
    '\na: ' + cameraCtrl.a +
    '\nb: ' + cameraCtrl.b +
    '\nx: ' + cameraCtrl.x +
    '\ny: ' + cameraCtrl.y)

})

app.listen(8000)
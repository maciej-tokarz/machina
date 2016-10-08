var express = require('express')
// var request = require('request')
var pwmController = require('./controllers/pwmController.js')
var moveController = require('./controllers/moveController.js')
var cameraController = require('./controllers/cameraController.js')
var app = express()

var pwmCtrl = new pwmController()
var moveCtrl = new moveController(pwmCtrl.pwm)
var cameraCtrl = new cameraController(pwmCtrl.pwm)
// cameraCtrl.setDefault()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/:axis0/:axis1/:a/:b/:x/:y', function (req, res) {
  moveCtrl.setMotors(req.params.axis0, req.params.axis1)
  cameraCtrl.setMotors(req.params.a, req.params.b, req.params.x, req.params.y)
  res.end()
})

// request.post('http://127.0.0.1:8001/\'Cześć! Machina już działa.\'')
app.listen(8000)
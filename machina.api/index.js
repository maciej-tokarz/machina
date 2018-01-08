var express = require('express');
var pwmController = require('./controllers/pwm.controller.js')
var moveController = require('./controllers/move.controller.js')
var radioController = require('./controllers/radio.controller.js');

var app = express();
var pwm = new pwmController();
var move = new moveController(pwm.pwm);
var radio = radioController(move);

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

// app.post('/:axis0/:axis1/:a/:b/:x/:y', function (req, res) {
//   res.end()
// })

app.get('/', ({}, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Usługi sieciowe Machiny');
});

app.listen(8000, () => {
  console.log('Usługi sieciowe Machiny zostały uruchomione!');
});

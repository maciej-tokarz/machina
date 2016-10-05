var i2cBus = require('i2c-bus')
var Pca9685Driver = require('pca9685').Pca9685Driver

var options = {
  i2c: i2cBus.openSync(1),
  address: 0x60,
  frequency: 50,
  debug: false
}

var pulseLengths = [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800, 700]
var steeringChannel = 0
var pwm
var nextPulse = 0
var timer

function servoLoop() {
  timer = setTimeout(servoLoop, 500)
  pwm.setPulseLength(steeringChannel, pulseLengths[nextPulse])
  nextPulse += 1
  if (nextPulse === pulseLengths.length) nextPulse = 0
}

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')

  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  pwm.allChannelsOff()
})

pwm = new Pca9685Driver(options, function startLoop(err) {
  if (err) {
    console.error('Error initializing PCA9685')
    process.exit(-1)
  }

  console.log('Starting servo loop...')
  servoLoop()
})
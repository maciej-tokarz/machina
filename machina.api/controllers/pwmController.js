module.exports = function () {
  var i2cBus = require('i2c-bus')
  var pca9685 = require('pca9685').Pca9685Driver

  var options = {
    i2c: i2cBus.openSync(1),
    address: 0x60,
    frequency: 1000,
    debug: false
  }

  this.pwm = new pca9685(options)
}
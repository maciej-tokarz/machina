module.exports = function () {
  var i2cBus = require('i2c-bus');
  var Pca9685Driver = require('pca9685').Pca9685Driver;

  var options = {
    i2c: i2cBus.openSync(1),
    address: 0x60,
    frequency: 1000,
    debug: false
  };

  this.pwm = new Pca9685Driver(options, (error) => {
    if (error) {
      console.error("Error initializing PCA9685");
      process.exit(-1);
    }
  });
}

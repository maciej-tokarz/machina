module.exports = function (pwm) {
  var self = this

  this.a
  this.b
  this.x
  this.y

  const microsecondsMin = 100
  const microsecondsMax = 500

  this.setMotors = function(a, b, x, y) {

    self.a = a
    self.b = b
    self.x = x
    self.y = y

  }

}
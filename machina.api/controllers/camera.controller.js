module.exports = function (pwm) {
  var self = this

  this.a
  this.b
  this.x
  this.y

  // var positionV = 0
  // var positionH = 0
  

  // this.setDefault = function () {
  //   pwm.setPulseLength(0, positionV)
  //   pwm.setPulseLength(1, positionH)
  //   pwm.allChannelsOff()
  // }

  this.setMotors = function (a, b, x, y) {

    var i = 0

    self.a = a
    self.b = b
    self.x = x
    self.y = y

    if (self.y == 1) {
      pwm.setPulseLength(0, 1)
    }

    if (self.a == 1) {
      pwm.setPulseLength(0, -4)
    }

    if (self.x == 1) {
      for (i = 0; i < 10; i++) {
        pwm.setPulseLength(1, -8)
      }
    }

    if (self.b == 1) {
      pwm.setPulseLength(1, 1)
    }
  }
}
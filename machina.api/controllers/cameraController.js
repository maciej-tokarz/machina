module.exports = function (pwm) {
  var self = this

  this.a
  this.b
  this.x
  this.y

  var positionV = 500
  var positionH = 500
  
  this.setDefault = function() {
    pwm.setPulseLength(0, positionV)
    pwm.setPulseLength(1, positionH)
    pwm.allChannelsOff()
  }

  this.setMotors = function(a, b, x, y) {

    self.a = a
    self.b = b
    self.x = x
    self.y = y

    // if (self.y == 1 && positionV <= 2000) {
    //   positionV = positionV + 100
    //   pwm.setPulseLength(0, positionV)
    // }

    // if (self.a == 1 && positionV >= 600) {
    //   positionV = positionV - 100
    //   pwm.setPulseLength(0, positionV)
    // }

    // if (self.x == 1 && positionH <= 1300) {
    //   positionH = positionH + 100
    //   pwm.setPulseLength(1, positionH)
    // }

    // if (self.b == 1 && positionH >= 1100) {
    //   positionH = positionH - 100
    //   pwm.setPulseLength(1, positionH)
    // }

    //pwm.allChannelsOff()
  }

}
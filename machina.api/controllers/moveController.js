module.exports = function (pwm) {
  var self = this
  var motorsController = require('../controllers/motorsController.js')
  var motorsCtrl = new motorsController(pwm)

  const speedMin = 0.003922
  const speedMax = 1
  const microsecondsMin = 100
  const microsecondsMax = 500

  this.axis0
  this.axis1
  this.direction
  this.turn

  this.setMotors = function (axis0param, axis1param) {

    var axis0sign = axis0param > 0
    var axis1sign = axis1param > 0

    self.axis0 = Math.abs(axis0param)
    self.axis1 = Math.abs(axis1param)

    self.axis0 = microsecondsMin + ((self.axis0 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)
    self.axis1 = microsecondsMin + ((self.axis1 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)

    self.direction = axis1sign ? 'do tyłu' : 'naprzód'
    if (self.axis1 < 160) self.direction = 'neutralny'

    self.turn = axis0sign ? 'w prawo' : 'w lewo'
    if (self.axis0 < 160) self.turn = 'neutralny'

    // Wyłącz sterownik w strefie neutralnej
    if (self.axis0 < 160 && self.axis1 < 160) pwm.allChannelsOff()
    else {
      // Naprzód
      if (!axis1sign) {
        if (self.turn == 'w lewo') {
          if (self.axis0 > 200) {
            motorsCtrl.forwardLeft(self.axis0)
            motorsCtrl.forwardRight(self.axis1)
          } else motorsCtrl.forward(self.axis1)
        }

        if (self.turn == 'w prawo') {
          if (self.axis0 > 200) {
            motorsCtrl.forwardLeft(self.axis1)
            motorsCtrl.forwardRight(self.axis0)
          } else motorsCtrl.forward(self.axis1)
        }

        if (self.turn == 'neutralny') motorsCtrl.forward(self.axis1)
      }

      // Do tyłu
      if (axis1sign) {
        if (self.turn == 'w lewo') {
          if (self.axis0 > 200) {
            motorsCtrl.backwardsLeft(self.axis0)
            motorsCtrl.backwardsRight(self.axis1)
          } else motorsCtrl.backwards(self.axis1)
        }

        if (self.turn == 'w prawo') {
          if (self.axis0 > 200) {
            motorsCtrl.backwardsLeft(self.axis1)
            motorsCtrl.backwardsRight(self.axis0)
          } else motorsCtrl.backwards(self.axis1)
        }

        if (self.turn == 'neutralny') motorsCtrl.backwards(self.axis1)
      }
    }
  }
}
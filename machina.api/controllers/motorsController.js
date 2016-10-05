module.exports = function () {

  this.forwardLeft = function (pwm, speed) {
    // Tylne
    pwm.setPulseLength(2, speed)
    pwm.setPulseLength(4, 0)
    pwm.setPulseLength(3, 4096)

    // Przednie
    pwm.setPulseLength(7, speed)
    pwm.setPulseLength(5, 0)
    pwm.setPulseLength(6, 4096)
  }

  this.forwardRight = function (pwm, speed) {
    // Przednie
    pwm.setPulseLength(8, speed)
    pwm.setPulseLength(10, 0)
    pwm.setPulseLength(9, 4096)

    // Tylne
    pwm.setPulseLength(13, speed)
    pwm.setPulseLength(11, 0)
    pwm.setPulseLength(12, 4096)
  }

  this.forward = function (pwm, speed) {
    this.forwardLeft(pwm, speed)
    this.forwardRight(pwm, speed)
  }

  this.backwardsLeft = function (pwm, speed) {
    // Tylne
    pwm.setPulseLength(2, speed)
    pwm.setPulseLength(4, 4096)
    pwm.setPulseLength(3, 0)

    // Przednie
    pwm.setPulseLength(7, speed)
    pwm.setPulseLength(5, 4096)
    pwm.setPulseLength(6, 0)
  }

  this.backwardsRight = function (pwm, speed) {
    // Przednie
    pwm.setPulseLength(8, speed) // 100 - 1000
    pwm.setPulseLength(10, 4096)
    pwm.setPulseLength(9, 0)

    // Tylne
    pwm.setPulseLength(13, speed) // 100 - 1000
    pwm.setPulseLength(11, 4096)
    pwm.setPulseLength(12, 0)
  }

  this.backwards = function (pwm, speed) {
    this.backwardsLeft(pwm, speed)
    this.backwardsRight(pwm, speed)
  }

}

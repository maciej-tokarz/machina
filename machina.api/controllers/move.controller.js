module.exports = function (pwm) {
  var motorsController = require('../controllers/motors.controller.js')
  var motors = new motorsController(pwm)

  this.setMotors = function (data) {
    const speedMin = 0;
    const speedMax = 1100;
    const backwardMin = 1410;
    const backwardMax = 1070;
    const forwardMin = 1550;
    const forwardMax = 1905;

    if (data.throttle >= 1410 && data.throttle <= 1550) {
      pwm.allChannelsOff();
      return;
    }

    if (data.throttle > 1500) {
      const forward = scaleBetween(data.throttle, forwardMin, forwardMax, speedMin, speedMax);
      // console.log(forward)
      motors.forwardLeft(forward);
      motors.forwardRight(forward);
      return;
    }

    if (data.throttle < 1410) {
      const backward = scaleBetween(data.throttle, backwardMin, backwardMax, speedMin, speedMax);
      // console.log(backward)
      motors.backwardLeft(backward);
      motors.backwardRight(backward);
      return;
    }
  }

  function scaleBetween(valueIn, baseMin, baseMax, limitMin, limitMax) {
    return ((limitMax - limitMin) * (valueIn - baseMin) / (baseMax - baseMin)) + limitMin;
  }
}



// var axis0sign = axis0param > 0
// var axis1sign = axis1param > 0

// this.axis0 = Math.abs(axis0param)
// this.axis1 = Math.abs(axis1param)

// this.axis0 = microsecondsMin + ((this.axis0 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)
// this.axis1 = microsecondsMin + ((this.axis1 - speedMin) * (microsecondsMax - microsecondsMin) / speedMax)

// this.direction = axis1sign ? 'do tyłu' : 'naprzód'
// if (this.axis1 < 160) this.direction = 'neutralny'

// this.turn = axis0sign ? 'w prawo' : 'w lewo'
// if (this.axis0 < 160) this.turn = 'neutralny'

// // Wyłącz sterownik w strefie neutralnej
// if (this.axis0 < 160 && this.axis1 < 160) pwm.allChannelsOff()
// else {
//   // Naprzód
//   if (!axis1sign) {
//     if (this.turn == 'w lewo') {
//       if (this.axis0 > 180) {
//         motors.forwardLeft(this.axis0)
//         motors.forwardRight(this.axis1)
//       } else motors.forward(this.axis1)
//     }

//     if (this.turn == 'w prawo') {
//       if (this.axis0 > 180) {
//         motors.forwardLeft(this.axis1)
//         motors.forwardRight(this.axis0)
//       } else motors.forward(this.axis1)
//     }

//     if (this.turn == 'neutralny') motors.forward(this.axis1)
//   }

//   // Do tyłu
//   if (axis1sign) {
//     if (this.turn == 'w lewo') {
//       if (this.axis0 > 180) {
//         motors.backwardsLeft(this.axis0)
//         motors.backwardsRight(this.axis1)
//       } else motors.backwards(this.axis1)
//     }

//     if (this.turn == 'w prawo') {
//       if (this.axis0 > 180) {
//         motors.backwardsLeft(this.axis1)
//         motors.backwardsRight(this.axis0)
//       } else motors.backwards(this.axis1)
//     }

//     if (this.turn == 'neutralny') motors.backwards(this.axis1)
//   }
// }
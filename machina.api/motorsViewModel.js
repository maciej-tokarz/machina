


// var setForwardLeft = function(pwm, speed) {
//   var forward = 0
//   var backward = 0
//   var speedMax = 100
//   var microsecondsMin = 100
//   var microsecondsMax = 1000

//   if (speed > 0) {
//     forward = 0
//     backward = 4096
//   }

//   if (speed < 0) {
//     forward = 4096
//     backward = 0
//   }

//   speed = microsecondsMin + (speed * (microsecondsMax - microsecondsMin)/speedMax)
  
//   pwm.setPulseLength(7, speed) // 100 - 1000
//   pwm.setPulseLength(5, forward)
//   pwm.setPulseLength(6, backward)
// }

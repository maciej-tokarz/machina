module.exports = function (pwm) {
  var motorsController = require('../controllers/motors.controller.js')
  var motors = new motorsController(pwm)

  this.setMotors = function (data) {
    // 1070 1480 1905

    const movement = { forward: 0, backward: 0, left: 0, right: 0 };

    const speedMin = 0;
    const speedMax = 1100;

    const forwardMin = 1550;
    const forwardMax = 1905;

    const backwardMin = 1410;
    const backwardMax = 1070;

    const leftMin = 1410;
    const leftMax = 1070;

    const rightMin = 1550;
    const rightMax = 1905;

    if (data.throttle >= 1410 && data.throttle <= 1550) {
      pwm.allChannelsOff();
      return;
    }

    if (data.throttle > 1500) movement.forward = scaleBetween(data.throttle, forwardMin, forwardMax, speedMin, speedMax);
    if (data.throttle < 1410) movement.backward = scaleBetween(data.throttle, backwardMin, backwardMax, speedMin, speedMax);
    if (data.yaw < 1410) movement.left = scaleBetween(data.yaw, leftMin, leftMax, speedMin, speedMax);
    if (data.yaw > 1500) movement.right = scaleBetween(data.yaw, rightMin, rightMax, speedMin, speedMax);

    if (movement.forward > 0) {
      motors.forwardLeft(movement.forward - movement.left);
      motors.forwardRight(movement.forward - movement.right);
      return;
    }

    if (movement.backward > 0) {
      motors.backwardLeft(movement.backward - movement.left);
      motors.backwardRight(movement.backward - movement.right);
      return;
    }
  }

  function scaleBetween(valueIn, baseMin, baseMax, limitMin, limitMax) {
    return ((limitMax - limitMin) * (valueIn - baseMin) / (baseMax - baseMin)) + limitMin;
  }
}

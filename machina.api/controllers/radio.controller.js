module.exports = function (move) {
  var SerialPort = require('serialport');
  var Readline = SerialPort.parsers.Readline;
  var parser = new Readline();
  var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
  });

  port.pipe(parser);

  parser.on('data', function (data) {
    try {
      move.setMotors(JSON.parse(data.toString()));
    }
    catch (exception) {
      move.setMotors({"throttle": 1480});
      // console.log(exception.message);
    }
    // finally {
    // }
  });
}



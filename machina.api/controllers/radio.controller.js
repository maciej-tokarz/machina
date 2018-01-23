// sudo chmod a+rw /dev/ttyAMA0
// sudo chmod 660 /dev/ttyS0
// ls -l /dev/ttyS0
// sudo systemctl mask serial-getty@ttyS0.service

module.exports = function (move) {
  var SerialPort = require('serialport');
  var Readline = SerialPort.parsers.Readline;
  var parser = new Readline();
  var port = new SerialPort('/dev/ttyS0', {
    baudRate: 9600
  });

  console.log('port')
  port.pipe(parser);

  parser.on('data', function (data) {
    try {
      // console.log(JSON.parse(data.toString()))
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



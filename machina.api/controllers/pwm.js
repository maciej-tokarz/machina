var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
}, (error) => {
  if (error) return console.log('Error: ', error.message);
});

port.pipe(parser);

parser.on('data', function (data) {
  data = data.toString();
  console.log(data);
  var rcData = JSON.parse(data);
  console.log(rcData.throttle);
  // console.log(data.toString());
});

var http = require('http');
var fs = require('fs');
var spawn = require('child_process').spawn;

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  });

  var args = ['--nopreview', '-w', '559', '-h', '283', '-q', '50', '-o', 'preview.jpg', '-t', '9999999', '-th', '0:0:0', '-tl', '100'];
  var proc = spawn('raspistill', args);
  var stop = false;

  response.connection.on('close', () => { 
    stop = true;
    if (proc) proc.kill();
  });

  var sendPicture = () => {
    if (stop) return;

    fs.readFile('/home/pi/machina.prv/preview.jpg', (error, content) => {
      response.write('--myboundary\r\n');
      response.write('Content-Type: image/jpeg\r\n');
      response.write('Content-Length: ' + content.length + '\r\n');
      response.write('\r\n');
      response.write(content, 'binary');
      response.write('\r\n');
      setTimeout(sendPicture, 200);
    });
  };

  sendPicture();
});

server.listen(8001, () => {
  console.log('Podgląd uruchomiony na porcie 8001');
});
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var spawn = require('child_process').spawn;
var proc;
var sockets = {};

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

io.on('connection', (socket) => {
  sockets[socket.id] = socket;
  // console.log('Total clients connected : ', Object.keys(sockets).length);

  socket.on('disconnect', () => {
    delete sockets[socket.id];

    if (Object.keys(sockets).length === 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('preview.jpg');
    }
  });

  socket.on('start-stream', () => startStreaming(io));
});

http.listen(8001, () => console.log('Jestem na porcie 8001'));

function stopStreaming() {
  if (Object.keys(sockets).length === 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('preview.jpg');
  }
}

function startStreaming(io) {
  if (app.get('watchingFile')) {
    emitPreview();
    return;
  }

  var args = ['-w', '640', '-h', '480', '-o', 'preview.jpg', '-t', '999999999', '-tl', '100'];
  proc = spawn('raspistill', args);
  app.set('watchingFile', true);
  // fs.watchFile('preview.jpg', () => emitPreview());

  // response.write("--myboundary\r\n")
  // response.write("Content-Type: image/jpeg\r\n")
  // response.write("Content-Length: " + content.length + "\r\n")
  // response.write("\r\n")
  // response.write(content, 'binary')
  // response.write("\r\n")

  setTimeout(() => emitPreview(), 100)
}

function emitPreview() {
  var timeStamp = new Date().getTime();
  io.sockets.emit('liveStream', 'preview.jpg?t=' + timeStamp);
}
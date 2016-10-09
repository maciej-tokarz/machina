var express = require('express')
var http = require('http')
var fs = require('fs')
var app = express()
var server = http.createServer(app)
// app.use(express.static('app'))

app.get('/', function (request, res) {

  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  })

  var stop = false;

  res.connection.on('close', function () { stop = true })

  var sendPicture = function () {

    if (stop) return

    fs.readFile('/apps/stream/picture.jpg', function (err, content) {
      res.write("--myboundary\r\n")
      res.write("Content-Type: image/jpeg\r\n")
      res.write("Content-Length: " + content.length + "\r\n")
      res.write("\r\n")
      res.write(content, 'binary')
      res.write("\r\n")

      setTimeout(sendPicture, 50)
    })
  }

  sendPicture()
})

server.listen(8003, function () {
  console.log('Podgląd uruchomiony')
})
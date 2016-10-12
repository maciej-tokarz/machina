var http = require('http')
var fs = require('fs')

var server = http.createServer(function (request, response) {

  response.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  })

  var stop = false;

  response.connection.on('close', function () { stop = true })

  var sendPicture = function () {

    if (stop) return

    fs.readFile('/apps/stream/picture.jpg', function (error, content) {
      response.write("--myboundary\r\n")
      response.write("Content-Type: image/jpeg\r\n")
      response.write("Content-Length: " + content.length + "\r\n")
      response.write("\r\n")
      response.write(content, 'binary')
      response.write("\r\n")

      setTimeout(sendPicture, 200)
    })
  }

  sendPicture()
})

server.listen(8003, function () {
  console.log('Podgląd uruchomiony')
})
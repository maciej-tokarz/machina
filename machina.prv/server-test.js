var spawn = require('child_process').spawn
var child = spawn('/opt/vc/bin/raspivid', ['-t', '0', '-w', '300', '-h', '168', '-hf', '-vf', '-fps', '30', '-o', '-'])
var http = require('http')

var server = http.createServer(function (request, response) {

  response.writeHead(200, {
    'Content-Type': 'video/h-264',
    'Connection': 'keep-alive',
    'Accept-Ranges': 'bytes'
  })

  child.stdout.pipe(response)

})

server.listen(8003)
console.log('Server is listening')
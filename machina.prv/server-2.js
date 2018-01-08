var spawn = require('child_process').spawn;
var http = require('http');
var child = spawn('/opt/vc/bin/raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']);
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'video/h-264',
    'Connection': 'keep-alive',
    'Accept-Ranges': 'bytes'
  })

  child.stdout.pipe(res);
});
server.listen(8001);
console.log('Kamera została uruchomiona na porcie 8001');
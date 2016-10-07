var express = require('express')
var exec = require('child_process').exec
var app = express()

app.post('/:text', function (req) {
  var cmd = 'espeak -v pl ' + req.params.text + ' 2>/dev/null'
  exec(cmd)
})

app.listen(8001)
var speaker = require('pico-speaker')
// var speaker = require('../../usr/local/lib/node_modules/pico-speaker')

speaker.speak('Running left').then(function() {
  speaker.speak('Done')
}.bind(this))

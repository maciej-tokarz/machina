var speaker = require('pico-speaker')

speaker.speak('Running left').then(function() {
  speaker.speak('Done')
}.bind(this))
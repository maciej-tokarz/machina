var haveEvents = 'ongamepadconnected' in window
var gamepad = null
var timestamp = 1

function connectHandler(e) {
  addGamepad(e)
}

function disconnectHandler() {
  gamepad = null
  // Jakaś metoda zabezpieczająca pojazd na wypadek utraty połączenia z gamepadem
}

function addGamepad(device) {
  gamepad = device
  document.getElementById('gamepad').innerText =
    String.format('Gamepad {0} {1}.',
      gamepad.index,
      gamepad.id)
  requestAnimationFrame(updateStatus)
}

function updateStatus() {

  if (!haveEvents) scanGamepads()

  document.getElementById('timestamp').innerText = gamepad.timestamp
  document.getElementById('axis0').innerText = gamepad.axes[0].toFixed(6)
  document.getElementById('axis1').innerText = gamepad.axes[1].toFixed(6)
  document.getElementById('a').innerText = gamepad.buttons[0].value
  document.getElementById('b').innerText = gamepad.buttons[1].value
  document.getElementById('x').innerText = gamepad.buttons[2].value
  document.getElementById('y').innerText = gamepad.buttons[3].value
  document.getElementById('lb').innerText = gamepad.buttons[6].value
  document.getElementById('rb').innerText = gamepad.buttons[7].value

  if (timestamp < gamepad.timestamp) {
    sendData()
    timestamp = gamepad.timestamp
  }

  requestAnimationFrame(updateStatus)
}

function sendData() {

  $.ajax({
    url: String.format('http://192.168.1.7:8000/{0}/{1}/{2}/{3}/{4}/{5}', 
      gamepad.axes[0].toFixed(6), 
      gamepad.axes[1].toFixed(6),
      gamepad.buttons[0].value,
      gamepad.buttons[1].value,
      gamepad.buttons[2].value,
      gamepad.buttons[3].value),
    type: 'POST',
    // success: function(result) {
    //   document.getElementById('message').innerText = result
    // },
    error: function(error) {
      document.getElementById('message').innerText = error
    },
    timeout: 1000
  })
}

function scanGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [])
  if (gamepads[0] == undefined || gamepad != null) return
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      addGamepad(gamepads[i])
      break
    }
  }
}

window.addEventListener('gamepadconnected', connectHandler)
window.addEventListener('gamepaddisconnected', disconnectHandler)

if (!haveEvents) setInterval(scanGamepads, 1000)
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
  if (gamepad == null || gamepad == 'undefined') return
  document.getElementById('gamepad').innerText =
    String.format('Gamepad podłączony {0} {1}. {2} przycisków, {3} osi.',
      gamepad.index,
      gamepad.id,
      gamepad.buttons.length,
      gamepad.axes.length)
  requestAnimationFrame(updateStatus)
}

function updateStatus() {

  if (!haveEvents) scanGamepad()

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

  // http://192.168.1.44:8000/1/1

  $.ajax({
    url: String.format('http://192.168.1.44:8000/{0}/{1}', gamepad.axes[0].toFixed(6), gamepad.axes[1].toFixed(6)),
    type: 'GET',
    success: function(result) {
      document.getElementById('message').innerText = result
    },
    error: function(error) {
      document.getElementById('message').innerText = error
    },
    timeout: 60000
  })
}

function scanGamepad() {
  var gamepads = navigator.getGamepads()
  if (gamepads == 'undefined') return
  if (gamepad == null) addGamepad(gamepads[0])
  else gamepad = gamepads[0]
}

window.addEventListener('gamepadconnected', connectHandler)
window.addEventListener('gamepaddisconnected', disconnectHandler)

if (!haveEvents) setInterval(scanGamepad, 5000)
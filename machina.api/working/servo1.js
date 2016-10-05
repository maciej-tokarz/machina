var i2cBus = require("i2c-bus")
var Pca9685Driver = require("pca9685").Pca9685Driver

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x60,
    frequency: 50,
    debug: false
};

// var pulseLengths = [1600, 1700, 1800, 1900, 2000, 2100, 2200]
var pulseLengths = [1100, 1150, 1200, 1250, 1300]
var steeringChannel = 1;
var pwm;
var nextPulse = 0;
var timer;

function servoLoop() {
    timer = setTimeout(servoLoop, 500);
    pwm.setPulseLength(steeringChannel, pulseLengths[nextPulse])
    nextPulse += 1
    if (nextPulse === pulseLengths.length) nextPulse = 0
}

process.on("SIGINT", function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    pwm.allChannelsOff();
});

pwm = new Pca9685Driver(options, function startLoop(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }

    console.log("Starting servo loop...");
    servoLoop();
});
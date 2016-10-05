var i2cBus = require("i2c-bus")
var pca9685 = require("pca9685").Pca9685Driver
var pwm;

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x60,
    frequency: 1000,
    debug: false
};

function forward(speed) {
    // Tylne lewe
    pwm.setPulseLength(2, speed); // 100 - 1000
    pwm.setPulseLength(4, 0);
    pwm.setPulseLength(3, 4096);

    // Przednie lewe
    pwm.setPulseLength(7, speed); // 100 - 1000
    pwm.setPulseLength(5, 0);
    pwm.setPulseLength(6, 4096);
    
    // Przednie prawe
    pwm.setPulseLength(8, speed); // 100 - 1000
    pwm.setPulseLength(10, 0);
    pwm.setPulseLength(9, 4096);

    // Tylne prawe
    pwm.setPulseLength(13, speed); // 100 - 1000
    pwm.setPulseLength(11, 0);
    pwm.setPulseLength(12, 4096);
}

function backwards(speed) {
    // Tylne lewe
    pwm.setPulseLength(2, speed); // 100 - 1000
    pwm.setPulseLength(4, 4096);
    pwm.setPulseLength(3, 0);

    // Przednie lewe
    pwm.setPulseLength(7, speed); // 100 - 1000
    pwm.setPulseLength(5, 4096);
    pwm.setPulseLength(6, 0);

    // Przednie prawe
    pwm.setPulseLength(8, speed); // 100 - 1000
    pwm.setPulseLength(10, 4096);
    pwm.setPulseLength(9, 0);

    // Tylne prawe
    pwm.setPulseLength(13, speed); // 100 - 1000
    pwm.setPulseLength(11, 4096);
    pwm.setPulseLength(12, 0);
}

pwm = new pca9685(options, function startLoop(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    pwm.allChannelsOff()
    //forward(400)
    forward(100)
    // backwards(600)
});

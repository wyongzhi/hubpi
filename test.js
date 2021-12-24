const Gpio = require('onoff').Gpio;
const led = new Gpio(6, 'out');
led.writeSync(1);

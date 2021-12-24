const path = require('path');
const fs = require('fs/promises');
const config = require('./config.js').gpio_pin;

exports.readAll = function(){
    fs.readFile(path.join(__dirname, './views'))
}

const gpio_switch = require('./config.js').gpio_pin;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite.db');

db.run('drop table switch_state', () => {
  /*
gpiopin gpio针脚  13
state 开关状态  1 or 0
name 名称，制冷相机
updated_at 最后更新时间 ，2021-12-22 21:25:49
  */
  db.run('CREATE TABLE switch_state (gpiopin INTEGER NULL, state INTEGER NULL, name TEXT NULL, updated_at TEXT NULL)', () => {
    db.run('CREATE UNIQUE INDEX ul_idx on switch_state (gpiopin)', () => {
      gpio_switch.forEach(i => {
        db.run(`INSERT INTO switch_state(gpiopin) VALUES (${i})`);
      });
    });
  });
});


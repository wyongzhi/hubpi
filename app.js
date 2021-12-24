const Koa = require('koa');
const Logger = require('koa-logger')
const Router = require('koa-router');
const Bodyparser = require('koa-bodyparser');
const Views = require('koa-views')
const Static = require('koa-static')
const path = require('path')
const app = new Koa();
const router = new Router();
app.use(Logger());
app.use(Static(path.join(__dirname, '/dist')));
app.use(Views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));
const Gpio = require('onoff').Gpio;

// 应用配置
const config = require('./config.js')
let Switch = {};
config.gpio_pin.forEach(gpio => {
    Switch[gpio] = Switch[gpio] || {};
    Switch[gpio].o = new Gpio(gpio, 'out');
    Switch[gpio].pin = gpio;
});

// 首页
router.get('/', async (ctx) => {
    ctx.type = 'html';
    let list = [];
    
    config.gpio_pin.forEach(gpio => {   
          
        list.push({
            pin : gpio,
            state : Switch[gpio].o.readSync()
        })
    });
    
    await ctx.render('index',{
        data:list
    })
})

// 开
router.get('/on', async(ctx)=>{
    ctx.response.set('Cache-Control','no-cache');
    let pin = ctx.request.query.pin;
    let o = Switch[pin].o;
    o.writeSync(1);
    ctx.redirect('/');
})

// 关
router.get('/off', async(ctx)=>{
    ctx.response.set('Cache-Control','no-cache');
    let pin = ctx.request.query.pin;
    let o = Switch[pin].o;
    o.writeSync(0);
    ctx.redirect('/');
})

// get状态查询

// post重启服务

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);

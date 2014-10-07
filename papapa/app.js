'use strict';

/**
 * Module dependencies.
 */

var ms = require('ms');
var koa = require('koa');
var http = require('http');
var path = require('path');
var swig = require('koa-swig');
var config = require('./config');
var routes = require('./routes');
var mysql = require('./common/mysql');
var logger = require('./common/logger');
var auth = require('./middlewares/auth');
var csrf = require('./middlewares/csrf');
var middlewares = require('koa-middlewares');
var parameter = require('./middlewares/parameter');



var app = koa();
app.keys = config.keys;

//app.use(taobaostatus({
//  statusFile: path.join(__dirname, 'static', 'status.taobao'),
//  checkAvailable: function* () {
//    try {
//      yield mysql.ready();
//    } catch (err) {
//      console.log('checkAvailable() error: %s', err.stack);
//      return false;
//    }
//    return true;
//  }
//}));

app.use(middlewares.favicon());
app.use(middlewares.rt());

var session = require('koa-generic-session');
var redisStore = require('koa-redis');

//redis 缓存数据库
var redis = require('redis');
var client = redis.createClient(config.redis.port, config.redis.host);

client.on("error", function (error) {
    console.log('redis error:', error);
});

app.use(session({
    store: redisStore({
        client: client
    })
}));


//跨域中间件
var cors = require('koa-cors');
app.use(cors());

//静态资源
app.use(middlewares.staticCache({
    dir: 'static',
    prefix: '/static',
    maxAge: ms('1y'),
    buffer: config.debug,
    gzip: config.debug
}));

if (config.debug && process.env.NODE_ENV !== 'test') {
    app.use(middlewares.logger());
}

// use cookie session
app.use(middlewares.cookieSession());
// body parser
app.use(middlewares.bodyparser());

// csrf check
//app.use(csrf(app));

//用户信息验证 （基于 buc 的）
app.use(auth());


//wechat中间件加载
var wechatmiddlewares = require('./middlewares/wechat-middlewares');
app.use(wechatmiddlewares('/wechat'));
app.use(session({ store: redisStore('webot:session:') }))


// swig render，页面渲染===
swig(app, {
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: config.debug ? false : 'memory', // disable, set to false
    ext: 'html'
});

// 参数验证, this.verifyParams(rule);
app.use(parameter(app));

// 路由
app.use(middlewares.router(app));
routes(app);

// default error handler
// by hack onerror
middlewares.onerror(app);

// error logger handler
app.on('error', function (err) {
    if (process.env.NODE_ENV !== 'test') {
        logger.error(err);
    }
});

module.exports = http.createServer(app.callback());

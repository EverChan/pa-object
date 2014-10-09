'use strict';

/**
 * Module dependencies.
 */

var wechat = require('koa-wechat');

var mount = require('koa-mount');

//初始化 koa-wechat 中间件
module.exports = function () {
    return function*(next){
        var weChatToken = 'wechat_token';
        var query = this.query||{},
            method = this.method;
        console.log('wechat:path:' + method);
        yield mount('/wechat', wechat({
            token: weChatToken,
            checksig: !query.checksig,
            session: this.session
        }));

    }
};



'use strict';

/**
 * Module dependencies.
 */

var wechat = require('koa-wechat');

var weChatToken = 'wechat_token';
//初始化 koa-wechat 中间件
module.exports = function () {
//    return function * (next)
//    {
//        var query = this.query || {},
//            path = this.path,
//            method = this.method;
//        console.log('wechat:path:' + method, path);
//        yield wechat({
//            token: weChatToken,
//            checksig: !query.checksig,
//            session: this.session
//        });
//    }

    return wechat({
        token: weChatToken,
        checksig: false
    });


};



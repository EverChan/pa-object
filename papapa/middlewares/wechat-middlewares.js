'use strict';

/**
 * Module dependencies.
 */

var wechat = require('koa-wechat');

var mount = require('koa-mount');

//初始化 koa-wechat 中间件
module.exports = function () {
    return function* (next){
        var weChatToken = 'wechat_token';
        var query = this.query||{},
            path=this.path,
            method = this.method;
        console.log('wechat:path:' + method,path);

       if(path.indexOf('/wechat')==0){
           yield mount('/wechat', wechat({
               token: weChatToken,
               checksig: !query.checksig,
               session: this.session
           }));
       }else{
           yield next;
       }

    }
};



'use strict';

/**
 * Module dependencies.
 */

var parameter = require('parameter');

var wechat = require('koa-wechat');

var app = require('koa')();

app.use(wechat({ token: 'wechat_token' }));


//初始化 koa-wechat 中间件
module.exports = function (path,token) {
    var weChatToken = 'wechat_token';

    return function *(next){
        var pathName=this.path;

        var query=this.query,
            method=this.method;

        if(path && pathName.indexOf(path)===0){
            console.log('wechat:path:'+method);
            yield wechat({
               token: token||weChatToken,
               checksig:!query.checksig,
               session:this.session
            });
        }else{
            yield next;
        }
    }
};



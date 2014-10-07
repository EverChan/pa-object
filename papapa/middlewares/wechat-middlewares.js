'use strict';

/**
 * Module dependencies.
 */

var parameter = require('parameter');
var wechat = require('koa-wechat');

module.exports = function (path,token) {

    //初始化 koa-wechat 中间件
    var wechat = require('koa-wechat'),
        weChatToken = 'wechat_token';
    return function *(next){
        var pathName=this.path;
        if(path && pathName.indexOf(path)==0){
            console.log('wechat:path');
            yield wechat({ token: token||weChatToken});
        }
        yield next;
    }
};


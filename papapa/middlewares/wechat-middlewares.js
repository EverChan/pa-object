'use strict';

/**
 * Module dependencies.
 */

var parameter = require('parameter');

var wechat = require('koa-wechat');



//初始化 koa-wechat 中间件
module.exports = function (path,token) {
    var weChatToken = 'wechat_token';

    return function *(next){
        var pathName=this.path;

        var query=this.query;


        if(path && pathName.indexOf(path)===0){
            console.log('wechat:path:'+this.method);
            yield wechat({ token: token||weChatToken,checksig:!query.checksig});
        }

        //input过程的处理结束，继续执行其他的中间件
        yield next;

       //outinput
       //...
    }
};



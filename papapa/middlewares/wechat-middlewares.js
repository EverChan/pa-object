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

        var query=this.query,
            method=this.method;


        if(path && pathName.indexOf(path)===0){
            console.log('wechat:path:'+method);
            if(method==="GET"){
                yield wechat({ token: token||weChatToken,checksig:!query.checksig});
            }else{
                wechat({ token: token||weChatToken,checksig:!query.checksig});
            }
        }
        
        yield next;

        //yield next;//input过程的处理结束，继续执行其他的中间件

       //outinput
       //...
    }
};



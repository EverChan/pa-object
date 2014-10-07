'use strict';

/**
 * Module dependencies.
 */

var parameter = require('parameter');

var wechat = require('koa-wechat');

var Webot = require('weixin-robot');


//初始化 koa-wechat 中间件
module.exports = function (path,token) {
    var weChatToken = 'wechat_token';

    //初始化回复机器人
    var webot=getWebot();
    console.log(webot,'===1www');

    return function *(next){
        var pathName=this.path;

        this.webot=webot;

        if(path && pathName.indexOf(path)==0){
            console.log('wechat:path');
            yield wechat({ token: token||weChatToken});
        }

        //input过程的处理结束，继续执行其他的中间件
        yield next;

       //outinput
       //...
    }
};



function getWebot(){
    var webot2 = new Webot.Webot();
    webot2.set({
        '/hi/i': 'Hello',
        '/who (are|r) (you|u)/i': 'I\'m a robot.'
    });
    return webot2;
}


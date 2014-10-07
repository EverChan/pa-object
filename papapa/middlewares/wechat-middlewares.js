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

    return function *(next){
        var pathName=this.path;

        if(path && pathName.indexOf(path)==0){
            console.log('wechat:path');

            //初始化机器人
            var media_id = pathName.split('/')[1];

            var webot = getWebot(media_id);

            console.log(webot,'===111');

            this.webot = webot;
            this.wx_token = webot.wx_token;

            yield wechat({ token: token||weChatToken});
        }
        yield next;
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


'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var koaWechat = require('koa-wechat');


exports.index = function ()
{
//    var media_id = this.path.split('/')[1];
//    if (!media_id) {
//        this.throw(404);
//    }
//    var webot = Webot.get(media_id);
//    if (!webot) {
//        this.throw(404);
//    }
//    this.webot = webot;
//    this.wx_token = webot.wx_token;

    var info = this.req.body;
    console.log(this.session,'===',info);
//    info.session = this.session;
    this.body = this.webot.reply(info||{});

};

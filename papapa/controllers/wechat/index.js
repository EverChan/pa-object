'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var koaWechat = require('koa-wechat');

var Webot = require('weixin-robot');

var token = 'wechat_token';

exports.index = function *(next)
{
    var media_id = this.path.split('/')[1];
    if (!media_id) {
        this.throw(404);
    }
    var webot = yield* Webot.get(media_id);
    if (!webot) {
        this.throw(404);
    }
    this.webot = webot;
    this.wx_token = webot.wx_token;

    var info = this.req.body;
    info.session = this.session;
    this.body = yield this.webot.reply(info);

    yield next;
};

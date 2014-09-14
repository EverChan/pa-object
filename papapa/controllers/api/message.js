'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/message');

var Message = require('../../models/message');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/message
exports.index = function
*()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

//  this.verifyParams({
//    uid: {required: true, type: p.Id}
//  });

//  var page = utils.parsePage(this.query);

    this.body = yield Message.getMessageList(uid);
}
;

// GET /api/message:id(sendid)
exports.show = function
*()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var sendid = this.params.id;

    this.body = yield Message.getMessageItem(uid, sendid);

}
;


// post /api/message
exports.create = function
*()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        sendid: {required: true, type: p.Id},
        title: {required: true, type: 'string'}
    });

    var sendid = this.request.body.sendid,
        title = this.request.body.title,
        content = this.request.body.content | "";

    var d = {
        sendid: sendid,
        title: title,
        content: content
    };

    yield Message.sendMessage(uid, d);

    this.status = 200;
    this.body = {isSuccess: 1, data: d};

}
;


// PUT /api/message/:message
exports.update = function
*()
{
    //更新消息

    this.status = 200;
}

// DELETE /api/message/:id
exports.destroy = function
*()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id},
        mid: {required: false, type: p.Id}
    });

    var sendid = this.params.id;


    //mid参数
    var mid = (this.request.body || {}).mid;

    //可通过mid直接做删除标记
    if (mid) {
        yield Message.deleteMessageByMid(uid, mid);
    } else {
        yield Message.deleteMessage(uid, sendid);
    }

    this.status = 200;
}



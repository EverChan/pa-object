'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/attention');

var Attention = require('../../models/attention');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/attention
exports.index = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

//  this.verifyParams({
//    uid: {required: true, type: p.Id}
//  });

//  var page = utils.parsePage(this.query);


    this.body = yield Attention.selectAttentionList(uid);
}
;

// GET /api/attention:attentionto
exports.show = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        attentionto: {required: true, type: p.Id}
    });

    var attentionto = this.params.attentionto;

    this.body = yield Attention.selectAttentionItem(uid, attentionto);

    this.status = 200;
}
;


// post /api/attention
exports.create = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        attentionto: {required: true, type: p.Id}
    });

    var attentionto = (this.request.body||{}).attentionto;


    var aItem = (yield Attention.selectAttentionItem(uid, attentionto))[0];

    console.log(aItem);

    if (!aItem) {
        yield Attention.createAttention(uid, attentionto);
        this.status = 200;
    } else {
        this.status = 304;
    }

}
;

// PUT /api/attention/:attentionto
exports.update = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var attentionto = this.params.id;

    var status = 1;
    var aItem = (yield Attention.selectAttentionItem(attentionto, uid))[0];

    if (aItem) {
        aItem.status = ++status;
        //更新对方关注的状态
        var isUpdated = yield Attention.updateAttention(attentionto, uid, aItem);
    }

    yield Attention.updateAttention(uid, attentionto, {status: status});

    this.status = 200;
}

// DELETE /api/attention/:id
exports.destroy = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var attentionto = this.params.id;

    var aItem = (yield Attention.selectAttentionItem(uid,attentionto))[0];

    //存在关注，则删除
    if (aItem) {
        yield Attention.deleteAttention(aItem.aid);
    }

    //查询是否被关注，并修改状态
    var beAItem=(yield Attention.selectBeAttentionedItem(uid,attentionto))[0];
    if(beAItem){
        aItem.status-=1;
        yield Attention.updateAttention(attentionto,uid,aItem);
    }

    this.status = 200;
}



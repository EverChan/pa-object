'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/relation');

var Relation = require('../../models/relation');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/relation
exports.index = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

//  this.verifyParams({
//    uid: {required: true, type: p.Id}
//  });

//  var page = utils.parsePage(this.query);

    this.body = yield Relation.getRelationList(uid);
}
;

// GET /api/relation:id
exports.show = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var bid = this.params.id;

    this.body = yield Relation.getRelationItem(uid, bid);

}
;


// post /api/relation
exports.create = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
       bid: {required: true, type: p.Id}
    });

    var bid = (this.request.body||{}).bid;

    yield Relation.createRelation(uid, bid);

    this.status = 200;

}
;


// PUT /api/relation/:bid
exports.update = function * ()
{
    //更新消息
    //session中获取uid
    var uid = this.session.user.uid || 1;
    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var bid = this.params.id;
    var _data = {
        status: 1
    };

    yield Relation.updateRelation(uid, bid, _data);

    this.status = 200;
}

// DELETE /api/message/:id
exports.destroy = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: p.Id}
    });

    var bid = this.params.id;

    yield Relation.deleteRelation(uid, bid);

    this.status = 200;
}



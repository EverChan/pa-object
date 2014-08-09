'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/users');

var Users = require('../../models/users');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/users
exports.index = function * ()
{
    this.verifyParams({
        uid: {required: false, type: p.Id}
    });
//    var page = utils.parsePage(this.query);

    this.body = yield Users.selectByUid();
}
;

// GET /api/users:uid
exports.show = function * ()
{
    this.verifyParams(rules.id);

    //session中获取uid
    var uid = this.session.user.uid || 1;

    var id=this.params.id;
    //查询自身
    if(uid==id){
        this.body = yield Users.selectByUid(uid);
    }else{
        this.body = yield Users.selectOtherByUid(this.params.id);
    }

}
;




// POST /api/users
exports.create = function * (next)
{

    this.verifyParams({
        username: 'string',
        phone: rules.phone,
        password: 'string'
    });

    yield Users.newUser(this.request.body);

    this.status = 201;//201表示Created，200表示ok

}
;

// PUT /api/cases/:id
exports.update = function * (next)
{
    this.verifyParams(rules.id);

    var id = this.params.id;
    yield Users.updateByUid(id, this.request.body);
    this.status = 200;
}
;


// DELETE /api/cases/:id
exports.destroy = function * (next)
{
    this.verifyParams(rules.id);


    this.status = 200;
}
;


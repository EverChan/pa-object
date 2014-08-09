'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/login');

var Login = require('../../models/login');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

var randomToken = require('random-token');

// GET /api/login
exports.index = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

//  this.verifyParams({
//    uid: {required: true, type: p.Id}
//  });

//  var page = utils.parsePage(this.query);

    this.body = yield Login.getLoginList(uid);
}
;

// GET /api/login:id
exports.show = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: 'string'}
    });

    var otherId = this.params.id;

    var token=(this.request.body||{}).token;

    //如果有token，则查询token的信息
    if(token){
        this.body = yield Login.getLoginByToken(uid,token);
    }else{
        this.body = yield Login.getLoginRecently(otherId);
    }

}
;


// post /api/login
exports.create = function * ()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
       location: {required: true, type: 'string'}
    });

    var location = (this.request.body||{}).location;

    var _data={
        location:location,
        token:randomToken(16)
    };

    //创建登陆记录
    yield Login.createLogin(uid, _data);

    this.body=_data;

}
;

//put /api/login:id
exports.update=function*(){

    this.status=200;
}

//DELETE /api/login:id
exports.destroy=function*(){

    this.status=200;
}
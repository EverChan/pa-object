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
exports.index = function
*()
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
exports.show = function
*()
{
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        id: {required: true, type: 'string'}
    });

    var token = this.params.id;//token


    //如果有token，则查询token的信息
    if (token) {
        var result = yield Login.getLoginByToken(uid, token);
        var startTime = new Date(result.addtime),
            nowTime = new Date();

        var timeArea = 1 * 60 * 60 * 1000;//一个小时间隔
        if (nowTime.valueOf() - startTime.valueOf() > timeArea) {
            result.isSuccess = 0;
            result.error = 'token过期';
        } else {
            result.isSuccess = 1;
        }
        this.body = result;

    } else {
        this.body = yield Login.getLoginRecently(uid);
    }
}
;


// post /api/login
exports.create = function
*()
{

    console.log('login--create===')
    //session中获取uid
    var uid = this.session.user.uid || 1;

    this.verifyParams({
        phone: {required: true, type: 'string'},
        pwd: {required: true, type: 'string'},
        location: {required: false, type: 'string'}
    });

    var phone = (this.request.body || {}).phone;
    var pwd = (this.request.body || {}).pwd;
    var location = (this.request.body || {}).location;

    var _data = {
        phone: phone,
        pwd: pwd,
        location: location,
        isSuccess: 1,
        token: randomToken(16)
    };

    //创建登陆记录
    var result = yield Login.createLogin(uid, _data);

    if (result.error) {
        _data.isSuccess = 0;
        _data.error = result.error;
    }

    delete _data.pwd;//删除密码值

    this.body = _data;

}
;

//put /api/login:id
exports.update = function
*()
{

    this.status = 200;
}
;

//DELETE /api/login:id
exports.destroy = function
*()
{

    this.status = 200;
}
;
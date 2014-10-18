//用户表models:wechat_users

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');

//注册新用户
var NEW_USER = multiline(function () {
    ;
    /*
     INSERT INTO wechat_users
     SET ?
     */
});

exports.newUser = function * (data)
{
    var args = {
        openid: data.openid,
        city: 'hangzhou',
        nickname: data.openid,
        sex: 'man',
        pic: "http://121.40.76.237/static/images/1.jpg",
        createtime: new Date(),
        updatetime: new Date()
    };
    return yield mysql.query(NEW_USER, [args]);
};


//获取用户信息 by  city
var SELECT_USERS_BY_CITY=multiline(function () {
    ;
    /*
     SELECT * from wechat_users
     WHERE city=?
     */
});

exports.selectUsersByCity = function * (city)
{
    if (!city) {
        return null;
    }

    return yield mysql.query(SELECT_USERS_BY_CITY, [city]);
};

//获取用户信息 by  openid
var SELECT_BY_OPENID=multiline(function () {
    ;
    /*
     SELECT * from wechat_users
     WHERE openid=?
     */
});

exports.selectByOpenId = function * (openid)
{
    var _openid = openid;
    if (!_openid) {
        return null;
    }

    return yield mysql.query(SELECT_BY_OPENID, [_openid]);
};


//更新用户信息
var UPDATE_BY_OPENID = multiline(function () {
    ;
    /*
     UPDATE wechat_users
     SET ?
     WHERE openid=?
     */
});
exports.updateByOpenId = function * (openid, data)
{
    var _openid = openid;
    if (!_openid) {
        return null;
    }

    var args = {
        updatetime: new Date()
    };
    for (var k in data) {
        args[k] = data[k];
    }

    return yield mysql.query(UPDATE_BY_OPENID, [args, _openid]);
};









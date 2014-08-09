

//用户表models:users

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');

//注册新用户
var NEW_USER = multiline(function () {;/*
     INSERT INTO users
     SET ?
*/});

exports.newUser = function * (data){
    var args = {
        username: data.username,
        password: data.password,
        email: data.email,
        nickname: data.nickname,
        phone: data.phone,
        sex: data.sex,
        birthday: new Date(),
        city: data.city,
        school: data.school,
        job: data.job,
        wechat: data.wechat,
        hobby: data.hobby,
        addtime: new Date(),
        updatetime: new Date()
    };
    return yield mysql.query(NEW_USER, [args]);
};


//更新用户信息
var UPDATE_BY_UID = multiline(function () {;/*
     UPDATE users
     SET ?
     WHERE uid=?
*/});
exports.updateByUid = function * (uid, data){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }

    var args = {
        username: data.username,
        email: data.email,
        nickname: data.nickname,
        sex: data.sex,
        birthday: new Date(),
        city: data.city,
        school: data.school,
        job: data.job,
        wechat: data.wechat,
        hobby: data.hobby,
        addtime: new Date(),
        updatetime: new Date()
    };

    return yield mysql.query(UPDATE_BY_UID, [args, _uid]);
};

//更新密码
exports.updatePwdByUid = function * (uid, data){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }

    var args = {
        password: data.password
    };

    return yield mysql.query(UPDATE_BY_UID, [args, _uid]);
};


//查询用户 by id
var SELECT_BY_UID = multiline(function () {;/*
     SELECT *
     FROM users
     WHERE uid = ?
*/});

exports.selectByUid = function * (uid){
    var uid = parseInt(uid, 10);
    if (!uid) {
        //查询所有的用户
        return yield mysql.query('select * from users');
    }
    return yield mysql.query(SELECT_BY_UID, [uid]);
};


//查询用户 by username
var SELECT_BY_USERNAME = multiline(function () {;/*
     SELECT *
     FROM users
     WHERE username = ?
*/});

exports.selectByPhone = function * (username){
    var _username = String(username);

    return yield mysql.query(SELECT_BY_USERNAME, [_username]);
};

//查询用户 by phone
var SELECT_BY_PHONE = multiline(function () {;/*
     SELECT *
     FROM users
     WHERE phone = ?
*/});

exports.selectByPhone = function * (phone){
    var _phone = String(phone);

    return yield mysql.query(SELECT_BY_PHONE, [_phone]);
};








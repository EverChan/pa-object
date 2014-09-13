//登陆信息表models:login

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');


var usersModel=require('./users');


//查询最新的登陆信息列表
var SELECT_LoginList = multiline(function () {;/*
 SELECT * FROM login
 group by uid order by loginid DESC limit 10
 */});

exports.getLoginList = function* (uid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_LoginList);
};

//查询最新一条的登陆信息
var SELECT_LoginRecently = multiline(function () {;/*
 SELECT * FROM login
 WHERE uid=? order by id DESC limit 10
 */});
exports.getLoginRecently=function* (uid,bid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_LoginRecently, [_uid]);
}

//根据token查询
var SELECT_LoginByToken=multiline(function () {;/*
 SELECT * FROM login
 WHERE uid=? and token=?
 */});
exports.getLoginByToken=function* (uid,token){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    var result=yield mysql.query(SELECT_LoginByToken, [_uid,token]);
    return result[0];
}


//生成一条登陆信息
var CREATE_Login=multiline(function () {;/*
 INSERT INTO login
 SET ?
 */});
exports.createLogin=function* (uid,data){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }

    var error='';



    //查询用户
    var users= (yield usersModel.selectByPhone(data.phone))[0];

    console.log(users,data.pwd);
    if(users){
        if(users.password!=data.pwd){
            error='密码错误';
        }
    }else{
        error='用户不存在';
    }

    var _data={
        uid:_uid,
        location:data.location,
        phone:data.phone,
        token:data.token,
        error:error,//复制错误信息
        addtime:new Date()
    };

    yield mysql.query(CREATE_Login, [_data]);

    return _data;
}





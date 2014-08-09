

//消息表models:message

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');


//查询消息列表
var SELECT_MessageList = multiline(function () {;/*
 SELECT * FROM message
 WHERE uid=? and isdel IS NULL
 */});

exports.getMessageList = function* (uid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_MessageList, [_uid]);
};

//查询单条消息
var SELECT_MessageItem = multiline(function () {;/*
 SELECT * FROM message
 WHERE uid=? and sendid=? and isdel IS NULL order by mid DESC limit 1
 */});
exports.getMessageItem=function* (uid,sendid){
    var _uid = parseInt(uid, 10),
        _sendid=parseInt(sendid, 10);
    if (!_uid||!_sendid) {
        return null;
    }
    return yield mysql.query(SELECT_MessageItem, [_uid,_sendid]);
}


//发送消息
var SEND_Message=multiline(function () {;/*
 INSERT INTO message
 SET ?
 */});
exports.sendMessage=function* (uid,data){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }

    var _data={
        title:data.title,
        content:data.content,
        uid:_uid,
        sendid:data.sendid,
        addtime:new Date()
    }

    return yield mysql.query(SEND_Message, [_data]);
}



//标记删除
var DEL_Message = multiline(function () {;/*
 UPDATE message
 SET ?
 WHERE uid = ? and sendid = ?
 */});
exports.deleteMessage=function* (uid,sendid){
    var _uid = parseInt(uid),
        _sendid=parseInt(sendid);
    if (!_uid||!_sendid) {
        return null;
    }
    var _data={
        isdel:1
    };

    return yield mysql.query(DEL_Message, [_data,_uid,_sendid]);
};

//标记指定id的错误
var DEL_MessageByMid = multiline(function () {;/*
 UPDATE message
 SET ?
 WHERE mid= ?
 */});
exports.deleteMessageByMid=function* (uid,mid){
    var _uid = parseInt(uid),
        _mid=parseInt(mid);
    if (!_uid||!_mid) {
        return null;
    }
    var _data={
        isdel:1
    };

    return yield mysql.query(DEL_MessageByMid, [_data,_mid]);
};

















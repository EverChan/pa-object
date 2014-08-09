

//关注表models:attention

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');


//查询关注列表
var SELECT_Attention = multiline(function () {;/*
 SELECT * FROM attention
 WHERE uid=?
 */});

exports.selectAttentionList = function* (uid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_Attention, [_uid]);
};

//查询是否关注-单个
var SELECT_AttentionedItem = multiline(function () {;/*
    SELECT * FROM attention
    WHERE uid=? and attentionto=?
 */});
exports.selectAttentionItem = function* (uid,attentionto){
    var _uid = parseInt(uid, 10),
        _attentionto=parseInt(attentionto, 10);
    if (!_uid||!_attentionto) {
        return null;
    }
    return yield mysql.query(SELECT_AttentionedItem, [_uid, _attentionto]);
};


//查询是否被关注-单个
var SELECT_BeAttentioned = multiline(function () {;/*
 SELECT * FROM attention
 WHERE  attentionto=? and uid=? and status=2
 */});
exports.selectBeAttentionedItem = function* (uid,attentionto){
    var _uid = parseInt(uid, 10),
        _attentionto=parseInt(attentionto, 10);
    if (!_uid||!_attentionto) {
        return null;
    }
    return yield mysql.query(SELECT_BeAttentioned, [_uid, _attentionto]);
};



//创建关注
var CREATE_Attention = multiline(function () {;/*
     INSERT INTO attention
     SET ?
 */});

exports.createAttention = function* (uid,attentionto){
    var _uid = parseInt(uid, 10),
        _attentionto=parseInt(attentionto, 10);
    if (!_uid||!_attentionto) {
        return null;
    }

    var data={
        uid:_uid,
        attentionto:_attentionto,
        status:1,//1单方面关注，2代表相互关注，0代表没有关注
        addtime: new Date(),
        updatetime: new Date()
    }

    return yield mysql.query(CREATE_Attention, [data]);
};

//更新关注
var UPDATE_Attention = multiline(function () {;/*
 UPDATE attention
 SET ?
 WHERE uid=? and attentionto=?
 */});
exports.updateAttention=function* (uid,attentionto,data){
    var _uid = parseInt(uid, 10),
        _attentionto=parseInt(attentionto, 10);
    if (!_uid||!_attentionto) {
        return null;
    }
    var _data={
        status:data.status,//1单方面关注，2代表相互关注，0代表没有关注
        updatetime: new Date()
    }

    return yield mysql.query(UPDATE_Attention, [_data,_uid,_attentionto]);
};

//删除关注
//更新关注
var DEL_Attention = multiline(function () {;/*
     DELETE
     FROM attention
     WHERE aid = ?
 */});
exports.deleteAttention=function* (aid){
    var _aid = parseInt(aid);
    if (!_aid) {
        return null;
    }
    return yield mysql.query(DEL_Attention, [_aid]);
};















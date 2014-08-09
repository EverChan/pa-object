

//关注表models:attention

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');

//关组
var NEW_Attention = multiline(function () {;/*
     INSERT INTO attention
     SET ?
*/});

exports.newAttention = function * (data){
    var args = {
        uid: data.uid,
        attentionto:data.attentionto,
        status:1,
        addtime: new Date(),
        updatetime: new Date()
    };
    return yield mysql.query(NEW_Attention, [args]);
};


//更新关注状态：取消关注，添加关注
var UPDATE_Attention = multiline(function () {;/*
     UPDATE attention
     SET ?
     WHERE aid=?
*/});
exports.updateByUid = function * (aid, data){
    var _aid = parseInt(aid, 10);
    if (!_aid) {
        return null;
    }

    var args = {
        status:data.status||0,
        updatetime: new Date()
    };

    return yield mysql.query(CANCEL_Attention, [args, _aid]);
};



//查询关注
var SELECT_Attention = multiline(function () {;/*
 SELECT * FROM attention
 WHERE uid=? or attentionto=?
 */});

exports.selectAttentionByUid = function * (uid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_Attention, [_uid, _uid]);
};







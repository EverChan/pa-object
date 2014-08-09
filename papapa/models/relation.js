//关系表models:relation

'use strict';

/**
 * Module dependencies.
 */

var multiline = require('multiline');
var mysql = require('../common/mysql');
var utils = require('../lib/utils');


//查询关系列表
var SELECT_RelationList = multiline(function () {;/*
 SELECT * FROM relation
 WHERE aid=?
 */});

exports.getRelationList = function* (uid){
    var _uid = parseInt(uid, 10);
    if (!_uid) {
        return null;
    }
    return yield mysql.query(SELECT_RelationList, [_uid]);
};

//查询单条关系
var SELECT_RelationItem = multiline(function () {;/*
 SELECT * FROM relation
 WHERE aid=? and bid=?
 */});
exports.getRelationItem=function* (uid,bid){
    var _uid = parseInt(uid, 10),
        _bid=parseInt(bid, 10);
    if (!_uid||!_bid) {
        return null;
    }
    return yield mysql.query(SELECT_RelationItem, [_uid,bid]);
}


//发送关系
var CREATE_Relation=multiline(function () {;/*
 INSERT INTO relation
 SET ?
 */});
exports.createRelation=function* (uid,bid){
    var _uid = parseInt(uid, 10),
        _bid=parseInt(bid, 10);
    if (!_uid) {
        return null;
    }

    var _data={
        aid:_uid,
        bid:_bid,
        updatetime:new Date(),
        addtime:new Date()
    }
    return yield mysql.query(CREATE_Relation, [_data]);
}

//更新关系
var UPDATE_Relation=multiline(function () {;/*
 UPDATE relation
 SET ?
 WHERE aid=? and bid=?
 */});
exports.updateRelation=function* (uid,bid,data){
    var _uid = parseInt(uid, 10),
        _bid=parseInt(bid, 10);
    if (!_uid||!_bid) {
        return null;
    }

    var _data={
        status:data.status||1,
        updatetime:new Date()
    }

    return yield mysql.query(UPDATE_Relation, [_data,_uid,_bid]);
}


//删除关系
var DELETE_Relation=multiline(function () {;/*
 DELETE * FROM relation
 WHERE aid=? and bid=?
 */});
exports.deleteRelation=function* (uid,bid){
    var _uid = parseInt(uid, 10),
        _bid=parseInt(bid, 10);
    if (!_uid||!_bid) {
        return null;
    }
    return yield mysql.query(DELETE_Relation, [_uid,_bid]);

}



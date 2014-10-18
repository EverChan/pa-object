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
exports.index = function
*()
{
    this.verifyParams({
        uid: {required: false, type: p.Id}
    });
//    var page = utils.parsePage(this.query);

    var result = yield Users.selectByUid();

    //推荐的人
    var resList = [];
//    result.forEach(function(item){
//
//    });

    //demo数据
    for (var i = 0; i < 9; i++) {
        resList.push({
            uid: i,
            pic: 'img/1.jpg',
            nickname: i + '' + i
        });
    }

    this.body = {
        isSuccess: 1,
        data: resList
    };
};

// GET /api/users:uid
exports.show = function *()
{
    this.verifyParams(rules.id);

    //session中获取uid
    var uid = this.session.user.uid || 1;

    var myPhone = this.session.user.phone || '13867458172';


    var id = this.params.id;//phone

    console.log(this.session.user, id);

    //查询自身
    var persionItem;
    if (uid == id || myPhone == id) {
        persionItem = yield Users.selectByUid(uid);
    } else {
        persionItem = yield Users.selectOtherByUid(id);
    }

    this.body = {
        isSuccess: 1,
        data: persionItem[0]};
}
;


// POST /api/users
exports.create = function
*(next)
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
exports.update = function
*(next)
{
    this.verifyParams(rules.id);

    var id = this.params.id;
    yield Users.updateByUid(id, this.request.body);
    this.status = 200;
}
;


// DELETE /api/cases/:id
exports.destroy = function
*(next)
{
    this.verifyParams(rules.id);


    this.status = 200;
}
;


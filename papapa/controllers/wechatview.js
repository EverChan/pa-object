'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechatview');

var Users = require('../models/wechat_users');

var Utils = require('../lib/utils');

var qqwry = require('lib-qqwry').info(); //调用并初始化，普通机器初始需要70毫秒左右;


exports.index = function* () {

    var usersList=yield Users.selectUsersByCity('hangzhou');


    var ipValue=Utils.getReqIp(this.req);
    console.log(ipValue);

    var ipL = qqwry.searchIP(ipValue); //查询IP信息

  yield* this.render('wechatview/index.html', {
    page: 'index',
    list:usersList
  });
};

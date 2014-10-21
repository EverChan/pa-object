'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechatview');

var Users = require('../models/wechat_users');


var ip=require("ip");
var qqwry = require('lib-qqwry').info(); //调用并初始化，普通机器初始需要70毫秒左右;


exports.index = function* () {

    var usersList=yield Users.selectUsersByCity('hangzhou');

//    console.log(usersList);
    var ipValue=ip.address();
    var ipL = qqwry.searchIP(ipValue); //查询IP信息

    console.log(ipL,ipValue);



  yield* this.render('wechatview/index.html', {
    page: 'index',
    list:usersList
  });
};

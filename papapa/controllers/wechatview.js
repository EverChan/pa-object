'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechatview');

var Users = require('../models/wechat_users');

var Utils = require('../lib/utils');

//var qqwry = require('lib-qqwry').info(); //调用并初始化，普通机器初始需要70毫秒左右;

var request=require("koa-request");

//search ip info
var serchIpUrl='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';


exports.index = function* () {

    var usersList=yield Users.selectUsersByCity('hangzhou');

    var ipValue=Utils.getReqIp(this.req);
//    console.log(ipValue);
//    var ipL = qqwry.searchIP('223.93.167.85'); //查询IP信息

    var response=yield request({url:serchIpUrl+ipValue,headers: { 'User-Agent': 'request' }});
    var ipinfo=JSON.parse(response.body);

    console.log(ipValue,ipinfo);


    yield* this.render('wechatview/index.html', {
        page: 'index',
        list:usersList,
        ipinfo:ipinfo
    });

};

'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.index = function *(){
    console.log('wechat:index');
};

//post /wechat
exports.create=function *(){
    console.log('wechat:create');
    var param=this.req.body,
        query=this.query;
    console.log(param);
    this.status = 200;
    //this.body不能覆盖，所有信息放到this.req.body中。
    // koa-wechat会将req.body数据组装成xml赋给this.body返回给服务器
//    this.req.body=param||{};
};
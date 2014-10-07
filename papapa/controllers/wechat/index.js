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
    console.log('post:/wechat');
    console.log(this.request);
    var param=this.request.body,
        query=this.query;
    console.log(param,query);
    this.status = 200;
    this.body=param||{};
};
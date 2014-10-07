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
    var msg=this.body;
    console.log(msg);
    this.status = 200;
    this.body=msg||{};
};
'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.index = function *()
{

};

//post /wechat
exports.create=function *(){
    var msg=this.req.body;
    console.log(msg);
    this.status = 200;
    this.body=msg||{};
};
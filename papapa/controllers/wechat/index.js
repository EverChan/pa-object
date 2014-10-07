'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get
exports.index = function *()
{

};

//post
exports.create=function *(){
    var msg=this.req.body;
    console.log(msg);
};
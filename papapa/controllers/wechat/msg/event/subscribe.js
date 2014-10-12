'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.resMsg=function* (req,raw){
    var res={
        msgType: 'text',
        content: "欢迎关注我们，" + raw.ToUserName
    };

   return yield res;
}
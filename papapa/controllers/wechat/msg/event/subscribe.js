'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.msgRes=function* (req,raw){
    var res={
        msgType: 'text',
        content: "欢迎订阅，" + raw.ToUserName
    };

    yield res;
}
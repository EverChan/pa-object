'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

var newsMsg=require('../news');


//get /wechat
exports.resMsg=function* (req,raw){
    var content=raw.Content;

    //如果是新闻关键字，回复新闻===
    if(content=='news'){
        yield newsMsg.resMsg(req,raw);
    }

    var res={
        msgType: 'text',
        content: "你好，" + raw.ToUserName+'。你的消息已收到：'+raw.Content
    };

    return yield res;
}
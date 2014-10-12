'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.resMsg=function* (req,raw){
    var res={
        msgType: 'image',
        content: "你好，" + raw.ToUserName+'。你的消息已收到：'+raw.Content,
//        picUrl:raw.PicUrl,
        media_id:raw.MediaId
    };

    return yield res;
}
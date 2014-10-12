'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.resMsg=function* (req,raw){
    var param=req.param;
    var res={
        msgType: 'music',
        content: {
            title:"你好，" + raw.ToUserName+'。你的音乐已收到：'+raw.Content,
//          picUrl:param.picUrl,
            thumbMediaId:param.mediaId
        }
    };

    return yield res;
}
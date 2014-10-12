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
        msgType: 'video',
        content: {
            title:"你好，" + raw.ToUserName+'。你的视频已收到：'+raw.Content,
//            picUrl:param.picUrl,
            mediaId:param.mediaId
        }
    };

    return yield res;
}
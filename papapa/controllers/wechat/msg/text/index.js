'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

var newsMsg=require('../news');

var Users = require('../../../../models/wechat_users');


//get /wechat
exports.resMsg=function* (req,raw){
    var content=raw.Content;

    var reContent="你好，" + raw.ToUserName+'。你的消息已收到：'+raw.Content;

    //如果是新闻关键字，回复新闻===
    if(content=='news'){
       return yield newsMsg.resMsg(req,raw);
    }

    //离线
    if(content=='pa'){
        yield Users.updateByOpenId(openid,{'status':'offline'});
        reContent=['你已处于离线状态，上线请回复：papapa','http://121.40.76.237/wechatview/'];
    }

    //在线
    if(content=='papapa'){
        yield Users.updateByOpenId(openid,{'status':'online'});
        reContent=['你已处于在线状态，离线请回复：papapa','http://121.40.76.237/wechatview/'];
    }


    var res={
        msgType: 'text',
        content:reContent
    };

    return yield res;
}
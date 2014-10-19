'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

var Users = require('../../../../models/wechat_users');

//get /wechat
exports.resMsg=function* (req,raw){
    var res={
        msgType: 'text',
        content: "谢谢光临，" + raw.ToUserName
    };

    var openid=raw.ToUserName;

    var user=yield Users.selectByOpenId(openid);
    if(user.length){
        yield Users.updateByOpenId(openid,{'subscribe':'0'});
        console.log('用户取消关注');
    }
    return yield res;
}
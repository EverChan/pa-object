'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:subscribe');

var wechat = require('wechat');

var Users = require('../../models/wechat_users');


//get /wechat
exports.resMsg=function* (req,raw){
    var openid=raw.ToUserName;

    var msgList=["欢迎关注我们，" + openid,'帮助说明：','h --回复帮助文档','pa --设置在线','更换头像：请在对话模式下发送图片'];

    var res={
        msgType: 'text',
        content: msgList.join('\n')
    };

    var user=yield Users.selectByOpenId(openid);
    if(user.length){
        yield Users.updateByOpenId(openid,{'subscribe':'1'});
        console.log('老用户');
    }else{
        yield Users.newUser({
            openid:openid
        });
        console.log('新用户');
    }

   return yield res;
}
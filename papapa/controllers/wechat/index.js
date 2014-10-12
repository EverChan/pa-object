'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.index = function * ()
{
    console.log('wechat:index');
};

//post /wechat
exports.create = function * ()
{
    console.log('wechat:create');
    var req = this.req.body,//https://github.com/node-webot/weixin-robot 数据格式
        raw = req.raw,
        query = this.query;
    console.log(req);
    this.status = 200;
    //this.body不能覆盖，所有信息放到this.req.body中。
    // koa-wechat会将req.body数据组装成xml赋给this.body返回给服务器
    //  this.req.body=param||{};

    //消息类型处理
    var msgType = raw.MsgType,
        event=raw.Event;
    var requirePath=['./msg'];
    if(msgType)requirePath.push(msgType);
    if(event)requirePath.push(event);


    try{
        var msgRes=require(requirePath.join("/"));
        this.body=yield msgRes.resMsg(req,raw);
    }catch (e){
        this.body = {
            msgType: 'text',
            content: "系统错误：" + e
        };
    }

    //设置相应的数据
//    this.body = {
//        msgType: 'text',
//        content: "你好，" + raw.ToUserName
//    };
}
;
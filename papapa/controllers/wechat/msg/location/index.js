'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

//经纬度计算
var where=require("where");

//get /wechat
exports.resMsg=function* (req,raw){
    var param=req.param;
    var whereName=param.label;
    if(!whereName){
        whereName="经度："+param.lat+",维度："+param.lng;
    }
    var res={
        msgType: 'text',
        content: "你好，" + raw.ToUserName+'。已经记录您的位置：'+whereName
    };

    return yield res;
}
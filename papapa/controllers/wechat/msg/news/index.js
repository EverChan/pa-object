'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');


//get /wechat
exports.resMsg=function* (req,raw){
    var param=req.param;

    var newsList=[{
        title: '点击查看列表',
        url: 'http://121.40.76.237/wechatview/',
        picUrl: 'http://121.40.76.237/static/images/logo2.jpg'
    }];

    var res={
        msgType: 'news',
        content: newsList
    };

    return yield res;
}
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
        title: '新闻1',
        url: 'http://121.40.76.237/wechatview/',
        picUrl: 'http://localhost:3000/static/images/logo2.jpg'
    }, {
        title: '新闻2',
        url: 'http://121.40.76.237/wechatview/',
        picUrl: 'http://localhost:3000/static/images/1.jpg'
    }];

    var res={
        msgType: 'news',
        content: newsList
    };

    return yield res;
}
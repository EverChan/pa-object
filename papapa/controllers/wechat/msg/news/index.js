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
        url: 'http://',
        picUrl: ''
    }, {
        title: '新闻2',
        url: 'http://...',
        picUrl: 'http://...'
    }];

    var res={
        msgType: 'news',
        content: newsList
    };

    return yield res;
}
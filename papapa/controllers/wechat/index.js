'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

var token='wechat_token';

exports.index = function* () {

    wechat(token,function(req,res,next){
        res.reply('Hello world!');
        console.log('wwechat===reply');
    });

    this.body= yield (wechat(token,function(req,res,next){
        res.reply('Hello world!');
        console.log('wwechat===reply');
    }));
};

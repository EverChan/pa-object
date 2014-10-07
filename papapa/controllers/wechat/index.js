'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

exports.index = function* () {
  this.body='wechat/index';

};

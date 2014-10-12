'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechatview');

exports.index = function* () {
  yield* this.render('wechatview/index.html', {
    page: 'index'
  });
};

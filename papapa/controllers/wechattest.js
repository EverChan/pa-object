'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechattest');

exports.index = function* () {
  yield* this.render('wechattest.html', {
    page: 'index'
  });
};

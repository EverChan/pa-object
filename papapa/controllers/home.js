/*!
 * maoxu-web - controllers/home.js
 * Copyright(c) 2014 Tmall.com
 * Author: busi.hyy <busi.hyy@alibaba-inc.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:home');

exports.index = function* () {
  yield* this.render('index.html', {
    totalRes: 10,
    page: 'index'
  });
};

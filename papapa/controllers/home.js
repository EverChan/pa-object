

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

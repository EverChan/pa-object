'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:test');

exports.index = function* () {
  yield* this.render('test.html', {
    page: 'index'
  });
};

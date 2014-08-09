
'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');
var compose = require('koa-compose');
var csrf = require('koa-middlewares').csrf;

module.exports = function (app) {
  csrf(app);
  if (process.env.NODE_ENV === 'test') {
    return noop;
  }
  return compose([csrf.middleware, setCsrf]);
};

function* setCsrf(next) {
  this.locals = this.locals || {};
  this.locals.csrf = this.csrf;
  yield* next;
}

function* noop(next) {
  return yield* next;
}
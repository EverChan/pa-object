
'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/users');

var Users = require('../../models/users');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/users:uid
exports.index = function* () {
  this.verifyParams({
    uid: {required: true, type: p.Id}
  });
  var page = utils.parsePage(this.query);

  this.body = yield Users.selectByUid(this.query.uid);
};

exports.getAll = function* () {
    this.verifyParams({
        uid: {required: false, type: p.Id}
    });
    var page = utils.parsePage(this.query);

    this.body = yield Users.selectByUid();
};

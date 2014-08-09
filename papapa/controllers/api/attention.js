
'use strict';

/**
 * Module dependencies.
 */

//var debug = require('debug')('pa-web:controllers/users');

var Attention = require('../../models/attention');
var utils = require('../../lib/utils');
var rules = require('../../lib/rules');
var p = require('parameter');

// GET /api/attention:uid
exports.index = function* () {
  this.verifyParams({
    uid: {required: true, type: p.Id}
  });
  var page = utils.parsePage(this.query);

  this.body = yield Attention.selectAttentionByUid(this.query.uid);
};


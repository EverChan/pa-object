
'use strict';

/**
 * Module dependencies.
 */

var p = require('parameter');

module.exports = {
  page: {
    page: { isId: true, required: false },
    length: { isId: true, required: false }
  },
  id: {
    id : p.Id
  },
  uid : {
    uid : p.Id
  },
  idAndUid: {
    id: p.Id,
    uid: p.Id
  }
};

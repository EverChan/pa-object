
'use strict';

/**
 * Module dependencies.
 */

exports.parseIdList = function (ids) {
  ids = ids || [];
  var validIds = [];
  for (var i = 0; i < ids.length; i++) {
    var id = parseInt(ids[i], 10);
    id && validIds.push(id);
  }
  return validIds;
};

exports.uniq = function (arr) {
  var map = {};
  for (var i = 0; i < arr.length; i++) {
    map[arr[i]] = 1;
  }

  return Object.keys(map);
};

exports.getmap = function (arr) {
  var map = {};
  for (var i = 0; i < arr.length; i++) {
    map[arr[i].id] = i;
  }

  return map;
};

exports.parsePage = function (query) {
  var page = parseInt(query.page, 10) - 1 || 0;
  page = Math.max(page, 0);
  var length = parseInt(query.length, 10) || 50;
  return {
    offset: page * length,
    length: length
  };
};
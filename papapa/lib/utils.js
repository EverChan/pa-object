'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');

var fileSave = require('file-save');

var randomToken = require('random-token');

var path = require('path');

var mkdirp = require('mkdirp');

var httpGet = require('http-get');

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

/**
 * 下载文件
 * @param type
 * @param url
 * @param suffix
 */
exports.downloadFile = function (url, type, suffix) {
    var _type = type || 'images',
        _suffix = suffix || 'jpeg',
        _url = url,
        fileName = randomToken(16),
        filePath = config.downloadPath[_type];

    mkdirp(filePath, function (err) {
        if (err) console.error(err);
        else console.log('path:', filePath);
    });

    var options = {url: _url};
    httpGet.get(options, path.join(filePath, fileName + '.' + _suffix), function (error, result) {
        if (error) {
            console.error('file error:' + error);
        } else {
            console.log('File downloaded at: ' + result.file);
        }
    });
    var urlPath = "http://121.40.76.237/resfiles/"+type+"/";
    return {
        name: fileName,
        type: _type,
        suffix: _suffix,
        urlPath: urlPath,
        path: filePath
    }
};
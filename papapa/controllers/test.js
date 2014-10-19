'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:test');

var Util = require('../lib/utils');

exports.index = function * (){
    var url = this.query.url;
    console.log(url);

    if (url) {
        var data = Util.downloadFile(url);
    }

    yield * this.render('test.html', {
        page: 'index'
    });
}
;

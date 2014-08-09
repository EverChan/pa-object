
'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');
//var logger = require('ali-logger');
//
//logger.init({
//  logdir: config.logdir,
//  stderr: config.debug
//});

//module.exports = logger;
module.exports = {
    error: function (msg) {
        console.log(msg);
    },
    log: function (msg) {
        console.log(msg);
    }
};
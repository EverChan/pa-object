
'use strict';

/**
 * Module dependencies.
 */

var mkdirp = require('mkdirp');
var path = require('path');
var ms = require('ms');
var copy = require('copy-to');
var pkg = require('../package.json');

var config = module.exports = {
    debug: true,
    port: 3000,
    workerNum: 1,
    version: pkg.version,

    // 签名 cookie 的 Keys
    keys: ['pa_secret_key_for_cookie', 'zklfsdifoweo'],

    // log 存放路径
    logdir: path.join(__dirname, '..', '.tmp', 'logs'),


    mysql: {
//    host: '10.249.193.126',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'db_pa',
        connectionLimit: 5,
        timeout: 5000,
        multipleStatements: true
    },
    redis:{
        host:'localhost',
        port:6379
    }

};

// 自定义的配置文件放在 config/config.js 里面
var customConfig = {};
try {
    customConfig = require(path.join(__dirname, 'config.js'));
} catch (err) {
    // ignore
}

copy(customConfig).override(config);

mkdirp.sync(config.logdir);

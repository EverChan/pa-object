
'use strict';

/**
 * Module dependencies.
 */

var cluster = require('cluster');
var graceful = require('graceful');
var logger = require('./common/logger');
var config = require('./config');
var app = require('./app');

app.listen(config.port);

console.log('[%s] [worker:%d] Server started, bridge server' +
  ' listen at port: %d',
  new Date(), process.pid, config.port);

graceful({
  server: [app],
  error: function (err, throwErrorCount) {
    if (err.message) {
      err.message += ' (uncaughtException throw ' + throwErrorCount +
        ' times on pid:' + process.pid + ')';
    }
    console.error(err.stack);
    logger.error(err);
  }
});

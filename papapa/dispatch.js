
'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var util = require('util');
var cluster = require('cluster');
var config = require('./config');
var childprocess = require('child_process');
var workerPath = path.join(__dirname, 'worker.js');

clusterSetup();
forkWorker();

function clusterSetup() {
  cluster.setupMaster({
    exec: workerPath,
    silent: false
  });
  cluster.on('fork', function (worker) {
    console.log('[%s] [worker:%d] new worker start',
      Date(), worker.process.pid);

    // listen graceful disconnect message, fork a new server
    worker.on('message', function (msg) {
      if (msg === 'graceful:disconnect') {
        var w = cluster.fork();
        console.error('[%s] [master:%s] wroker:%s disconnect, suicide: %s, state: %s. New worker %s forked',
          Date(), process.pid, worker.process.pid, worker.suicide, worker.state, w.process.pid);
      }
    });
  });

  cluster.on('disconnect', function (worker) {
    console.error('[%s] [master:%s] wroker:%s disconnect, suicide: %s, state: %s.',
      Date(), process.pid, worker.process.pid, worker.suicide, worker.state);
  });

  cluster.on('exit', function (worker, code, signal) {
    var exitCode = worker.process.exitCode;
    if (exitCode === 100) {
      return console.log('worker %s exit by hot reload', worker.process.pid);
    }
    var err = new Error(util.format('worker %s died (code: %s, signal: %s, suicide: %s, state: %s)',
      worker.process.pid, exitCode, signal, worker.suicide, worker.state));
    err.name = 'WorkerDiedError';
    console.error('[%s] [master:%s] wroker exit: %s', Date(), process.pid, err.stack);
  });
}

function forkWorker() {
  for (var i = 0; i < config.workerNum; i++) {
    var worker = cluster.fork();
  }
}

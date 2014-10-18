'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechatview');

var Users = require('../models/wechat_users');

exports.index = function* () {

    var usersList=yield Users.selectUsersByCity('hangzhou');

    console.log(usersList);

  yield* this.render('wechatview/index.html', {
    page: 'index',
    list:usersList
  });
};

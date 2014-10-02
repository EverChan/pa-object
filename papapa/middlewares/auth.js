
'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');
var compose = require('koa-compose');
//var buc = require('koa-buc');

module.exports = function () {
  // 测试的时候用 mock 登录中间件
  // 开发环境和生产环境都使用真实的 buc 登录
//  var middlewares = process.env.NODE_ENV === 'test'
//    ? [mockAuth, processAuth]
//    : [buc('/', config.buc), processAuth];

   //mock登陆信息
   var middlewares=[mockAuth, processAuth];

  return compose(middlewares);
};

function* processAuth(next) {
  var user = this.session.user || {};

  // koa-swig 会把 ctx.locals 传递进去
  this.locals = this.locals || {};
  this.locals.passport = {
    user: user.cname,
    uid: user.workid,
    userData: user,
    username: user.userid,
    isLogin: true
  };

  yield* next;
}

function* mockAuth(next) {

    var session = this.session;

    console.log('mockAuth===='+session.count,session);

  this.session.user = mockUser;
  yield* next;
}

var mockUser = {
//  userid: 'busi.hyy',
//  dep: '技术部-前端',
//  cname: '不四',
//  email: 'busi.hyy@inc.com',
//  workid: '52624',
//  ssoUser:
//   { agentId: null,
//     havanaId: '198303203',
//     officialExtensionPhone: null,
//     userPersonType: '0',
//     adAccounts: { 'taobao.ali.com': 'busi.hyy' },
//     location: '',
//     id: 86157,
//     available: 'T',
//     authType: 'AD',
//     appName: 'npmweb',
//     loginName: 'busi.hyy',
//     passwordStrongLevel: '1',
//     account: 'busi.hyy@inc.com',
//     emailAddr: 'busi.hyy@inc.com',
//     userType: 'R',
//     lastName: '何翊宇',
//     empId: '52624',
//     nickNameCn: '不四',
//     cellphone: '',
//     locationDesc: '',
//     supervisorEmail: 'shafeng.sf@inc.com',
//     tbWW: '#NAME?',
//     depId: '18660',
//     hrStatus: 'A',
//     bakEmpId: '',
//     firstName: 'HE Yiyu',
//     gender: 'M',
//     nickNameEn: '',
//     isTemp: 'Y',
//     dimissionDate: null,
//     hireDate: '2012-07-16',
//     jobDesc: '',
//     aliWW: '-',
//     busnPhone: '',
//     extensionPhone: '',
//     supervisorEmpId: '67607',
//     vSupervisorEmpId: '',
//     locationDescEn: '',
//     companyAddress: '',
//     emailPrefix: 'busi.hyy',
//     nameInPinyin: 'heyiyu',
//     nameInPinyinShort: 'hyy',
//     depDesc: '技术部-前端',
//     supervisorName: '锋',
//     vSupervisorName: '',
//     vSupervisorEmail: '',
//     accountFrom: null,
//     token: 'xxx',
//     userSecuritySign: 'xxx',
//     umid: 'xxx'
//   }
 };

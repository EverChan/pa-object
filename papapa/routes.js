
'use strict';

/**
 * Module dependencies.
 */

var koa = require('koa');
var mount = require('koa-mount');
var middlewares = require('koa-middlewares');
var ResourceRouter = middlewares.ResourceRouter;



var home = require('./controllers/home');
var test = require('./controllers/test');
var wechattest = require('./controllers/wechattest');


var wechatview = require('./controllers/wechatview');

var wechat=require('./controllers/wechat/index');


//var taskController = require('./controllers/task');
//var taskApi = require('./controllers/api/task');
//var caseController = require('./controllers/case');
//var caseApi = require('./controllers/api/case');
//var errorController = require('./controllers/error');

//var errorApi = require('./controllers/api/error');
//var statusApi = require('./controllers/api/status');
//var alibenchController = require('./controllers/alibench');
//var alibenchtaskApi = require('./controllers/api/alibenchtask');
//var alibenchresultApi = require('./controllers/api/alibenchresult');
//var keludeAPi = require('./controllers/api/kelude');
//
//var pageController = require('./controllers/page');





module.exports = function (app) {
    //首页
    app.get('/', home.index);
    //api 调试页面
    app.get('/test', test.index);
    app.get('/wechattest', wechattest.index);


    app.get('/wechatview', wechatview.index);

    //wechat controller
    app.get('/wechat',wechat.index);
    app.post('/wechat',wechat.create);



//
//  app.get('/tasklist', taskController.showTaskList);
//  app.get('/create', taskController.showCreate);
//
//  app.get('/caselist', caseController.showCaseList);
//  app.get('/maker', caseController.showMaker);
//
//  app.get('/result', errorController.showResult);
//  app.get('/reporter', errorController.showReporter);
//
//  app.get('/help', pageController.showHelp);
//  app.get('/tmwindow', pageController.showTmwindow);
//  app.get('/statistical', pageController.showStatistical);
//  app.get('/week-reporter', pageController.showWeekReporter);
//
//  app.get('/alibench', alibenchController.showAlibench);
//  app.get('/alibenchcreate', alibenchController.showAlibenchCreate);
//  app.get('/alibenchlist', alibenchController.showAlibenchTasklist);
//  app.get('/alibenchresult', alibenchController.showAlibenchResult);


    // mount all API requests to API app
    app.use(mount('/api', API));

};

var API = koa();

var resourceOpts = {
    id: 'id'
};


/**
 * api 列表
 * @type {*[]}
 */
var apiList=[
    {
        name:'users',
        api:require('./controllers/api/users')
    },
    {
        name:'attention',
        api:require('./controllers/api/attention')
    },
    {
        name:'message',
        api:require('./controllers/api/message')
    },
    {
        name:'relation',
        api:require('./controllers/api/relation')
    },
    {
        name:'login',
        api:require('./controllers/api/login')
    }
];

//注册api
(function(list){
    list.forEach(function(item){
        var api=new ResourceRouter(item.name, item.api, resourceOpts);
        API.use(api.middleware());
    });
})(apiList);




/**
 * GET /api/cases
 * GET /api/cases/:id
 * POST /api/cases
 * PUT /api/cases/:id
 * DELETE /api/cases/:id
 */
//var caseResourceRouter = new ResourceRouter('cases', caseApi, resourceOpts);
//API.use(caseResourceRouter.middleware());

/**
 * GET /api/errors
 * GET /api/errors/:id
 * POST /api/errors
 * PUT /api/errors/:id
 */
//var errorResourceRouter = new ResourceRouter('errors', errorApi, resourceOpts);
//API.use(errorResourceRouter.middleware());

/**
 * GET /api/statuses
 * POST /api/statuses
 */
//var statusResourceRouter = new ResourceRouter('statuses', statusApi, resourceOpts);
//API.use(statusResourceRouter.middleware());

/**
 * GET /api/alibenchtasks
 * POST /api/alibenchtasks
 * DELETE /api/alibenchtasks/:id
 */
//var alibenchtaskResourceRouter = new ResourceRouter('alibenchtasks', alibenchtaskApi, resourceOpts);
//API.use(alibenchtaskResourceRouter.middleware());

/**
 GET /api/alibenchtasks
 */
//var alibenchresultResourceRouter = new ResourceRouter('alibenchresults', alibenchresultApi, resourceOpts);
//API.use(alibenchresultResourceRouter.middleware());

/**
 * GET /api/keludes?ids=1,2,3
 * GET /api/keludes/:id
 * POST /api/keludes
 */
//var keludeResourceRouter = new ResourceRouter('keludes', keludeAPi, resourceOpts);
//API.use(keludeResourceRouter.middleware());

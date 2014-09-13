/**
 * 全局定义
 */
(function (_win, S) {
    S.config({
        base: 'js/k',
        tag: '2014',
        packages: [
            {
                debug: true,
                name: 'com',
                path: '../www'
            }
        ]
    });

    var HOST = "http://127.0.0.1:3000/", URLS = {
        login: 'api/login/',
        users:'api/users'
    };


    //加入工具模块
    S.add('com/util', function (S, IO) {

        var exports = {};

        exports.url = function (key) {
            return HOST + URLS[key];
        };

        /**
         * get请求===
         * @param url
         * @param id
         * @param data
         * @param cb
         * @param cbComplete
         * @returns {IO}
         */
        exports.get = function (url, id, data, cb,cbComplete) {
            var _url = url;
            if (id) {
                _url += id;
            }

            var a = new IO({
                url: _url,
                type: "get",
                data:data||{},
                success: cb,
                error: function (e) {
                    console.log(e);
                },
                complete:cbComplete||function(){
                    console.log('ajax complete');
                }
            });
            return a;
        };

        /**
         * post请求
         * @param url
         * @param data
         * @param cb
         * @returns {IO}
         */
        exports.post=function(url,data,cb){
            var a = new IO({
                url: url,
                type: "post",
                data:data||{},
                success: cb,
                error: function (e) {
                    console.log(e);
                }
            });
            return a;
        };



        return exports;
    }, {
        requires: ['ajax']
    });


})(window, KISSY);
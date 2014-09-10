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
        login: 'api/users/'
    };


    //加入工具模块
    S.add('com/util', function (S, IO) {

        var exports = {};

        exports.url = function (key) {
            return HOST + URLS[key];
        };

        exports.get = function (url, id, cb) {
            var _url = url;
            if (id) {
                _url += id;
            }

            var a = new IO({
                url: _url,
                type: "get",
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
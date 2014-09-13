/**
 * 登陆模块
 */
KISSY.add('com/login', function (S, DOM, Event, IO, Util) {
    var exports = {};

    var url = Util.url('login');

    exports.login = function (phone, pwd) {

        var prevUrl = localStorage.prevUrl || 'index.html';

        Util.post(url, {phone: phone, pwd: pwd, location: 'hangzhou'}, function (d) {
            if (d.isSuccess == 1) {
                localStorage.token = d.token;
                window.location.href = prevUrl;
            } else {
                alert(d.error);
            }
        });
    };

    //检查登陆状态
    exports.check = function (cb) {
        var token = localStorage.token,
            url = Util.url('login');
        if (token) {
            Util.get(url, token, {}, function (d) {
                if (d.isSuccess == 1) {
                    cb();
                    localStorage.uid = d.uid;
                } else {
                    needLogin();
                }
            });
        } else {
            needLogin();
        }

        function needLogin() {
            var mask = DOM.create("<a>", {'class': "need-login-mask", 'href': 'login.html'});
            DOM.append(mask, document.body);
        }
    };
    return exports;
}, {
    requires: ['dom', 'event', 'ajax', 'com/util']
});
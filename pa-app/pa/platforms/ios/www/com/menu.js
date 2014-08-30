/**
 * 用户名片
 */
KISSY.add('com/menu', function (S, DOM, Event, IO) {
    var exports = {},
        TEMPLETE = '<div class="menu-wrap hidden">     \
            <div class="menu-mod">\
                <div class="menu-bd">\
                    <a href="#" class="m1 cur">Pa一下</a>\
                    <a href="#" class="m2 has-new">我的Pa<b class="new-icon"></b></a>\
                    <a href="#" class="m3">我的关注</a>\
                    <a href="#" class="m4">我</a>\
                    <a href="#" class="m5">关于Pa</a>\
                </div>\
            </div>\
        </div>';
    var content = DOM.get("#content"), menu;

    function init() {
        menu = DOM.create(TEMPLETE);
        DOM.append(menu, content.parentNode);
    }

    //初始化
    init();


    exports = {
        show: function () {
            DOM.addClass(content, 'menu-show');
            DOM.removeClass(menu, 'hidden');
        },
        hide: function () {
            DOM.removeClass(content, 'menu-show');
            DOM.addClass(menu, 'hidden');
        },
        toggle: function () {
            DOM.hasClass(menu, 'hidden') ? exports.show() : exports.hide();
        }
    };

    return exports;
}, {
    requires: ['dom', 'event', 'ajax', 'com/menu.css']
});
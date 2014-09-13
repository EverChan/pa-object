/**
 * 用户名片
 */
KISSY.add('com/menu', function (S, DOM, Event, IO) {
    var exports = {},
        TEMPLETE = '<div class="menu-wrap hidden">     \
            <div class="menu-mod">\
                <div class="menu-bd">\
                    <a href="index.html" class="m1">Pa一下</a>\
                    <a href="pa-list.html" class="m2 has-new">我的Pa<b class="new-icon"></b></a>\
                    <a href="at-list.html" class="m3">我的关注</a>\
                    <a href="#" class="m4">我</a>\
                    <a href="#" class="m5">关于Pa</a>\
                </div>\
            </div>\
        </div>';
    var content = DOM.get("#content"), menu,
        parent=content.parentNode;

    function init() {
        menu = DOM.create(TEMPLETE);
        DOM.append(menu, parent);
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
        },
        setCur:function(c){
            var CUR='cur';
            var item=DOM.get(c,parent);
            debugger;
            if(item){
                DOM.addClass(item,CUR);
                DOM.attr(item,'href','#');
            }
        }
    };

    return exports;
}, {
    requires: ['dom', 'event', 'ajax', 'com/menu.css']
});
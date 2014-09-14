/**
 * 用户名片
 */
KISSY.add('com/sendMessage', function (S, DOM, Event, IO, Overlay, Util) {
    var TEMPLETE = '<div class="sm-mod">     \
            <div class="sm-hd">                \
                <a href="#" class="sm-avt"><img src="img/1.jpg"/></a> \
            <div class="sm-space">        \
                <div class="sm-text">     \
                <span class="sm-name">收信人</span>        \
            </div></div> </div>     \
            <div class="sm-bd">       \
            <div class="sm-send j_sendMsg">\
                <a href="#" class="cur">pa</a><a href="#">pa</a><a href="#">pa</a> \
            </div>\
            <div class="sm-toolbar">\
            <a href="#" class="sub-big-Button j_sendMsgButton">发送</a>\
            </div>\
                </div>      \
        </div>';

    //用户id
    var uid;


    var dialog = new Overlay.Dialog({
        bodyContent: TEMPLETE,
        mask: true,
        points: ['cc', 'cc']
    });
    dialog.render();
    var el = dialog.get('el');
    Event.on(DOM.query('a', DOM.get('.j_sendMsg', el)), 'tap', function (ev) {
        ev.halt();
        var target = ev.currentTarget;
        if (DOM.hasClass(target, 'cur')) {
            DOM.removeClass(target, 'cur');
        } else {
            DOM.addClass(target, 'cur');
        }
    });

    //发送事件
    var sendMsgButton = DOM.get(".j_sendMsgButton", el);
    Event.on(sendMsgButton, 'tap', function (ev) {
        ev.halt();
        var paList = DOM.query('.cur', DOM.get('.j_sendMsg', el));
        var url = Util.url('message');
        Util.post(url, {sendid: uid, title: 'pa', content: paList.length || 1}, function (d) {
            if (d.isSuccess == 1) {
                alert('发送成功！');
                dialog.hide();
                //触发刷新按钮
                Event.fire("#J_avtListRefresh",'tap');
            }
        });
    });

    return {
        show: function (target) {
            uid = DOM.attr(target, 'data-uid');
            dialog.show();
            dialog.center();
        }
    }
}, {
    requires: ['dom', 'event', 'ajax', 'overlay', 'com/util', 'com/sendMessage.css']
});
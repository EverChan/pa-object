/**
 * 用户名片
 */
KISSY.add('com/card', function (S, DOM, Event, IO, Overlay, Util) {

    var cardMap = {};

    var TEMPLETE = '<div class="card-mod">     \
            <div class="card-hd">                \
                <a href="#" class="card-avt"><img src="img/1.jpg"/></a> \
            <div class="card-space">        \
                <div class="card-text">     \
                <span class="card-name">{nickname}</span>        \
            <span class="card-sign">{signtext}</span></div>      \
            <div class="card-links">        \
                <a href="/{uid}">空间</a>     \
            </div></div></div>      \
            <div class="card-bd">       \
                <a href="#" class="card-button">        \
                <span class="card-icon icon-phone"></span>      \
            <span class="button-text">电话</span></a>     \
            <a href="#" class="card-button">        \
                <span class="card-icon icon-message"></span>        \
            <span class="button-text">短信</span> </a>     \
            <a href="{uid}" class="card-button" data-uid="{uid}">        \
                <span class="card-icon icon-follow"></span>      \
            <span class="button-text">关注</span></a></div>      \
        </div>';

    var dialog = new Overlay.Dialog({
        bodyContent: TEMPLETE,
        mask: true,
        points: ['cc', 'cc']
    });


    /**
     * 获取用户数据 by uid
     * @param uid
     */
    function getPersonCard(uid) {
        var d = cardMap[uid];
        if (d) {
            showCard(d);
        } else {
            var url = Util.url('users');
            Util.get(url, uid, {}, function (d) {
                if (d.isSuccess == 1) {
                    showCard(cardMap[uid] = d.data);
                }
            });
        }

    }

    /**
     * 展现名片
     * @param data
     */
    function showCard(data) {
        var html = S.substitute(TEMPLETE, data);
        dialog.set('bodyContent', html);
        dialog.render();
        dialog.show();
        dialog.center();
    }

    return {
        show: function (target) {
            var uid = DOM.attr(target, 'data-uid');
            getPersonCard(uid);
        }
    }
}, {
    requires: ['dom', 'event', 'ajax', 'overlay', 'com/util', 'com/card.css']
});
/**
 * 用户名片
 */
KISSY.add('com/card', function (S, DOM, Event, IO,Overlay) {
    var TEMPLETE ='<div class="card-mod">     \
            <div class="card-hd">                \
                <a href="#" class="card-avt"><img src="img/1.jpg"/></a> \
            <div class="card-space">        \
                <div class="card-text">     \
                <span class="card-name">宁静Sue</span>        \
            <span class="card-sign">爱或者不爱，不过一瞬间</span></div>      \
            <div class="card-links">        \
                <a href="#" target="_blank">空间</a>     \
            </div></div></div>      \
            <div class="card-bd">       \
                <a href="#" class="card-button">        \
                <span class="card-icon icon-phone"></span>      \
            <span class="button-text">电话</span></a>     \
            <a href="#" class="card-button">        \
                <span class="card-icon icon-message"></span>        \
            <span class="button-text">短信</span> </a>     \
            <a href="#" class="card-button">        \
                <span class="card-icon icon-follow"></span>      \
            <span class="button-text">关注</span></a></div>      \
        </div>';

    var dialog=new Overlay.Dialog({
        bodyContent:TEMPLETE,
        mask:true,
        points:['cc','cc']
    });

    return {
        show: function () {
            dialog.render();
            dialog.show();
            dialog.center();
        }
    }
}, {
    requires: ['dom', 'event', 'ajax','overlay','com/card.css']
});
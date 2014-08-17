/**
 * 用户名片
 */
KISSY.add('com/sendMessage', function (S, DOM, Event, IO,Overlay) {
    var TEMPLETE ='<div class="sm-mod">     \
            <div class="sm-hd">                \
                <a href="#" class="sm-avt"><img src="img/1.jpg"/></a> \
            <div class="sm-space">        \
                <div class="sm-text">     \
                <span class="sm-name">收信人</span>        \
            </div></div> </div>     \
            <div class="sm-bd">       \
            <div class="sm-send j_sendMsg">\
                <a href="#">pa</a><a href="#">pa</a><a href="#">pa</a> \
            </div>\
            <div class="sm-toolbar">\
            <a href="#" class="sm-sendButton">发送</a>\
            </div>\
                </div>      \
        </div>';

    var dialog=new Overlay.Dialog({
        bodyContent:TEMPLETE,
        mask:true,
        points:['cc','cc']
    });

    return {
        show: function () {
            dialog.render();
            var el=dialog.get('el');
            Event.on(DOM.query('a',DOM.get('.j_sendMsg',el)),'tap',function(ev){
                ev.halt();
                var target=ev.currentTarget;
                if(DOM.hasClass(target,'cur')){
                    DOM.removeClass(target,'cur');
                }else{
                    DOM.addClass(target,'cur');
                }
            });
            dialog.show();
            dialog.center();
        }
    }
}, {
    requires: ['dom', 'event', 'ajax','overlay','com/sendMessage.css']
});
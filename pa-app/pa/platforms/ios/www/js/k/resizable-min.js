/*
Copyright 2014, KISSY v1.44
MIT Licensed
build time: May 22 12:30
*/
KISSY.add("resizable",["node","base","dd"],function(q,p){function u(a){var b=a.dds,l=a.get("node"),h=a.get("handlers"),m,o=a.get("dragConfig"),e=a.get("prefixCls")+v;for(d=0;d<h.length;d++){var c=h[d],i=r('<div class="'+e+" "+e+"-"+c+'"></div>').prependTo(l,void 0),i=b[c]=new w(q.mix({node:i,cursor:null,groups:!1},o));(function(b,c){var e;c.on("drag",function(c){var l=c.target,h=a._width,i=a._height,j=a.get("minWidth"),o=a.get("maxWidth"),g=a.get("minHeight"),k=a.get("maxHeight"),f={},c=n[b](j,o,
g,k,a._top,a._left,h,i,c.pageY-e.top,c.pageX-e.left,m);for(d=0;d<s.length;d++)c[d]&&(f[s[d]]=c[d]);a.fire("beforeResize",{handler:b,dd:l,region:f})});c.on("dragstart",function(){e=c.get("startMousePos");m=a.get("preserveRatio");a._width=l.width();a._top=parseInt(l.css("top"));a._left=parseInt(l.css("left"));a._height=l.height();a.fire("resizeStart",{handler:b,dd:c})});c.on("dragend",function(){a.fire("resizeEnd",{handler:b,dd:c})})})(c,i)}}var g=p("node"),k=p("base"),f=p("dd"),r=g.all,d,w=f.Draggable,
v="resizable-handler",f=["l","r"],t=["t","b"],s=["width","height","top","left"],n={t:function(a,b,d,h,m,o,e,c,i,g,j){a=Math.min(Math.max(d,c-i),h);b=0;j&&(b=a/c*e);return[b,a,m+c-a,0]},b:function(a,b,d,h,m,g,e,c,i,f,j){a=Math.min(Math.max(d,c+i),h);b=0;j&&(b=a/c*e);return[b,a,0,0]},r:function(a,b,d,h,m,g,e,c,i,f,j){a=Math.min(Math.max(a,e+f),b);b=0;j&&(b=a/e*c);return[a,b,0,0]},l:function(a,b,d,h,g,f,e,c,i,k,j){a=Math.min(Math.max(a,e-k),b);b=0;j&&(b=a/e*c);return[a,b,0,f+e-a]}};for(d=0;d<f.length;d++)for(g=
0;g<t.length;g++)(function(a,b){n[a+b]=n[b+a]=function(){var f=n[a].apply(this,arguments),h=n[b].apply(this,arguments),g=[];for(d=0;d<f.length;d++)g[d]=f[d]||h[d];return g}})(f[d],t[g]);k=k.extend({initializer:function(){this.dds={};this.publish("beforeResize",{defaultFn:this._onBeforeResize})},_onBeforeResize:function(a){this.get("node").css(a.region);this.fire("resize",{handler:a.hc,dd:a.dd,region:a.region})},_onSetNode:function(){u(this)},_onSetDisabled:function(a){q.each(this.dds,function(b){b.set("disabled",
a)})},destructor:function(){var a,b=this.dds;for(a in b)b[a].destroy(),b[a].get("node").remove(),delete b[a]}},{name:"Resizable",ATTRS:{node:{setter:function(a){return r(a)}},dragConfig:{},prefixCls:{value:"ks-"},disabled:{},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},preserveRatio:{value:!1},handlers:{value:[]}}});k.Handler={B:"b",T:"t",L:"l",R:"r",BL:"bl",TL:"tl",BR:"br",TR:"tr"};return k});

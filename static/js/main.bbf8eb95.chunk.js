(this["webpackJsonpobject-detection-webapp"]=this["webpackJsonpobject-detection-webapp"]||[]).push([[0],{249:function(e,t,n){e.exports=n(276)},254:function(e,t,n){},260:function(e,t){},261:function(e,t){},269:function(e,t){},272:function(e,t){},273:function(e,t){},274:function(e,t,n){},276:function(e,t,n){"use strict";n.r(t);var r=n(59),a=n.n(r),c=n(228),i=n.n(c),o=(n(254),n(74)),u=n(188),s=n(5),f=n.n(s),l=n(13),d=n(8),h=(n(275),n(248)),p=n(247),v=n.n(p),b=(n(274),function(e,t){e.forEach((function(e){var n=Object(d.a)(e.bbox,4),r=n[0],a=n[1],c=n[2],i=n[3],o=e.class,u=Math.floor(16777215*Math.random()).toString(16);t.strokeStyle="#"+u,t.font="18px Arial",t.beginPath(),t.fillStyle="#"+u,t.fillText(o,r,a),t.rect(r,a,c,i),t.stroke()}))});var g=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),n=Object(r.useState)({}),c=Object(d.a)(n,2),i=c[0],s=c[1],p=function(){var e=Object(l.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a();case 2:t=e.sent,console.log("Handpose model loaded."),setInterval((function(){m(t)}),10);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(e){var t=window.speechSynthesis,n=new SpeechSynthesisUtterance(e);t.speak(n)},m=function(){var n=Object(l.a)(f.a.mark((function n(r){var a,c,l,d,h,p,v;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("undefined"===typeof e.current||null===e.current||4!==e.current.video.readyState){n.next=17;break}return a=e.current.video,c=e.current.video.videoWidth,l=e.current.video.videoHeight,e.current.video.width=c,e.current.video.height=l,t.current.width=c,t.current.height=l,n.next=10,r.detect(a);case 10:d=n.sent,h=Date.now(),p=new Set(d.map((function(e){return e.class}))),d.forEach((function(e){var t=e.class;if(!i[t]||h-i[t]>1e4){var n="I detected a ".concat(t," with ").concat((100*e.score).toFixed(2)," percent confidence.");g(n),s((function(e){return Object(u.a)(Object(u.a)({},e),{},Object(o.a)({},t,h))}))}})),s((function(e){var t={};for(var n in e)p.has(n)&&(t[n]=e[n]);return t})),v=t.current.getContext("2d"),b(d,v);case 17:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(r.useEffect)((function(){p()}),[]),a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(v.a,{ref:e,muted:!0,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:640,height:480}}),a.a.createElement("canvas",{ref:t,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:8,width:640,height:480}})))};i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(g,null)),document.getElementById("root"))}},[[249,1,2]]]);
//# sourceMappingURL=main.bbf8eb95.chunk.js.map
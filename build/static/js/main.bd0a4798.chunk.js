(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{267:function(e,t,a){e.exports=a(303)},272:function(e,t,a){},280:function(e,t){},281:function(e,t){},289:function(e,t){},292:function(e,t){},293:function(e,t){},294:function(e,t){},301:function(e,t,a){},303:function(e,t,a){"use strict";a.r(t);var n=a(33),r=a.n(n),i=a(241),c=a.n(i),l=a(264),o=a(37),s=(a(272),a(4)),d=a(5),m=a(14),u=a(17),f=a(13),v=a(16),h=a(114);h.f("webgl");var p=640,g=640,x=["incorrect mask","mask","no mask"],E=["#FFDE80","#66FF80","#FF6584"],y=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(i)))).state={model:null,preview:"",predictions:[]},a.videoRef=r.a.createRef(),a.canvasRef=r.a.createRef(),a.myStream=null,a.detectFrame=function(e,t){h.c().startScope();var n=h.g(function(){return h.d.resizeBilinear(h.a.fromPixels(e),[p,g]).div(255).expandDims(0)});t.executeAsync(n).then(function(n){a.renderPredictions(n,e),requestAnimationFrame(function(){a.detectFrame(e,t)}),h.c().endScope()})},a.renderPredictions=function(e){document.getElementById("rt-loader").style.display="none",document.getElementById("loader-status").innerHTML="Real-time detection.";var t=document.getElementById("frame");if(null!=a.canvasRef&&null!=a.canvasRef.current){var n=a.canvasRef.current.getContext("2d");n.clearRect(0,0,n.canvas.width,n.canvas.height);var r="16px sans-serif";n.font=r,n.textBaseline="top";var i,c=Object(s.a)(e,4),l=c[0],o=c[1],d=c[2],m=c[3],u=l.dataSync(),f=o.dataSync(),v=d.dataSync(),p=m.dataSync()[0];h.b(e);var g=parseInt(r,10);for(i=0;i<p;++i){var y=u.slice(4*i,4*(i+1)),b=Object(s.a)(y,4),w=b[0],j=b[1],N=b[2],k=b[3];w*=t.width,N*=t.width,j*=t.height;var F=N-w,O=(k*=t.height)-j,S=x[v[i]],R=f[i].toFixed(2);n.strokeStyle=E[v[i]],n.lineWidth=4,n.strokeRect(w,j,F,O),n.fillStyle=E[v[i]];var D=n.measureText(S+":"+R).width;n.fillRect(w-2,j-g-4,D+4,g+4)}for(i=0;i<p;++i){var M=u.slice(4*i,4*(i+1)),I=Object(s.a)(M,3),z=I[0],A=I[1];z*=t.width,A*=t.height;var B=x[v[i]],C=f[i].toFixed(2);n.fillStyle="#2f2e41",n.fillText(B+":"+C,z,A-g)}}},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){var t=navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user",width:"640",height:"480"}}).then(function(t){return window.stream=t,e.myStream=t,e.videoRef.current.srcObject=t,new Promise(function(t,a){e.videoRef.current.onloadedmetadata=function(){t()}})}).catch(function(e){console.log("error",e)}),a=h.e("/facemask-detector/model.json");Promise.all([a,t]).then(function(t){e.detectFrame(e.videoRef.current,t[0])}).catch(function(e){console.error(e)})}}},{key:"componentWillUnmount",value:function(){this.myStream.getTracks().forEach(function(e){e.stop()})}},{key:"render",value:function(){return r.a.createElement("div",{className:"d-flex flex-column justify-content-center"},r.a.createElement("h2",{className:"text-center title"},"Face Mask Detection with YOLOv5"),r.a.createElement("div",{className:"d-inline-flex flex-row justify-content-center"},r.a.createElement("p",{className:"text-center subtitle",id:"loader-status"},"Loading model"),r.a.createElement("div",{className:"lds-ellipsis",id:"rt-loader"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))),r.a.createElement("div",{className:"d-flex flex-column justify-content-center align-items-start"},r.a.createElement("video",{className:"mx-auto z-index-1 position-relative",autoPlay:!0,playsInline:!0,muted:!0,ref:this.videoRef,width:"640",height:"480",id:"frame"}),r.a.createElement("canvas",{className:"mx-auto z-index-2 d-flex align-self-center position-absolute",ref:this.canvasRef,width:"640",height:"480"})))}}]),t}(r.a.Component),b=a(3),w=a.n(b),j=a(15),N=a(263),k=a.n(N),F=640,O=640,S=["incorrect mask","mask","no mask"],R=["#FFDE80","#66FF80","#FF6584"],D=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={model:null,preview:"",predictions:[]},a.onDrop=function(e,t,n){a.setState({preview:e[0].preview||n[0]})},a.cropToCanvas=function(e,t,a){var n=e.naturalWidth,r=e.naturalHeight;a.clearRect(0,0,a.canvas.width,a.canvas.height),a.fillStyle="#000000",a.fillRect(0,0,t.width,t.height);var i=Math.min(t.width/e.naturalWidth,t.height/e.naturalHeight),c=Math.round(n*i),l=Math.round(r*i);a.drawImage(e,0,0,n,r,(t.width-c)/2,(t.height-l)/2,c,l)},a.onImageChange=function(){var e=Object(j.a)(w.a.mark(function e(t){var n,r,i,c,l,o,d,m,u,f,v,p,g,x,E,y,b,j,N,k,D,M,I,z,A,B,C,T,P,L,W,U,H;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("image-canvas"),r=n.getContext("2d"),a.cropToCanvas(t.target,n,r),i=h.g(function(){return h.d.resizeBilinear(h.a.fromPixels(n),[F,O]).div(255).expandDims(0)}),e.next=6,a.state.model.executeAsync(i);case 6:for(c=e.sent,l="16px sans-serif",r.font=l,r.textBaseline="top",o=Object(s.a)(c,4),d=o[0],m=o[1],u=o[2],f=o[3],v=d.dataSync(),p=m.dataSync(),g=u.dataSync(),x=f.dataSync()[0],h.b(c),y=parseInt(l,10),E=0;E<x;++E)b=v.slice(4*E,4*(E+1)),j=Object(s.a)(b,4),N=j[0],k=j[1],D=j[2],M=j[3],N*=n.width,D*=n.width,k*=n.height,M*=n.height,I=D-N,z=M-k,A=S[g[E]],B=p[E].toFixed(2),r.strokeStyle=R[g[E]],r.lineWidth=4,r.strokeRect(N,k,I,z),r.fillStyle=R[g[E]],C=r.measureText(A+":"+B).width,r.fillRect(N-2,k-y-4,C+4,y+4);for(E=0;E<x;++E)T=v.slice(4*E,4*(E+1)),P=Object(s.a)(T,3),L=P[0],W=P[1],L*=n.width,W*=n.height,U=S[g[E]],H=p[E].toFixed(2),r.fillStyle="#2f2e41",r.fillText(U+":"+H,L,W-y);case 20:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(j.a)(w.a.mark(function e(){var t;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.e("/facemask-detector/model.json");case 2:t=e.sent,this.setState({model:t});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"d-flex flex-column justify-content-center align-items-center"},r.a.createElement("h2",{className:"text-center title"},"Face Mask Detection with YOLOv5"),r.a.createElement("p",{className:"text-center subtitle"},"Allow extension: .jpeg, .jpg, .png."),this.state.model?r.a.createElement(k.a,{className:"dropzone d-inline-flex justify-content-center align-items-center",accept:"image/jpeg, image/png, .jpg, .jpeg, .png",multiple:!1,onDrop:this.onDrop},this.state.preview?r.a.createElement("img",{alt:"upload preview",onLoad:this.onImageChange,className:"dropzone-img",src:this.state.preview}):r.a.createElement("div",{className:"d-flex flex-column justify-content-center align-self-center z-index-1 position-relative"},r.a.createElement("object",{data:"./images/undraw_duplicate_re_d39g.svg",width:"auto",height:"100%"}," "),r.a.createElement("p",{className:"text-center"},"Choose or drop image")),r.a.createElement("canvas",{id:"image-canvas",className:"image-canvas mx-auto z-index-2 position-absolute",width:"640",height:"640"})):r.a.createElement("div",{className:"dropzone d-flex flex-column justify-content-center align-items-center"},r.a.createElement("div",{className:"lds-ellipsis",id:"ul-loader"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)),r.a.createElement("p",{className:"text-center"},"Loading model")))}}]),t}(r.a.Component);function M(){return r.a.createElement(l.a,null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("a",{className:"navbar-brand mb-0 h1"},"Face Mask Detection"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{id:"navbarNavAltMarkup",className:"collapse navbar-collapse flex-grow-1 justify-content-end"},r.a.createElement("div",{className:"navbar-nav"},r.a.createElement("a",{href:"/",className:"nav-link","aria-current":"page"},"Real-time"),r.a.createElement("a",{href:"/upload",className:"nav-link"},"Upload"))))),r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/"},r.a.createElement(y,null)),r.a.createElement(o.a,{path:"/upload"},r.a.createElement(D,null))))}a(301);var I=document.getElementById("header");c.a.render(r.a.createElement(M,null),I)}},[[267,2,1]]]);
//# sourceMappingURL=main.bd0a4798.chunk.js.map
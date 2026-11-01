(function(){function ready(f){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}
ready(function(){var n=document.querySelector("nav.tnav");if(!n)return;var m=n.querySelector(".more"),b=m&&m.querySelector("button");
if(b){b.addEventListener("click",function(e){e.stopPropagation();var o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)});
document.addEventListener("click",function(e){if(!m.contains(e.target)){m.classList.remove("open");b.setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){m.classList.remove("open");b.setAttribute("aria-expanded","false")}})}
var t=n.querySelector(".tabs"),c=n.querySelector(".tabs a.cur");if(t&&c&&t.scrollWidth>t.clientWidth){t.scrollLeft=Math.max(0,c.offsetLeft-t.clientWidth/2+c.offsetWidth/2)}})})();
/* both-buttons 2026-10-30: every page header shows Sign in AND Sign up. Sign in lands on the Sign in tab (signup.html?signin=1), Sign up on the Sign up tab (signup.html). A nav that already carries a Sign up link (the home page) is left alone. */
(function(){function ready(f){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}
ready(function(){var n=document.querySelector("nav.tnav");if(!n)return;try{
var as=n.querySelectorAll("a"),tin=null,i;
for(i=0;i<as.length;i++){if(as[i].textContent.trim()==="Sign up")return;if(!tin&&/(^|\s)tin(\s|$)/.test(as[i].className))tin=as[i]}
if(!tin){for(i=0;i<as.length;i++){if(as[i].textContent.trim()==="Sign in"){tin=as[i];break}}}
if(!tin)return;
if((tin.getAttribute("href")||"")==="signup.html")tin.setAttribute("href","signup.html?signin=1");
var a=document.createElement("a");a.className=tin.className;a.setAttribute("href","signup.html");a.textContent="Sign up";a.style.marginLeft="8px";tin.parentNode.insertBefore(a,tin.nextSibling);
}catch(e){}})})();
/* accountbar 2026-10-30: ONE account section on top of every page - "Sign up" + "Login" when signed out; the account name + "Logout" when signed in. Signed in = an account is saved on this device and Logout was not tapped since (flag aiedume_signed_out). Logout only sets the flag: the saved account with its password hash, the avatar, plugins and keys all stay on the device; signing back in on signup.html clears the flag. signup.html clears the flag on sign-up and on sign-in. The My Plugins "Signed in" line (onechat.js) reads the same flag. my-plugins-sample.html runs the same section on its own sample keys (account aiedume_sample_account, flag aiedume_sample_signed_out) so the sample stays isolated from the real account. */
(function(){function ready(f){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}
ready(function(){try{
var SAMPLE=/my-plugins-sample\.html$/.test(location.pathname);
var AKEY=SAMPLE?"aiedume_sample_account":"aiedume_demo_account";
var FKEY=SAMPLE?"aiedume_sample_signed_out":"aiedume_signed_out";
function acct(){try{var a=JSON.parse(localStorage.getItem(AKEY)||"null");return (a&&typeof a==="object"&&a.name)?a:null}catch(e){return null}}
function isOut(){try{return localStorage.getItem(FKEY)==="1"}catch(e){return false}}
if(!document.getElementById("acctbar-css")){var st=document.createElement("style");st.id="acctbar-css";st.textContent=".acctbar{display:inline-flex;gap:8px;align-items:center}.acctname{display:inline-flex;align-items:center;height:36px;padding:0 4px;color:#e2e8f0;font:700 14px/1 Inter,system-ui,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}";document.head.appendChild(st)}
function authA(a){var h=a.getAttribute("href")||"",t=a.textContent.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");return /(^|\/)signup\.html(\?signin=1)?$/.test(h)&&(t==="Sign in"||t==="Sign up"||t==="Login")}
function groupIn(root){if(!root)return null;var as=root.querySelectorAll("a"),list=[],i;for(i=0;i<as.length;i++)if(authA(as[i]))list.push(as[i]);return list.length?list:null}
var targets=[];
var nav=document.querySelector("nav.tnav");
if(nav){var g=groupIn(nav);if(g)targets.push({anchors:g,kind:"nav"})}
var hm=document.querySelector(".hmauth");
if(hm){var g2=groupIn(hm);if(g2)targets.push({anchors:g2,kind:"hm"})}
if(!targets.length){
 var all=document.querySelectorAll("a"),groups=[],i,a,p,j,found;
 for(i=0;i<all.length;i++){a=all[i];if(!authA(a))continue;p=a.parentNode;if(!p)continue;found=null;for(j=0;j<groups.length;j++)if(groups[j].p===p)found=groups[j];if(!found){found={p:p,list:[]};groups.push(found)}found.list.push(a)}
 var best=null;
 for(j=0;j<groups.length;j++)if(groups[j].list.length>=2){best=groups[j];break}
 if(!best&&groups.length)best=groups[0];
 if(best)targets.push({anchors:best.list,kind:"gen"});
}
if(!targets.length)return;
var states=[];
function prep(t){
 var first=t.anchors[0],parent=first.parentNode;if(!parent)return null;
 var next=first.nextSibling,href=first.getAttribute("href")||"signup.html";
 var S={kind:t.kind,pre:href.replace(/signup\.html(\?signin=1)?$/,"") ,
  cls:first.getAttribute("class")||"",sty:first.getAttribute("style"),
  cls2:t.anchors[1]?(t.anchors[1].getAttribute("class")||""):null,sty2:t.anchors[1]?t.anchors[1].getAttribute("style"):undefined,sec:null};
 if(S.cls2===null)S.cls2=S.cls;if(S.sty2===undefined)S.sty2=S.sty;
 var i;for(i=0;i<t.anchors.length;i++)if(t.anchors[i].parentNode)t.anchors[i].parentNode.removeChild(t.anchors[i]);
 S.sec=document.createElement("span");S.sec.className="acctbar";S.sec.setAttribute("data-acctbar","1");
 if(t.kind==="nav"||(S.sty&&/margin-left\s*:\s*auto/.test(S.sty)))S.sec.style.marginLeft="auto";
 if(next&&next.parentNode===parent)parent.insertBefore(S.sec,next);else parent.appendChild(S.sec);
 return S;
}
function fill(S){
 S.sec.innerHTML="";
 function mkA(txt,hr,c,s){var a=document.createElement("a");a.textContent=txt;a.setAttribute("href",hr);if(c)a.setAttribute("class",c);if(s)a.setAttribute("style",s);return a}
 var ac=acct();
 if(ac&&!isOut()){
  var nm=document.createElement("a");nm.textContent=ac.name;nm.setAttribute("href",S.pre+"my-plugins.html");
  if(S.kind==="hm")nm.setAttribute("class","hmauth-b acctname");
  else if(S.kind==="gen"){nm.setAttribute("class","acctname");if(S.sty)nm.setAttribute("style",S.sty)}
  else nm.setAttribute("class","acctname");
  nm.style.textDecoration="none";
  S.sec.appendChild(nm);
  var lo=mkA("Logout","#",S.kind==="hm"?"hmauth-b":S.cls2,S.sty2);
  lo.addEventListener("click",function(e){e.preventDefault();try{localStorage.setItem(FKEY,"1")}catch(x){}
   var k;for(k=0;k<states.length;k++)fill(states[k]);
   var inf=document.getElementById("infostate");
   if(inf)inf.innerHTML='Not signed in. Everything still works \u2014 <a href="'+S.pre+'signup.html?signin=1"><b>sign in</b></a> to save your account on this device.';});
  S.sec.appendChild(lo);
 }else{
  S.sec.appendChild(mkA("Sign up",S.pre+"signup.html",S.kind==="hm"?"hmauth-b":S.cls,S.sty));
  S.sec.appendChild(mkA("Login",S.pre+"signup.html?signin=1",S.kind==="hm"?"hmauth-b":S.cls2,S.sty2));
 }
}
var k,S;for(k=0;k<targets.length;k++){S=prep(targets[k]);if(S)states.push(S)}
for(k=0;k<states.length;k++)fill(states[k]);
}catch(e){}})})();

/* mobilefit 2026-10-31: on phones the account section sat inside the
   horizontally scrolling tab strip, so the account name was cut at the
   strip's right edge and Logout scrolled off-screen. At <=760px the section
   is moved out of the strip onto the nav row itself (after the strip),
   where it stays visible; widening past 760px moves it back into the strip.
   Desktop rendering is untouched. */
(function(){function ready(f){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}
function fit(){
 try{
  if(!document.getElementById("mobilefit-css")){var st=document.createElement("style");st.id="mobilefit-css";st.textContent="@media(max-width:760px){.acctname{max-width:32vw!important}nav.tnav>.acctbar a{display:inline-flex;align-items:center;min-height:40px;padding:0 6px}}";document.head.appendChild(st)}
  var mq=window.matchMedia("(max-width:760px)");
  function apply(){
   var secs=document.querySelectorAll(".acctbar"),i,s,p;
   for(i=0;i<secs.length;i++){s=secs[i];p=s.parentNode;if(!p)continue;
    if(mq.matches){
     if(p.classList&&p.classList.contains("tabs")&&p.parentNode){s.setAttribute("data-mfhome","tabs");p.parentNode.appendChild(s)}
    }else if(s.getAttribute("data-mfhome")==="tabs"){
     var nav=s.parentNode,tabs=nav?nav.querySelector(".tabs"):null;
     if(tabs){tabs.appendChild(s)} s.removeAttribute("data-mfhome");
    }
   }
  }
  apply();
  if(mq.addEventListener)mq.addEventListener("change",apply);else if(mq.addListener)mq.addListener(apply);
  var n=0,iv=setInterval(function(){apply();if(++n>16)clearInterval(iv)},500);
 }catch(e){}
}
ready(fit);})();

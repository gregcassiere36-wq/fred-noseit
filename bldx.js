/* Plugin Builder: autosaved drafts (browser only), welcome message, optional in-plugin purchases. Demo only. */
(function(){
var f=document.getElementById("bf");if(!f||!window.PX)return;
var $=function(i){return document.getElementById(i)};
var qs=new URLSearchParams(location.search),did=qs.get("draft"),d=did?PX.get(did):null,dirty=false;
var wm=f.elements["wm"],wmEdited=false,names=["n","a","s","h","r","t","p"];
var iapl=$("iapl");
function row(n,p){var r=document.createElement("div");r.className="iapr";r.innerHTML='<input type="text" maxlength="40" placeholder="Add-on name, e.g. Unit 5 lesson pack" aria-label="Add-on name"/><input type="number" min="0" max="99" step="0.5" inputmode="decimal" placeholder="$" aria-label="Add-on price"/><button type="button" aria-label="Remove add-on">✕</button>';
 r.children[0].value=n||"";r.children[1].value=p==null?"":p;r.children[2].onclick=function(){r.remove();save()};return r}
function iapGet(){return [].slice.call(iapl.children).map(function(r){return{n:r.children[0].value.trim(),p:parseFloat(r.children[1].value)||0}}).filter(function(a){return a.n})}
$("iapadd").onclick=function(){iapl.appendChild(row());iapl.lastChild.children[0].focus()};
function gather(){var o=d||{id:did||PX.newId(),status:"draft",created:Date.now()};
 names.forEach(function(k){o[k]=f.elements[k].value});o.wm=wm.value;o.mk=f.elements["mktips"]&&f.elements["mktips"].checked;o.iap=iapGet();return o}
var tm=null;function save(st){clearTimeout(tm);var o=gather();if(!o.n&&!o.h&&!o.r&&!o.iap.length&&!dirty&&!d)return;if(st)o.status=st;d=o;did=o.id;PX.save(o);
 try{if(qs.get("draft")!==did){history.replaceState(null,"","plugin-builder.html?draft="+did)}}catch(e){}
 var s=$("savd");if(s){s.textContent="Saved in this browser ✓ "+PX.fmtDate(o.edited)}}
function later(){dirty=true;clearTimeout(tm);tm=setTimeout(function(){save()},400)}
if(d){names.forEach(function(k){if(d[k]!=null&&f.elements[k])f.elements[k].value=d[k]});wm.value=d.wm||"";wmEdited=!!d.wm;if(f.elements["mktips"])f.elements["mktips"].checked=!!d.mk;(d.iap||[]).forEach(function(a){iapl.appendChild(row(a.n,a.p))});if((d.iap||[]).length)$("iapx").open=true;
 var ev=new Event("input",{bubbles:true});f.elements["p"].dispatchEvent(ev)}
else if(did){/* unknown id: start fresh with that id */}
function autoWm(){if(wmEdited)return;wm.value=PX.welcomeDefault(f.elements["n"].value.trim(),f.elements["h"].value.trim())}
wm.addEventListener("input",function(){wmEdited=true});
f.addEventListener("input",function(e){if(e.target===f.elements["n"]||e.target===f.elements["h"])autoWm();later()});
f.addEventListener("change",later);
autoWm();
window.BLDX={save:function(st){save(st);return d},gather:gather,id:function(){return did},get:function(){return d}};
var u=PX.user();var who=$("whoami");
if(!u&&who){who.hidden=false;who.innerHTML='Your drafts save in this browser. Building is open to everyone — <a href="signup.html?next=plugin-builder.html">sign up free</a> or <a href="signup.html?signin=1">sign in</a> only to save your account on this device.'}
})();

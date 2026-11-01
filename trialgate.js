/* AIEDUME free-trial gate (demo). Loaded on the section pages that host the plugin chats.
   A trial starts only when the plugin page's "Try it free" button hands over a
   sessionStorage flag (aiedume_trial_open: {slug,name,total}). Each user message
   sent in a helper chat (a form inside a .pin) spends one chat, counted in
   localStorage aiedume_trial_<slug>. At zero, further sends are blocked and a
   "trial done" panel points to checkout.html. Plugins already in aiedume_bought
   are never gated (owned = unlimited). Nothing is sent anywhere. */
(function(){
"use strict";
var flag=null;
try{flag=JSON.parse(sessionStorage.getItem("aiedume_trial_open")||"null");sessionStorage.removeItem("aiedume_trial_open")}catch(e){}
if(!flag||!flag.slug)return;
var slug=String(flag.slug),total=parseInt(flag.total,10)||0;
if(total<=0)return;
function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
if(jget("aiedume_bought",[]).indexOf(slug)>-1)return;
var ck="aiedume_trial_"+slug,left=jget(ck,null);
if(typeof left!=="number"||left<0||left>total)left=total;
function save(){try{localStorage.setItem(ck,JSON.stringify(left))}catch(e){}}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var name=flag.name||"this plugin";
var st=document.createElement("style");
st.textContent=".trialbar{position:fixed;left:50%;transform:translateX(-50%);bottom:76px;z-index:9000;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 20px);padding:8px 14px;border-radius:999px;background:#101a30;border:2px solid #2dd4bf;color:#e8eefc;font:700 .88rem Inter,system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)}.trialbar b{color:#7ef0c5}.trialdone{position:fixed;left:50%;transform:translateX(-50%);bottom:76px;z-index:9001;width:min(430px,calc(100vw - 20px));background:#0f1a2f;border:2px solid #2dd4bf;border-radius:16px;padding:14px 16px;color:#e8eefc;font:500 .95rem Inter,system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.6)}.trialdone p{margin:0 0 8px}.trialdone .tbuy{display:inline-flex;align-items:center;min-height:44px;padding:0 20px;border-radius:999px;background:#2dd4bf;color:#062a26;font-weight:800;text-decoration:none}.trialdone .tx{margin-left:8px;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font-weight:700;cursor:pointer}@media(max-width:700px){.trialbar,.trialdone{bottom:70px}}";
(document.head||document.documentElement).appendChild(st);
var bar=document.createElement("div");bar.className="trialbar";bar.setAttribute("role","status");
function paint(){bar.innerHTML="\uD83C\uDF81 <span>Free trial \u2014 <b>"+left+" chat"+(left===1?"":"s")+" left</b> \u00B7 "+esc(name)+"</span>"}
function mount(){if(document.body){document.body.appendChild(bar);paint()}else document.addEventListener("DOMContentLoaded",mount)}
mount();
var done=null;
function showDone(){
 if(done)return;
 done=document.createElement("div");done.className="trialdone";done.setAttribute("role","alertdialog");done.setAttribute("aria-label","Free trial finished");
 done.innerHTML="<p><b>Your free trial is done.</b></p><p>You used all "+total+" free chats with "+esc(name)+". Buy it to keep chatting \u2014 no limits once it's yours.</p><a class=\"tbuy\" href=\"checkout.html?plugin="+encodeURIComponent(slug)+"\">Buy this plugin</a><button type=\"button\" class=\"tx\">Close</button>";
 document.body.appendChild(done);
 done.querySelector(".tx").onclick=function(){done.remove();done=null};
}
if(left<=0)showDone();
function chatForm(f){
 if(!f||f.tagName!=="FORM")return false;
 if(f.closest&&f.closest(".pin"))return true;
 if(!document.querySelector(".pin form")&&f.classList.contains("zf"))return true;
 return false;
}
document.addEventListener("submit",function(e){
 var f=e.target;
 if(!chatForm(f))return;
 if(left<=0){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showDone();return}
 left--;save();paint();
 if(left<=0)setTimeout(showDone,900);
},true);
document.addEventListener("click",function(e){
 if(left>0)return;
 var b=e.target&&e.target.closest?e.target.closest(".pin button[type=submit],.pin .pfs"):null;
 if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showDone()}
},true);
})();

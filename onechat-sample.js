/* SAMPLE PAGE COPY of onechat.js — every storage key is namespaced to aiedume_sample_*,
   so the sample page can never read or write Greg's real data. */
/* My Plugins — v7 layout (Greg's approved mockup): left column = your avatar,
   your info, the 5 builder buttons, and Fred's support chatbox; center = ONE
   big chatbox for the picked plugin (built AND bought); right = your plugin
   rows with an on/off switch and a trash button each.
   The chat engine is the seller-page engine from plugapp.js — same first line,
   same replies from the plugin's own material, same trial counting
   (aiedume_sample_trial_<slug>), same lock — parameterized by the picked plugin.
   Connect (per-plugin keys in aiedume_sample_connect_keys + starter text) unchanged.
   Demo only: nothing is sent. */
(function(){
var pick=document.getElementById("ocpick"),host=document.getElementById("occhat"),emptyEl=document.getElementById("ocempty"),offEl=document.getElementById("ocoff"),sideEmpty=document.getElementById("sideempty");
if(!pick||!host||!window.PX)return;
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
if(!$("occss")){var st=document.createElement("style");st.id="occss";
st.textContent=".cnx{position:fixed;inset:0;background:rgba(0,0,0,.7);display:grid;place-items:center;z-index:60;padding:12px}.cnx[hidden]{display:none}"
+".cnxc{background:#0f1a2e;border:1px solid #2dd4bf;border-radius:20px;max-width:460px;width:100%;max-height:92vh;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:8px}"
+".cnxc .lbl{display:block;font-weight:800;font-size:.9rem;color:#cfe0ff;margin:2px 0 0}"
+".cnxh{display:flex;gap:10px;align-items:flex-start}.cnxh h3{margin:0;flex:1;font:800 1.05rem Poppins,Inter,sans-serif}"
+".cnxp{margin:0;font-size:.9rem;color:#cfe0ff}"
+".cnxk{display:flex;gap:8px;align-items:center;background:#0b1220;border:2px solid #2dd4bf;border-radius:12px;padding:8px 10px}"
+".cnxk code{flex:1;font:700 .95rem ui-monospace,Menlo,monospace;color:#7ef0c5;word-break:break-all}"
+".cnxk button,.cnxrow button,.cnxmake{min-height:38px;padding:0 14px;border-radius:10px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font:700 .82rem Inter,sans-serif;cursor:pointer}"
+".cnxrow{display:flex;gap:8px;flex-wrap:wrap}.cnxrow .pri{background:#2dd4bf;color:#062a26;border-color:#2dd4bf}.cnxrow .danger{border-color:#8a4a4a;color:#ffb4b4}"
+".cnxt{width:100%;border-radius:12px;background:#0b1220;border:1px solid #263553;color:#e8eefc;padding:10px;font:400 .85rem/1.45 ui-monospace,Menlo,monospace;resize:vertical}"
+".cnxnote{margin:0;font-size:.82rem;color:#9fb0d3}.cnxnone p{margin:0 0 8px;font-size:.9rem;color:#cfe0ff}"
+".cnx button.ok{border-color:#7ef0c5;color:#7ef0c5}"
+".px2{min-width:36px;min-height:36px;border-radius:10px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font-weight:800;cursor:pointer}"
+".ocinfo .ock{display:flex;gap:8px;align-items:center;background:#0b1220;border:2px solid #2dd4bf;border-radius:12px;padding:8px 10px;margin:6px 0}"
+".ocinfo .ock code{flex:1;font:700 .95rem ui-monospace,Menlo,monospace;color:#7ef0c5;word-break:break-all}"
+".ocbtn{min-height:38px;padding:0 14px;border-radius:10px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font:700 .82rem Inter,sans-serif;cursor:pointer}"
+".ocbtn.pri{background:#2dd4bf;color:#062a26;border-color:#2dd4bf}"
+".ocbtn.ok{border-color:#7ef0c5;color:#7ef0c5}"
+".ocinfo textarea{width:100%;box-sizing:border-box;border-radius:12px;background:#0b1220;border:1px solid #263553;color:#e8eefc;padding:10px;font:400 .85rem/1.45 ui-monospace,Menlo,monospace;resize:vertical;margin:6px 0}"
+".ocnote2{margin:6px 0 0;font-size:.82rem;color:#9fb0d3}"
+".ocp{margin:4px 0}"
+".ocrow{display:flex;gap:9px;align-items:center;width:100%;box-sizing:border-box;text-align:left;background:#0f1a2e;border:2px solid #263553;border-radius:12px;padding:8px 10px;cursor:pointer;color:#e8eefc;margin-top:6px;font:inherit}"
+".ocrow:hover{border-color:#2dd4bf}"
+".ocrow img{width:34px;height:34px;border-radius:10px;object-fit:cover;flex:none}"
+".ocrow .pw2{flex:1;min-width:0}.ocrow .pw2 b{display:block;font-size:.88rem;color:#e8eefc}.ocrow .pw2 small{color:#9fb0d3;font-size:.76rem}"
+".oced{display:flex;flex-direction:column;gap:7px;margin-top:6px}"
+".oced label{font-size:.78rem;font-weight:700;color:#9fb0d3;display:flex;flex-direction:column;gap:4px}"
+".oced input,.oced textarea{border-radius:9px;background:#0b1220;border:1px solid #3d5a80;padding:8px 10px;color:#e8eefc;font:400 .9rem Inter,sans-serif;resize:vertical;margin:0;width:100%;box-sizing:border-box}"
+".ocjoy{display:flex;gap:10px;align-items:flex-start;margin-top:4px}"
+".ocjoy img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #ffd27a;flex:none}"
+".ocjoy ul{margin:4px 0 4px 18px;padding:0}"
+".ocjoy small{color:#9fb0d3}";
document.head.appendChild(st)}
/* ---------- the person's plugins: built + bought, one list ---------- */
var u=PX.user(),userName=(u&&u.name)||"You (demo)";
function wmOfDraft(d){return (d.wm&&String(d.wm).trim())?String(d.wm):(PX.welcomeDefault?PX.welcomeDefault(d.n,d.h):"What can I help you build?")}
function builtX(d){
 var inside=[];if(d.h)inside.push(d.h);
 inside.push(d.r?"My own lessons, tips and resources":"Built by a real teacher or parent");
 return {slug:"my-"+d.id,n:d.n||"Untitled plugin",p:0,trial:0,f:null,cn:d.n||"Your plugin",role:"Your plugin \u00B7 built by you",inside:inside,ex:d.ex||"",built:true,first:wmOfDraft(d),askName:"your plugin"}}
function formX(fd){
 return {slug:"my-formdraft",n:fd.name,p:0,trial:0,f:null,cn:fd.name,role:"Your plugin \u00B7 built by you",inside:[fd.desc||"Built from my own lessons"],ex:"",built:true,first:(PX.welcomeDefault?PX.welcomeDefault(fd.name,fd.desc):"What can I help you build?"),askName:"your plugin"}}
function boughtX(x){
 return {slug:x.slug,n:x.n,p:x.p||0,trial:x.trial||0,f:x.f||null,cn:x.cn,role:x.role,inside:x.inside||[],ex:x.ex||"",built:false,first:"What can I help you build?",askName:(x.cn||"").split(" ").pop()||"them"}}
var bySlug={};(window.PLUGINS||[]).forEach(function(p){bySlug[p.slug]=p});
var items=[];
function buildItems(){
 items=[];
 PX.list().forEach(function(d){items.push({key:"b:"+d.id,kind:"built",label:d.n||"Untitled plugin",x:builtX(d)})});
 var fd=jget("aiedume_sample_draft",null);
 if(fd&&fd.name&&!items.some(function(it){return it.label===fd.name}))items.push({key:"b:form",kind:"built",label:fd.name,x:formX(fd)});
 jget("aiedume_sample_bought",[]).forEach(function(s){
  var x=bySlug[s];if(!x)return;
  if(x.mine)return; /* my own published plugin: already listed under built */
  items.push({key:"s:"+s,kind:"bought",label:x.n,x:boughtX(x)})});
}
/* ---------- on/off state (per item key, saved in this browser) ---------- */
var OFFKEY="aiedume_sample_plugin_off";
function offMap(){return jget(OFFKEY,{})}
function isOff(it){return !!offMap()[it.key]}
function setOff(it,off){var m=offMap();if(off)m[it.key]=1;else delete m[it.key];jset(OFFKEY,m)}
/* ---------- row icons ---------- */
var EMO={lit:"\uD83D\uDCDA",math:"\uD83D\uDD22",art:"\uD83C\uDFA8",research:"\uD83D\uDD2C",guide:"\uD83E\uDDED",hw:"\u270F\uFE0F",para:"\uD83E\uDD1D",stuteach:"\uD83C\uDF93",iep:"\uD83D\uDCCB",plan:"\uD83D\uDCDD",grade:"\u2705"};
function iconOf(it){if(it.kind==="built")return "\uD83E\uDDE9";var pl=bySlug[it.x.slug];return (pl&&EMO[pl.id])||"\uD83E\uDDE9"}
/* ---------- left column: avatar + info ---------- */
function fillIdentity(){
 var usr=PX.user(),nm=(usr&&usr.name)||"Guest";var so=false;try{so=localStorage.getItem("aiedume_sample_signed_out")==="1"}catch(e){}
 var av=null;try{av=localStorage.getItem("aiedume_sample_avatar")}catch(e){}
 var img=$("avimg"),ph=$("avph");
 if(av&&img){img.src=av;img.hidden=false;if(ph)ph.hidden=true}
 else if(img){img.hidden=true;if(ph)ph.hidden=false}
 if($("avname"))$("avname").textContent=nm;
 if($("infoname"))$("infoname").textContent=nm;
 if($("infoemail"))$("infoemail").textContent=(usr&&usr.email)||"";
 if($("infostate"))$("infostate").innerHTML=(usr&&!so)?"Signed in":'Not signed in. Everything still works — <a href="signup.html?signin=1"><b>sign in</b></a> to save your account on this device.';
}
/* ---------- right column: plugin rows ---------- */
var curIdx=-1,cur=null;
function renderRows(){
 pick.innerHTML=items.map(function(it,i){
  var off=isOff(it);
  return '<div class="prow'+(i===curIdx?" sel":"")+(off?" off":"")+'" data-i="'+i+'" role="option" aria-selected="'+(i===curIdx?"true":"false")+'">'
  +'<span class="ic" aria-hidden="true">'+iconOf(it)+'</span>'
  +'<div class="pw"><b>'+esc(it.label)+'</b></div>'
  +'<button type="button" class="sw'+(off?" off":"")+'" data-sw="'+i+'" role="switch" aria-checked="'+(off?"false":"true")+'" aria-label="Turn '+esc(it.label)+' '+(off?"on":"off")+'"><span class="track"></span><small>'+(off?"Off":"On")+'</small></button>'
  +'<button type="button" class="del" data-del="'+i+'" aria-label="Remove '+esc(it.label)+'">\uD83D\uDDD1\uFE0F</button>'
  +'</div>'}).join("");
 if(sideEmpty)sideEmpty.hidden=items.length>0;
}
function showCenter(which){
 if(emptyEl)emptyEl.hidden=which!=="empty";
 if(offEl)offEl.hidden=which!=="off";
 host.style.display=which==="chat"?"":"none";
}
function select(i){
 var it=items[i];if(!it||isOff(it))return;
 hideSys();hideSup();
 curIdx=i;
 [].forEach.call(pick.children,function(r,j){r.classList.toggle("sel",j===i);r.setAttribute("aria-selected",j===i?"true":"false")});
 if(cur)cur.destroy();
 showCenter("chat");
 cur=makeChat(it.x);
 cur.open();
}
function pickFirstOn(){
 hideSys();hideSup();
 for(var i=0;i<items.length;i++)if(!isOff(items[i])){select(i);return}
 curIdx=-1;if(cur){cur.destroy();cur=null}
 showCenter(items.length?"off":"empty");
}
function trash(i){
 var it=items[i];if(!it)return;
 if(it.kind==="built"&&it.key!=="b:form"){
  if(!confirm("Delete this draft from this browser?"))return;
  PX.del(it.key.slice(2));
 }else if(it.key==="b:form"){
  if(!confirm("Delete this draft from this browser?"))return;
  try{localStorage.removeItem("aiedume_sample_draft")}catch(e){}
 }else{
  if(!confirm("Remove this plugin from My Plugins?"))return;
  var B=jget("aiedume_sample_bought",[]).filter(function(s){return s!==it.x.slug});
  jset("aiedume_sample_bought",B);
 }
 if(cur){cur.destroy();cur=null}
 curIdx=-1;
 buildItems();renderRows();pickFirstOn();
}
pick.addEventListener("click",function(e){
 var t=e.target;if(!t||!t.closest)return;
 var sw=t.closest("[data-sw]");
 if(sw){var i1=+sw.getAttribute("data-sw"),it1=items[i1];if(!it1)return;
  var off=!isOff(it1);setOff(it1,off);
  if(off&&i1===curIdx){if(cur){cur.destroy();cur=null}curIdx=-1;showCenter("off")}
  renderRows();return}
 var dl=t.closest("[data-del]");
 if(dl){trash(+dl.getAttribute("data-del"));return}
 var row=t.closest(".prow");
 if(row){var i2=+row.getAttribute("data-i"),it2=items[i2];if(!it2)return;
  if(isOff(it2)){curIdx=-1;if(cur){cur.destroy();cur=null}renderRows();showCenter("off");return}
  select(i2)}
});
/* ---------- seller chat engine (same as the plugin page's), keyed to the pick ---------- */
function makeChat(x){
 var pchat=null,clog=null,cin=null,clock=null,chatMode="owned",chatLeft=0,replyN=0;
 function isOwned(){return jget("aiedume_sample_bought",[]).indexOf(x.slug)>-1}
 function buildChat(){
  pchat=document.createElement("div");pchat.className="pchat";pchat.hidden=true;
  var face=x.f?'<img class="ic" alt="" src="img/faces/'+esc(x.f)+'.webp"/>':'<span class="ic" aria-hidden="true">\uD83E\uDDE9</span>';
  pchat.innerHTML='<div class="chead">'+face+'<h2>'+esc(x.n)+'</h2></div><div class="clog" aria-live="polite"></div><div class="clock" hidden><p><b>Your free sample is done.</b> Buy this plugin to keep chatting with '+esc(x.cn)+' \u2014 no limits once it is yours.</p><a class="getbtn" href="checkout.html?plugin='+encodeURIComponent(x.slug)+'">Buy \u00B7 '+(window.priceLabel?priceLabel(x):"$"+x.p)+'</a></div><form class="cform"><input placeholder="Type what you need..." aria-label="Type your message" autocomplete="off"/><button type="button" class="calt" data-up aria-label="Upload a file">\uD83D\uDCCE Upload</button><input type="file" data-file hidden/><button type="button" class="calt cmic" aria-label="Talk">\u{1F3A4} Talk</button><button type="submit">Send</button></form>';
  host.appendChild(pchat);
  clog=pchat.querySelector(".clog");cin=pchat.querySelector("input:not([type=file])");clock=pchat.querySelector(".clock");
  pchat.querySelector("form").addEventListener("submit",function(e){
   e.preventDefault();var t=cin.value.trim();if(!t)return;
   if(chatMode==="trial"){if(chatLeft<=0){clock.hidden=false;return}chatLeft--;try{localStorage.setItem("aiedume_sample_trial_"+x.slug,JSON.stringify(chatLeft))}catch(err){}}
   cin.value="";addMsg("",t,true);
   setTimeout(function(){addMsg(x.cn,sellerReply());if(chatMode==="trial"&&chatLeft<=0)clock.hidden=false},350);
  });
  var fup=pchat.querySelector("[data-file]");
  pchat.querySelector("[data-up]").onclick=function(){fup.click()};
  fup.addEventListener("change",function(){
   var f=fup.files&&fup.files[0];fup.value="";
   if(!f)return;
   addMsg("","\uD83D\uDCCE "+f.name,true);
   setTimeout(function(){addMsg(x.cn,sellerReply())},350);
  });
  var cmic=pchat.querySelector(".cmic");
  cmic.onclick=function(){
   var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
   if(!SR){addMsg(x.cn,"\u{1F3A4} Talking does not work in this browser. Please type your question instead (or try Chrome or Safari).");return}
   if(cmic.zr){cmic.zr.stop();return}
   var rc=new SR;cmic.zr=rc;rc.lang="en-US";rc.interimResults=false;rc.maxAlternatives=1;
   cmic.textContent="\u{1F442} Listening\u2026 tap to stop";cmic.classList.add("on");
   rc.onresult=function(ev){cin.value=ev.results[0][0].transcript;var fm=pchat.querySelector("form");if(fm.requestSubmit)fm.requestSubmit();else fm.dispatchEvent(new Event("submit",{cancelable:true}))};
   rc.onerror=function(ev){if(ev.error==="not-allowed")addMsg(x.cn,"\u{1F3A4} Please allow the microphone, or type your question.")};
   rc.onend=function(){cmic.zr=null;cmic.textContent="\u{1F3A4} Talk";cmic.classList.remove("on")};
   try{rc.start()}catch(err){rc.onend()}
  };
 }
 function addMsg(who,text,me){var d=document.createElement("div");d.className="cb"+(me?" me":"");if(!me){var b=document.createElement("b");b.textContent=who;d.appendChild(b)}d.appendChild(document.createTextNode(text));clog.appendChild(d);clog.scrollTop=1e5}
 function sellerReply(){
  var ins=x.inside||[],bits=["Sure \u2014 let\u2019s build it together. Tell me the grade and the topic, and I will shape it with you."];
  if(ins.length)bits.push("Here is a place to start, from what\u2019s inside my plugin: "+ins[replyN%ins.length]+". Tell me what to change and I will redo it.");
  if(x.ex)bits.push("A quick example of how I work: "+String(x.ex).replace(/^Example:\s*/,""));
  bits.push("Got it. Here is a first version in my style \u2014 short steps, ready to use. Want it simpler, shorter, or harder?");
  var t=bits[replyN%bits.length];replyN++;return t}
 function openChat(mode){
  if(isOwned()||x.p<=0||x.built)mode="owned";
  else if(mode!=="trial")mode="trial";
  if(!pchat)buildChat();
  if(mode==="trial"&&!(x.trial>0)){ /* no free sample on this one: show the way to get it */
   chatMode="trial";chatLeft=0;pchat.hidden=false;clock.hidden=false;return}
  chatMode=mode;pchat.hidden=false;
  if(!clog.childElementCount)addMsg(x.cn,x.first);
  if(mode==="trial"){var left=jget("aiedume_sample_trial_"+x.slug,null);if(typeof left!=="number"||left<0||left>x.trial)left=x.trial;chatLeft=left;clock.hidden=left>0}
  else clock.hidden=true;
  cin.focus();
 }
 return {open:function(){openChat("owned")},destroy:function(){if(pchat)pchat.remove();pchat=null},
 addText:function(who,text){if(!pchat)buildChat();addMsg(who,text)},
 addNode:function(node){if(!pchat)buildChat();clog.appendChild(node);clog.scrollTop=1e5}};
}
/* ---------- Connect: use any plugin in other AIs (Greg, Oct 30) ----------
   Every plugin (built or bought) gets a per-plugin connect key, kept in
   localStorage. The working way to use a plugin in ChatGPT, Muse, Grok or
   any AI chat today is copy + paste: the panel builds a starter text from
   the plugin's OWN words (name, seller, what it does, what's inside, its
   example) that turns the other AI into that helper. Demo only: the key
   lives in this browser, nothing is sent anywhere. */
var CNXKEYS="aiedume_sample_connect_keys";
function cnxKeys(){return jget(CNXKEYS,{})}
function cnxSaveKeys(m){try{localStorage.setItem(CNXKEYS,JSON.stringify(m))}catch(e){}}
function cnxKeyFor(slug){
 var m=cnxKeys();if(m[slug])return m[slug];
 var base=String(slug||"plugin").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,14)||"PLUGIN";
 var chars="ABCDEFGHJKMNPQRSTUVWXYZ23456789",tail="",i;
 try{var a=new Uint32Array(6);(window.crypto||{}).getRandomValues(a);for(i=0;i<6;i++)tail+=chars[a[i]%chars.length]}
 catch(e){for(i=0;i<6;i++)tail+=chars[Math.floor(Math.random()*chars.length)]}
 var k="FRED-"+base+"-"+tail;m[slug]=k;cnxSaveKeys(m);return k}
function cnxDropKey(slug){var m=cnxKeys();if(m[slug]){delete m[slug];cnxSaveKeys(m)}}
function cnxDescBuilt(d){
 var inside=[];if(d.h)inside.push(d.h);
 inside.push(d.r?"My own lessons, tips and resources":"Built by a real teacher or parent");
 return {slug:"my-"+d.id,built:true,title:d.n||"Untitled plugin",person:userName,role:"built by you on Fred Noseit",does:d.h||"",inside:inside,ex:d.ex||"",first:wmOfDraft(d)}}
function cnxDescBought(pl){
 return {slug:pl.slug,built:false,title:pl.n,person:pl.cn,role:pl.role,does:pl.d||"",inside:pl.inside||[],ex:pl.ex||"",first:"What can I help you build?"}}
function cnxDescX(x){
 var pl=bySlug[x.slug];
 return {slug:x.slug,built:!!x.built,title:x.n,person:x.built?userName:x.cn,role:x.role,does:x.built?((x.inside&&x.inside[0])||""):(pl?pl.d||"":""),inside:x.inside||[],ex:x.ex||"",first:x.first||"What can I help you build?"}}
function cnxStarter(desc,key){
 var L=[];
 if(desc.built)L.push("Hi, I'm the helper from \u201C"+desc.title+"\u201D \u2014 a plugin built on Fred Noseit. From now on, I am helping you right here in this chat.");
 else L.push("Hi, I'm "+desc.person+(desc.role?(", "+desc.role):"")+". I'm a helper from Fred Noseit, and from now on I am helping you right here in this chat.");
 L.push("My connect key: "+key);
 if(desc.does)L.push("What I do: "+desc.does);
 if(desc.inside&&desc.inside.length){L.push("Inside my plugin:");desc.inside.forEach(function(t){L.push("- "+t)})}
 if(desc.ex)L.push("One example of my work: "+String(desc.ex).replace(/^Example:\s*/,""));
 L.push("Answer as me, in first person. Keep answers short, plain and ready to use.");
 L.push("Open with this line:");
 L.push(desc.first||"What can I help you build?");
 return L.join("\n")}
var cnxEl=null,cnxDesc=null;
function cnxBuild(){
 cnxEl=document.createElement("div");cnxEl.className="cnx";cnxEl.hidden=true;
 cnxEl.innerHTML='<div class="cnxc" role="dialog" aria-modal="true" aria-label="Connect this plugin to other AIs">'
 +'<div class="cnxh"><h3></h3><button type="button" class="px2" data-cnx="close" aria-label="Close">\u2715</button></div>'
 +'<p class="cnxp"></p>'
 +'<div class="cnxhas"><span class="lbl">Your connect key</span>'
 +'<div class="cnxk"><code></code><button type="button" data-cnx="copykey">Copy key</button></div>'
 +'<span class="lbl">Starter text \u2014 paste it into the other AI</span>'
 +'<textarea class="cnxt" readonly rows="9" aria-label="Starter text"></textarea>'
 +'<div class="cnxrow"><button type="button" class="pri" data-cnx="copystarter">Copy starter text</button><button type="button" class="danger" data-cnx="drop">Disconnect</button></div></div>'
 +'<div class="cnxnone" hidden><p>No connect key for this plugin right now.</p><button type="button" class="cnxmake" data-cnx="make">Make my connect key</button></div>'
 +'<p class="cnxnote">Paste the starter text into any AI chat to use this plugin there. Your key is yours \u2014 don\u2019t share it.</p>'
 +'</div>';
 document.body.appendChild(cnxEl);
 cnxEl.addEventListener("click",function(e){if(e.target===cnxEl)cnxEl.hidden=true});
 cnxEl.querySelector('[data-cnx="close"]').onclick=function(){cnxEl.hidden=true};
 cnxEl.querySelector('[data-cnx="copykey"]').onclick=function(){if(cnxDesc)cnxCopy(cnxKeys()[cnxDesc.slug]||"",this)};
 cnxEl.querySelector('[data-cnx="copystarter"]').onclick=function(){cnxCopy(cnxEl.querySelector(".cnxt").value,this)};
 cnxEl.querySelector('[data-cnx="drop"]').onclick=function(){if(cnxDesc){cnxDropKey(cnxDesc.slug);cnxRender()}};
 cnxEl.querySelector('[data-cnx="make"]').onclick=function(){if(cnxDesc){cnxKeyFor(cnxDesc.slug);cnxRender()}};
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&cnxEl&&!cnxEl.hidden)cnxEl.hidden=true});
}
function cnxCopy(text,btn){
 function done(){if(!btn)return;var old=btn.textContent;btn.textContent="Copied \u2713";btn.classList.add("ok");setTimeout(function(){btn.textContent=old;btn.classList.remove("ok")},1600)}
 function fb(){try{var ta=document.createElement("textarea");ta.value=text;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();done()}catch(e){}}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,fb);
 else fb()}
function cnxRender(){
 if(!cnxEl||!cnxDesc)return;
 var key=cnxKeys()[cnxDesc.slug]||null,has=!!key;
 cnxEl.querySelector(".cnxh h3").textContent="\u{1F517} Connect "+cnxDesc.title;
 cnxEl.querySelector(".cnxp").textContent="Use "+cnxDesc.title+" in ChatGPT, Muse, Grok \u2014 any AI chat. Copy the starter text below, paste it into that chat, and this helper starts working there.";
 cnxEl.querySelector(".cnxhas").hidden=!has;
 cnxEl.querySelector(".cnxnone").hidden=has;
 if(has){cnxEl.querySelector(".cnxk code").textContent=key;cnxEl.querySelector(".cnxt").value=cnxStarter(cnxDesc,key)}
}
function openConnect(desc,focusStarter){
 if(!desc)return;
 if(!cnxEl)cnxBuild();
 cnxDesc=desc;
 if(!cnxKeys()[desc.slug])cnxKeyFor(desc.slug);
 cnxRender();
 cnxEl.hidden=false;
 if(focusStarter){var ta=cnxEl.querySelector(".cnxt");if(ta){ta.scrollIntoView({block:"nearest"});ta.focus()}}
}
window.FredConnect={
 openBuilt:function(id){var d=PX.get(id);if(d)openConnect(cnxDescBuilt(d))},
 openBought:function(slug){var pl=bySlug[slug];if(pl)openConnect(cnxDescBought(pl))},
 openX:function(x){openConnect(cnxDescX(x))}
};
document.addEventListener("click",function(e){
 var t=e.target;if(!t||!t.closest)return;
 var bb=t.closest("[data-connect-built]");
 if(bb){var d=PX.get(bb.getAttribute("data-connect-built"));if(d)openConnect(cnxDescBuilt(d));return}
 var bo=t.closest("[data-connect-bought]");
 if(bo){var pl=bySlug[bo.getAttribute("data-connect-bought")];if(pl)openConnect(cnxDescBought(pl))}
});
/* ---------- left column: the builder buttons — everything happens in the chatbox ----------
   (Greg's combined page, Oct 30: the five buttons' info pops up IN the center
   chatbox, next to the picked plugin — no panels, no page trips. Plus the
   "Plugins I bought" and "Promote your plugin" buttons, and Edit profile.) */
function bnote(t){var n=$("bnote");if(!n)return;n.textContent=t;n.hidden=!t}
function curItem(){return curIdx>=0?items[curIdx]:null}
/* A place to post when no plugin chat is open: a plain log in the center box. */
var sysEl=null,sysLog=null;
function buildSys(){
 sysEl=document.createElement("div");sysEl.className="pchat";sysEl.hidden=true;
 sysEl.innerHTML='<div class="chead"><span class="ic" aria-hidden="true">\uD83E\uDDE9</span><h2>My Plugins</h2></div><div class="clog" aria-live="polite"></div>';
 host.appendChild(sysEl);sysLog=sysEl.querySelector(".clog")}
function showSys(){if(cur)return;hideSup();if(!sysEl)buildSys();if(emptyEl)emptyEl.hidden=true;if(offEl)offEl.hidden=true;host.style.display="";sysEl.hidden=false}
function hideSys(){if(sysEl)sysEl.hidden=true}
function sysAdd(d){if(!sysEl)buildSys();sysLog.appendChild(d);sysLog.scrollTop=1e5}
function postText(who,text){
 if(cur){cur.addText(who,text);return}
 showSys();var d=document.createElement("div");d.className="cb";
 if(who){var b=document.createElement("b");b.textContent=who;d.appendChild(b)}
 d.appendChild(document.createTextNode(text));sysAdd(d)}
function postNode(node){if(cur){cur.addNode(node);return}showSys();sysAdd(node)}
function postPlain(text){var d=document.createElement("div");d.className="cb";d.appendChild(document.createTextNode(text));postNode(d)}
function cardEl(title){
 var d=document.createElement("div");d.className="cb ocinfo";
 var b=document.createElement("b");b.style.fontSize=".95rem";b.style.color="#e8eefc";b.textContent=title;d.appendChild(b);return d}
function pEl(t){var p=document.createElement("p");p.className="ocp";p.textContent=t;return p}
function needPick(){bnote("");postText("My Plugins","Pick a plugin first \u2014 tap one on the right.")}
/* ---- 1) API code + 2) Connect: the Connect content, inside the chat ---- */
function apiCard(it){
 var desc=cnxDescX(it.x),key=cnxKeyFor(desc.slug);
 var node=cardEl("\uD83D\uDD17 "+it.x.n+" \u2014 your API code");
 var row=document.createElement("div");row.className="ock";
 var code=document.createElement("code");code.textContent=key;
 var btn=document.createElement("button");btn.type="button";btn.className="ocbtn";btn.textContent="Copy key";
 btn.onclick=function(){cnxCopy(key,btn)};
 row.appendChild(code);row.appendChild(btn);node.appendChild(row);
 var note=document.createElement("p");note.className="ocnote2";note.textContent="Your key is yours \u2014 don\u2019t share it.";node.appendChild(note);
 return node}
function connectCard(it){
 var desc=cnxDescX(it.x),key=cnxKeyFor(desc.slug);
 var node=cardEl("\uD83D\uDD17 Connect "+it.x.n+" to other AI programs");
 var ta=document.createElement("textarea");ta.readOnly=true;ta.rows=9;ta.value=cnxStarter(desc,key);ta.setAttribute("aria-label","Starter text");
 node.appendChild(ta);
 var btn=document.createElement("button");btn.type="button";btn.className="ocbtn pri";btn.textContent="Copy starter text";
 btn.onclick=function(){cnxCopy(ta.value,btn)};
 node.appendChild(btn);
 var note=document.createElement("p");note.className="ocnote2";note.textContent="Paste the starter text into any AI chat to use this plugin there.";node.appendChild(note);
 return node}
/* ---- 3) Sales: the seller page's real numbers, in the chat ---- */
function fmt$(v){v=Math.round(v*100)/100;return "$"+(v%1?v.toFixed(2):String(v))}
function salesCard(){
 var B=jget("aiedume_sample_bought",[]),totY=0,totX=0,lines=[];
 PX.list().forEach(function(d){
  var p=parseFloat(d.p)||0,slug="my-"+d.id,n=0;
  B.forEach(function(s){if(s===slug)n++});
  if(n>0){var y=n*p,x=n*(Math.round(p*80)/100);totY+=y;totX+=x;lines.push({name:d.n||"Untitled plugin",n:n,y:y,x:x})}});
 var node=cardEl("\uD83D\uDCC8 Your plugin sales");
 if(!lines.length){node.appendChild(pEl("No sales yet."));return node}
 lines.forEach(function(L){node.appendChild(pEl(L.name+" \u2014 bought "+L.n+" time"+(L.n>1?"s":"")+" in this browser. Price: Set later."))}); /* pricefix 2026-10-30: no dollar amounts shown - Joy\u2019s The Promoter, $10/month, is the only price */
 var tot=pEl("Earnings: Set later \u2014 prices are not set yet.");tot.style.fontWeight="800";tot.style.color="#7ef0c5";node.appendChild(tot);
 return node}
/* ---- 4) Update: edit the plugin's text right in the chat ---- */
function updField(lab,val,rows){
 var l=document.createElement("label");l.textContent=lab;
 var inp;
 if(rows){inp=document.createElement("textarea");inp.rows=rows}
 else{inp=document.createElement("input");inp.type="text"}
 inp.value=val==null?"":val;l.appendChild(inp);return{label:l,input:inp}}
function afterUpdateSave(key){
 buildItems();renderRows();
 var idx=-1;items.forEach(function(it2,i2){if(it2.key===key)idx=i2});
 if(idx>-1)select(idx);else pickFirstOn();
 var it3=idx>-1?items[idx]:null;
 postText(it3?it3.x.cn:"My Plugins","Saved. The Checker reviews updates before they show in the store.")}
function updateCard(it){
 var node=cardEl("\u270F\uFE0F Update "+it.x.n);
 node.appendChild(pEl("Change the text right here in the chat, then tap Save update."));
 var wrap=document.createElement("div");wrap.className="oced";
 var save=document.createElement("button");save.type="button";save.className="ocbtn pri";save.textContent="Save update";save.style.alignSelf="flex-start";
 if(it.key==="b:form"){
  var fd=jget("aiedume_sample_draft",null)||{};
  var fN=updField("Name",fd.name||""),fD=updField("What it does",fd.desc||"",3);
  wrap.appendChild(fN.label);wrap.appendChild(fD.label);wrap.appendChild(save);node.appendChild(wrap);
  save.onclick=function(){fd.name=fN.input.value;fd.desc=fD.input.value;jset("aiedume_sample_draft",fd);afterUpdateSave(it.key)};
 }else{
  var d=PX.get(it.key.slice(2));if(!d)return node;
  var fN2=updField("Name",d.n||""),fH=updField("What it does",d.h||"",3),fW=updField("Welcome message",wmOfDraft(d),3),fE=updField("Example",String(d.ex||"").replace(/^Example:\s*/,""),2);
  wrap.appendChild(fN2.label);wrap.appendChild(fH.label);wrap.appendChild(fW.label);wrap.appendChild(fE.label);wrap.appendChild(save);node.appendChild(wrap);
  save.onclick=function(){d.n=fN2.input.value;d.h=fH.input.value;d.wm=fW.input.value;d.ex=fE.input.value;PX.save(d);afterUpdateSave(it.key)};
 }
 return node}
/* ---- Plugins I bought: a list in the chat; tap one to open it ---- */
function boughtCard(){
 var B=jget("aiedume_sample_bought",[]),seen={},list=[];
 B.forEach(function(s){if(seen[s])return;seen[s]=1;var pl=bySlug[s];if(pl&&!pl.mine)list.push(pl)});
 if(!list.length)return null;
 var node=cardEl("\uD83D\uDED2 Plugins you bought");
 list.forEach(function(pl){
  var idx=-1;items.forEach(function(it2,i2){if(it2.kind==="bought"&&it2.x.slug===pl.slug)idx=i2});
  var row=document.createElement("button");row.type="button";row.className="ocrow";
  row.innerHTML=(pl.f?'<img alt="" src="img/faces/'+esc(pl.f)+'.webp"/>':'<span aria-hidden="true">\uD83E\uDDE9</span>')+'<span class="pw2"><b>'+esc(pl.n)+'</b><small>by '+esc(pl.cn)+(pl.role?' \u00B7 '+esc(pl.role):"")+'</small></span>';
  if(idx>-1)row.onclick=function(){var rows=pick.children;if(rows[idx])rows[idx].click()};
  node.appendChild(row)});
 return node}
/* ---- Promote: Joy the Promoter, in the chat ----
   Same store and end state as the builder's Joy flow (bldchat.js bzSub):
   localStorage "aiedume_sample_marketing" = {paid:true,demo:true,
   item:"marketing-helper",amount:10,plan:"monthly",ts}. */
function joySubbed(){try{return!!JSON.parse(localStorage.getItem("aiedume_sample_marketing")||"null")}catch(e){return false}}
function joyStart(){try{localStorage.setItem("aiedume_sample_marketing",JSON.stringify({paid:true,demo:true,item:"marketing-helper",amount:10,plan:"monthly",ts:Date.now()}))}catch(e){}}
function promoteCard(it){
 var node=cardEl("\uD83D\uDCE3 Promote "+it.x.n);
 var wrap=document.createElement("div");wrap.className="ocjoy";
 var img=document.createElement("img");img.src="img/agents/joy.webp";img.alt="Joy the Promoter";
 var tx=document.createElement("div");
 tx.appendChild(pEl("Hi, I'm Joy, your promoter. Once your plugin is published, I can promote it in the Plugin Store for $10/month."));
 tx.appendChild(pEl("Here is what I'll do, one step at a time:"));
 var ul=document.createElement("ul");
 ["Start the $10/month Promotion (demo)","Pick where to promote it","Draft your promo posts","Walk you through posting them"].forEach(function(t){var li=document.createElement("li");li.textContent=t;ul.appendChild(li)});
 tx.appendChild(ul);
 var sm=document.createElement("small");sm.textContent="Demo only: nothing is connected or posted, nothing is charged, and I can't promise sales or income.";tx.appendChild(sm);
 var act=document.createElement("div");act.style.marginTop="8px";
 /* joywire 2026-11-01: the Promote button's real action is Joy's own page,
    opened for THIS picked plugin (?plugin=<draft id> reads the same store). */
 var pid=(it.key&&it.key.indexOf("b:")===0)?it.key.slice(2):"";
 var ja=document.createElement("a");ja.className="ocbtn pri";ja.style.display="inline-flex";ja.style.alignItems="center";ja.style.textDecoration="none";ja.textContent="\uD83D\uDCE3 Promote it with Joy";ja.href="joy-promoter.html"+(pid&&pid!=="form"?("?plugin="+encodeURIComponent(pid)):"");
 act.appendChild(ja);
 if(joySubbed()){act.appendChild(pEl("Your promotion is already started (demo). $10/month."))}
 else{var b=document.createElement("button");b.type="button";b.className="ocbtn";b.textContent="Start $10/month (demo)";
  b.onclick=function(){joyStart();act.innerHTML="";act.appendChild(ja);act.appendChild(pEl("Started \u2713 (demo). $10/month."))};
  act.appendChild(b)}
tx.appendChild(act);
 wrap.appendChild(img);wrap.appendChild(tx);node.appendChild(wrap);
 return node}
/* ---- the buttons ---- */
if($("btn-api"))$("btn-api").addEventListener("click",function(){
 var it=curItem();if(!it){needPick();return}
 bnote("");exitSupport();postNode(apiCard(it))});
if($("btn-connect"))$("btn-connect").addEventListener("click",function(){
 var it=curItem();if(!it){needPick();return}
 bnote("");exitSupport();postNode(connectCard(it))});
if($("btn-sales"))$("btn-sales").addEventListener("click",function(){
 var it=curItem();if(!it){needPick();return}
 bnote("");exitSupport();postNode(salesCard())});
if($("btn-update"))$("btn-update").addEventListener("click",function(){
 var it=curItem();if(!it){needPick();return}
 bnote("");exitSupport();
 if(it.kind==="bought"){postText(it.x.cn,"You bought this one \u2014 only its maker can update it.");return}
 postNode(updateCard(it))});
if($("btn-home"))$("btn-home").addEventListener("click",function(){location.href="index.html"});
if($("btn-bought"))$("btn-bought").addEventListener("click",function(){
 bnote("");exitSupport();
 var c=boughtCard();
 if(c)postNode(c);else postPlain("You have not bought any plugins yet.")});
if($("btn-promote"))$("btn-promote").addEventListener("click",function(){
 var it=curItem();if(!it){needPick();return}
 bnote("");exitSupport();
 if(it.kind!=="built"){postText(it.x.cn,"You can only promote plugins you made \u2014 you bought this one.");return}
 postNode(promoteCard(it))});
/* ---- Support: Fred's support chat, inside the center chatbox ----
   Same small local responder the old Fred box used (fredAnswer below) —
   same brain, new home. Picking a plugin exits support mode. */
var supEl=null,supLog=null,supIn=null,supMode=false;
function supAdd(who,text,html){
 var d=document.createElement("div");d.className="cb";
 if(who){var b=document.createElement("b");b.textContent=who;d.appendChild(b)}
 var s=document.createElement("span");
 if(html)s.innerHTML=text;else s.textContent=text;
 d.appendChild(s);supLog.appendChild(d);supLog.scrollTop=1e5}
function supAddMe(text){var d=document.createElement("div");d.className="cb me";d.textContent=text;supLog.appendChild(d);supLog.scrollTop=1e5}
function buildSup(){
 supEl=document.createElement("div");supEl.className="pchat";supEl.hidden=true;
 supEl.innerHTML='<div class="chead"><img class="ic" alt="Fred Noseit" src="media/fred-v81.webp" style="object-fit:contain;background:#16222f"/><div><h2>Fred Noseit</h2><div style="font-size:.74rem;color:#9fb0d3">Support</div></div></div>'
 +'<div class="clog" aria-live="polite"></div>'
 +'<form class="cform"><input placeholder="Ask Fred..." aria-label="Ask Fred a question" autocomplete="off"/><button type="button" class="calt" data-supup aria-label="Upload a file">\uD83D\uDCCE Upload</button><input type="file" data-supfile hidden/><button type="button" class="calt cmic" aria-label="Talk">\u{1F3A4} Talk</button><button type="submit">Send</button></form>';
 host.appendChild(supEl);
 supLog=supEl.querySelector(".clog");supIn=supEl.querySelector("input:not([type=file])");
 supAdd("Fred Noseit","How can I support you?");
 var ex=document.createElement("p");ex.className="fex";ex.textContent="Example: Where is the Plugin Store?";supLog.appendChild(ex);
 supEl.querySelector("form").addEventListener("submit",function(e){
  e.preventDefault();var t=supIn.value.trim();if(!t)return;supIn.value="";
  supAddMe(t);
  setTimeout(function(){supAdd("Fred Noseit",fredAnswer(t),true)},300)});
 var fup=supEl.querySelector("[data-supfile]");
 supEl.querySelector("[data-supup]").onclick=function(){fup.click()};
 fup.addEventListener("change",function(){
  var f=fup.files&&fup.files[0];fup.value="";if(!f)return;
  supAddMe("\uD83D\uDCCE "+f.name);
  setTimeout(function(){supAdd("Fred Noseit",fredAnswer(""),true)},300)});
 var cmic=supEl.querySelector(".cmic");
 cmic.onclick=function(){
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){supAdd("Fred Noseit","\u{1F3A4} Talking does not work in this browser. Please type your question instead (or try Chrome or Safari).");return}
  if(cmic.zr){cmic.zr.stop();return}
  var rc=new SR;cmic.zr=rc;rc.lang="en-US";rc.interimResults=false;rc.maxAlternatives=1;
  cmic.textContent="\u{1F442} Listening\u2026 tap to stop";cmic.classList.add("on");
  rc.onresult=function(ev){supIn.value=ev.results[0][0].transcript;var fm=supEl.querySelector("form");if(fm.requestSubmit)fm.requestSubmit();else fm.dispatchEvent(new Event("submit",{cancelable:true}))};
  rc.onerror=function(ev){if(ev.error==="not-allowed")supAdd("Fred Noseit","\u{1F3A4} Please allow the microphone, or type your question.")};
  rc.onend=function(){cmic.zr=null;cmic.textContent="\u{1F3A4} Talk";cmic.classList.remove("on")};
  try{rc.start()}catch(err){rc.onend()}};
}
function showSupport(){
 if(!supEl)buildSup();
 supMode=true;hideSys();
 if(emptyEl)emptyEl.hidden=true;if(offEl)offEl.hidden=true;
 host.style.display="";
 [].forEach.call(host.querySelectorAll(".pchat"),function(el){el.hidden=el!==supEl});
 supEl.hidden=false;
 if(supIn)supIn.focus()}
function hideSup(){supMode=false;if(supEl)supEl.hidden=true}
function exitSupport(){if(!supMode)return;hideSup();if(cur)cur.open()}
if($("btn-support"))$("btn-support").addEventListener("click",function(){bnote("");showSupport()});
if($("fredcard"))$("fredcard").addEventListener("click",function(){bnote("");showSupport()});
/* ---------- Edit profile: name, email, picture — right on this page ---------- */
var epPending,epGenURL=null,epGenBusy=false;
function epNote(t){var n=$("ep-note");if(!n)return;n.textContent=t||"";n.hidden=!t}
function epPrev(v){var im=$("ep-prev"),ph=$("ep-prevph");if(!im)return;
 if(v){im.src=v;im.hidden=false;if(ph)ph.hidden=true}
 else{im.removeAttribute("src");im.hidden=true;if(ph)ph.hidden=false}}
/* AI picture maker (Pollinations, keyless): describe it, preview it, use it.
   The generated image is drawn to a canvas and stored as a dataURL, so the
   saved avatar is self-contained — the same as the upload path. */
function epGenBtns(show){var u=$("ep-use"),a=$("ep-again");if(u)u.hidden=!show;if(a)a.hidden=!show}
function epGenBusyUI(on){var g=$("ep-gen");if(!g)return;g.disabled=!!on;g.textContent=on?"Making your picture\u2026":"\u2728 Generate"}
function epGenFail(){epGenBusy=false;epGenBusyUI(false);epGenBtns(false);epNote("The picture maker could not load \u2014 try Upload a photo instead.")}
function epGenerate(){
 if(epGenBusy)return;
 var q=($("ep-genq")?$("ep-genq").value:"")||"";q=q.trim();
 if(!q){epNote("Describe your picture first \u2014 a few words is enough.");return}
 epGenBusy=true;epGenBusyUI(true);epGenBtns(false);epNote("");
 var seed=Math.floor(Math.random()*1000000000);
 var url="https://image.pollinations.ai/prompt/"+encodeURIComponent(q)+"?width=512&height=512&seed="+seed;
 var im=new Image();im.crossOrigin="anonymous";
 im.onload=function(){
  try{
   var cv=document.createElement("canvas");cv.width=512;cv.height=512;
   cv.getContext("2d").drawImage(im,0,0,512,512);
   epGenURL=cv.toDataURL("image/jpeg",0.85);
  }catch(e){epGenFail();return}
  epGenBusy=false;epGenBusyUI(false);
  epPrev(epGenURL);epGenBtns(true);epNote("")};
 im.onerror=function(){epGenFail()};
 im.src=url}
function epOpen(){
 epGenURL=null;epGenBtns(false);
 var acc=null;try{acc=JSON.parse(localStorage.getItem("aiedume_sample_account")||"null")}catch(e){}
 if($("ep-name"))$("ep-name").value=(acc&&acc.name)||"";
 if($("ep-email"))$("ep-email").value=(acc&&acc.email)||"";
 var av=null;try{av=localStorage.getItem("aiedume_sample_avatar")}catch(e){}
 epPending=undefined;
 epPrev(av);epNote("");
 if($("epform"))$("epform").hidden=false;
 if($("btn-editprof"))$("btn-editprof").hidden=true}
function epClose(){
 if($("epform"))$("epform").hidden=true;
 if($("btn-editprof"))$("btn-editprof").hidden=false;
 epPending=undefined}
if($("btn-editprof"))$("btn-editprof").addEventListener("click",epOpen);
if($("ep-cancel"))$("ep-cancel").addEventListener("click",epClose);
if($("ep-file"))$("ep-file").addEventListener("change",function(){
 var f=this.files&&this.files[0];this.value="";if(!f)return;
 var r=new FileReader();
 r.onload=function(){epPending=String(r.result);epPrev(epPending);epNote("")};
 r.readAsDataURL(f)});
if($("ep-gen"))$("ep-gen").addEventListener("click",epGenerate);
if($("ep-again"))$("ep-again").addEventListener("click",epGenerate);
if($("ep-use"))$("ep-use").addEventListener("click",function(){if(epGenURL){epPending=epGenURL;epPrev(epGenURL);epNote("")}});
if($("ep-save"))$("ep-save").addEventListener("click",function(){
 var nm=($("ep-name").value||"").trim();
 if(!nm){epNote("Please put your name.");return}
 var em=($("ep-email").value||"").trim();
 var acc=null;try{acc=JSON.parse(localStorage.getItem("aiedume_sample_account")||"null")}catch(e){}
 acc=acc||{};acc.name=nm;acc.email=em;acc.demo=true;
 try{localStorage.setItem("aiedume_sample_account",JSON.stringify(acc))}catch(e){}
 if(epPending!==undefined){try{localStorage.setItem("aiedume_sample_avatar",epPending)}catch(e){}}
 userName=nm;fillIdentity();epClose();
 var b=$("btn-editprof");
 if(b){var old="\u270F\uFE0F Edit profile";b.textContent="Saved \u2713";setTimeout(function(){b.textContent=old},1800)}
});
/* ---------- Fred's support chatbox ---------- */
function fredAnswer(q){
 var s=" "+String(q||"").toLowerCase()+" ";
 function has(){for(var i=0;i<arguments.length;i++)if(s.indexOf(arguments[i])>-1)return true;return false}
 if(has("plugin store"," store","buy","shop","get a plugin"))return 'The Plugin Store is here: <a href="plugin-market.html">Plugin Store</a>. That is where you get plugins from teachers and parents.';
 if(has("connect","api","code","key","chatgpt","Muse","grok","other ai"))return 'Tap <b>Get your API code</b> on the left to see your key. Tap <b>Connect to other AI programs</b> to copy your starter text — paste it into ChatGPT, Muse or Grok Bot and your plugin works there.';
 if(has("build","make a plugin","create a plugin","new plugin"))return 'Start here: <a href="plugin-builder.html">Build a Plugin</a>. It is free to build — you set the price, and you keep 80%.';
 if(has("my plugin","where are"))return 'You are on <b>My Plugins</b> now. Your plugins are on the right — tap one and its chat opens in the middle.';
 if(has("sales","sold","earn","money"))return 'Your sales live here: <a href="seller.html">Check your plugin sales</a>. You keep 80% of every sale.';
 if(has("update","edit","change my"))return 'Pick your plugin on the right, then tap <b>Update your plugin</b> on the left. Only the maker can update a plugin.';
 if(has("sign in","log in","account","register"))return 'You do not need an account to use this page. To save one on this device, <a href="signup.html">sign in</a> with just your name and email.';
 if(has("info","how it works","how does","what is fred","about"))return 'The <a href="info.html">info page</a> explains how Fred Noseit works — plugins, selling, and using them in other AIs.';
 if(has("price","cost","free"))return 'The helpers are free. Plugins in the store have their own prices, set by the teachers and parents who made them.';
 if(has("thank"))return 'Any time. That is what I am here for.';
 if(has("hello","hey"," hi "))return 'Hi! Ask me where something is — the Plugin Store, the builder, your sales — and I will point you to it.';
 return 'I mostly point people to the right page. Try asking: Where is the Plugin Store?';
}
var fredForm=$("fredform"),fredIn=$("fredin"),fredLog=$("fredlog");
if(fredForm&&fredIn&&fredLog){
 fredForm.addEventListener("submit",function(e){
  e.preventDefault();var q=fredIn.value.trim();if(!q)return;fredIn.value="";
  var ex=$("fredex");if(ex)ex.hidden=true;
  var me=document.createElement("div");me.className="fb me";me.textContent=q;fredLog.appendChild(me);
  var fb2=document.createElement("div");fb2.className="fb";
  var b=document.createElement("b");b.textContent="Fred Noseit";fb2.appendChild(b);
  var span=document.createElement("span");span.innerHTML=fredAnswer(q);fb2.appendChild(span);
  fredLog.appendChild(fb2);fredLog.scrollTop=1e5;
 });
}
/* ---------- init ---------- */
fillIdentity();
buildItems();
renderRows();
pickFirstOn();
})();

/* zheadfix 2026-10-30: Greg — no X on panels like this. Hides the Connect dialog's X;
   the dialog still closes by tapping outside it or pressing Escape (both already wired),
   and its button and handler stay in the DOM. */
;(function(){var st=document.createElement("style");st.id="zheadfix-css";st.textContent=".cnxc [data-cnx=\"close\"]{display:none!important}";document.head.appendChild(st)})();


/* Lesson Maker loader (2026-11-01): loads lessonmaker.js from this script's own folder,
   so the plugin chats here get the "Make a PowerPoint or PDF" button too. */
;(function(){try{var s=document.currentScript&&document.currentScript.src||"";var b=s.replace(/[^\/]*(\?.*)?$/,"");if(!b)return;var t=document.createElement("script");t.src=b+"lessonmaker.js?v=1";t.defer=true;document.head.appendChild(t);}catch(e){}})();

/* App-store style plugin page (AIEDUME's own look). Demo only: no real payments, nothing is sent. */
(function(){
var $=function(i){return document.getElementById(i)};
var id=new URLSearchParams(location.search).get("id"),x=null;
(window.PLUGINS||[]).forEach(function(p){if(p.slug===id)x=p});
if(!x||!window.PX)return;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var GL={k5:"PreK-5th","68":"6th-8th","912":"9th-12th",adult:"Adult"},FL={par:"Families",para:"Support staff",teach:"Teachers",stu:"Grads"};
var st=document.createElement("style");
st.textContent=".prod .face,.prod .face img{width:84px!important;height:84px!important}.prod .face img{border-radius:24px!important;box-shadow:0 6px 18px rgba(0,0,0,.4)}.apptags{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.apptags span{font:700 .72rem Inter,sans-serif;background:#223458;color:#cfe0ff;border-radius:999px;padding:3px 10px}.getbtn{display:inline-flex;align-items:center;justify-content:center;min-width:120px;min-height:46px;padding:0 26px;border:0;border-radius:999px;background:#2dd4bf;color:#062a26;font:800 1.15rem Poppins,Inter,sans-serif;cursor:pointer;margin-top:4px}.getbtn small{font-weight:700;margin-left:8px;font-size:.7rem;opacity:.8}.tryfree{background:rgba(45,212,191,.08)!important;color:#2dd4bf!important;border:2px solid #2dd4bf;margin-left:8px}.xsec{margin:14px 0 6px}.xsec h3{margin:0 0 6px;font:800 1rem Poppins,Inter,sans-serif}.shots{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:2px 2px 8px;-webkit-overflow-scrolling:touch}.shot{flex:0 0 min(78%,260px);scroll-snap-align:start;background:#101a30;border:1px solid #263553;border-radius:18px;padding:10px;display:flex;flex-direction:column;gap:6px;font-size:.82rem}.shot .q{background:#1d3a56;border-radius:12px;padding:6px 10px;align-self:flex-end;max-width:92%}.shot .a{background:#16263f;border:1px solid #2b3d5f;border-radius:12px;padding:6px 10px;max-width:96%}.shot small{color:#9fb0d3}.wmsg{display:flex;gap:10px;align-items:flex-start;background:#13223a;border:1px solid #2dd4bf55;border-radius:16px;padding:10px}.wmsg img{width:44px;height:44px;border-radius:12px;object-fit:cover;flex:none}.wmsg p{margin:0;font-size:.9rem}.wmsg b{display:block;font-size:.72rem;color:#7ef0c5;margin-bottom:2px}.iaprow{display:flex;align-items:center;gap:10px;background:#101a30;border:1px solid #263553;border-radius:14px;padding:8px 10px;margin:6px 0}.iaprow b{flex:1;font-size:.9rem}.iaprow button{border:0;border-radius:999px;background:#ffd27a;color:#2a1b00;font-weight:800;padding:8px 16px;min-height:36px;cursor:pointer}.iapnote{font-size:.74rem;color:#9fb0d3;margin:2px 0 0}.moreb{display:flex;flex-wrap:wrap;gap:8px}.moreb a{display:flex;align-items:center;gap:8px;background:#101a30;border:1px solid #263553;border-radius:14px;padding:6px 10px;font-size:.8rem;font-weight:700;max-width:100%}.moreb img{width:36px;height:36px;border-radius:10px;object-fit:cover}.xnote{font-size:.74rem;color:#9fb0d3;margin:2px 0 0}.bkstore{display:inline-flex;align-items:center;min-height:34px;padding:0 14px;border-radius:12px;border:2px solid #2dd4bf;background:#2dd4bf;color:#062a26;font:800 .9rem Inter,sans-serif;white-space:nowrap;text-decoration:none}.pchat{margin-top:2px;background:#0d1628;border:2px solid #2dd4bf;border-radius:16px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}.pchat[hidden]{display:none}.pch{display:flex;align-items:center;gap:10px}.pch img{width:44px;height:44px;border-radius:12px;object-fit:cover;flex:none}.pwho{flex:1;min-width:0}.pwho b{display:block;font-size:.95rem}.pwho small{color:#9fb0d3;font-size:.72rem}.ptag{font:700 .72rem Inter,sans-serif;color:#7ef0c5;background:#223458;border-radius:999px;padding:3px 10px;white-space:nowrap}.px2{min-width:36px;min-height:36px;border-radius:10px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font-weight:800;cursor:pointer}.clog{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow:auto}.cb{background:#16263f;border:1px solid #2b3d5f;border-radius:12px;padding:6px 10px;max-width:92%;font-size:.9rem}.cb b{display:block;font-size:.7rem;color:#7ef0c5;margin-bottom:2px}.cb.me{background:#1d3a56;align-self:flex-end}.cform{display:flex;gap:6px}.cform input{flex:1;min-width:0;height:42px;border-radius:10px;background:#0b1220;border:2px solid #2dd4bf;padding:0 10px;color:#e8eefc}.cform button{height:42px;padding:0 16px;border-radius:10px;border:0;background:#2dd4bf;color:#062a26;font-weight:800;cursor:pointer}.cmic{flex:none;height:42px;padding:0 12px;border-radius:10px;border:2px solid #2dd4bf;background:#16223a;color:#e8eefc;font-weight:800;cursor:pointer;white-space:nowrap}.cmic.on{background:#ffd27a;border-color:#ffd27a;color:#2a1b00}.clock{background:#101a30;border:1px dashed #ffb020;border-radius:12px;padding:8px 10px}.clock p{margin:0 0 8px;font-size:.88rem}";
document.head.appendChild(st);
/* Back to the store: always visible at the top of the plugin page (Greg's rule). */
var bkstore=document.createElement("a");bkstore.className="bkstore";bkstore.href="plugin-market.html";bkstore.textContent="\u2190 Back to the Plugin Store";
var bnr=document.querySelector(".banner"),appEl=document.getElementById("app");
if(bnr)bnr.insertBefore(bkstore,bnr.firstChild);else if(appEl)appEl.insertBefore(bkstore,appEl.children[1]||null);
var price="Get";
var prod=document.querySelector(".prod>div:last-child");
if(prod){
 var tags=(x.gd||[]).map(function(g){return GL[g]}).concat((x.fo||[]).map(function(f){return FL[f]})).concat(x.tp||[]);
 if(x.p>0&&window.priceLabel)tags.push(priceLabel(x));
 if(x.zip)tags.push("\uD83D\uDCCD ZIP "+x.zip);
 var tg=document.createElement("div");tg.className="apptags";tg.innerHTML=tags.map(function(t){return"<span>"+esc(t)+"</span>"}).join("");
 var gb=document.createElement("button");gb.type="button";gb.className="getbtn";gb.id="getbtn";gb.innerHTML=x.p>0?"<span>Buy</span><small>"+(window.priceLabel?priceLabel(x):"$"+x.p)+" · demo</small>":"<span>"+price+"</span><small>Free · demo</small>";
 var rq=$("rq");prod.insertBefore(gb,rq); /* Checkout-B layout (2026-10-30): tag pills cut (Greg's wordiness order) - tg is built but never inserted. */
 function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
 var OWNED=jget("aiedume_bought",[]).indexOf(x.slug)>-1;
 if(OWNED)gb.innerHTML="<span>Open</span><small>In My Plugins</small>";
 gb.onclick=function(){
  if(OWNED){openChat("owned");return}
  if(x.p>0){location.href="checkout.html?plugin="+encodeURIComponent(x.slug);return}
  var B=jget("aiedume_bought",[]);if(B.indexOf(x.slug)<0){B.push(x.slug);try{localStorage.setItem("aiedume_bought",JSON.stringify(B))}catch(e){}}
  OWNED=true;gb.innerHTML="<span>Open</span><small>In My Plugins</small>";openChat("owned")};
 if(x.trial>0&&x.p>0&&!OWNED){
  var tb=document.createElement("button");tb.type="button";tb.className="getbtn tryfree";tb.id="tryfree";
  tb.innerHTML="<span>Try it free</span><small>"+x.trial+" chats \u00B7 demo</small>";
  tb.onclick=function(){openChat("trial")};
  prod.insertBefore(tb,rq)};
 /* Seller chat: the plugin chat opens HERE, as the seller who built it -
    never on a section agent page. Its first words are Greg's line. */
 function isOwned(){return jget("aiedume_bought",[]).indexOf(x.slug)>-1}
 var pchat=null,clog=null,cin=null,ptag=null,clock=null,chatMode="owned",chatLeft=0,replyN=0;
 function buildChat(){
  pchat=document.createElement("div");pchat.className="pchat";pchat.id="pchat";pchat.hidden=true;
  pchat.innerHTML='<div class="pch"><img alt="" src="img/faces/'+x.f+'.webp"/><div class="pwho"><b>'+esc(x.cn)+'</b><small>'+esc(x.role)+' \u00B7 plugin chat (demo)</small></div><span class="ptag"></span><button type="button" class="px2" aria-label="Close chat">\u2715</button></div><div class="clog" aria-live="polite"></div><div class="clock" hidden><p><b>Your free sample is done.</b> Buy this plugin to keep chatting with '+esc(x.cn)+' \u2014 no limits once it is yours.</p><a class="getbtn" href="checkout.html?plugin='+encodeURIComponent(x.slug)+'">Buy \u00B7 '+(window.priceLabel?priceLabel(x):"$"+x.p)+'</a></div><form class="cform"><input placeholder="Ask '+esc(x.cn.split(" ").pop())+' anything..." aria-label="Type your message" autocomplete="off"/><button type="button" class="cmic" aria-label="Talk">\u{1F3A4} Talk</button><button type="submit">Send</button></form>';
  var host=document.getElementById("chatmount");
  if(host)host.appendChild(pchat);else prod.parentNode.appendChild(pchat);
  clog=pchat.querySelector(".clog");cin=pchat.querySelector("input");ptag=pchat.querySelector(".ptag");clock=pchat.querySelector(".clock");
  pchat.querySelector(".px2").onclick=function(){pchat.hidden=true};
  pchat.querySelector("form").addEventListener("submit",function(e){
   e.preventDefault();var t=cin.value.trim();if(!t)return;
   if(chatMode==="trial"){if(chatLeft<=0){clock.hidden=false;return}chatLeft--;try{localStorage.setItem("aiedume_trial_"+x.slug,JSON.stringify(chatLeft))}catch(err){}}
   cin.value="";addMsg("",t,true);
   setTimeout(function(){addMsg(x.cn,sellerReply());paintTag();if(chatMode==="trial"&&chatLeft<=0)clock.hidden=false},350);
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
 function paintTag(){if(ptag)ptag.textContent=chatMode==="trial"?("Free sample \u00B7 "+chatLeft+" chat"+(chatLeft===1?"":"s")+" left"):(x.p>0?"Yours \u00B7 no limits":"Free plugin")}
 function openChat(mode){
  if(isOwned()||x.p<=0)mode="owned";
  else if(mode==="owned")mode="trial";
  if(mode==="trial"&&!(x.trial>0)){lockChat();return}
  if(!pchat)buildChat();
  chatMode=mode;pchat.hidden=false;
  var fm2=pchat.querySelector("form");if(fm2)fm2.style.display="";
  if(!clog.childElementCount)addMsg(x.cn,"What can I help you build?");
  if(mode==="trial"){var left=jget("aiedume_trial_"+x.slug,null);if(typeof left!=="number"||left<0||left>x.trial)left=x.trial;chatLeft=left;clock.hidden=left>0}
  else clock.hidden=true;
  paintTag();pchat.scrollIntoView({block:"nearest"});cin.focus();
 }
 var t2=document.getElementById("try2");
 if(t2){t2.setAttribute("href","#");t2.addEventListener("click",function(e){e.preventDefault();openChat("owned")})}
 /* Checkout-B layout (2026-10-30): the chat IS the page body, so it opens on
    load - owned/free as owned, paid-with-sample as trial (counter still only
    written on first SEND). Paid with NO sample and not owned gets a locked
    panel: greeting visible, buy prompt shown, no working form. */
 function lockChat(){
  if(!pchat)buildChat();
  chatMode="trial";chatLeft=0;pchat.hidden=false;
  if(clog&&!clog.childElementCount)addMsg(x.cn,"What can I help you build?");
  var cp=clock.querySelector("p");if(cp)cp.innerHTML="<b>Buy this plugin to chat with "+esc(x.cn)+"</b> - no limits once it is yours.";
  clock.hidden=false;
  var fm=pchat.querySelector("form");if(fm)fm.style.display="none";
  if(ptag)ptag.textContent="Buy to chat";
 }
 if(location.hash==="#try")openChat("trial");
 else if(location.hash==="#chat")openChat("owned");
 else if(isOwned()||x.p<=0)openChat("owned");
 else if(x.trial>0)openChat("trial");
 else lockChat();
}
var lc=null; /* Checkout-B layout (2026-10-30): About / Example / Sample screens / welcome / add-on sections are CUT (Greg's wordiness order). The block below stays in the file but never runs. */
if(!lc)return;
var wrap=document.createElement("div");wrap.className="xwrap";
var ins=x.inside||[];
var yrs=(/^(\d+)/.exec(x.role||"")||[])[1];
var shots=[0,1,2].filter(function(i){return ins[i]}).map(function(i){
 return '<div class="shot"><div class="q">'+esc(["Help me with: ","Can you make: ","I need: "][i]+ins[i].replace(/^\d+\s+/,"").toLowerCase())+'</div><div class="a">'+esc(["Sure! Tell me your grade and what you already have, and I will build it with you.","Yes. Give me the topic and I will draft it, then you can change anything.","Got it. Here is a first version" +(yrs?" from my "+yrs+" years":"")+". Want it shorter or simpler?"][i])+'</div><small>Sample screen · not a real chat</small></div>'}).join("");
var h='<div class="xsec"><h3>About this plugin</h3><p style="margin:0">'+esc(x.d||"")+'</p>'+(x.zip?'<p class="xnote">\uD83D\uDCCD Made by '+esc(x.cn)+' in ZIP '+esc(x.zip)+'.</p>':'')+'</div>';
if(x.ex)h+='<div class="xsec"><h3>Example</h3><div class="wmsg"><p>'+esc(x.ex)+'</p></div></div>';
h+='<div class="xsec"><h3>Sample screens</h3><div class="shots" tabindex="0" aria-label="Sample screens, swipe sideways">'+shots+'</div></div>';
h+='<div class="xsec"><h3>A welcome from the creator</h3><div class="wmsg"><img alt="" src="img/faces/'+x.f+'.webp"/><p><b>From the creator</b>'+esc(x.wm||PX.welcome(x))+'</p></div></div>';
if(x.iap&&x.iap.length){
 h+='<div class="xsec" id="iapsec"><h3>In-plugin purchases <span style="font-weight:700;font-size:.72rem;color:#ffe08a">Optional</span></h3>'+x.iap.map(function(a,i){return'<div class="iaprow"><b>'+esc(a.n)+'</b><span>Add-on</span><button type="button" data-i="'+i+'">Buy · demo</button></div>'}).join("")+'<p class="iapnote">Optional extras the creator offers inside this plugin. Same 80/20 split (the creator keeps 80%). Demo checkout, no real payment.</p></div>';
}
var more=(window.PLUGINS||[]).filter(function(p){return p!==x&&(p.cn===x.cn||(p.tp||[]).some(function(t){return(x.tp||[]).indexOf(t)>-1}))}).slice(0,4);
if(more.length)h+='<div class="xsec"><h3>'+(more.some(function(p){return p.cn===x.cn})?"More from this creator":"More like this")+'</h3><div class="moreb">'+more.map(function(p){return'<a href="plugin-checkout.html?id='+p.slug+'"><img alt="" src="img/faces/'+p.f+'.webp"/><span>'+esc(p.n.length>38?p.n.slice(0,36)+"…":p.n)+'</span></a>'}).join("")+'</div></div>';
wrap.innerHTML=h;lc.parentNode.insertBefore(wrap,lc);
wrap.addEventListener("click",function(e){var b=e.target.closest(".iaprow button");if(!b)return;var a=x.iap[+b.dataset.i];
 var t=document.querySelector('#mt button[data-t="pay"]');t&&t.click();
 var p="$"+a.p+".00";$("sname").textContent="Add-on: "+a.n;$("sprice").textContent=p;$("tot").textContent=p;$("pone").textContent=p+" · optional add-on · sample";
 var gl=$("gol");gl&&(gl.textContent="Complete demo purchase (add-on)")});
})();

/* zheadfix 2026-10-30: Greg — no X on the chat panel (the page's Back/Home nav is the way
   out). Hides the seller chat header's close button only; the button and its handler stay
   in the DOM, and the chat reopens any time from the price card (Try it free / Open). */
;(function(){var st=document.createElement("style");st.id="zheadfix-css";st.textContent=".pchat .px2{display:none!important}";document.head.appendChild(st)})();


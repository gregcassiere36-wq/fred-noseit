/* AIEDUME seller tools (demo): "Test your plugin" + "Update" for your own plugins.
   Browser only: reads/writes the same localStorage drafts the builder uses (plugx.js PX).
   Testing NEVER touches aiedume_trial_* or aiedume_bought, so it cannot use up a buyer's free sample chats. */
(function(){
"use strict";
if(!window.PX)return;
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function userName(){var u=PX.user();return u&&u.name?u.name:"You (demo)"}
if(!$("stcss")){var st=document.createElement("style");st.id="stcss";st.textContent=
".stb{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:12px;border:2px solid #2dd4bf;background:rgba(45,212,191,.12);color:#e8eefc;font:800 .95rem Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none}"+
".stb.pri{background:#2dd4bf;color:#062a26}"+
".stbtns{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0}"+
".stnote{background:rgba(126,240,197,.14);border:1px solid #7ef0c5;border-radius:10px;padding:8px 10px;font-weight:700;margin:8px 0}"+
".stbanner{border:2px solid #ffd27a;background:rgba(255,210,122,.12);border-radius:12px;padding:10px 12px;margin:10px 0;font-size:.98rem}"+
"#stextra textarea{width:100%}"+
".stov{position:fixed;inset:0;background:rgba(2,6,14,.8);z-index:200;display:flex;align-items:center;justify-content:center;padding:12px}"+
".stpanel{background:#0f1a2f;border:2px solid #2dd4bf;border-radius:18px;max-width:560px;width:100%;max-height:92dvh;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;color:#e8eefc;font:500 15px/1.35 Inter,system-ui,sans-serif}"+
".sttest{background:rgba(255,210,122,.14);border:2px dashed #ffb020;color:#ffd27a;border-radius:10px;padding:8px 10px;font-weight:700;font-size:.86rem}"+
".sthd{display:flex;gap:12px;align-items:center}"+
".stic{width:72px;height:72px;border-radius:16px;background:linear-gradient(135deg,#2dd4bf,#ffd27a);display:grid;place-items:center;font-size:2rem;flex:none}"+
".sthd h3{margin:0;font:800 1.1rem Poppins,Inter,system-ui,sans-serif}.sthd small{color:#9fb0d3}"+
".sttags{display:flex;flex-wrap:wrap;gap:6px}.sttags span{font:700 .72rem Inter,sans-serif;background:#223458;color:#cfe0ff;border-radius:999px;padding:3px 10px}"+
".stsec h4{margin:0 0 4px;font:800 .95rem Poppins,Inter,system-ui,sans-serif;color:#ffd27a}.stsec p{margin:0}.stsec ul{margin:0;padding-left:20px}"+
".stwm{background:#13223a;border:1px solid rgba(45,212,191,.35);border-radius:12px;padding:8px 10px;font-size:.9rem}.stwm b{display:block;font-size:.7rem;color:#7ef0c5;margin-bottom:2px}"+
".stlog{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow:auto;background:#0b1220;border:1px solid #263553;border-radius:12px;padding:10px}"+
".stm{padding:7px 10px;border-radius:10px;font-size:.9rem;max-width:92%}.stm.b{background:#16263f;align-self:flex-start}.stm.u{background:#2dd4bf;color:#062a26;align-self:flex-end;font-weight:600}"+
".stform{display:flex;gap:6px}.stform input{flex:1;min-width:0;height:44px;border-radius:10px;background:#0b1220;border:2px solid #2dd4bf;padding:0 10px;color:#e8eefc;font:inherit}"+
".stform button{height:44px;padding:0 16px;border-radius:10px;border:0;background:#2dd4bf;color:#062a26;font-weight:800;cursor:pointer}"+
".stfine{margin:0;font-size:.74rem;color:#9fb0d3}"+
".stx{margin-left:auto;flex:none;width:40px;height:40px;border-radius:10px;border:1px solid #3d5a80;background:#16223a;color:#e8eefc;font-size:1.05rem;cursor:pointer}";
document.head.appendChild(st)}
function priceTxt(d){var p=parseFloat(d.p)||0;if(p<=0)return "FREE";if(window.priceLabel)return window.priceLabel({p:p,pk:d.pk||"once"});return d.pk==="month"?"$"+p+"/month":d.pk==="year"?"$"+p+"/year":"$"+p+" forever"}
function wmOf(d){return (d.wm&&String(d.wm).trim())?String(d.wm):(PX.welcomeDefault?PX.welcomeDefault(d.n,d.h):"What can I help you build?")}
function openTest(d){
 if(!d)return;var old=document.querySelector(".stov");if(old)old.remove();
 var grades=(d.grades&&d.grades.length)?d.grades.join(", "):({"k5":"PreK-5th","68":"6th-8th","912":"9th-12th","adult":"Adult"})[d.gk||"k5"]||"";
 var tags=[];if(grades)tags.push(grades);tags.push(priceTxt(d));var tr=Math.min(20,parseInt(d.trial,10)||0);if(tr>0)tags.push("Free sample: "+tr+" chats");if(d.zip)tags.push("\uD83D\uDCCD ZIP "+d.zip);
 var inside=[d.h||"Built from my own lessons",(d.r?"My own lessons, tips and resources":"Built by a real teacher or parent")];
 var ov=document.createElement("div");ov.className="stov";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");ov.setAttribute("aria-label","Test your plugin");
 ov.innerHTML='<div class="stpanel">'+
 '<div class="sttest">\uD83E\uDDEA Test mode \u2014 this is your plugin the way buyers see it. Testing is free and never uses up a buyer\u2019s free sample chats.</div>'+
 '<div class="sthd"><div class="stic" aria-hidden="true">\uD83E\uDDE9</div><div style="min-width:0"><h3>'+esc(d.n||"Untitled plugin")+'</h3><small>by '+esc(userName())+' \u00B7 \u2605 New</small></div><button type="button" class="stx" aria-label="Close test">\u2715</button></div>'+
 '<div class="sttags">'+tags.map(function(t){return "<span>"+esc(t)+"</span>"}).join("")+'</div>'+
 (d.h?'<div class="stsec"><h4>About this plugin</h4><p>'+esc(d.h)+'</p></div>':"")+
 (d.ex?'<div class="stsec"><h4>Example</h4><p>'+esc(d.ex)+'</p></div>':"")+
 '<div class="stsec"><h4>What\u2019s inside</h4><ul>'+inside.map(function(t){return "<li>"+esc(t)+"</li>"}).join("")+'</ul></div>'+
 ((d.files&&d.files.length)?'<div class="stsec"><h4>Your files in this plugin</h4><ul>'+d.files.map(function(t){return "<li>"+esc(t)+"</li>"}).join("")+'</ul></div>':"")+
 '<div class="stwm"><b>Shown when someone opens it</b>'+esc(wmOf(d))+'</div>'+
 '<div class="stsec"><h4>Try the chat</h4><div class="stlog" aria-live="polite"></div></div>'+
 '<form class="stform"><input autocomplete="off" placeholder="Ask your plugin something\u2026" aria-label="Ask your plugin something"/><button type="submit">Send</button></form>'+
 '<p class="stfine">Test chat uses sample replies (demo). Nothing here is sent or saved.</p>'+
 '</div>';
 document.body.appendChild(ov);
 var log=ov.querySelector(".stlog"),inp=ov.querySelector(".stform input");
 function add(t,me){var m=document.createElement("div");m.className="stm "+(me?"u":"b");m.textContent=t;log.appendChild(m);log.scrollTop=1e5}
 add(wmOf(d),false);
 var R=["Sure! Tell me your grade and what you already have, and I will build it with you.","Yes. Give me the topic and I will draft it with my own steps, then you can change anything.","Got it. Here is a first version from my material. Want it shorter or simpler?"],ri=0;
 ov.querySelector(".stform").addEventListener("submit",function(e){e.preventDefault();var t=inp.value.trim();if(!t)return;inp.value="";add(t,true);add(R[ri++%R.length],false)});
 function close(){ov.remove();document.removeEventListener("keydown",onKey)}
 function onKey(e){if(e.key==="Escape")close()}
 document.addEventListener("keydown",onKey);
 ov.querySelector(".stx").onclick=close;
 ov.addEventListener("click",function(e){if(e.target===ov)close()});
 inp.focus();
}
/* Test buttons anywhere (My Plugins cards + builder slot): data-sttest="<draft id>" */
document.addEventListener("click",function(e){
 var b=e.target&&e.target.closest?e.target.closest("button[data-sttest]"):null;if(!b)return;
 var d=PX.get(b.getAttribute("data-sttest"));if(d)openTest(d);
});
/* ---- My Plugins: add Test + Update to every plugin I built ---- */
(function(){
 var list=$("plist");if(!list)return;
 function augment(){
  list.querySelectorAll("article.pcard[data-id]").forEach(function(card){
   if(card.querySelector("[data-sttest]"))return;
   var acts=card.querySelector(".acts");if(!acts)return;
   var id=card.getAttribute("data-id");
   var b=document.createElement("button");b.type="button";b.setAttribute("data-sttest",id);b.textContent="\uD83E\uDDEA Test your plugin";
   var a=document.createElement("a");a.href="build-plugin.html?edit="+encodeURIComponent(id);a.textContent="\u270F\uFE0F Update";
   var s=document.createElement("a");s.href="seller.html#"+encodeURIComponent(id);s.textContent="\uD83D\uDCC8 See sales";
   var more=acts.querySelector("[data-more]");
   if(more){acts.insertBefore(b,more);acts.insertBefore(a,more);acts.insertBefore(s,more)}
   else{acts.appendChild(b);acts.appendChild(a);acts.appendChild(s)}
  });
 }
 augment();
 new MutationObserver(augment).observe(list,{childList:true});
})();
/* ---- Build page form (build-plugin.html): save into PX drafts, edit mode, Test/Update slot ---- */
(function(){
 var bf=$("bf");if(!bf||!$("f5-tr-8")||!bf.elements["n"])return;
 var GK={"Ages 4\u20138":"k5","Ages 9\u201312":"68","Ages 13\u201318":"912","Adults 18+":"adult"};
 var KG={"k5":"Ages 4\u20138","68":"Ages 9\u201312","912":"Ages 13\u201318","adult":"Adults 18+"};
 var qs=new URLSearchParams(location.search),editId=qs.get("edit"),curId=null;
 var slot=document.createElement("div");slot.id="stslot";bf.parentNode.insertBefore(slot,bf.nextSibling);
 function rowHTML(id){return '<div class="stbtns"><button type="button" class="stb pri" data-sttest="'+id+'">\uD83E\uDDEA Test your plugin</button><a class="stb" href="build-plugin.html?edit='+encodeURIComponent(id)+'">\u270F\uFE0F Update</a><a class="stb" href="my-plugins.html">\uD83D\uDCC1 My Plugins</a></div>'}
 function renderSlot(msg){slot.innerHTML=(curId?((msg?'<p class="stnote">'+esc(msg)+"</p>":"")+rowHTML(curId)):"")}
 function setOpt(el,val){if(!el||val==null)return;for(var i=0;i<el.options.length;i++)if(el.options[i].value===val||el.options[i].text===val){el.value=el.options[i].value;return}}
 if(editId){
  var d0=PX.get(editId);
  if(d0){
   curId=editId;
   bf.elements["n"].value=d0.n||"";
   setOpt(bf.elements["a"],d0.a||KG[d0.gk||"k5"]);
   [].forEach.call(bf.querySelectorAll('input[name="grades"]'),function(c){c.checked=(d0.grades||[]).indexOf(c.value)>-1});
   bf.elements["s"].value=d0.s||"";bf.elements["h"].value=d0.h||"";bf.elements["r"].value=d0.r||"";
   setOpt(bf.elements["t"],d0.t);
   var p0=parseFloat(d0.p)||0;
   if(p0>0){bf.elements["p"].value=d0.p;$("f5-free-9").checked=false}else{bf.elements["p"].value="";$("f5-free-9").checked=true}
   setOpt(bf.elements["pk"],d0.pk||"once");
   $("f5-tr-8").value=Math.min(20,Math.max(0,parseInt(d0.trial,10)||0));
   bf.elements["zip"].value=d0.zip||"";
   if(bf.elements["mktips"])bf.elements["mktips"].checked=!!d0.mk;
   var ex=document.createElement("div");ex.id="stextra";
   ex.innerHTML='<label for="st-wm">Welcome message (intro) \u2014 what buyers see first</label><textarea id="st-wm" rows="3"></textarea>'+
   '<label for="st-ex">Example \u2014 one example of what it makes</label><textarea id="st-ex" rows="2"></textarea>'+
   '<label for="st-files">Your files (names, one per line)</label><textarea id="st-files" rows="2"></textarea>';
   var sub=bf.querySelector('button[type="submit"]');bf.insertBefore(ex,sub);
   $("st-wm").value=d0.wm||"";$("st-ex").value=d0.ex||"";$("st-files").value=(d0.files||[]).join("\n");
   if(sub)sub.textContent="\uD83D\uDCBE Save updates";
   var bn=document.createElement("div");bn.className="stbanner";
   bn.innerHTML="\u270F\uFE0F <b>Updating: "+esc(d0.n||"Untitled plugin")+"</b> \u2014 your changes save over the same plugin.<div id=\"stnote\" class=\"stnote\" hidden></div>";
   bf.parentNode.insertBefore(bn,bf);
   renderSlot();
   bf.elements["p"].dispatchEvent(new Event("input",{bubbles:true}));
  }else{
   var nf=document.createElement("p");nf.className="stnote";nf.textContent="That plugin was not found in this browser. Start a new one below.";
   bf.parentNode.insertBefore(nf,bf);
  }
 }
 bf.addEventListener("submit",function(){
  try{
   var base=curId?PX.get(curId):null;
   var d=base||{id:PX.newId(),status:"draft",created:Date.now()};
   var tr=parseInt($("f5-tr-8").value,10);if(isNaN(tr)||tr<0)tr=0;if(tr>20)tr=20;
   d.n=bf.elements["n"].value;d.a=bf.elements["a"].value;d.s=bf.elements["s"].value;
   d.h=bf.elements["h"].value;d.r=bf.elements["r"].value;d.t=bf.elements["t"].value;
   d.p=$("f5-free-9").checked?"0":(bf.elements["p"].value||"");
   d.pk=bf.elements["pk"].value||"once";d.trial=String(tr);d.zip=bf.elements["zip"].value||"";
   d.grades=[].map.call(bf.querySelectorAll('input[name="grades"]:checked'),function(c){return c.value});
   d.gk=GK[d.a]||d.gk||"k5";if(bf.elements["mktips"])d.mk=!!bf.elements["mktips"].checked;
   var w=$("st-wm"),x2=$("st-ex"),fl=$("st-files");
   if(w)d.wm=w.value;if(x2)d.ex=x2.value;
   if(fl)d.files=fl.value.split(/\n+/).map(function(s){return s.trim()}).filter(Boolean);
   if(!d.wm||!String(d.wm).trim())d.wm=PX.welcomeDefault(d.n,d.h);
   PX.save(d);curId=d.id;
   if(editId){var nt=$("stnote");if(nt){nt.hidden=false;nt.textContent="Saved. The Checker reviews updates before they show in the store."}
    renderSlot("Saved \u2713");}
   else renderSlot("Saved as a draft in this browser \u2713 \u2014 find it any time in My Plugins.");
  }catch(e){}
 });
})();
/* ---- Guided builder (plugin-builder.html): Test/Update for the draft being built ---- */
(function(){
 var bf=$("bf");if(!bf||!bf.elements["wm"]||!$( "iapl"))return;
 var slot=document.createElement("div");slot.className="stbtns";
 slot.innerHTML='<span style="font-weight:800">Your plugin:</span><button type="button" class="stb pri" id="st-pb-test">\uD83E\uDDEA Test your plugin</button><button type="button" class="stb" id="st-pb-upd">\u270F\uFE0F Update</button>';
 var nav=document.querySelector("nav.steps6");
 if(nav&&nav.parentNode)nav.parentNode.insertBefore(slot,nav.nextSibling);
 else bf.parentNode.insertBefore(slot,bf);
 $("st-pb-test").addEventListener("click",function(){var d=window.BLDX&&BLDX.get();if(d&&(d.n||d.h))openTest(d);else alert("Give your plugin a name first, then test it.")});
 $("st-pb-upd").addEventListener("click",function(){var id=window.BLDX&&BLDX.id();if(id)location.href="build-plugin.html?edit="+encodeURIComponent(id);else alert("Start your plugin first \u2014 it saves as you type.")});
})();
})();

/* zheadfix 2026-10-30: Greg — no X on panels like this. Hides the Test overlay's X;
   the overlay still closes by tapping outside it or pressing Escape (both already wired),
   and its button and handler stay in the DOM. */
;(function(){var st=document.createElement("style");st.id="zheadfix-css";st.textContent=".stx{display:none!important}";document.head.appendChild(st)})();


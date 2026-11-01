/* SAMPLE PAGE COPY of plugx.js — every storage key is namespaced to aiedume_sample_*,
   so the sample page can never read or write Greg's real data. */
/* AIEDUME demo plugin helpers: sample tags, welcome messages, demo account + drafts (browser only, nothing is sent) */
window.PX=(function(){
var UK="aiedume_sample_account",DK="aiedume_sample_drafts",PX={};
function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
PX.user=function(){var u=jget(UK,null);return u&&u.name?u:null};
PX.setUser=function(u){u.demo=true;return jset(UK,u)};
PX.signOut=function(){try{localStorage.removeItem(UK)}catch(e){}};
PX.drafts=function(){return jget(DK,{})};
PX.list=function(){var o=PX.drafts();return Object.keys(o).map(function(k){return o[k]}).sort(function(a,b){return (b.edited||0)-(a.edited||0)})};
PX.get=function(id){return PX.drafts()[id]||null};
PX.newId=function(){return "d"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36)};
PX.save=function(d){var o=PX.drafts();d.edited=Date.now();o[d.id]=d;return jset(DK,o)};
PX.del=function(id){var o=PX.drafts();delete o[id];jset(DK,o)};
PX.welcomeDefault=function(name,help,who){
 if(PX.wmTpl)return PX.wmTpl(name,help);
 var h=(help||"").trim().replace(/^to /i,"").replace(/[.!]+$/,"");
 return "Welcome! I'm "+(name||"your helper")+". "+(h?"Here is what I can help with: "+h+". ":"I'm glad you're here. ")+"What would you like to start with?"};
PX.fmtDate=function(t){try{return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}catch(e){return ""}};
/* sample tags for the 15 sample listings: gd = grades, fo = for, tp = topics, iap = optional in-plugin purchases (samples) */
var T={
"patel-k-reading":{gd:["k5"],fo:["teach","par"],tp:["Reading"],iap:[["Unit 5 lesson pack",3],["Printable worksheet bundle",2]]},
"smith-math-4":{gd:["k5"],fo:["teach","par"],tp:["Math","Homework Help"],iap:[["Test-prep bonus",4],["Extra word-problem pack",3],["Printable worksheet bundle",2]]},
"johnson-music-2":{gd:["k5"],fo:["teach","par"],tp:["Activities & Enrichment"],iap:[]},
"okoro-ela-7":{gd:["68"],fo:["teach"],tp:["Writing","Reading"],iap:[["Essay-unit rubric pack",3],["Book club discussion bundle",2]]},
"tran-math-8":{gd:["68"],fo:["teach","par"],tp:["Math","Test Prep"],iap:[["Test-prep bonus",4],["Printable worksheet bundle",2]]},
"brooks-science-6":{gd:["68"],fo:["teach"],tp:["Science","Activities & Enrichment"],iap:[["Lab-day pack",3],["Printable worksheet bundle",2]]},
"nakamura-bio-9":{gd:["912"],fo:["teach"],tp:["Science","Test Prep"],iap:[["Unit 5 lesson pack",3],["Exam-review bonus",4]]},
"vasquez-guidance":{gd:["912"],fo:["teach","par"],tp:["Career & Degrees"],iap:[["College essay checklist",2],["Scholarship tracker",3]]},
"dubois-homework":{gd:["k5"],fo:["par"],tp:["Homework Help"],iap:[["Weekend homework pack",3],["Printable worksheet bundle",2]]},
"lindqvist-conferences":{gd:["k5","68","912"],fo:["par","teach"],tp:["Parent & Family Talks"],iap:[]},
"kim-para-life":{gd:["adult"],fo:["para"],tp:["Classroom Management"],iap:[["Small-group activity pack",3],["Calm-down script bundle",2]]},
"alvarez-student-teaching":{gd:["adult"],fo:["stu"],tp:["Career & Degrees","Classroom Management"],iap:[["Observation-day checklist",2],["Interview prep bonus",4]]},
"bauer-iep-sped":{gd:["k5","68","912"],fo:["teach"],tp:["IEP & Special Ed"],iap:[["Goal bank add-on",4],["Meeting agenda pack",3]]},
"oneil-lesson-plans":{gd:["k5","68"],fo:["teach","stu"],tp:["Lesson Planning"],iap:[["Unit 5 lesson pack",3],["Sub-plan bundle",2]]},
"hassan-rubrics":{gd:["68","912"],fo:["teach"],tp:["Writing","Classroom Management"],iap:[]}};
PX.GRADES=[["all","All"],["k5","PreK-5th"],["68","6th-8th"],["912","9th-12th"],["adult","Adult"]];
PX.FORS=[["all","All"],["par","Families"],["para","Support staff"],["teach","Teachers"],["stu","Grads"]];
PX.TOPICS=["Reading","Math","Science","Writing","IEP & Special Ed","Homework Help","Test Prep","Classroom Management","Lesson Planning","Activities & Enrichment","Career & Degrees","Parent & Family Talks"];
PX.firstName=function(cn){return cn.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/,function(m){return m})};
function welcome(x){
 var m=/^(\d+) yrs?,\s*(.+)$/.exec(x.role||""),ins=x.inside||[];
 var l=function(s){return String(s||"").replace(/^./,function(c){return c.toLowerCase()})};
 var who=m?"I bring "+m[1]+" years of "+m[2]+" experience, and I packed what I know into this helper.":"I packed what I know into this helper.";
 var can=ins.length>1?"I can help you with "+l(ins[0])+", "+l(ins[1])+" and more.":"I can help you get started.";
 return "Welcome! I'm "+x.cn+". "+who+" "+can+" What would you like to start with?"}
PX.welcome=welcome;
PX.tag=function(){(window.PLUGINS||[]).forEach(function(x){var t=T[x.slug]||{gd:[x.g],fo:["teach"],tp:[],iap:[]};x.gd=t.gd;x.fo=t.fo;x.tp=t.tp;x.iap=t.iap.map(function(a){return{n:a[0],p:a[1]}});x.wm=welcome(x)})};
PX.tag();
/* published demo plugins from this browser appear in the Store list (never sent anywhere) */
PX.mine=function(){var L=window.PLUGINS;if(!L)return;for(var i=L.length-1;i>=0;i--)if(L[i].mine)L.splice(i,1);
 var u=PX.user(),nm=u&&u.name?u.name:"You (demo)";
 PX.list().filter(function(d){return d.status==="published"&&d.n}).forEach(function(d){var p=parseFloat(d.p)||0;
  var iap=(d.iap||[]).map(function(a){return{n:a.n,p:a.p}});
  L.unshift({slug:"my-"+d.id,mine:true,n:d.n,d:d.h||"A plugin built from my own material.",g:d.gk||"k5",f:"mine",cn:nm,role:"New creator (demo)",bd:"New",p:p,r:0,pop:0,nw:9e9,pg:"plugin-checkout",id:"",inside:[d.h||"Built from my own lessons",(d.r?"My own lessons, tips and resources":"Built by a real teacher or parent")],bio:(d.wm||""),gd:[d.gk||"k5"],fo:d.fr||["teach","par"],tp:d.tp||[],iap:iap,trial:Math.min(20,parseInt(d.trial,10)||0),zip:d.zip||"",grades:d.grades||[],pk:d.pk||"once",ex:d.ex||"",wm:d.wm||""})})};
PX.mine();
/* Seller-page routing (Greg's rule): on the store, EVERY plugin entry point —
   card, Get/Open, and Try it — lands on that plugin's OWN page
   (plugin-checkout.html?id=<slug>), presented by its seller. The store page's
   card template still builds the Try-it link from the legacy pg/id fields
   (<pg>.html with an agent hash), which opens an AIEDUME section agent (e.g. the IEP
   plugin opened Hopsnurgle). plugx owns the data, so the clicks are rerouted
   here by the card's own slug. Only runs where the store grid exists. */
if(document.getElementById("grid")){
 document.addEventListener("click",function(e){
  var a=e.target&&e.target.closest?e.target.closest("a.try,a.pr"):null;if(!a)return;
  var card=a.closest(".card");if(!card)return;
  var ch=card.querySelector("a.ch"),slug=ch?((ch.getAttribute("href")||"").match(/[?&]id=([^&]+)/)||[])[1]:null;
  if(!slug)slug=a.getAttribute("data-free")||((a.getAttribute("href")||"").match(/[?&]plugin=([^&]+)/)||[])[1];
  if(!slug)return;
  e.preventDefault();e.stopPropagation();
  if(a.getAttribute("data-free")){var B=jget("aiedume_sample_bought",[]);if(B.indexOf(slug)<0){B.push(slug);jset("aiedume_sample_bought",B)}try{localStorage.removeItem("aiedume_sample_trial_"+slug)}catch(err){}}
  location.href="plugin-checkout.html?id="+encodeURIComponent(slug)+(a.classList.contains("try")?"#try":"");
 },true);
}
return PX})();

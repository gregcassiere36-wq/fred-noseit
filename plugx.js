/* AIEDUME demo plugin helpers: sample tags, welcome messages, demo account + drafts (browser only, nothing is sent) */
window.PX=(function(){
var UK="aiedume_demo_account",DK="aiedume_demo_drafts",PX={};
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
  if(a.getAttribute("data-free")){var B=jget("aiedume_bought",[]);if(B.indexOf(slug)<0){B.push(slug);jset("aiedume_bought",B)}try{localStorage.removeItem("aiedume_trial_"+slug)}catch(err){}}
  location.href="plugin-checkout.html?id="+encodeURIComponent(slug)+(a.classList.contains("try")?"#try":"");
 },true);
}
return PX})();
/* gregseed 2026-10-30 — Greg's own demo plugins (device-local, Greg's account only).
   Sign-in stays on: nothing in the account flow removes aiedume_demo_account or
   sets aiedume_signed_out on its own — only the Logout tap (nav-tabs.js) sets
   that flag, and signup.html clears it on sign-up/sign-in. PX.signOut above is
   never called by any page. So once Greg signs up on his phone he stays signed
   in as Greg on every page until HE taps Logout.
   The seed: the FIRST time the signed-in account is Greg (name "Greg", or his
   email), three plugins he "built and is selling" are saved as published
   drafts, plus a small seed-sales map (aiedume_seed_sales) that the My Plugins
   sales card (onechat.js) adds in — kept OUT of aiedume_bought so his
   "Plugins I bought" list stays clean. One-time flag aiedume_greg_seed_v1:
   once set, this never re-seeds, so a plugin Greg deletes by hand stays
   deleted. Logging out flips only the signed-out flag; the drafts and the
   sales stay on the device and are still there when he signs back in. */
(function(){
 function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
 function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
 var SEED=[
  {id:"greg1",n:"AI in the Classroom Helper",p:"",sales:3,
   h:"Help using AI in your classroom — prompts, activities and routines from my teacher training classes.",
   r:"From my own classes for teachers: the prompts I teach for lesson hooks, exit tickets and feedback, the AI rules I give every class, and the routines that keep AI honest and useful.",
   wm:"Hi, I'm Greg Cassiere. I teach teachers how to use AI in the classroom. Ask me for a prompt, an activity, or a routine — what can I help you build?",
   ex:"Example: Ask for a 10-minute AI warm-up and you get the prompt, the steps, and the rule to read out before students start.",
   gk:"k5",fr:["teach"],tp:["Lesson Planning","Activities & Enrichment"],grades:["K","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"]},
  {id:"greg2",n:"Clinical Supervisor Helper",p:"",sales:2,
   h:"Help for clinical supervisors — observation notes, feedback, and keeping up with your candidates.",
   r:"From my own supervision work: how I write up an observation, the feedback lines I use with candidates, and how I keep every candidate's paperwork and progress straight.",
   wm:"Hi, I'm Greg Cassiere. I supervise clinical students, and this helper carries how I write observations and feedback. What can I help you build?",
   ex:"Example: Give me your observation notes and I turn them into a clean write-up with strengths, one next step, and the exact words to say to your candidate.",
   gk:"adult",fr:["teach","stu"],tp:["Career & Degrees"],grades:[]},
  {id:"greg3",n:"Lesson Plan Helper",p:"",sales:1,
   h:"Help building strong lesson plans — objectives, activities, and checks for understanding.",
   r:"The way I teach lesson planning: a clear objective first, then the hook, the teaching steps, guided practice, and a quick check at the end that tells you who got it.",
   wm:"Hi, I'm Greg Cassiere. Tell me your grade and your topic, and I will help you build the lesson plan step by step. What can I help you build?",
   ex:"Example: Say grade 4 fractions and you get the objective, the hook, the steps, and a 3-question exit check.",
   gk:"k5",fr:["teach","par"],tp:["Lesson Planning"],grades:["K","1st","2nd","3rd","4th","5th"]}
 ];
 function patchNames(){var L=window.PLUGINS;if(!L||!window.PX)return;
  L.forEach(function(x){if(x&&(x.slug==="my-greg1"||x.slug==="my-greg2"||x.slug==="my-greg3"))x.cn="Greg Cassiere"})}
 try{
  var u=window.PX?PX.user():null;
  if(u&&localStorage.getItem("aiedume_greg_seed_v1")!=="1"&&localStorage.getItem("aiedume_signed_out")!=="1"){
   var nm=String(u.name||"").replace(/^\s+|\s+$/g,"").toLowerCase(),em=String(u.email||"").replace(/^\s+|\s+$/g,"").toLowerCase();
   if(nm==="greg"||em==="gregcassiere36@gmail.com"){
    var now=Date.now(),made=false;
    SEED.forEach(function(s,i){
     if(!PX.get(s.id)){
      PX.save({id:s.id,status:"published",created:now-i*60000,n:s.n,a:"teach",s:"",h:s.h,r:s.r,t:"",p:s.p,pk:"once",wm:s.wm,ex:s.ex,mk:false,iap:[],trial:0,zip:"11223",gk:s.gk,fr:s.fr,tp:s.tp,grades:s.grades});
      made=true}});
    if(made){
     var o=PX.drafts(),dirty=false;
     SEED.forEach(function(s,i){var d=o[s.id];if(d){var t=now-i*1000;if(d.edited!==t){d.edited=t;dirty=true}}});
     if(dirty)jset("aiedume_demo_drafts",o)}
    if(localStorage.getItem("aiedume_seed_sales")==null){
     var sm={};SEED.forEach(function(s){sm["my-"+s.id]=s.sales});jset("aiedume_seed_sales",sm)}
    localStorage.setItem("aiedume_greg_seed_v1","1");
    if(PX.mine)PX.mine();
   }}
 }catch(e){}
 /* gregbought 2026-10-30 -- Greg also "bought" three store plugins, so his
    My Plugins page shows what a real user's looks like: built AND bought.
    One-time flag aiedume_greg_bought_v1: the three store slugs are MERGED
    into aiedume_bought (union -- a slug already there is left as-is and
    nothing is ever removed). Once the flag is set this never runs again,
    so a bought row Greg deletes by hand stays deleted. Sales are
    untouched: the My Plugins sales card only counts his built plugins
    (drafts + aiedume_seed_sales), never store slugs. */
 try{
  var u2=window.PX?PX.user():null;
  if(u2&&localStorage.getItem("aiedume_greg_bought_v1")!=="1"&&localStorage.getItem("aiedume_signed_out")!=="1"){
   var nm2=String(u2.name||"").replace(/^\s+|\s+$/g,"").toLowerCase(),em2=String(u2.email||"").replace(/^\s+|\s+$/g,"").toLowerCase();
   if(nm2==="greg"||em2==="gregcassiere36@gmail.com"){
    var B=jget("aiedume_bought",[]);
    ["smith-math-4","patel-k-reading","tran-math-8"].forEach(function(s){if(B.indexOf(s)<0)B.push(s)});
    jset("aiedume_bought",B);
    localStorage.setItem("aiedume_greg_bought_v1","1");
   }}}
 catch(e){}
 patchNames();
})();
/* guestseed 2026-10-30 — Greg's rule: "from now on when u give the link make
   some prestended they log in." A visitor who opens the shared link on a
   device with NO account of their own lands pretend-logged-in as the sample
   person, Maria Santos, so the site looks filled in with no sign-up wall:
   her account, two plugins she built, two she bought, and her first sales.
   Runs ONLY when aiedume_demo_account is entirely absent, Logout was not
   tapped (aiedume_signed_out is not "1"), and the one-time flag
   aiedume_guest_seed_v1 is unset. A device with a real account (Greg's own
   phone) never runs it and is never touched, and the Greg seed above stays
   exactly as it was. Logging out sets aiedume_signed_out and the flag stays
   set, so the seed never re-runs; signing up with your own name replaces
   the demo account through the normal signup flow. Her sales live in
   aiedume_seed_sales (the My Plugins sales card adds them in), never in
   aiedume_bought, so her "Plugins I bought" list stays exactly the two
   store plugins she bought. */
(function(){
 function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||"null");return v==null?d:v}catch(e){return d}}
 function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
 var SEED=[
  {id:"iephelper",n:"IEP Goal Helper",p:"",sales:2,
   h:"writing IEP goals, objectives and progress notes in plain language",
   wm:"Hi! I'm your IEP Goal Helper. Tell me the grade and the skill you are working on, and I will help you draft a clear, measurable goal.",
   ex:"Example: For a 3rd grader working on reading fluency: 'By June, given a grade-level passage, the student will read 90 words correct per minute with 95% accuracy in 4 of 5 trials.'",
   gk:"k5",fr:["teach"],tp:["IEP & Special Ed"]},
  {id:"fractionfun",n:"Fraction Fun Helper",p:"",sales:1,
   h:"making fractions click with pizza slices, pies and number lines",
   wm:"Hi! I'm your Fraction Fun Helper. Tell me which fraction idea your class is stuck on, and I will build a quick activity around food, drawings and number lines.",
   ex:"Example: For halves and quarters, start with one pizza picture cut into 4 equal slices and ask: 'If you eat 1 slice, what fraction is left?'",
   gk:"k5",fr:["teach","par"],tp:["Math"]}
 ];
 try{
  if(!window.PX)return;
  if(localStorage.getItem("aiedume_guest_seed_v1")==="1")return;
  if(localStorage.getItem("aiedume_signed_out")==="1")return;
  if(localStorage.getItem("aiedume_demo_account")!==null)return;
  PX.setUser({name:"Maria Santos",email:"msantos@brightpathschool.org",role:"Teacher"});
  var now=Date.now(),made=false;
  SEED.forEach(function(s,i){
   if(!PX.get(s.id)){
    PX.save({id:s.id,status:"published",created:now-i*86400000,n:s.n,r:1,h:s.h,p:s.p,pk:"once",wm:s.wm,ex:s.ex,trial:5,gk:s.gk,fr:s.fr,tp:s.tp});
    made=true}});
  if(made){
   var o=PX.drafts(),dirty=false;
   SEED.forEach(function(s,i){var d=o[s.id];if(d){var t=now-i*86400000;if(d.edited!==t){d.edited=t;dirty=true}}});
   if(dirty)jset("aiedume_demo_drafts",o)}
  var B=jget("aiedume_bought",[]);
  ["smith-math-4","tran-math-8"].forEach(function(s){if(B.indexOf(s)<0)B.push(s)});
  jset("aiedume_bought",B);
  var SS=jget("aiedume_seed_sales",{});
  SEED.forEach(function(s){if(SS["my-"+s.id]==null)SS["my-"+s.id]=s.sales});
  jset("aiedume_seed_sales",SS);
  if(localStorage.getItem("aiedume_avatar")==null)localStorage.setItem("aiedume_avatar","img/faces/cat.webp");
  localStorage.setItem("aiedume_guest_seed_v1","1");
  if(PX.mine)PX.mine();
 }catch(e){}
})();

/* pricefix 2026-10-30 (Greg): the sample plugins carry NO price ("Set later"); Joy's The Promoter, $10/month, is the only price.
   One-time clean-up of sample drafts already saved on a device with the old $9/$7/$5/$6 values. Only touches the five sample ids. */
(function(){try{
 if(!window.PX||localStorage.getItem("aiedume_pricefix_v1")==="1")return;
 var o=JSON.parse(localStorage.getItem("aiedume_demo_drafts")||"null");
 if(o){var ch=false;["greg1","greg2","greg3","iephelper","fractionfun"].forEach(function(id){if(o[id]&&o[id].p!==""&&o[id].p!=null){o[id].p="";ch=true}});
  if(ch){localStorage.setItem("aiedume_demo_drafts",JSON.stringify(o));if(PX.mine)PX.mine()}}
 localStorage.setItem("aiedume_pricefix_v1","1")}catch(e){}})();

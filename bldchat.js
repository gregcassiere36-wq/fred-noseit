/* Plugin Builder: one big guided chat (Max -> Sam -> Joy). Tailored by ?for=...&grade=... Demo only. */
(function(){
var q=new URLSearchParams(location.search),$=function(i){return document.getElementById(i)};
var f=$("bf"),main=document.getElementById("main");if(!f||!main||!window.PX)return;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var G={
k5:{aud:"PreK-5th teachers",a:"Ages 4–8",intro:"You know how to teach little learners. Turn your best routines into a helper that kids and parents can use.",ideas:[["","Reading","Give 5 short phonics words with a sound game"],["","Math","Make 5 friendly counting and addition problems"],["","","Make 3 exit questions from today's lesson"]],wm:function(n,h){return"Hi, friend! I'm "+n+". "+(h?"I'm here to help with: "+h+". ":"")+"Tell me what grade you're in and let's start!"}},
"68":{aud:"6th-8th teachers",a:"Ages 9–12",intro:"Middle schoolers need clear steps and a little humor. Package the way you explain things so students can get unstuck on their own.",ideas:[["","Math","Explain a pre-algebra step three different ways"],["","Science","Check a lab report against a simple rubric"],["","","Turn class notes into a one-page study guide"]],wm:function(n,h){return"Hey there! I'm "+n+". "+(h?"I can help with: "+h+". ":"")+"Tell me what you're working on and we'll get you unstuck."}},
"912":{aud:"9th-12th teachers",a:"Ages 13–18",intro:"High school students want real answers fast. Share your grading shortcuts and test-prep tricks as a helper they can use any time.",ideas:[["","English","Give feedback on a thesis and an outline"],["","Math","Give 5 practice questions with worked answers"],["","","Ask questions that find a good essay topic"]],wm:function(n,h){return"Welcome. I'm "+n+". "+(h?"Here's what I can do: "+h+". ":"")+"Paste your question or draft and I'll walk you through it."}},
adult:{aud:"teachers of adults",a:"Adults 18+",intro:"Adult learners are busy and motivated. Build a helper that respects their time and gets to the point.",ideas:[["","Math","Explain a GED math skill with 3 practice problems"],["","English","Practice everyday English with gentle corrections"],["","","Turn work experience into clear resume bullets"]],wm:function(n,h){return"Welcome, I'm "+n+". "+(h?"I'm here to help with: "+h+". ":"")+"Tell me your goal and we'll take it one step at a time."}},
parents:{aud:"parents",a:"Ages 4–8",intro:"You know your child best. Share what works at home, from homework routines to IEP prep, so other parents can use it too.",ideas:[["","Homework Help","Help a stuck child take a break and try again"],["","","Help me write questions to bring to an IEP meeting"],["","Activities & Enrichment","Suggest 3 low-prep learning activities"]],wm:function(n,h){return"Hi, I'm "+n+". "+(h?"I can help with: "+h+". ":"")+"Tell me about your child (no names) and what's hard right now. We'll start small."}},
paras:{aud:"paras and student teachers",a:"",intro:"Paras and student teachers are just as vital to education. Turn what you learn on the floor every day into a helper others can lean on.",ideas:[["","","Give 5 questions for a small reading group"],["","","Plan my first week and prep my lesson"],["","","Suggest 3 ways to help a student reset"]],wm:function(n,h){return"Hi, I'm "+n+". "+(h?"I can help with: "+h+". ":"")+"Tell me what your day looks like and I'll make it easier."}},
tsupport:{aud:"teachers building their careers",a:"Adults 18+",intro:"You've figured out how to pay for school, pass the exams and find the jobs. Share that know-how with the next teacher.",ideas:[["","","Build a 4-week study plan for a state teaching exam"],["","","Explain teacher loan forgiveness steps in plain words"],["","","Turn classroom wins into resume bullets"]],wm:function(n,h){return"Hi, I'm "+n+". "+(h?"I can help with: "+h+". ":"")+"Tell me where you are in your path and we'll plan the next step."}},
teachers:{aud:"teachers",a:"",intro:"Your best lesson, rubric or routine can help other teachers. Turn it into a plugin and set your own price.",ideas:[["","","Make 3 exit questions from today's lesson"],["","","Write a kind, clear parent email"],["","","Make a 4-level rubric for any assignment"]],wm:function(n,h){return"Welcome! I'm "+n+". "+(h?"I can help with: "+h+". ":"")+"Tell me your class and what you need, and I'll get started."}}
};
var fr=(q.get("for")||"").toLowerCase(),gr=(q.get("grade")||"").toLowerCase().replace(/[^a-z0-9]/g,""),k=null;
if(/^parent/.test(fr))k="parents";else if(/^para|student/.test(fr))k="paras";else if(/support|degree|career/.test(fr))k="tsupport";else if(/adult/.test(fr)||gr==="adult")k="adult";
else if(/teach|^$/.test(fr)||fr==="teachers"){k=/^(k5|k|pre|15)/.test(gr)?"k5":/^(68|6|middle)/.test(gr)?"68":/^(912|9|high)/.test(gr)?"912":(fr?"teachers":null)}
if(!k&&gr){k=/^(k5|k|pre|15)/.test(gr)?"k5":/^(68|6)/.test(gr)?"68":/^(912|9)/.test(gr)?"912":null}
var C=k?G[k]:null;
var who=C?C.aud:"your students or fellow teachers";

var CI=C||G.teachers;
var NOTE='<b>⚠️ Build this from your own material.</b> People come here to buy YOUR know-how, not a generic AI bot like me. Paste or add your own lessons, tips and resources.';
var NOTE2=NOTE;
var PN=(function(){var q=new URLSearchParams(location.search),fr=(q.get("for")||"").toLowerCase(),gr=(q.get("grade")||"").toLowerCase().replace(/[^a-z0-9]/g,""),rf=document.referrer||"",T=["Tim","media/fred-k5-v17.webp"],R=["Rebecca","media/fred-68-v17.webp"],B=["Ben","media/fred-912-v19.webp"],FA=["Fred","media/fred-v81.webp"],FT=["Fred","media/fred-v81.webp"],r;
if(/^parent/.test(fr)||/adult/.test(fr)||gr==="adult")r=FA;else if(/^para|support|degree|career/.test(fr))r=FT;
else if(/^(k5|k|pre|15)/.test(gr))r=T;else if(/^(68|6)/.test(gr))r=R;else if(/^(912|9)/.test(gr))r=B;
if(!r){if(/sec-k5/.test(rf))r=T;else if(/sec-6-8/.test(rf))r=R;else if(/sec-9-12/.test(rf))r=B;else if(/sec-parents|sec-adults/.test(rf))r=FA;else try{r=JSON.parse(sessionStorage.getItem("aiedume_bguide")||"null")}catch(e){}}
if(!r)r=FT;try{sessionStorage.setItem("aiedume_bguide",JSON.stringify(r))}catch(e){}
var L;if(/^parent/.test(fr))L="Parents";else if(/^para/.test(fr))L="Paras";else if(/adult/.test(fr)||gr==="adult")L="Adults";else if(/support|degree|career/.test(fr))L="Teacher Support";else if(/^(k5|k|pre|15)/.test(gr)||/sec-k5/.test(rf))L="PreK-5th teachers";else if(/^(68|6)/.test(gr)||/sec-6-8/.test(rf))L="6th-8th teachers";else if(/^(912|9)/.test(gr)||/sec-9-12/.test(rf))L="9th-12th teachers";else L="teachers";
return [r[0],r[1],L]})();
var SBT=(function(){var q=new URLSearchParams(location.search),fr=(q.get("for")||"").toLowerCase(),gr=(q.get("grade")||"").toLowerCase().replace(/[^a-z0-9]/g,""),rf=document.referrer||"",b="media/build-tiles/build-",s="";
if(/^parent/.test(fr))s="sec-parents";else if(/^para|student/.test(fr))s="paras";else if(/support|degree|career/.test(fr))s="teacher-support";else if(/adult/.test(fr)||gr==="adult")s="sec-adults";
else if(/^(k5|k|pre|15)/.test(gr))s="sec-k5";else if(/^(68|6|middle)/.test(gr))s="sec-6-8";else if(/^(912|9|high)/.test(gr))s="sec-9-12";
else if(/sec-k5/.test(rf))s="sec-k5";else if(/sec-6-8/.test(rf))s="sec-6-8";else if(/sec-9-12/.test(rf))s="sec-9-12";else if(/sec-parents/.test(rf))s="sec-parents";else if(/sec-adults/.test(rf))s="sec-adults";else if(/paras/.test(rf))s="paras";else if(/teacher-support/.test(rf))s="teacher-support";
return s?b+s+".webp":"media/plugin-avatars-new/max-builder.webp"})();
var SBV=(function(){var m=/build-(sec-k5|sec-6-8|sec-9-12|sec-parents|paras|sec-adults|teacher-support)\.webp$/.exec(SBT);if(!m)return"";var k={"sec-k5":"k5","sec-6-8":"g68","sec-9-12":"g912","sec-parents":"parents",paras:"paras","sec-adults":"adults","teacher-support":"teach"}[m[1]];return"media/builder/max-"+k})();
/* visualfix 2026-10-29: ADULT section only — Max uses the builder's own robot face
   (img/agents/max.webp, the Plugins-page Max) instead of the adults owl tile, because the
   owl read as a twin of Owlgebra on that page. His screen video follows the same face:
   introvid/max. Every other section keeps its per-group tile + max-<section> video. */
if(/sec-adults/.test(SBT)){SBT="img/agents/max.webp";SBV="introvid/max"}if(/teacher-support/.test(SBT)){SBT=/teacher-support/.test(document.referrer||"")?"media/max-dino.svg":"media/max-ant-teachers.svg"}
var AV={p:{n:"Otto",r:"The Builder",img:SBT,vid:SBV,t:"Otto intro video"},
 a:{n:"Snap",r:"Avatar Builder",img:"img/agents/cat-avatar-builder.webp",vid:"media/cat-avatar-video",t:"Snap intro video"},
 c:{n:"Sam",r:"The Checker",img:"img/agents/sam-adult-v16.webp",vid:"media/builder/sam-intro",t:"Sam intro video"},
 m:{n:"Joy",r:"The Promoter · $10/month",img:"img/agents/joy.webp",vid:"media/builder/joy-intro",t:"Joy intro video"}};
var KEYS=["p","a","c","m"];
var st=document.createElement("style");
st.textContent=".bgrid{display:flex;flex-direction:column;gap:8px;margin:0}.bgrid .bl{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.bgrid .av{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 4px 6px;border:2px solid #2d3b5c;border-radius:16px;background:#0f1729;cursor:pointer;text-align:center;color:#e8eefc;min-width:0}.bgrid .av .ai{width:58px;height:58px;border-radius:16px;object-fit:contain;object-position:50% 50%;background:#0b1220;border:2px solid #2d3b5c}.bgrid .av.on{border-color:#2dd4bf;background:#12302f;box-shadow:0 0 0 2px #2dd4bf55}.bgrid .av.on .ai{border-color:#2dd4bf}.bgrid .av .ov{display:flex;flex-direction:column;align-items:center;gap:1px}.bgrid .av .an{font:800 .92rem Poppins,Inter,sans-serif;color:#fff;line-height:1.15}.bgrid .av .ar{display:none}.bgrid .av .sel{display:none}.bgrid .av .pl{position:absolute;top:5px;right:5px;width:30px;height:30px;min-height:0;padding:0;border-radius:50%;border:2px solid #fff;background:rgba(15,23,41,.82);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}.bgrid .av .pl:hover,.bgrid .av .pl:focus-visible{background:#2dd4bf;color:#062a26;border-color:#062a26}.bchat{display:flex;flex-direction:column;border:2px solid #2dd4bf;border-radius:16px;background:#0f1729;min-height:0;min-width:0;position:relative;overflow:hidden}.bchat .bh{display:flex;gap:10px;align-items:center;padding:8px 12px;border-bottom:1px solid #2d3b5c;background:#12203a;flex:none}.bchat .bh>img{width:40px;height:40px;border-radius:12px;object-fit:cover;border:2px solid #2dd4bf;flex:none}.bchat .hn{min-width:0}.bchat .hn b{display:block;font:800 1.02rem Poppins,Inter,sans-serif;color:#fff;line-height:1.15}.bchat .hn small{color:#9fb0d3;font-size:.76rem}.bchat .prog{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px;align-items:flex-end}.bchat .prog span{font:800 .8rem Inter,sans-serif;color:#7ef0c5;text-align:right}.bchat .pbar{width:100%;max-width:240px;height:6px;border-radius:99px;background:#1f2d4a;overflow:hidden}.bchat .pbar i{display:block;height:100%;width:0;background:#2dd4bf;border-radius:99px;transition:width .3s}.bchat .hx{display:flex;align-items:center;gap:8px;flex:none}.bchat #savd2{color:#9fb0d3;font-size:.7rem;max-width:110px;line-height:1.15}.bchat .hz{margin:0}.bchat .hz .zask{min-height:34px;font-size:.76rem;padding:0 10px}.bchat .bmore{position:static}.bchat .bmore>summary{cursor:pointer;font:800 .78rem Inter,sans-serif;color:#e8eefc;border:1px solid #3d5a80;border-radius:999px;padding:6px 12px;list-style:none;min-height:34px;display:flex;align-items:center}.bchat .bmore>summary::-webkit-details-marker{display:none}.bchat .bmore .bmc{position:absolute;left:8px;right:8px;top:58px;bottom:8px;overflow:auto;background:#0b1220;border:2px solid #3d5a80;border-radius:14px;padding:12px 14px;z-index:5;box-shadow:0 10px 30px #000a}.bchat .bmore .bmc .zaskp{display:none}.bchat .bmore .bmc .hv{max-width:420px;width:100%}.bchat .bmore:not([open]) .bmc{display:none}.blogs{flex:1 1 auto;min-height:0;display:flex;flex-direction:column}.clog{display:none;flex-direction:column;gap:8px;overflow:auto;padding:10px 14px;flex:1 1 auto;min-height:0}.clog.on{display:flex}.clog .m{max-width:min(94%,760px);padding:9px 13px;border-radius:16px;font-size:.95rem;line-height:1.42;background:#16223a;border:1px solid #2d3b5c;color:#e8eefc;flex:none}.clog .m p{margin:0 0 6px}.clog .m p:last-child{margin:0}.clog .m.u{align-self:flex-end;background:#12302f;border-color:#2dd4bf;border-bottom-right-radius:4px}.clog .m:not(.u):not(.w){border-bottom-left-radius:4px}.clog .m.w{background:#2a2312;border-color:#ffd27a;color:#ffe9b0}.clog .m.w b{color:#ffd27a}.clog .stp{display:inline-block;background:#2dd4bf;color:#062a26;font:800 .72rem Inter,sans-serif;border-radius:99px;padding:2px 9px;margin-right:4px;vertical-align:1px}.clog .stl{margin:4px 0 6px 20px;padding:0}.clog .stl li{margin:2px 0}.clog .ck{list-style:none;margin:4px 0;padding:0;display:grid;gap:4px}.clog .ck li{display:flex;gap:6px;align-items:flex-start;font-size:.9rem}.clog .ck button{margin-left:auto;flex:none}.bt{display:inline-flex;align-items:center;min-height:38px;height:auto;padding:5px 14px;line-height:1.2;border-radius:999px;border:1px solid #2dd4bf;background:#16223a;color:#e8eefc;font:700 .86rem Inter,sans-serif;cursor:pointer;text-decoration:none;margin:2px 4px 2px 0;text-align:left}.bt.sm{min-height:30px;padding:2px 10px;font-size:.76rem}.bt.go{background:#2dd4bf;color:#062a26;border-color:#2dd4bf}.bt.on{background:#12302f;border-color:#7ef0c5}.bt.y{background:#ffd21f;color:#3b2a00;border-color:#ffd21f}.bt.ghost{border-color:#3d5a80;color:#c8d6f5;background:transparent}.bt:hover{filter:brightness(1.12)}.clog .pvw{margin:6px 0 2px;border:2px solid #7ef0c5;border-radius:16px;background:#0b1220;padding:10px;display:grid;gap:6px}.pvw .lab{font-size:.7rem;font-weight:800;color:#7ef0c5;letter-spacing:.05em;text-transform:uppercase}.pvw .t{display:flex;gap:10px;align-items:center}.pvw .t img{width:52px;height:52px;border-radius:14px;object-fit:cover;flex:none}.pvw h4{margin:0;font:800 1rem Poppins,Inter,sans-serif;color:#fff}.pvw .by{font-size:.78rem;color:#9fb0d3}.pvw .mt{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.78rem}.pvw .tg{background:#16223a;border:1px solid #2d3b5c;border-radius:999px;padding:2px 9px}.pvw .get{margin-left:auto;background:#2dd4bf;color:#062a26;font-weight:800;border-radius:999px;padding:6px 14px}.pvw .wb{background:#16223a;border-radius:12px;padding:7px 10px;font-size:.82rem}.pvw .wb small{display:block;color:#7ef0c5;font-weight:800}.pvw .ia{display:flex;justify-content:space-between;font-size:.8rem;background:#1b1a2e;border-radius:8px;padding:4px 8px}.qr{flex:none;display:flex;flex-wrap:wrap;gap:2px;padding:4px 12px 0;max-height:112px;overflow:auto}.qr:empty{display:none}.cin{display:flex;gap:10px;padding:10px 12px;align-items:stretch;flex:none}.cin textarea{flex:1;min-width:0;height:96px;min-height:96px;max-height:200px;border-radius:14px;border:2px solid #3d5a80;background:#111827;color:#e8eefc;padding:10px 14px;font:inherit;font-size:18px!important;resize:none;line-height:1.35;margin:0;box-sizing:border-box}.cin textarea:focus{outline:2px solid #2dd4bf;outline-offset:1px}.cin .snd{height:auto;min-height:96px;align-self:stretch;padding:0 22px;font-size:18px;border-radius:14px;border:0;background:#2dd4bf;color:#062a26;font-weight:800;cursor:pointer;flex:none}.cin .att{height:auto;min-height:96px;align-self:stretch;min-width:56px;border-radius:14px;border:1px dashed #2dd4bf;background:transparent;color:#bff8ee;cursor:pointer;font-size:1.5rem;flex:none;padding:0}.vpop{position:fixed;inset:0;z-index:2147483000;background:rgba(5,10,20,.82);display:flex;align-items:center;justify-content:center;padding:16px}.vpop[hidden]{display:none}.vpop .vbox{position:relative;width:min(760px,100%);background:#0f1729;border:2px solid #2dd4bf;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px}.vpop .vt{color:#fff;font:800 1rem Poppins,Inter,sans-serif;padding-right:44px}.vpop video{width:100%;max-height:70vh;border-radius:10px;background:#000;display:block}.vpop .vx{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;border:2px solid #fff;background:#16223a;color:#fff;font-size:1.1rem;cursor:pointer}.bgrid .bhide,.bhide{display:none!important}html body footer,html body a.sellbar.sellbar,html body a.sellbar[href],html body .zbox.float:not(.open) .zdock{display:none!important}html,html body{overflow:hidden!important;height:100%}html body{padding-bottom:0!important}html body main#main.bmode{max-width:none!important;width:100%!important;margin:0!important;padding:8px 10px 8px!important;height:calc(100vh - var(--nh,77px) - var(--tb,0px));height:calc(100dvh - var(--nh,77px) - var(--tb,0px));box-sizing:border-box;display:block!important}.bgrid{height:100%}.bgrid .bchat{flex:1 1 0}.bgrid .bh .hz{display:none}.bchat #savd2{display:none}.bchat .bh{padding:6px 10px}.bchat .prog{align-items:flex-start}.bchat .prog span{text-align:left;font-size:.74rem}.clog .m{font-size:.9rem}@media(min-width:900px) and (min-height:540px){html body main#main.bmode{padding:10px 16px 12px!important}.bgrid{display:grid;grid-template-columns:minmax(230px,28%) 1fr;gap:10px;height:100%}.bgrid .bl{display:grid;grid-template-columns:1fr;grid-template-rows:repeat(4,minmax(0,1fr));gap:8px;min-height:0}.bgrid .av{display:block;padding:0;overflow:hidden;min-height:0;text-align:left;border-radius:16px}.bgrid .av .ai{position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:0;object-fit:contain;object-position:50% 50%}.bgrid .av::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:62%;background:linear-gradient(180deg,rgba(11,18,32,0) 0%,rgba(11,18,32,.88) 78%);pointer-events:none}.bgrid .av .ov{position:absolute;left:12px;right:12px;bottom:9px;z-index:2;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap}.bgrid .av .an{font-size:1.15rem;text-shadow:0 1px 4px #000}.bgrid .av .ar{display:block;color:#cfe0ff;font-size:.74rem;flex-basis:100%;order:3;margin-top:-6px;text-shadow:0 1px 3px #000}.bgrid .av .sel{display:inline-flex;align-items:center;justify-content:center;margin-left:auto;min-height:34px;padding:0 16px;border-radius:999px;border:2px solid #2dd4bf;background:rgba(15,23,41,.85);color:#e8eefc;font:800 .8rem Inter,sans-serif;cursor:pointer}.bgrid .av.on .sel{background:#2dd4bf;color:#062a26}.bgrid .av .pl{z-index:3;top:9px;right:9px;width:40px;height:40px}.bgrid .av .pl svg{width:20px;height:20px}.bgrid .av.on{box-shadow:0 0 0 3px #2dd4bf}.bgrid .bh .hz{display:block}.bchat #savd2{display:block}.bchat .bh{padding:8px 14px}.bchat .prog{align-items:flex-end}.bchat .prog span{text-align:right;font-size:.82rem}.clog .m{font-size:.95rem}}@media(min-width:900px) and (max-height:700px){.bgrid .av .ar{display:none}.clog .m{font-size:.9rem}.clog{padding:8px 12px}}@media(max-width:899px),(max-height:539px){.bgrid .av .pl{width:28px;height:28px;top:3px;right:3px}.bgrid .av .ai{width:60px;height:60px}}@media(max-width:899px){.bgrid .av{padding-top:10px}.bchat .bmore .bmc{top:50px}.cin textarea{font-size:18px!important;padding:12px 14px}.cin{gap:10px;padding:10px 8px}.cin .att{min-width:46px}.cin .snd{padding:0 14px}}@media(max-width:899px) and (max-height:700px){.bgrid .av .ai{width:46px;height:46px}.qr{max-height:84px}}.avb{margin:6px auto 2px;width:100%;max-width:620px;box-sizing:border-box;border:2px solid #7ef0c5;border-radius:18px;background:#0b1220;padding:18px 16px;display:flex;flex-direction:column;gap:16px}.avhd{display:flex;gap:14px;align-items:center}.avhd>img{width:86px;height:86px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:3px solid #2dd4bf;flex:none;background:#16223a}.avht{min-width:0}.avb h3{margin:0 0 6px;font:800 1.45rem Poppins,Inter,sans-serif;color:#fff;line-height:1.15}.avbub{display:inline-block;background:#22345a;border-radius:14px;border-bottom-left-radius:4px;padding:8px 12px;color:#e8eefc;font-size:.95rem;line-height:1.35}.avex{display:flex;flex-direction:column;align-items:center;gap:8px}.avex .avxl{font-size:.78rem;font-weight:800;color:#7ef0c5;letter-spacing:.06em;text-transform:uppercase}.avexr{display:flex;gap:12px;align-items:center;justify-content:center}.avexr img{width:104px;height:104px;border-radius:14px;object-fit:cover;border:2px solid #2d3b5c}.avexa{color:#2dd4bf;font-size:1.6rem;font-weight:800;line-height:1}.avopts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.avcard{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:122px;padding:14px 8px;box-sizing:border-box;border:2px solid #2dd4bf;border-radius:16px;background:#101c33;color:#e8eefc;font:inherit;cursor:pointer;text-align:center}.avcard:hover{filter:brightness(1.15)}.avcard .avci{font-size:1.9rem;line-height:1.1}.avcard .avct{font:800 1.02rem Poppins,Inter,sans-serif;color:#fff;line-height:1.2}.avcard .avcs{font-size:.8rem;color:#9fb0d3;line-height:1.25}.avstyl{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap}.avstyl .avsl{color:#9fb0d3;font-weight:700;font-size:.9rem}.avstyl .bt{margin:0;min-width:118px;justify-content:center;text-align:center}.avcamw{display:flex;flex-direction:column;gap:8px;align-items:center}.avcamw[hidden]{display:none}.avcamw video{width:100%;border-radius:12px;background:#000;display:block}.avmsg{margin:0;color:#ffd27a;font-size:.9rem;text-align:center}.avmsg:empty{display:none}.avpv{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}.avcir{position:relative;width:170px;height:170px;border-radius:50%;border:3px solid #2dd4bf;background:#16223a;box-shadow:0 0 22px #2dd4bf55;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:none}.avcir .avph{font-size:3rem;line-height:1}.avcir img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}.avcir img:not([src]){opacity:0}.avpv p{margin:0;color:#cfe9e6;font-weight:700}.avuse{width:100%;justify-content:center;min-height:54px;font-size:1.05rem;padding:10px 22px;border-radius:14px;text-align:center}@media(max-width:760px){.avopts{grid-template-columns:1fr}.avcard{min-height:96px}.avexr img{width:88px;height:88px}.avcir{width:150px;height:150px}.avhd>img{width:70px;height:70px}.avb h3{font-size:1.25rem}.avb{padding:14px 12px}}.avcamw{position:relative}.avcamx{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;border:2px solid #fff;background:rgba(15,23,41,.85);color:#fff;font-size:1.05rem;line-height:1;cursor:pointer;z-index:3;display:flex;align-items:center;justify-content:center;padding:0}.avcamx:hover,.avcamx:focus-visible{background:#2dd4bf;color:#062a26;border-color:#062a26}.avcamrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.avpv{position:relative}.avpvx{position:absolute;top:-6px;left:calc(50% + 57px);width:36px;height:36px;border-radius:50%;border:2px solid #fff;background:rgba(15,23,41,.88);color:#fff;font-size:1rem;line-height:1;cursor:pointer;z-index:3;display:flex;align-items:center;justify-content:center;padding:0}.avpvx[hidden]{display:none}.avpvx:hover,.avpvx:focus-visible{background:#2dd4bf;color:#062a26;border-color:#062a26}.avgen2{display:flex;flex-direction:column;gap:8px;border:2px solid #2dd4bf;border-radius:14px;background:#101c33;padding:10px 12px}.avgen2[hidden]{display:none}.avglog{display:flex;flex-direction:column;gap:6px;max-height:230px;overflow:auto}.avglog .gm{max-width:92%;padding:7px 11px;border-radius:13px;border-bottom-left-radius:4px;font-size:.9rem;line-height:1.35;background:#22345a;color:#e8eefc;align-self:flex-start}.avglog .gm.u{background:#12302f;border:1px solid #2dd4bf;border-bottom-left-radius:13px;border-bottom-right-radius:4px;align-self:flex-end}.avgrow{display:flex;gap:8px}.avgrow input{flex:1;min-width:0;min-height:46px;box-sizing:border-box;border-radius:12px;border:2px solid #3d5a80;background:#111827;color:#e8eefc;padding:8px 12px;font:inherit;font-size:16px}.avgrow input:focus{outline:2px solid #2dd4bf;outline-offset:1px}.avgrow .bt{margin:0;min-height:46px;justify-content:center}@media(max-width:760px){.avpvx{left:calc(50% + 47px)}}";
document.head.appendChild(st);
var nav=document.querySelector("nav"),tb=document.querySelector("nav.tabbar");
function setNh(){var r=document.documentElement.style;if(nav)r.setProperty("--nh",nav.offsetHeight+"px");r.setProperty("--tb",(tb&&tb.offsetHeight||0)+"px")}setNh();window.addEventListener("resize",setNh);
function mkEl(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
/* ---- layout ---- */
var h1=main.querySelector("h1"),zk=main.querySelector(".zaskp"),f2=main.querySelector(".f2bx"),bld=main.querySelector(".bld"),who2=$("whoami");
h1.className="sr-only";h1.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)";
var grid=mkEl("div","bgrid"),bl=mkEl("div","bl");grid.id="bgrid";
KEYS.forEach(function(k){var a=AV[k];
 var b=mkEl("div","av",'<img class="ai" alt="'+a.n+', '+esc(a.r)+'" src="'+a.img+'"/>'+(a.vid?'<button type="button" class="pl" data-v="'+k+'" aria-label="Play the '+a.t+'" title="Play the short video"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button>':'')+'<span class="ov"><span class="an">'+a.n+'</span><span class="ar">'+esc(a.r)+'</span><button type="button" class="sel" data-k="'+k+'">Select</button></span>');
 b.dataset.k=k;bl.appendChild(b)});
var chat=mkEl("section","bchat");chat.setAttribute("aria-label","Plugin builder chat");
chat.innerHTML='<header class="bh"><img alt="" id="phimg"/><div class="hn"><b id="phn"></b><small id="phr"></small></div><div class="prog" aria-live="polite"><span id="pl2"></span><div class="pbar"><i id="pbi"></i></div></div><div class="hx"><span id="savd2" aria-live="polite"></span></div></header><div class="blogs"></div><div class="qr" id="qr"></div>';
var logs=chat.querySelector(".blogs"),qr=chat.querySelector("#qr"),bmc=mkEl("div","bhide"),hx=chat.querySelector(".hx");
var lp=mkEl("div","clog"),lc=mkEl("div","clog"),lm=mkEl("div","clog"),la=mkEl("div","clog");
[lp,la,lc,lm].forEach(function(l){l.setAttribute("aria-live","polite");logs.appendChild(l)});
var LOG={p:lp,a:la,c:lc,m:lm};
var form=mkEl("form","cin",'<button type="button" class="att" id="attb" aria-label="Add your own file (.txt, .md, .csv)" title="Add your own file (.txt, .md, .csv)">📎</button><textarea id="cinp" rows="3" maxlength="6000" autocomplete="off" aria-label="Type your answer"></textarea><button type="button" class="tlk" id="tlkb" aria-label="Talk to the builder">🎤 Talk</button><button type="submit" class="snd">Send</button><input id="bfin" type="file" accept=".txt,.md,.csv,text/plain" hidden/>');
chat.appendChild(form);
if(zk){zk.classList.add("hz");hx.insertBefore(zk,hx.firstChild)}
["pick11","one","helper","hv","save","sellk","obots"].forEach(function(c){var e=main.querySelector("."+c)||main.querySelector("#"+c);if(e)bmc.appendChild(e)});
if(f2)bmc.appendChild(f2);if(who2)bmc.appendChild(who2);
var hid=mkEl("div","bhide");hid.hidden=true;hid.appendChild(bld);
grid.appendChild(bl);grid.appendChild(chat);
main.insertBefore(grid,main.firstChild);hid.appendChild(bmc);main.appendChild(hid);main.classList.add("bmode");
/* saved indicator mirror */
var sv=$("savd");if(sv&&window.MutationObserver){var mo=new MutationObserver(function(){$("savd2").textContent=sv.textContent});mo.observe(sv,{childList:true,characterData:true,subtree:true})}
/* cast intro videos (2026-10-29, Greg's builderv2 design): the TV screen beside the chat is deleted - a card's play button selects that helper and played the video in the card's picture spot (superseded 2026-11-02: video now plays in the chatbox) - see the cv block at the end of this file */
/* ---- chat engine ---- */
var act="p",PEND={p:null,c:null,m:null},PROG={p:null,c:null,m:null};
function say(k,h,c){var e=mkEl("div","m"+(c?" "+c:""),h);LOG[k].appendChild(e);LOG[k].scrollTop=LOG[k].scrollHeight;return e}
function usr(k,t){return say(k,esc(t).replace(/\n/g,"<br>"),"u")}
function prog(k,n,t,lab){PROG[k]={n:n,t:t,lab:lab};if(act===k)drawProg()}
function drawProg(){var p=PROG[act],l=$("pl2"),i=$("pbi");if(!p){l.textContent="";i.style.width="0";return}
 l.textContent=p.n>=p.t&&p.done?p.lab:(p.n?"Step "+p.n+" of "+p.t+" · "+p.lab:p.lab);i.style.width=Math.round(100*(p.done?1:Math.max(0,p.n-1)/p.t))+"%"}
function stp(k,n,t){return'<span class="stp">Step '+n+" of "+t+"</span> "}
/* quick replies: chips + what typed text does */
function setQ(k,chips,ph,onText){PEND[k]={chips:chips||[],ph:ph||"Type here",onText:onText||null};if(act===k)drawQ()}
function drawQ(){var P=PEND[act];qr.innerHTML="";if(!P){return}
 P.chips.forEach(function(c){var b=c.href?mkEl("a","bt"+(c.c?" "+c.c:""),c.t):mkEl("button","bt"+(c.c?" "+c.c:""),c.t);if(c.href)b.href=c.href;else b.type="button";
  b.addEventListener("click",function(){if(c.f)c.f(b)});qr.appendChild(b)});
 var t=$("cinp");t.placeholder=P.ph;t.disabled=false}
var cinp=$("cinp");
function grow(){cinp.style.height="auto";cinp.style.height=Math.max(96,Math.min(cinp.scrollHeight+2,200))+"px"}
cinp.addEventListener("input",grow);
cinp.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();form.requestSubmit?form.requestSubmit():form.dispatchEvent(new Event("submit",{cancelable:true}))}});
form.addEventListener("submit",function(e){e.preventDefault();var t=cinp.value.trim();if(!t)return;cinp.value="";grow();var P=PEND[act];
 if(P&&P.onText)P.onText(t);else{usr(act,t);say(act,"Tap one of the buttons below, or ask me about price or your own material.")}});
function pick(k){cvStop();if(k!=="a"&&avExitCam)avExitCam();act=k;chat.dataset.m=k;[].forEach.call(bl.children,function(b){var on=b.dataset.k===k;b.classList.toggle("on",on);b.querySelector(".sel").textContent=on?"● Active":"Select";b.querySelector(".sel").setAttribute("aria-pressed",on)});
 var a=AV[k];$("phimg").src=a.img;$("phn").textContent=a.n;$("phr").textContent=a.r;
 KEYS.forEach(function(x){LOG[x].classList.toggle("on",x===k)});
 if(k==="p")pnEnter();if(k==="a")avEnter();if(k==="c")gkEnter();if(k==="m")bzEnter();
 drawProg();drawQ();LOG[k].scrollTop=LOG[k].scrollHeight}
bl.addEventListener("click",function(e){var pl=e.target.closest(".pl");if(pl){e.stopPropagation();pick(pl.dataset.v);cvPlay(pl.dataset.v);return}var b=e.target.closest(".av");if(b)pick(b.dataset.k)});
/* ---- Snap: Avatar Builder panel (2026-10-29) ---- */
var avBuilt=false,avStyle="anime",avExitCam=null,avGenFn=null,avGenArmed=false;
function avEnter(){setQ("a",[],avGenArmed?"Describe your picture…":"Upload a photo, generate one, or turn your photo into an avatar",function(t){if(avGenArmed&&avGenFn){avGenFn(t)}else{say("a","Use the buttons in my panel — <b>Upload a photo</b>, <b>Generate one</b>, or <b>Turn yourself into an avatar</b> — then tap <b>Use this avatar</b>.")}});
 if(avBuilt)return;avBuilt=true;
 say("a","Hi, I'm Snap! Upload a photo, generate one, or turn a photo of you into an avatar — that's all it takes.");
 var s=mkEl("section","avb");
 s.innerHTML='<div class="avhd"><img src="img/agents/cat-avatar-builder.webp" alt="Snap, the Avatar Builder"/><div class="avht"><h3>Build Your Avatar</h3><span class="avbub">Hi, I\'m Snap! Upload a photo, generate one, or turn a photo of you into an avatar — that\'s all it takes.</span></div></div>'
 +'<div class="avex"><span class="avxl">Example</span><div class="avexr"><img src="img/faces/smith.webp" alt="Example: a real photo"/><span class="avexa">➜</span><img src="img/faces/smith-art.webp" alt="Example: the AI picture made from it"/></div></div>'
 +'<div class="avopts"><label class="avcard"><span class="avci">⬆️</span><span class="avct">Upload a photo</span><span class="avcs">from your photos</span><input id="avfile" type="file" accept="image/*" hidden/></label><button type="button" class="avcard" id="avgen"><span class="avci">✨</span><span class="avct">Generate one</span><span class="avcs">with the avatar maker</span></button><label class="avcard"><span class="avci">🪄</span><span class="avct">Turn yourself into an avatar</span><span class="avcs">from your photo</span><input id="avfile2" type="file" accept="image/*" hidden/></label></div>'
 +'<div class="avstyl"><span class="avsl">Pick a style:</span><button type="button" class="bt sm on" id="avsan">Anime</button><button type="button" class="bt sm" id="avscar">Cartoon</button><button type="button" class="bt sm" id="avsreal">Realistic</button></div>'
 +'<div class="avgen2" id="avgenbox" hidden><div class="avglog" id="avglog"></div></div>'
 +'<p class="avmsg" id="avmsg" aria-live="polite"></p>'
 +'<div class="avpv"><div class="avcir"><img class="avph" src="img/agents/cat-avatar-builder.webp" alt=""/><img id="avimg" alt="Your avatar preview"/></div><button type="button" class="avpvx" id="avpvx" aria-label="Remove this photo and go back" hidden>✕</button><p id="avcap">You will see your avatar</p></div>'
 +'<button type="button" class="bt go avuse" id="avuse">Use this avatar</button>';
 LOG.a.appendChild(s);LOG.a.scrollTop=LOG.a.scrollHeight;
 var img=s.querySelector("#avimg"),cap=s.querySelector("#avcap"),msg=s.querySelector("#avmsg");
 var avPicOK=false; /* true only while the circle holds a real picture (uploaded, snapped, or a verified AI generation) */
 try{var svA=localStorage.getItem("aiedume_avatar");if(svA){var badSave=false;
  if(svA.indexOf("data:")===0){var cIx=svA.indexOf(","),b64len=cIx>=0?svA.length-cIx-1:0,decB=Math.floor(b64len*3/4);
   /* a too-small saved value is the picture maker's flat "free limit" notice, not a picture: tiny in any format, and its PNG re-save is still far smaller than a real generated picture */
   if(decB<20000||(svA.indexOf("data:image/png")===0&&decB<150000))badSave=true}
  if(badSave){localStorage.removeItem("aiedume_avatar")}
  else{img.src=svA;cap.textContent="Your avatar";avPicOK=true}}}catch(e){}
 function setPic(u,fromCam){avPicOK=true;avSelfOn=false;img.src=u;cap.textContent="Your avatar";msg.textContent="";var px=s.querySelector("#avpvx");if(px)px.hidden=!fromCam}
 s.querySelector("#avfile").addEventListener("change",function(){var fl=this.files&&this.files[0];if(!fl)return;var r=new FileReader();r.onload=function(){setPic(String(r.result))};r.readAsDataURL(fl)});
 var pvx=s.querySelector("#avpvx");
 pvx.addEventListener("click",function(){pvx.hidden=true;avPicOK=false;avSelfOn=false;avSelfOrig=null;img.removeAttribute("src");cap.textContent="You will see your avatar";s.scrollIntoView({block:"nearest"})});
 /* ---- Snap option 3: turn yourself into an avatar (2026-11-02, Greg: "it can be 3 things") ----
    Honest build note: this static build has no AI photo-to-avatar service, so the seller's own
    photo is restyled right here in the browser — flattened, colors posterized, outlines drawn
    (Sobel) — in the picked style. It is their real photo restyled, not an AI redraw and not a
    different face. Realistic = a light polish of the photo itself. */
 var avSelfOrig=null,avSelfOn=false;
 function avSelfie(durl,quiet){msg.textContent="Making your avatar…";
  var im=new Image();
  im.onerror=function(){msg.textContent="That photo didn't work — try another one."};
  im.onload=function(){setTimeout(function(){try{
   var SZ=512,cv=document.createElement("canvas");cv.width=SZ;cv.height=SZ;var cx=cv.getContext("2d");
   var swd=im.naturalWidth,shg=im.naturalHeight,side=Math.min(swd,shg);
   cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality="high";
   cx.drawImage(im,(swd-side)/2,(shg-side)/2,side,side,0,0,SZ,SZ);
   if(avStyle!=="realistic"){var sm=avStyle==="anime"?192:256,tc=document.createElement("canvas");tc.width=sm;tc.height=sm;tc.getContext("2d").drawImage(cv,0,0,sm,sm);cx.clearRect(0,0,SZ,SZ);cx.drawImage(tc,0,0,SZ,SZ)}
   var idt=cx.getImageData(0,0,SZ,SZ),px=idt.data,nn=SZ*SZ,gray=new Float32Array(nn),i,j,x,y;
   for(i=0;i<nn;i++){j=i*4;gray[i]=0.299*px[j]+0.587*px[j+1]+0.114*px[j+2]}
   var P=avStyle==="anime"?{sat:1.28,br:1.06,ct:1.06,lv:5,eth:300,ed:0.55}:avStyle==="cartoon"?{sat:1.18,br:1.03,ct:1.05,lv:6,eth:200,ed:0.35}:{sat:1.05,br:1.02,ct:1.03,lv:0,eth:0,ed:1};
   for(y=0;y<SZ;y++){for(x=0;x<SZ;x++){i=y*SZ+x;j=i*4;
    var r=px[j],g=px[j+1],b=px[j+2],gr=gray[i];
    r=gr+(r-gr)*P.sat;g=gr+(g-gr)*P.sat;b=gr+(b-gr)*P.sat;
    r=((r-128)*P.ct+128)*P.br;g=((g-128)*P.ct+128)*P.br;b=((b-128)*P.ct+128)*P.br;
    if(P.lv){var stp=255/(P.lv-1);r=Math.round(r/stp)*stp;g=Math.round(g/stp)*stp;b=Math.round(b/stp)*stp}
    if(P.eth&&x>0&&x<SZ-1&&y>0&&y<SZ-1){var gx=-gray[i-SZ-1]+gray[i-SZ+1]-2*gray[i-1]+2*gray[i+1]-gray[i+SZ-1]+gray[i+SZ+1],gy=-gray[i-SZ-1]-2*gray[i-SZ]-gray[i-SZ+1]+gray[i+SZ-1]+2*gray[i+SZ]+gray[i+SZ+1];
     if(Math.sqrt(gx*gx+gy*gy)>P.eth){r*=P.ed;g*=P.ed;b*=P.ed}}
    px[j]=r;px[j+1]=g;px[j+2]=b}}
   cx.putImageData(idt,0,0);
   setPic(cv.toDataURL("image/jpeg",0.92),true);avSelfOn=true;
   msg.textContent="Done — that's you as an avatar. Tap Use this avatar to keep it.";
   if(!quiet)say("a","Done — that's you as an avatar, in the circle. Tap <b>Use this avatar</b> to keep it. Want another style? Pick one above and I'll redo it.");
  }catch(e){msg.textContent="That photo didn't work — try another one."}},40)};
  im.src=durl}
 s.querySelector("#avfile2").addEventListener("change",function(){var fl=this.files&&this.files[0];if(!fl)return;this.value="";var r=new FileReader();r.onload=function(){avSelfOrig=String(r.result);avSelfie(avSelfOrig)};r.readAsDataURL(fl)});
 function styleBtn(on){s.querySelector("#avsan").classList.toggle("on",on==="anime");s.querySelector("#avscar").classList.toggle("on",on==="cartoon");s.querySelector("#avsreal").classList.toggle("on",on==="realistic");avStyle=on;if(avSelfOn&&avSelfOrig)avSelfie(avSelfOrig,true)}
 s.querySelector("#avsan").addEventListener("click",function(){styleBtn("anime")});
 s.querySelector("#avscar").addEventListener("click",function(){styleBtn("cartoon")});
 s.querySelector("#avsreal").addEventListener("click",function(){styleBtn("realistic")});
 var gbox=s.querySelector("#avgenbox"),glog=s.querySelector("#avglog"),gOpened=false,gBusy=false,gCoolT=null;
 var AVGEN_MIN=20000; /* measured 2026-10-29: a real 512x512 picture from the maker is 25,908+ bytes (41 samples, typical 30-45K); the "free limit reached" notice is a small flat banner, and a busy maker also answers 429/503 with no picture at all — anything under this size, or not 512x512, is NOT a picture and must never reach the circle */
 function gSay(t,u){var d=document.createElement("div");d.className="gm"+(u?" u":"");d.textContent=t;glog.appendChild(d);glog.scrollTop=glog.scrollHeight;return d}
 function gRest(sec,fn){var left=sec;clearInterval(gCoolT);
  gCoolT=setInterval(function(){left--;if(left<=0){clearInterval(gCoolT);gCoolT=null;if(fn)fn()}},1000)}
 function genPic(w){if(gBusy)return;if(gCoolT){gSay("Give the picture maker a few more seconds to rest…");return}
  w=String(w||"").trim();if(!w){gSay("Type a few words first — what should your picture be?");return}
  gSay(w,true);gBusy=true;avPicOK=false;
  var stw=avStyle==="anime"?"anime style":avStyle==="cartoon"?"cartoon style":"realistic photo";
  var st=gSay("Making your picture…");
  function fail(){st.textContent="That didn't work. Type your description in the writing box below to try again.";gBusy=false}
  function done(u){setPic(u);st.textContent="Done — your picture is in the circle. Tap Use this avatar to keep it. Want another? Give the picture maker a few seconds to rest, then just tell me.";gBusy=false;gRest(45,null)}
  function attempt(tries){
   var url="https://image.pollinations.ai/prompt/"+encodeURIComponent(w+", "+stw)+"?seed="+Math.floor(Math.random()*999999)+"&width=512&height=512&nologo=true";
   function busy(){ /* maker resting (free limit / busy): wait it out and retry ONCE with a fresh seed; the notice never reaches the circle */
    if(tries<1){st.textContent="The picture maker needs a short rest — give me about a minute…";gRest(50,function(){attempt(tries+1)})}
    else{st.textContent="Still busy — wait a minute and tell me again.";gBusy=false}}
   function bad(){if(tries<1)busy();else fail()}
   fetch(url).then(function(r){if(!r.ok)throw{lim:(r.status===429||r.status===503)};return r.blob()}).then(function(bl){
    if(!bl||bl.size<AVGEN_MIN){busy();return}
    var ou=URL.createObjectURL(bl),im=new Image();
    im.onload=function(){if(im.naturalWidth!==512||im.naturalHeight!==512){URL.revokeObjectURL(ou);busy();return}
     try{var cv=document.createElement("canvas");cv.width=512;cv.height=512;cv.getContext("2d").drawImage(im,0,0,512,512);var u2=cv.toDataURL("image/png");URL.revokeObjectURL(ou);done(u2)}catch(e){URL.revokeObjectURL(ou);bad()}};
    im.onerror=function(){URL.revokeObjectURL(ou);bad()};
    im.src=ou}).catch(function(e){if(e&&e.lim)busy();else bad()})}
  attempt(0)}
 avGenFn=genPic;
 s.querySelector("#avgen").addEventListener("click",function(){gbox.hidden=false;avGenArmed=true;setQ("a",[],"Describe your picture…",function(t){genPic(t)});if(!gOpened){gOpened=true;gSay("Type what you want your picture to be in the writing box below. Example: 'a happy robot teacher with glasses.'")}gbox.scrollIntoView({block:"nearest"});cinp.focus()});
 s.querySelector("#avuse").addEventListener("click",function(){if(gBusy){msg.textContent="Wait for your picture to finish first.";return}
  if(!img.src){msg.textContent="Add a photo first.";return}
  if(!avPicOK){msg.textContent="That picture didn't come out — make a new one first.";return}
  try{localStorage.setItem("aiedume_avatar",img.src)}catch(e){}
  msg.textContent="Saved — this is your avatar now.";say("a","Saved — this is your avatar now. 🐱")});
}
/* ---- form data helpers (hidden #bf stays the data store so autosave/Sam/My Plugins work as before) ---- */
function setv(n,v){var e=f.elements[n];if(!e)return;e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))}
function getv(n){var e=f.elements[n];return e?String(e.value||"").trim():""}
function val(){return window.BLDX?BLDX.gather():{}}
var rt=f.elements["r"];
if(C){PX.wmTpl=function(n,h){return C.wm(n||"your helper",h)}}
/* ---- builder helper: 7 steps ---- */
var GR=["Ages 4–8","Ages 9–12","Ages 13–18","Adults 18+"],TN=["Warm and encouraging","Clear and simple","Fun and playful","Calm and patient","Professional"];
var SUBJ=["Math","Reading","Science","Writing","History"];
var N=7,answered={},cur=0,returnTo=null,pnIntro=false,ideaI=-1;
var d0=null;
function chipsOf(arr,fn,cls){return arr.map(function(t){return{t:esc(t),c:cls,f:function(){fn(t)}}})}
var STEPS=[
 {k:"n",lab:"Plugin name",ph:"Type a name",q:function(){return"<b>What should we call your plugin?</b> A short, clear name works best."},
  chips:function(){return CI.ideas.map(function(x,i){return x[0]?{t:esc(x[0]),f:function(){ideaI=i;ans(0,x[0])}}:null}).filter(Boolean)},
  ok:function(v){return v.length>=2?"":"Give it a name with at least 2 letters."},show:function(v){return v}},
 {k:"a",lab:"Who it's for",ph:"Tap a choice below",q:function(){return"<b>Who is it for?</b>"+(C&&C.a?" Since you came from the "+esc(C.aud)+" page, I'd suggest <b>"+esc(C.a)+"</b>.":"")},
  chips:function(){return GR.map(function(t){return{t:esc(t)+(C&&C.a===t?" (suggested)":""),c:C&&C.a===t?"go":"",f:function(){ans(1,t)}}})},
  match:function(v){v=v.toLowerCase();return GR.filter(function(g){return g.toLowerCase()===v||g.toLowerCase().indexOf(v)>=0&&v.length>2})[0]||(/adult/.test(v)?GR[3]:"")},show:function(v){return v}},
 {k:"s",lab:"Subject",ph:"Type a subject, or skip",q:function(){return"<b>What subject is it for?</b> Type it, or tap one. You can skip if it covers many."},
  chips:function(){var a=[];if(ideaI>=0&&CI.ideas[ideaI][1])a.push(CI.ideas[ideaI][1]);SUBJ.forEach(function(x){if(a.indexOf(x)<0)a.push(x)});
   return chipsOf(a,function(t){ans(2,t)}).concat([{t:"Skip, any subject",f:function(){ans(2,"")}}])},
  ok:function(){return""},show:function(v){return v||"any subject"}},
 {k:"t",lab:"Tone",ph:"Tap a tone below",q:function(){return"<b>What tone should it use?</b> This is how your helper sounds."},
  chips:function(){return TN.map(function(t){return{t:esc(t),f:function(){ans(3,t)}}})},
  match:function(v){v=v.toLowerCase();return TN.filter(function(t){return t.toLowerCase().indexOf(v)===0||v.indexOf(t.toLowerCase().split(" ")[0])>=0})[0]||""},show:function(v){return v}},
 {k:"h",lab:"What it helps with",ph:"One job, e.g. 3 exit questions",q:function(){return"<b>What is the ONE job it should help with?</b> Keep it to one clear job."},
  chips:function(){var a=CI.ideas.map(function(x){return x[2]});if(ideaI>=0){a.splice(ideaI,1);a.unshift(CI.ideas[ideaI][2])}return chipsOf(a.slice(0,3),function(t){ans(4,t)})},
  ok:function(v){return v.length>=5?"":"Say a bit more, at least a few words."},show:function(v){return v}},
 {k:"r",lab:"Your own material",ph:"Paste your lessons or tips",q:function(){return"<b>Now the heart of it: your own material.</b> Paste your lessons, tips or resources here, or add a file with the 📎 button. Buyers pay for YOUR know-how, not a generic AI bot. No student names."},
  chips:function(){return matChips()},material:true,show:function(v){return v.length+" characters of your own material"}},
 {k:"wm",lab:"Welcome message",ph:"Type your welcome message",q:function(){return"<b>Last one: the welcome message.</b> This is what people see first when they open your plugin. Here is a starting point:<br><i>"+esc(getv("wm"))+"</i>"},
  chips:function(){return[{t:"✅ Use this welcome",c:"go",f:function(){ans(6,getv("wm"))}},{t:"✏️ I'll write my own",f:function(){say("p","Great. Type your welcome message below, in your own voice (at least 20 characters).");cinp.focus()}}]},
  ok:function(v){return v.length>=20?"":"Make it a little longer, at least 20 characters."},show:function(v){return v}}
];
function matChips(){var has=getv("r").length>0;return[{t:"📎 Add your own file",f:function(){$("bfin").click()}},has?{t:"✅ That's all my material",c:"go",f:function(){ans(5,null)}}:{t:"Skip for now",f:function(){ans(5,null)}}]}
var AK="aiedume_chat_ans_",hasStore=false;
function loadAns(){try{var id=window.BLDX&&BLDX.id&&BLDX.id();if(!id)return;var x=JSON.parse(localStorage.getItem(AK+id)||"null");if(x){hasStore=true;answered=x}}catch(e){}}
function saveAns(){try{var id=window.BLDX&&BLDX.id&&BLDX.id();if(id)localStorage.setItem(AK+id,JSON.stringify(answered))}catch(e){}}
function isDone(i){var k=STEPS[i].k;if(answered[k])return true;if(hasStore)return(k==="n"||k==="h")&&getv(k).length>0;
 if(k==="n"||k==="h")return getv(k).length>0;return !!d0&&(d0[k]!=null)&&(k!=="r"||getv("r").length>0)&&(k!=="wm"||!!d0.wmEdited)}
function firstUndone(){for(var i=0;i<N;i++)if(!isDone(i))return i;return -1}
function stepPrompt(i){cur=i;var S=STEPS[i];prog("p",i+1,N,S.lab);
 say("p",stp("p",i+1,N)+S.q());
 var ch=S.chips();if(i>0)ch=ch.concat([{t:"↩ Back",c:"ghost",f:function(){usr("p","Back");stepPrompt(i-1)}}]);
 setQ("p",ch,S.ph,function(t){onType(i,t)})}
function onType(i,t){var S=STEPS[i];
 if(S.material){usr("p",t);addMat(t);return}
 usr("p",t);
 if(/\?$/.test(t)&&!S.match){say("p",faq(t));return}
 if(S.match){var m=S.match(t);if(!m){say("p","Please tap one of the choices below.");return}t=m}
 var bad=S.ok?S.ok(t):"";if(bad){say("p",esc(bad));return}
 ans(i,t,true)}
function faq(t){var l=t.toLowerCase();if(/price|cost|75|25|split|pay/.test(l))return"You set the price later with Sam (0 = free). When it sells you keep 80% and Fred Noseit keeps 20%. I can't promise sales.";
 if(/own|material|ai|generic/.test(l))return"Buyers come for YOUR know-how, not a generic AI bot. The more of your own lessons, tips and resources you add, the better.";return"Good question. Tap one of the buttons, or just type your answer to this step."}
function addMat(t,fromFile){var cur0=getv("r");var add=String(t).slice(0,6000);setv("r",(cur0?cur0+"\n\n":"")+add);answered.r=true;setTimeout(saveAns,700);var n=getv("r").length;
 say("p","✅ Added"+(fromFile?" <b>"+esc(fromFile)+"</b>":"")+" to your own material ("+n+" characters so far, saved in this browser only). Paste more, add another file, or tap <b>That's all my material</b>.");
 setQ("p",matChips().concat([{t:"↩ Back",c:"ghost",f:function(){usr("p","Back");stepPrompt(4)}}]),STEPS[5].ph,function(x){usr("p",x);addMat(x)})}
function ans(i,v,typed){var S=STEPS[i];setTimeout(saveAns,700);
 if(S.material){answered.r=true;if(!typed&&v!=null)usr("p","That's all");else if(v==null)usr("p",getv("r")?"That's all my material":"Skip for now")}
 else{if(!typed)usr("p",v===""?"Skip, any subject":v);
  if(S.k==="wm"){setv("wm",v);answered.wm=true}else{setv(S.k,v);answered[S.k]=true}}
 var shown=S.k==="r"?S.show(getv("r")):S.show(v);
 if(S.k==="r"&&!getv("r"))shown="none yet (you can add it any time)";
 say("p","Got it ✓ <b>"+esc(S.lab)+":</b> "+esc(shown));
 if(returnTo){var r=returnTo;returnTo=null;say("p","Saved. Back to Sam so we can check it again?");setQ("p",[{t:"✅ Back to Sam",c:"go",f:function(){pick(r)}},{t:"Keep editing",f:function(){pnSummary()}}],"Tap a button");return}
 var nx=firstUndone();if(nx>=0)stepPrompt(nx);else pnSummary()}
function pnSummary(){prog("p",N,N,"All 7 steps done");PROG.p.done=true;drawProg();
 var o=val();say("p","<p><b>🎉 All 7 steps are done.</b> Everything is saved in this browser. Here is your plugin so far:</p><ul class=\"ck\"><li>🏷️ <b>"+esc(o.n)+"</b> · "+esc(o.a)+(o.s?" · "+esc(o.s):"")+"</li><li>🎙️ Tone: "+esc(o.t)+"</li><li>🎯 "+esc(o.h)+"</li><li>📚 Own material: "+((o.r||"").length?(o.r.length+" characters"):"none yet")+"</li><li>👋 "+esc(o.wm)+"</li></ul><p><b>Next:</b> my friend Sam checks every piece, shows how it looks in the Store, and publishes it when you say yes.</p>");
 var ch=[{t:"✅ Send it to Sam",c:"go",f:function(){usr("p","Send it to Sam");pick("c")}}];
 STEPS.forEach(function(S,i){ch.push({t:"✏️ "+esc(S.lab),c:"ghost",f:function(){usr("p","Change: "+S.lab);stepPrompt(i)}})});
 setQ("p",ch,"Tap a button, or type 'change name'",function(t){usr("p",t);var l=t.toLowerCase();
  var i=-1;STEPS.forEach(function(S,j){if(l.indexOf(S.lab.toLowerCase().split(" ")[0])>=0)i=j});
  if(/sam|check|publish|yes/.test(l))pick("c");else if(/change|edit/.test(l)&&i>=0)stepPrompt(i);else say("p","Tap <b>Send it to Sam</b> when you're ready, or tap a ✏️ button to change something.")})}
$("attb").addEventListener("click",function(){$("bfin").click()});
/* Talk button: same behavior as the agent panels - speech becomes the typed answer and submits */
var tlkb=$("tlkb"),tlkRec=null;
tlkb.addEventListener("click",function(){var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){say(act,"🎤 Talking does not work in this browser. Please type your question instead (or try Chrome or Safari).");return}
 if(tlkRec){try{tlkRec.stop()}catch(e){}return}
 var r=new SR();tlkRec=r;r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;tlkb.textContent="👂 Listening… tap to stop";tlkb.classList.add("on");
 r.onresult=function(n){cinp.value=n.results[0][0].transcript;grow();form.requestSubmit?form.requestSubmit():form.dispatchEvent(new Event("submit",{cancelable:true}))};
 r.onerror=function(n){if(n.error==="not-allowed")say(act,"🎤 Please allow the microphone, or type your question.")};
 r.onend=function(){tlkRec=null;tlkb.textContent="🎤 Talk";tlkb.classList.remove("on")};
 try{r.start()}catch(e){r.onend()}});
$("bfin").addEventListener("change",function(e){var fl=e.target.files[0];e.target.value="";if(!fl)return;var fr=new FileReader();
 fr.onload=function(){var t=String(fr.result||"").trim();if(!t){say(act,"That file looks empty. Try a .txt, .md or .csv file.");return}
  if(act!=="p")pick("p");usr("p","📎 "+fl.name);addMat(t,fl.name)};fr.readAsText(fl)});
function pnEnter(){if(pnIntro)return;pnIntro=true;
 say("p","<p><b>Hi, I'm "+AV.p.n+", the plugin builder for "+esc(PN[2])+". Let's build your plugin step by step.</b></p><p>"+esc(C?C.intro:"I'll ask one thing at a time.")+" There are 7 quick steps and you can change any answer.</p>");
 say("p",NOTE2,"w");
 if(d0&&d0.n){say("p","Welcome back! You're working on <b>"+esc(d0.n)+"</b>. Your answers are loaded.")}
 var nx=firstUndone();if(nx>=0)stepPrompt(nx);else pnSummary()}
/* ---- Sam: 4 steps ---- */
function money(p){p=parseFloat(p);return p>0?"$"+p.toFixed(p%1?2:0):"Free"}
var gk={"Ages 4–8":"k5","Ages 9–12":"68","Ages 13–18":"912","Adults 18+":"adult"};
var FRK=/^par/.test(fr)?["par"]:/^para/.test(fr)?["para","stu"]:["teach","par"];
function gname(a){return{"k5":"PreK-5th","68":"6th-8th","912":"9th-12th","adult":"Adult"}[gk[a]]||"All grades"}
function userName(){var u=PX.user();return u&&u.name?u.name:"You (demo)"}
function previewHTML(o){var iap=(o.iap||[]).map(function(a){return'<div class="ia"><span>'+esc(a.n)+'</span><b>$'+a.p+'</b></div>'}).join("");
 return'<div class="pvw"><span class="lab">How it will look in the Store</span><div class="t"><img alt="" src="img/faces/mine.webp"/><div><h4>'+esc(o.n||"Your plugin name")+'</h4><div class="by">by '+esc(userName())+' · ★ New</div></div></div><div>'+esc(o.h||"What it helps with")+'</div><div class="mt"><span class="tg">'+esc(gname(o.a))+'</span>'+(o.s?'<span class="tg">'+esc(o.s)+'</span>':'')+'<span class="get">Get '+(parseFloat(o.p)>0?money(o.p):"free")+'</span></div><div class="wb"><small>Shown when someone opens it</small>'+esc(o.wm||"(no welcome message yet)")+'</div>'+(iap?'<div><small style="color:#ffe08a;font-weight:800">In-plugin purchases · Optional</small>'+iap+'</div>':'')+'</div>'}
var FIXI={n:0,h:4,r:5,wm:6};
var lastSig="",pubd=false,introC=false,awaiting=false;
function hasPrice(o){return o.p!==""&&o.p!=null&&!isNaN(parseFloat(o.p))}
function review(o){var L=[],bad=0;function add(ok,t,fix,soft){L.push('<li>'+(ok?"✅":(soft?"⚠️":"❌"))+' <span>'+t+'</span>'+(ok?"":'<button type="button" class="bt sm" data-fix="'+fix+'">Fix it</button>')+'</li>');if(!ok&&!soft)bad++}
 add(!!(o.n||"").trim(),"Name"+(o.n?": "+esc(o.n):" is missing"),"n");
 add(!!(o.h||"").trim(),"What it helps with"+(o.h?"":" is missing"),"h");
 var rl=(o.r||"").trim().length;add(rl>=60,rl>=60?"Your own material is in ("+rl+" characters). That is the know-how buyers pay for.":"Add more of YOUR own lessons, tips or resources. People buy your know-how, not a generic AI bot.","r",true);
 var wl=(o.wm||"").trim().length;add(wl>=20,wl>=20?"Welcome message is set":"Welcome message is too short","wm");
 var hp=hasPrice(o),p2=parseFloat(o.p)||0;L.push('<li>'+(hp?"✅":"⚠️")+' <span>'+(hp?(p2>0?"Price "+money(p2)+": you keep $"+(p2*.80).toFixed(2)+" (80%), Fred Noseit keeps 20%":"Free (you can change it later)"):"No price yet. I'll ask you next (type 0 for free).")+'</span></li>');
 L.push('<li>➕ <span>'+((o.iap||[]).length?(o.iap.length+" in-plugin purchase"+(o.iap.length>1?"s":"")):"No in-plugin purchases (optional)")+'</span></li>');
 return{html:'<ul class="ck">'+L.join("")+'</ul>',bad:bad}}
function gkEnter(){
 if(!introC){introC=true;say("c","<p><b>I'm Sam, your avatar helper to check it over.</b></p><p>Here is what I'll do next, one step at a time:</p><ol class=\"stl\"><li>Review each piece of your plugin</li><li>Show you how it will look in the Store</li><li>Ask <b>Ready to publish?</b></li><li>Publish it only when you say yes</li></ol><p><small>Demo only. Saved in this browser.</small></p>")}
 if(window.BLDX)BLDX.save();var o=val();var sig=JSON.stringify([o.n,o.a,o.s,o.h,o.r,o.wm,o.p,o.iap,pubd]);
 if(sig===lastSig)return;
 if(!(o.n||o.h||o.r)){lastSig="";prog("c",0,4,"Waiting for your plugin");say("c","I don't see a plugin yet. Tap <b>"+AV.p.n+"</b> and answer a few steps, then come back to me.");setQ("c",[{t:"Go to "+AV.p.n+"",c:"go",f:function(){pick("p")}}],"Tap a button");return}
 lastSig=sig;gReview(o)}
function gReview(o){prog("c",1,4,"Review");var r=review(o);say("c",stp("c",1,4)+"<b>Here is my review of each piece:</b>"+r.html);
 if(r.bad){awaiting=false;say("c","Please fix the ❌ items first. Tap <b>Fix it</b> and I'll take you back to "+AV.p.n+" for just that step.");
  var ch=[];Object.keys(FIXI).forEach(function(k){if(k==="n"&&!(o.n||"").trim()||k==="h"&&!(o.h||"").trim()||k==="wm"&&(o.wm||"").trim().length<20)ch.push({t:"✏️ Fix: "+esc(STEPS[FIXI[k]].lab),c:"go",f:function(){gFix(k)}})});
  setQ("c",ch,"Tap a button");return}
 if(!hasPrice(o)){gPrice();return}
 gPreview(o)}
function gFix(k){returnTo="c";pick("p");usr("p","Fix: "+STEPS[FIXI[k]].lab);stepPrompt(FIXI[k])}
function gPrice(){awaiting=false;say("c","<p><b>One more piece: the price.</b> You choose it. Type a number, or tap one. 0 means free. When it sells you keep 80%.</p>");
 var onP=function(t){var n=parseFloat(String(t).replace(/[^0-9.]/g,""));if(!isFinite(n)||n<0||n>999){say("c","Please type a price from 0 to 999 (0 = free).");return false}return setPrice(n)};
 setQ("c",[{t:"Free",f:function(){usr("c","Free");setPrice(0)}}],"Type a price, or 0 for free",function(t){usr("c",t);gAnyText(t,onP)})}
function setPrice(n){setv("p",String(n));say("c","Got it ✓ <b>Price:</b> "+money(n));lastSig="";var o=val();lastSig=JSON.stringify([o.n,o.a,o.s,o.h,o.r,o.wm,o.p,o.iap,pubd]);gPreview(o);return true}
function gPreview(o){prog("c",2,4,"Store preview");say("c",stp("c",2,4)+"<b>This is exactly how it will look in the Plugin Store:</b>"+previewHTML(o));
 prog("c",3,4,"Ready?");awaiting=true;
 say("c",stp("c",3,4)+"<b>"+(pubd?"Ready to update your published plugin?":"Ready?")+"</b> Nothing goes live until you say yes (demo, saved in this browser).");
 setQ("c",[{t:"✅ Yes, "+(pubd?"update it":"publish it"),c:"y",f:function(){usr("c","Yes");publish()}},{t:"Not yet",f:function(){usr("c","Not yet");noPub()}},{t:"✏️ Back to "+AV.p.n+"",c:"ghost",f:function(){pick("p")}}],"Type yes or no",function(t){gAnyText(t)})}
function publish(){var o=window.BLDX&&BLDX.save("published");if(!o||!o.n){say("c","I can't publish without a name. Tap Fix it first.");return}
 o.gk=gk[o.a]||"k5";o.fr=FRK;PX.save(o);PX.mine();var was=pubd;pubd=true;awaiting=false;lastSig="";
 try{window.mk&&mk()}catch(e){}
 var ob=val();lastSig=JSON.stringify([ob.n,ob.a,ob.s,ob.h,ob.r,ob.wm,ob.p,ob.iap,pubd]);
 prog("c",4,4,"Published ✓");PROG.c.done=true;drawProg();
 say("c",stp("c",4,4)+'<b>🎉 Your plugin '+esc(o.n)+' is now published in the Plugin Store!</b>'+(was?" (updated)":"")+'<br>Its status in My Plugins is now <b>Published</b> (demo, saved in this browser).<br><a class="bt go" href="plugin-checkout.html?id=my-'+o.id+'">🏪 View it in the Store</a><a class="bt" href="my-plugins.html">📁 My Plugins</a><br><b>Last step:</b> tell people about it — Joy promotes it for you.<a class="bt go" href="joy-promoter.html?plugin='+o.id+'">📣 Promote it with Joy</a>');
 setQ("c",[{t:"📣 Send it out with Joy",c:"go",f:function(){pick("m")}},{t:"✏️ Keep editing with "+AV.p.n+"",f:function(){pick("p")}}],"Type here");
 var s=$("savd");if(s)s.textContent="Published (demo) ✓"}
function noPub(){awaiting=false;say("c","No problem. Tap <b>"+AV.p.n+"</b> to keep editing. I'm here when you're ready.");setQ("c",[{t:"✏️ Back to "+AV.p.n+"",c:"go",f:function(){pick("p")}},{t:"Ready now, publish",c:"y",f:function(){usr("c","Ready now");gkEnter2()}}],"Type here",function(t){gAnyText(t)})}
function gkEnter2(){lastSig="";gkEnter()}
function gAnyText(t,onP){var l=String(t).toLowerCase();
 if(onP&&/^\s*\$?\d/.test(l)){onP(t);return}
 if(/^(y|yes|yep|yeah|sure|ok|okay|publish|do it)\b/.test(l)){if(awaiting)publish();else say("c","I haven't finished a review yet, or there is something to fix first.")}
 else if(/^(n|no|nope|not yet|wait|later)\b/.test(l))noPub();
 else if(/price|cost|75|25|split/.test(l))say("c","You set the price (0 = free). When it sells you keep 80% and Fred Noseit keeps 20%. I can't promise sales.");
 else if(/own|material|ai|generic/.test(l))say("c","Buyers come for YOUR know-how, not a generic AI bot. The more of your own lessons, tips and resources you add, the better.");
 else say("c","I can review your plugin, show the Store preview and publish it when you say yes. Say <b>yes</b> or <b>no</b>, or ask about price or your own material.")}
lc.addEventListener("click",function(e){var b=e.target.closest("button[data-fix]");if(b)gFix(b.dataset.fix)});
/* ---- Joy: 4 steps ---- */
var MK="aiedume_demo_marketing",on={},introM=false,CN={store:"🏪 Plugin Store spotlight",social:"📱 Social media",li:"💼 LinkedIn",other:"🌐 Another site or group"};
function subbed(){try{return!!JSON.parse(localStorage.getItem(MK)||"null")}catch(e){return false}}
function bzEnter(){if(introM)return;introM=true;
 say("m","<p><b>Hi, I'm Joy, your promoter.</b> Once your plugin is published, I can promote it in the Plugin Store for $10/month.</p><p>Here is what I'll do, one step at a time:</p><ol class=\"stl\"><li>Start the $10/month Promotion (demo)</li><li>Pick where to promote it</li><li>Draft your promo posts</li><li>Walk you through posting them</li></ol><p><small>Demo only: nothing is connected or posted, nothing is charged, and I can't promise sales or income.</small></p>");
 if(subbed())bzWhere();else bzStart()}
function bzStart(){prog("m",1,4,"Start the demo");say("m",stp("m",1,4)+"<b>Store Promotion: $10/month</b>. This is a demo checkout, nothing is charged.");
 setQ("m",[{t:"Start $10/month (demo)",c:"y",f:function(){usr("m","Start $10/month (demo)");bzSub()}},{href:"promote-your-plugin.html",t:"See the full page"}],"Ask me about sharing",bzText)}
function bzSub(){try{localStorage.setItem(MK,JSON.stringify({paid:true,demo:true,item:"marketing-helper",amount:10,plan:"monthly",ts:Date.now()}))}catch(x){}say("m","Started ✓ (demo). $10/month.");bzWhere()}
function bzWhere(){prog("m",2,4,"Pick where");say("m",stp("m",2,4)+"<b>Where should I send it?</b> Tap each place you want (demo). In the real version you sign in there and decide what I can do. You can remove access any time.");bzChips()}
function bzChips(){var ch=Object.keys(CN).map(function(k){return{t:(on[k]?"✅ ":"")+CN[k],c:on[k]?"on":"",f:function(){on[k]=!on[k];if(on[k])say("m","Connected "+esc(CN[k].replace(/^\S+ /,""))+" (demo). Nothing is really connected.");bzChips()}}});
 ch.push({t:"✍️ Next: draft my posts",c:"go",f:function(){bzDraft()}});setQ("m",ch,"Ask me about sharing",bzText)}
function bzDraft(){var ks=Object.keys(on).filter(function(k){return on[k]});if(!ks.length){usr("m","Draft my posts");say("m","Tap a place first, then I'll draft a post for it.");return}
 usr("m","Draft my posts");prog("m",3,4,"Draft posts");var o=val(),N2=esc(o.n||"my plugin"),S2=esc(o.s||"my class"),pn=BLDX&&BLDX.get()&&BLDX.get().status==="published";
 say("m",stp("m",3,4)+"<b>Here are your drafts:</b>");
 ks.forEach(function(k){var t={store:"Featured in the Plugin Store: <b>"+N2+"</b>, a helper for "+S2+" built from a real teacher's own routine. Try it free.",social:"New: <b>"+N2+"</b>, a quick helper for "+S2+", built from my own routine. Try it and tell me what you think!",li:"I built <b>"+N2+"</b> from what I do in my work with "+S2+". Here is how it can save you time. I'd love your feedback.",other:"Sharing <b>"+N2+"</b> with this group. It's a helper for "+S2+" made from my own tips. Happy to answer questions."}[k];say("m","<p><b>"+esc(CN[k].replace(/^\S+ /,""))+" draft:</b></p><p>"+t+"</p><small>Demo only. Nothing was posted. You review and approve each post.</small>")});
 if(!pn)say("m","Tip: publish it first with Sam so your post can link to your Store page.");
 setQ("m",[{t:"➡️ Show me how to share it",c:"go",f:function(){bzHow()}},{t:"Change places",f:function(){bzWhere()}}].concat(pn?[]:[{t:"🔍 Publish first with Sam",c:"y",f:function(){pick("c")}}]),"Ask me about sharing",bzText)}
function bzHow(){usr("m","Show me how to share it");prog("m",4,4,"Share it");PROG.m.done=true;drawProg();
 say("m",stp("m",4,4)+"<b>Here is how to share it, step by step:</b><ol class=\"stl\"><li>Copy the draft you like.</li><li>Open that app or site yourself. You stay in charge.</li><li>Paste it and add your Store link.</li><li>Read it over, then post it when you are happy.</li><li>Reply to people who try it. No promises about sales.</li></ol>");
 setQ("m",[{t:"✏️ Back to "+AV.p.n+"",f:function(){pick("p")}},{t:"✍️ Draft again",f:function(){bzWhere()}}],"Ask me about sharing",bzText)}
function bzText(t){usr("m",t);var l=t.toLowerCase();
 if(/linkedin/.test(l)){on.li=true;say("m","Connected LinkedIn (demo). Tap <b>Next: draft my posts</b> when ready.")}
 else if(/draft|post|share|write/.test(l))say("m","Tap <b>Next: draft my posts</b> after you pick a place. Nothing is ever posted in this demo.");
 else if(/price|cost|month|cancel/.test(l))say("m","Store Promotion is $10/month. Demo only, nothing is charged. I can't promise sales or income.");
 else say("m","I can help send your plugin to social media, LinkedIn, or anywhere you connect. Try: <b>draft a post</b>.")}
/* submit never publishes directly */
f.removeAttribute("onsubmit");f.addEventListener("submit",function(e){e.preventDefault()});
function go0(){d0=window.BLDX&&BLDX.get();loadAns();pick("p")}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go0);else go0();
/* in-card cast videos + full-width chat (2026-10-29, Greg's builderv2 design: "delete that tv screen - when they do the play button u can have the avatar box where they sit talk" and "for the chatbox make it bigger to take away that right black space"): the side screen beside the conversation is gone, the chat takes the whole width, and each cast member's intro video played in that member's own card (superseded 2026-11-02, Greg: videos play IN THE CHATBOX - see cvPlay below) */
var cvSt=document.createElement("style");cvSt.id="bcv-css";
cvSt.textContent="@media(min-width:900px) and (min-height:540px){.bchat .clog{flex:1 1 auto;min-width:0}.bchat .clog .m{max-width:min(97%,1150px)}}.clog .m.cvstage{max-width:min(97%,640px)}.clog .m.cvstage video.cvvid{display:block;width:100%;height:auto;max-height:52vh;object-fit:contain;background:#000;border-radius:12px}.clog .m.cvstage img.cvpic{display:block;width:100%;height:auto;max-height:52vh;object-fit:contain;background:#000;border-radius:12px}.clog .m.cvstage audio.cvaud{display:block;width:100%;margin-top:8px}.cin .tlk{height:auto;min-height:96px;align-self:stretch;padding:0 16px;border-radius:14px;border:2px solid #3d5a80;background:#16223a;color:#e8eefc;font:800 .95rem Inter,sans-serif;cursor:pointer;flex:none}.cin .tlk.on{background:#2dd4bf;color:#062a26;border-color:#2dd4bf}@media(max-width:899px){.cin .tlk{padding:0 10px;font-size:.85rem}}";
document.head.appendChild(cvSt);
var cvVid=null;
function cvStop(){if(cvVid){try{cvVid.pause()}catch(e){}var w=cvVid.closest?cvVid.closest(".cvstage"):null;if(w)w.remove();cvVid=null}}
function cvWords(k,a){try{fetch(a.vid+".vtt").then(function(r){return r.ok?r.text():""}).then(function(txt){if(!txt)return;var ls=String(txt).split(/\r?\n/),out=[];for(var i=0;i<ls.length;i++){var L9=ls[i].trim();if(!L9||/^WEBVTT/i.test(L9)||/-->/.test(L9)||/^\d+$/.test(L9))continue;out.push(L9)}var w=out.join(" ").replace(/\s+/g," ").trim();if(w)say(k,"<p>"+esc(w)+"</p>")}).catch(function(){})}catch(e){}}
function cvPlay(k){var a=AV[k];if(!a||!a.vid)return;cvStop();
 var log=LOG[k];if(!log)return;
 var wrap=mkEl("div","m cvstage");
 var pic=mkEl("img","cvpic");pic.src=a.img;pic.alt="";
 var v=mkEl("audio","cvaud");v.setAttribute("controls","");v.setAttribute("preload","auto");
 v.src=a.vid+".m4a";
 wrap.appendChild(pic);wrap.appendChild(v);log.appendChild(wrap);log.scrollTop=log.scrollHeight;
 cvVid=v;cvWords(k,a);
 v.addEventListener("error",function(){if(cvVid!==v)return;if(/\.m4a$/.test(v.src)){v.src=a.vid+".mp4";var pp=v.play();if(pp&&pp.catch)pp.catch(function(){})}else cvStop()});
 var p=v.play();if(p&&p.catch)p.catch(function(){})}
/* ---- Release / Delete bar (2026-10-30, Greg's order): persistent controls in the builder chat box for the draft being built. Release runs the EXISTING path: it hands the draft to Sam the Checker (gkEnter review -> store preview -> publish()). Delete uses PX.del, the same deletion My Plugins uses. ---- */
if(!document.getElementById("rdcss")){var rdst=document.createElement("style");rdst.id="rdcss";rdst.textContent=".rdbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:9px 12px;border-top:2px solid #263553;background:#0d1730;flex:none}.rdbar[hidden]{display:none}.rdlab{font:700 .92rem Inter,system-ui,sans-serif;color:#cfe0ff}.rdlab b{color:#fff}.rdpub{font:800 .78rem Inter,system-ui,sans-serif;color:#062a26;background:#7ef0c5;border-radius:999px;padding:3px 10px}.rdsp{flex:1}.rdbtn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:6px 16px;border-radius:999px;border:2px solid #2dd4bf;background:#2dd4bf;color:#062a26;font:800 .92rem Inter,system-ui,sans-serif;cursor:pointer}.rdbtn.danger{background:transparent;border-color:#f87171;color:#fca5a5}.rdbtn.ghosty{background:transparent;border-color:#3d5a80;color:#c8d6f5}.rdconf{display:flex;flex-wrap:wrap;gap:8px;align-items:center;width:100%;font:700 .92rem Inter,system-ui,sans-serif;color:#fecaca}.rdconf[hidden]{display:none}.rddone{width:100%;font:700 .92rem Inter,system-ui,sans-serif;color:#7ef0c5}.rddone[hidden]{display:none}";document.head.appendChild(rdst)}
var rdbar=mkEl("div","rdbar");rdbar.id="rdbar";rdbar.hidden=true;rdbar.setAttribute("aria-label","Your plugin draft controls");
rdbar.innerHTML='<span class="rdlab">🧩 Your draft: <b id="rdname"></b></span><span class="rdpub" id="rdpub" hidden>✓ Published</span><span class="rdsp"></span><button type="button" class="rdbtn" id="rdrel">🚀 Release to the store</button><button type="button" class="rdbtn danger" id="rddel">🗑️ Delete it</button><div class="rdconf" id="rdconf" hidden><span id="rdconfmsg"></span><button type="button" class="rdbtn danger" id="rddelyes">Yes, delete it</button><button type="button" class="rdbtn ghosty" id="rddelno">Keep it</button></div><div class="rddone" id="rddone" hidden></div>';
form.parentNode.insertBefore(rdbar,form.nextSibling);
var rdKey=null,rdGone=false;
function rdDraft(){if(rdGone||!window.BLDX)return null;var d=null;try{d=BLDX.get()}catch(e){}if(!d){var id=null;try{id=BLDX.id()}catch(e){}if(id&&window.PX){try{d=PX.get(id)}catch(e){}}}if(d&&!(d.n||d.h||d.r))d=null;return d}
function rdConf(on){$("rdconf").hidden=!on;$("rdrel").hidden=on;$("rddel").hidden=on;if(on){var d=rdDraft();$("rdconfmsg").textContent="Delete \u201C"+((d&&d.n)||"your plugin")+"\u201D for good? It is removed from this browser."}}
function rdRefresh(){if(rdGone)return;var d=rdDraft();if(!d){rdbar.hidden=true;rdKey=null;return}var key=d.id+"|"+(d.status||"");if(key!==rdKey){rdKey=key;rdConf(false)}rdbar.hidden=false;$("rdname").textContent=d.n||"Untitled plugin";var pub=d.status==="published";$("rdpub").hidden=!pub;$("rdrel").textContent=pub?"🔄 Release update to the store":"🚀 Release to the store"}
$("rdrel").addEventListener("click",function(){var d=rdDraft();if(!d)return;usr(act,$("rdrel").textContent);lastSig="";if(act!=="c")pick("c");else gkEnter()});
$("rddel").addEventListener("click",function(){if(rdDraft())rdConf(true)});
$("rddelno").addEventListener("click",function(){rdConf(false)});
$("rddelyes").addEventListener("click",function(){var d=rdDraft();if(!d){rdConf(false);return}var id=d.id,nm=d.n||"Untitled plugin";try{PX.del(id)}catch(e){}rdGone=true;say(act,"🗑️ <b>"+esc(nm)+"</b> was deleted. It is gone from My Plugins and from this browser.");$("rdconf").hidden=true;$("rdrel").hidden=true;$("rddel").hidden=true;$("rdpub").hidden=true;var dn=$("rddone");dn.hidden=false;dn.textContent="🗑️ \u201C"+nm+"\u201D deleted. This page will refresh to start fresh.";setTimeout(function(){var qs=new URLSearchParams(location.search);qs.delete("draft");var s=qs.toString();location.replace("plugin-builder.html"+(s?"?"+s:""))},2200)});
rdRefresh();setInterval(rdRefresh,700);
})();

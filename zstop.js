/* Stop button for every chat: Send turns into "■ Stop" while a reply is generating, typing or speaking. */
(function(){
if(window.ZSTOP)return;
var reqs=[],stopped=[],typers=[],SEL=".zsend,.snd,#gform button[type=submit]";
var Z=window.ZSTOP={typers:typers,
 reg:function(c){reqs.push(c)},
 end:function(c){var i=reqs.indexOf(c);if(i>-1)reqs.splice(i,1)},
 was:function(c){return stopped.indexOf(c)>-1},
 talking:function(){try{if(window.ZA&&ZA.talking&&ZA.talking())return true;return !!(window.speechSynthesis&&speechSynthesis.speaking)}catch(e){return false}},
 busy:function(){return reqs.length>0||typers.length>0||Z.talking()},
 stop:function(){
  reqs.slice().forEach(function(c){stopped.push(c);try{c.abort()}catch(e){}});
  typers.slice().forEach(function(f){try{f()}catch(e){}});typers.length=0;
  try{window.ZA&&ZA.hush&&ZA.hush()}catch(e){}try{speechSynthesis.cancel()}catch(e){}
  setTimeout(upd,60)},
 type:function(el,html,done){
  var d=document.createElement("div");d.innerHTML=html;
  if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches){el.innerHTML=html;done&&done();return}
  var w=document.createTreeWalker(d,NodeFilter.SHOW_TEXT),L=[],n,tot=0;
  while(n=w.nextNode()){if(!n.nodeValue.trim())continue;var skip=!!(n.parentElement&&n.parentElement.closest("a,button,summary,pre"));var t=skip?[n.nodeValue]:(n.nodeValue.match(/\S+\s*|\s+/g)||[]);L.push({n:n,t:t,i:0});tot+=t.length;n.nodeValue=""}
  d.querySelectorAll("*").forEach(function(x){x.style.visibility="hidden"});
  el.innerHTML="";while(d.firstChild)el.appendChild(d.firstChild);
  var per=Math.max(1,Math.ceil(tot/90)),k=0,iv=setInterval(function(){
   for(var c=per;c>0&&k<L.length;){var m=L[k];if(m.i==0)for(var p=m.n.parentElement;p&&p!==el;p=p.parentElement)p.style.visibility="";m.i++;m.n.nodeValue=m.t.slice(0,m.i).join("");c--;if(m.i>=m.t.length)k++}
   var lg=el.parentElement;if(lg)lg.scrollTop=lg.scrollHeight;
   if(k>=L.length)fin()},30);
  function fin(){clearInterval(iv);var i=typers.indexOf(fin);if(i>-1)typers.splice(i,1);el.querySelectorAll("*").forEach(function(x){x.style.visibility=""});done&&done()}
  typers.push(fin)}
};
var st=document.createElement("style");
st.textContent=".zstopbtn{background:#ef4444!important;color:#fff!important;border-color:#ef4444!important}.zstopbtn:hover{background:#dc2626!important}";
(document.head||document.documentElement).appendChild(st);
var was=false;
function upd(){var b=Z.busy();
 document.querySelectorAll(SEL).forEach(function(x){
  if(b){if(!x.classList.contains("zstopbtn")){x.__zl=x.innerHTML;x.innerHTML="\u25A0 Stop";x.classList.add("zstopbtn");x.setAttribute("aria-label","Stop the reply")}}
  else if(x.classList.contains("zstopbtn")){x.innerHTML=x.__zl||"Send";x.classList.remove("zstopbtn");x.removeAttribute("aria-label")}});
 was=b}
document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest(SEL);if(t&&t.classList.contains("zstopbtn")){e.preventDefault();e.stopImmediatePropagation();Z.stop()}},true);
document.addEventListener("submit",function(e){if(e.submitter&&e.submitter.classList&&e.submitter.classList.contains("zstopbtn")){e.preventDefault();e.stopImmediatePropagation()}},true);
setInterval(upd,150);
})();

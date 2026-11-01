/* Plugin Builder helper pill in the section header. Links to plugin-builder.html tailored to this page. Demo only. */
(function(){
var z=document.getElementById("zpage"),h=document.querySelector("header.slimh");if(!z||!h||h.querySelector(".spb"))return;
var k;try{k=JSON.parse(z.textContent).k}catch(e){return}
var M={k5:"for=teachers&grade=k5",g68:"for=teachers&grade=68",g912:"for=teachers&grade=912",par:"for=parents",para:"for=paras",tsupport:"for=teacher-support",adult:"for=adults&grade=adult",teach:"for=teachers"};
var N={k5:"PreK-5th teachers",g68:"6th-8th teachers",g912:"9th-12th teachers",par:"parents",para:"paras and student teachers",tsupport:"teachers building their careers",adult:"teachers of adults",teach:"teachers"};
if(!M[k])return;
var P={k5:["Tim","media/fred-k5-v17.webp"],g68:["Rebecca","media/fred-68-v17.webp"],g912:["Ben","media/fred-912-v19.webp"],par:["Fred","media/fred-v81.webp"],adult:["Fred","media/fred-v81.webp"]}[k]||["Fred","media/fred-v81.webp"];
var href="plugin-builder.html?"+M[k];
var a=document.createElement("a");a.className="spb";a.href=href;
var say="Hi, I'm "+P[0]+", and I'm here to help you build your plugin for "+N[k]+". Build it from your own material: people come here for YOUR know-how, not a generic AI bot.";
a.title=say;a.setAttribute("aria-label","Plugin Builder helper. "+say);
a.innerHTML='<img alt="" src="'+P[1]+'" width="36" height="36"/><span>Plugin Builder</span>';
var s=document.createElement("style");
s.textContent="html body header.slimh a.spb{display:inline-flex;align-items:center;gap:6px;flex:none;min-height:44px;padding:3px 12px 3px 4px;border-radius:999px;background:#16223a;border:1px solid #2dd4bf;color:#e8eefc;font:800 .82rem Inter,sans-serif;text-decoration:none;white-space:nowrap}html body header.slimh a.spb img{width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid #2dd4bf}@media(max-width:700px){html body header.slimh a.spb{padding:3px;gap:0}html body header.slimh a.spb span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}html body header.slimh a.spb img{width:38px;height:38px}}@media(max-width:1100px) and (min-width:701px){html body header.slimh a.spb span{display:none}html body header.slimh a.spb{padding:3px}}html body header.slimh a.spb img[src*='fred-v81']{border-radius:8px;object-fit:contain;background:#16222f}";
document.head.appendChild(s);
/* section-page build links carry the same parameters so the builder helper matches this page's guide */
document.querySelectorAll('a[href^="signup.html?next=plugin-builder.html"],a[href="plugin-builder.html"]').forEach(function(l){var h0=l.getAttribute("href");l.setAttribute("href",h0.indexOf("signup.html")===0?"signup.html?next="+encodeURIComponent(href):href)});
/* top-bar pill removed: the Build a Plugin tile in the helper row is the entry */
})();

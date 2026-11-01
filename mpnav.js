/* My Plugins: "Update your plugin" under the avatar opens the Update page with the picked plugin (?id=<id>).
   Browser only. If nothing is saved yet it opens the Update page, which picks the first plugin. */
(function(){
"use strict";
var a=document.getElementById("btn-myupdate"),note=document.getElementById("avnote");
if(!a||!window.PX)return;
function sync(){
 var list=PX.list(),sel=document.querySelector("#ocpick .prow.sel"),i=sel?+sel.getAttribute("data-i"):-1,d=null;
 if(i>=0&&i<list.length)d=list[i];else if(list.length)d=list[0];
 a.href=d?"update-plugin.html?id="+encodeURIComponent(d.id):"update-plugin.html";
 if(note){note.hidden=!d;if(d)note.textContent=(d.n||"Untitled plugin")}
}
var pick=document.getElementById("ocpick");
if(pick){
 pick.addEventListener("click",function(){setTimeout(sync,60)});
 if(window.MutationObserver)new MutationObserver(sync).observe(pick,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
}
a.addEventListener("click",sync);
sync();
})();

/* DISABLED 2026-10-30 — Greg's order: no sign-in gate, no blocking anywhere; when he shares the link the site is public. The script tags were removed from plugin-builder.html and build-plugin.html, so no page loads this file anymore. Kept on disk unused. */
/* AIEDUME sign-in gate (demo) — Greg's rule: the sign-in belongs at the plugins.
   Nobody opens the build-a-plugin pages without a free account first.
   Loaded ONLY by plugin-builder.html and build-plugin.html.
   The store and buy-side pages are NOT gated.
   Account = the demo account from signup.html (localStorage aiedume_demo_account).
   Target after sign-in = localStorage aiedume_next (set here, read by signup.html). */
(function () {
  var KEY = "aiedume_demo_account", NEXT = "aiedume_next", OWNER = "aiedume_owner";
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function hasAccount() {
    var raw = lsGet(KEY);
    if (!raw) return false;
    try { var a = JSON.parse(raw); return !!(a && (a.email || a.name)); }
    catch (e) { return false; }
  }
  function pageName() {
    var p = (location.pathname || "").split("/").pop() || "";
    if (p === "build-plugin.html" || p === "plugin-builder.html") return p;
    return "plugin-builder.html";
  }
  function showGate() {
    lsSet(NEXT, pageName());
    function build() {
      if (document.getElementById("gatebox")) return;
      var st = document.createElement("style");
      st.id = "gatecss";
      st.textContent =
        "body>*:not(.tnav):not(.tabbar):not(#gatebox){display:none!important}" +
        "#gatebox{display:block;padding:18px 14px 30px}" +
        ".gatecard{max-width:560px;margin:26px auto;padding:24px 20px;border-radius:20px;background:#101a30;border:1px solid #263553;box-shadow:0 10px 40px rgba(0,0,0,.35);text-align:center;color:#e8eefc}" +
        ".gatecard h1{margin:0 0 10px;font:800 1.45rem/1.2 Poppins,Inter,system-ui,sans-serif}" +
        ".gatecard p{margin:8px 0;color:#cfe0ff}" +
        ".gatego{display:inline-flex;align-items:center;justify-content:center;min-height:56px;padding:6px 30px;border-radius:16px;background:linear-gradient(180deg,#34e0cc,#1fbfab);color:#05302a;font-weight:800;font-size:1.25rem;text-decoration:none;box-shadow:0 5px 16px rgba(45,212,191,.25)}" +
        ".gatesm{font-size:.95rem;color:#9fb0d3!important}" +
        ".gatesm a{color:#5eead4;font-weight:800}";
      document.head.appendChild(st);
      var box = document.createElement("main");
      box.id = "gatebox";
      box.setAttribute("aria-label", "Free account needed to build a plugin");
      box.innerHTML =
        '<div class="gatecard">' +
        "<h1>\uD83D\uDD12 You need a free account to build a plugin.</h1>" +
        "<p>Building a plugin is free. Make your free account once, then come right back here and build.</p>" +
        '<p><a class="gatego" href="signup.html">Make my free account</a></p>' +
        '<p class="gatesm">Already have one? <a href="signup.html?signin=1">Log in</a></p>' +
        '<p class="gatesm">Just looking around? The <a href="plugin-market.html">Plugin Store</a> is open to everyone.</p>' +
        '<p class="gatesm">Site owner? <a href="#" id="gateown">Tap here for full access</a></p>' +
        "</div>";
      var nav = document.querySelector(".tnav");
      if (nav && nav.parentNode) nav.parentNode.insertBefore(box, nav.nextSibling);
      else if (document.body) document.body.insertBefore(box, document.body.firstChild);
      var ow = document.getElementById("gateown");
      if (ow && ow.addEventListener) ow.addEventListener("click", function (e) { if (e && e.preventDefault) e.preventDefault(); lsSet(OWNER, "1"); lsDel(NEXT); location.reload(); });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
    else build();
  }
  try { if (/[?&]owner=greg(&|$)/.test(location.search || "")) lsSet(OWNER, "1"); } catch (e) {}
  if (lsGet(OWNER) === "1") { lsDel(NEXT); return; }
  if (hasAccount()) { lsDel(NEXT); return; }
  showGate();
})();

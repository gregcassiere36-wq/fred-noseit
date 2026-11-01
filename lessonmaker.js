/* Lesson Maker (added 2026-11-01, Greg's order: "for everyone, now").
   Inside every helper chat: one button — "Make a PowerPoint or PDF from my lesson."
   The teacher pastes (or uploads a .txt/.md file with) their lesson, answers up to
   3 short gap questions, and gets a REAL .pptx download (PptxGenJS, vendored in
   vendor/pptxgen.bundle.js, MIT) or a clean print view to save as PDF.
   Everything runs in the browser. Nothing is uploaded anywhere.
   Self-contained: own styles (lm- classes), own flow state per chat surface.
   Surfaces found on this site: zippy #zbox (helpers, sections, bot pages, plugins),
   onechat #occhat (My Plugins), Joy page chat (#log/#ask).
   NOT the home #pin Fred panel (Greg, 2026-11-01): the Lesson Maker is a feature
   of the avatar/helper chats only, not Fred's home chat. */
;(function () {
  "use strict";
  if (window.__lessonMaker) return;
  window.__lessonMaker = true;

  var BASE = "";
  try {
    var cs = document.currentScript;
    if (cs && cs.src) BASE = cs.src.replace(/[^\/]*(\?.*)?$/, "");
  } catch (e) {}

  /* ---------- styles ---------- */
  var css = [
    ".lm-bar{display:flex;padding:8px 10px}",
    ".lm-open{flex:1;min-height:52px;border-radius:14px;border:2px solid #2dd4bf;background:#12303b;color:#eafffb;font-size:1.08rem;font-weight:700;cursor:pointer;padding:10px 12px;line-height:1.35}",
    ".lm-open:hover{background:#17424f}",
    ".lm-flow{margin:10px 0;padding:4px 2px}",
    ".lm-msg{background:#101a30;border:1px solid #22345a;color:#e8eefc;border-radius:14px;padding:12px 14px;margin:8px 0;font-size:1.06rem;line-height:1.6}",
    ".lm-msg b{color:#7ef0dd}",
    ".lm-warn{border-color:#8a6d1f;background:#221d0d}",
    ".lm-ta{width:100%;box-sizing:border-box;min-height:130px;border-radius:12px;border:1px solid #2dd4bf;background:#0b1220;color:#e8eefc;font:inherit;font-size:1.02rem;line-height:1.55;padding:10px 12px;margin:6px 0}",
    ".lm-row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;align-items:center}",
    ".lm-btn{min-height:52px;border-radius:14px;border:2px solid #2dd4bf;background:#12303b;color:#eafffb;font-size:1.08rem;font-weight:700;cursor:pointer;padding:10px 16px;line-height:1.3}",
    ".lm-btn:hover{background:#17424f}",
    ".lm-btn.big{flex:1;font-size:1.15rem;min-height:60px}",
    ".lm-file{min-height:52px;border-radius:14px;border:1px dashed #2dd4bf;color:#c7d5f5;font-size:1.02rem;cursor:pointer;padding:12px 14px;display:inline-flex;align-items:center}",
    ".lm-file input{display:none}",
    ".lm-in{flex:1;min-width:140px;min-height:52px;border-radius:12px;border:1px solid #2dd4bf;background:#0b1220;color:#e8eefc;font:inherit;font-size:1.05rem;padding:10px 12px}",
    ".lm-small{font-size:.98rem;color:#c7d5f5;line-height:1.5}"
  ].join("\n");
  var st = document.createElement("style");
  st.id = "lm-css";
  st.textContent = css;
  document.head.appendChild(st);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }
  function copyText(txt, btn) {
    function done() {
      var old = btn.textContent;
      btn.textContent = "Copied! \u2713";
      setTimeout(function () { btn.textContent = old; }, 1600);
    }
    function fb() {
      var ta = document.createElement("textarea");
      ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { if (document.execCommand("copy")) done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fb);
    else fb();
  }

  /* ---------- lesson parsing: the teacher's own words, lightly structured ---------- */
  function parseLesson(text) {
    var lines = String(text || "").split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
    var out = { topic: "", grade: "", aim: "", keys: [], teach: [], practice: "" };
    var used = {};
    var gm = String(text || "").match(/\b(pre[-\s]?k|kindergarten|grade\s*\d{1,2}|\d{1,2}(?:st|nd|rd|th)\s*grade|k\s*-\s*\d{1,2}|\d{1,2}\s*-\s*\d{1,2})\b/i);
    if (gm) out.grade = gm[0].replace(/\s+/g, " ").replace(/^grade/i, "Grade");
    lines.forEach(function (ln, i) {
      var low = ln.toLowerCase();
      if (/^(pre[-\s]?k|kindergarten|grade\s*\d{1,2}|\d{1,2}(?:st|nd|rd|th)\s*grade|k\s*-\s*\d{1,2}|\d{1,2}\s*-\s*\d{1,2})\s*(class)?\s*$/i.test(ln)) used[i] = 1;
      if (!out.aim && /(^(aim|objective|goal|learning target|i can|swbat)\b|students will)/.test(low)) {
        out.aim = ln.replace(/^(aim|objective|goal|learning target|swbat)\s*[:\-\u2013]?\s*/i, "");
        used[i] = 1;
      } else if (!out.keys.length && /(vocabulary|key words|word bank|key terms)/.test(low)) {
        var rest = ln.replace(/^.*?(vocabulary|key words|word bank|key terms)\s*[:\-\u2013]?\s*/i, "");
        if (rest && rest.toLowerCase() !== low) out.keys = rest.split(/[,;\u2022\u00b7]/).map(function (s) { return s.trim(); }).filter(Boolean);
        else if (lines[i + 1]) { out.keys = lines[i + 1].split(/[,;\u2022\u00b7]/).map(function (s) { return s.trim(); }).filter(Boolean); used[i + 1] = 1; }
        used[i] = 1;
      }
    });
    for (var i = 0; i < lines.length; i++) {
      if (!used[i] && lines[i].length <= 80) { out.topic = lines[i]; used[i] = 1; break; }
    }
    if (!out.topic && lines.length) {
      for (var j = 0; j < lines.length; j++) { if (!used[j]) { out.topic = lines[j].slice(0, 80); used[j] = 1; break; } }
    }
    var mode = "teach";
    lines.forEach(function (ln, i) {
      if (used[i]) return;
      var low = ln.toLowerCase();
      if (/^(practice|try it|activity|group work|independent work|your turn|partner work)/.test(low)) {
        mode = "practice";
        var r = ln.replace(/^(practice|try it|activity|group work|independent work|your turn|partner work)\s*[:\-\u2013]?\s*/i, "");
        if (r && r.toLowerCase() !== low) out.practice = (out.practice ? out.practice + " " : "") + r;
        return;
      }
      if (/^(exit ticket|closing|wrap[-\s]?up|assessment|check for understanding)/.test(low)) { mode = "exit"; return; }
      if (mode === "practice") out.practice = (out.practice ? out.practice + " " : "") + ln;
      else if (mode === "teach") out.teach.push(ln);
    });
    return out;
  }

  function chunkWords(paras, max) {
    var chunks = [], cur = "";
    paras.forEach(function (p) {
      if (!cur) { cur = p; return; }
      if ((cur + " " + p).split(/\s+/).length <= max) cur += " " + p;
      else { chunks.push(cur); cur = p; }
    });
    if (cur) chunks.push(cur);
    var out = [];
    chunks.forEach(function (c) {
      var words = c.split(/\s+/);
      while (words.length > max * 1.6) { out.push(words.splice(0, max).join(" ")); }
      out.push(words.join(" "));
    });
    return out.filter(Boolean);
  }

  function buildSlides(L) {
    var slides = [];
    slides.push({ kind: "title", title: L.topic || "My Lesson", sub: (L.grade ? L.grade + " \u2022 " : "") + "Lesson" });
    var aim = L.aim || ("Today we will learn about " + (L.topic || "our topic") + ".");
    slides.push({ kind: "aim", title: "Aim", body: aim });
    if (L.keys && L.keys.length) slides.push({ kind: "keys", title: "Key Words", items: L.keys });
    var chunks = chunkWords(L.teach, 70);
    if (!chunks.length) chunks = [aim];
    chunks.forEach(function (c, i) {
      slides.push({ kind: "teach", title: i === 0 ? "Teach" : "Teach (more)", body: c });
    });
    slides.push({ kind: "practice", title: "Try It", body: L.practice || ("Work with a partner. Talk about " + (L.topic || "the lesson") + ". Then try it on your own.") });
    var core = aim.replace(/^students will (be able to\s*)?/i, "").replace(/^(learn|be able to)\s+/i, "").replace(/\.$/, "");
    slides.push({ kind: "exit", title: "Exit Ticket", items: [
      "Write one thing you learned today.",
      "Finish this sentence: I can " + core.charAt(0).toLowerCase() + core.slice(1) + ".",
      "One question I still have: ____________"
    ] });
    return slides;
  }

  /* ---------- PowerPoint (real .pptx, PptxGenJS vendored locally) ---------- */
  var pptxLoading = null;
  function loadPptx() {
    if (window.PptxGenJS) return Promise.resolve();
    if (pptxLoading) return pptxLoading;
    pptxLoading = new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = BASE + "vendor/pptxgen.bundle.js";
      s.onload = function () { window.PptxGenJS ? res() : rej(new Error("no PptxGenJS")); };
      s.onerror = function () { rej(new Error("load failed")); };
      document.head.appendChild(s);
    });
    return pptxLoading;
  }
  function sentences(text) {
    var parts = String(text).split(/(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
    return parts.length ? parts : [String(text)];
  }
  function makePptx(L, slides) {
    return loadPptx().then(function () {
      var pptx = new window.PptxGenJS();
      pptx.defineLayout({ name: "LMW", width: 13.33, height: 7.5 });
      pptx.layout = "LMW";
      pptx.title = L.topic || "My Lesson";
      slides.forEach(function (sl) {
        var s = pptx.addSlide();
        s.background = { color: "0B1220" };
        if (sl.kind === "title") {
          s.addText(sl.title, { x: 0.7, y: 2.1, w: 11.9, h: 1.9, fontSize: 44, bold: true, color: "FFFFFF", fontFace: "Verdana" });
          s.addText(sl.sub, { x: 0.7, y: 4.0, w: 11.9, h: 0.8, fontSize: 24, color: "2DD4BF", fontFace: "Verdana" });
          s.addText("Made with Fred Noseit", { x: 0.7, y: 6.6, w: 11.9, h: 0.5, fontSize: 13, color: "8FA3C8", fontFace: "Verdana" });
          return;
        }
        s.addText(sl.title, { x: 0.7, y: 0.45, w: 11.9, h: 0.9, fontSize: 32, bold: true, color: "2DD4BF", fontFace: "Verdana" });
        if (sl.items) {
          s.addText(sl.items.map(function (t) { return { text: t, options: { bullet: true, breakLine: true } }; }),
            { x: 0.7, y: 1.6, w: 11.9, h: 5.2, fontSize: 23, color: "E8EEFC", fontFace: "Verdana", lineSpacingMultiple: 1.25, valign: "top" });
        } else {
          s.addText(sentences(sl.body).map(function (t) { return { text: t, options: { bullet: true, breakLine: true } }; }),
            { x: 0.7, y: 1.6, w: 11.9, h: 5.2, fontSize: 23, color: "E8EEFC", fontFace: "Verdana", lineSpacingMultiple: 1.25, valign: "top" });
        }
      });
      var name = (L.topic || "my-lesson").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "my-lesson";
      return pptx.writeFile({ fileName: name + "-lesson.pptx" });
    });
  }

  /* ---------- PDF: clean print view of the same lesson ---------- */
  function makePdf(L, slides) {
    var w = window.open("", "_blank");
    if (!w) return false;
    var body = slides.map(function (sl) {
      if (sl.kind === "title") return '<section class="title"><h1>' + esc(sl.title) + '</h1><p class="sub">' + esc(sl.sub) + "</p></section>";
      var inner = sl.items
        ? "<ul>" + sl.items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
        : sentences(sl.body).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
      return "<section><h2>" + esc(sl.title) + "</h2>" + inner + "</section>";
    }).join("");
    w.document.write("<!DOCTYPE html><html><head><title>" + esc(L.topic || "My Lesson") + " \u2014 Lesson</title><style>" +
      "body{font-family:Verdana,Arial,sans-serif;color:#101a30;margin:40px;line-height:1.6}" +
      "h1{font-size:34px;color:#0b1220;margin:0 0 6px}h2{color:#0e7a6d;font-size:24px;margin:28px 0 8px;border-bottom:3px solid #2dd4bf;padding-bottom:4px}" +
      ".sub{font-size:19px;color:#333}.title{border-bottom:4px solid #2dd4bf;padding-bottom:14px}" +
      "p,li{font-size:17px}footer{margin-top:36px;color:#666;font-size:13px}</style></head><body>" +
      body + "<footer>Made with Fred Noseit</footer></body></html>");
    w.document.close();
    try { w.focus(); w.print(); } catch (e) {}
    return true;
  }

  /* ---------- the guided flow, rendered inside one chat surface ---------- */
  function startFlow(surface) {
    var log = surface.log;
    var old = log.querySelector(".lm-flow");
    if (old) old.remove();
    var flow = el('<div class="lm-flow"></div>');
    log.appendChild(flow);
    var S = { raw: "", L: null, slides: null };
    function scroll() {
      try { log.scrollTop = log.scrollHeight; } catch (e) {}
      try { flow.scrollIntoView({ block: "nearest" }); } catch (e) {}
    }
    function say(html) {
      var m = el('<div class="lm-msg"></div>');
      m.innerHTML = html;
      flow.appendChild(m);
      scroll();
      return m;
    }
    say("I can turn <b>your lesson</b> into a <b>PowerPoint</b> or a <b>PDF</b>. \uD83D\uDCCA");
    var warn = el('<div class="lm-msg lm-warn"></div>');
    warn.innerHTML = "\u26A0\uFE0F <b>Do not paste student names or private student information.</b>";
    flow.appendChild(warn);
    say("First, <b>paste your lesson or document</b> here. Or pick a file from your device (.txt or .md).");
    var ta = el('<textarea class="lm-ta" rows="7" aria-label="Paste your lesson here" placeholder="Paste your lesson or document here\u2026"></textarea>');
    flow.appendChild(ta);
    var row = el('<div class="lm-row"></div>');
    var fileLab = el('<label class="lm-file">\uD83D\uDCC2 Pick a file<input type="file" accept=".txt,.md,text/plain,text/markdown"></label>');
    var useBtn = el('<button type="button" class="lm-btn">Use this text \u27A1</button>');
    row.appendChild(fileLab);
    row.appendChild(useBtn);
    flow.appendChild(row);
    scroll();
    fileLab.querySelector("input").addEventListener("change", function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () { ta.value = String(r.result || ""); say("Got your file: <b>" + esc(f.name) + "</b>. Press <b>Use this text</b> when you are ready."); };
      r.onerror = function () { say("Sorry \u2014 I could not read that file. Try pasting the words instead."); };
      r.readAsText(f);
    });
    useBtn.addEventListener("click", function () {
      var text = ta.value.trim();
      if (text.length < 20) { say("That looks too short. Paste a bit more of your lesson, then press the button again."); return; }
      S.raw = text;
      S.L = parseLesson(text);
      ta.disabled = true; useBtn.disabled = true;
      askGaps([]);
    });

    function askGaps(done) {
      var L = S.L;
      var missing = [];
      if (!L.topic) missing.push({ k: "topic", q: "What is this lesson about? (a few words is fine)" });
      if (!L.grade) missing.push({ k: "grade", q: "What grade is this lesson for?" });
      if (!L.aim) missing.push({ k: "aim", q: "At the end, what should students be able to do?" });
      var nxt = missing.filter(function (m) { return done.indexOf(m.k) === -1; })[0];
      if (!nxt) { chooseFormat(); return; }
      say("<b>Quick question:</b> " + esc(nxt.q));
      var row = el('<div class="lm-row"></div>');
      var inp = el('<input class="lm-in" type="text" aria-label="Your answer">');
      var send = el('<button type="button" class="lm-btn">Send</button>');
      row.appendChild(inp); row.appendChild(send);
      flow.appendChild(row);
      scroll();
      try { inp.focus(); } catch (e) {}
      function answer() {
        var v = inp.value.trim();
        if (!v) return;
        if (nxt.k === "grade" && /^\d{1,2}$/.test(v)) v = "Grade " + v;
        S.L[nxt.k] = v;
        inp.disabled = true; send.disabled = true;
        done.push(nxt.k);
        askGaps(done);
      }
      send.addEventListener("click", answer);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); answer(); } });
    }

    function chooseFormat() {
      S.slides = buildSlides(S.L);
      say("Got it \u2014 your lesson is ready. <b>Which do you want?</b>");
      var row = el('<div class="lm-row"></div>');
      var pBtn = el('<button type="button" class="lm-btn big">\uD83D\uDCCA PowerPoint</button>');
      var dBtn = el('<button type="button" class="lm-btn big">\uD83D\uDCC4 PDF</button>');
      row.appendChild(pBtn); row.appendChild(dBtn);
      flow.appendChild(row);
      scroll();
      pBtn.addEventListener("click", function () {
        pBtn.disabled = true; dBtn.disabled = true;
        say("Making your PowerPoint\u2026");
        makePptx(S.L, S.slides).then(function () {
          say("\u2705 <b>Done!</b> Your PowerPoint is downloading now. Open it, check it, and change anything you like.");
          finish();
        }).catch(function () {
          pBtn.disabled = false; dBtn.disabled = false;
          say("Sorry \u2014 the PowerPoint did not build this time. Press <b>PowerPoint</b> to try again, or press <b>PDF</b> instead.");
        });
      });
      dBtn.addEventListener("click", function () {
        pBtn.disabled = true; dBtn.disabled = true;
        if (makePdf(S.L, S.slides)) {
          say("\u2705 <b>Your lesson is open in a print view.</b> Press <b>Print</b>, then pick <b>Save as PDF</b>.");
        } else {
          pBtn.disabled = false; dBtn.disabled = false;
          say("Your browser blocked the print window. Allow pop-ups for this site, then press <b>PDF</b> again.");
          return;
        }
        finish();
      });
    }

    function finish() {
      var row = el('<div class="lm-row"></div>');
      var cp = el('<button type="button" class="lm-btn">\uD83D\uDCCB Copy my lesson text</button>');
      var again = el('<button type="button" class="lm-btn">\uD83D\uDD04 Make another one</button>');
      row.appendChild(cp); row.appendChild(again);
      flow.appendChild(row);
      var m = say("Want it fancier? <b>Copy your lesson</b> into <b>Muse</b> or <b>Grok Bot</b> and ask for a PowerPoint there.");
      m.appendChild(row);
      cp.addEventListener("click", function () { copyText(S.raw, cp); });
      again.addEventListener("click", function () { startFlow(surface); });
      scroll();
    }
  }

  /* ---------- surfaces: find each chat on the page and give it the button ---------- */
  var wired = new WeakSet();
  function wireOne(key, log, anchor, barParent) {
    if (!log || !anchor || wired.has(log)) return;
    wired.add(log);
    var bar = el('<div class="lm-bar"><button type="button" class="lm-open">\uD83D\uDCCA Make a PowerPoint or PDF from my lesson</button></div>');
    if (anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor);
    else if (barParent) barParent.appendChild(bar);
    var surface = { key: key, log: log };
    bar.querySelector(".lm-open").addEventListener("click", function () { startFlow(surface); });
  }
  function scan() {
    try {
      var zb = document.querySelector("#zbox .zbody");
      if (zb) wireOne("zbox", zb.querySelector(".zlog"), zb.querySelector("form.zf"), zb);
      /* Home #pin Fred panel intentionally NOT wired (Greg, 2026-11-01):
         no Lesson Maker button in Fred's home chat — avatar/helper chats only. */
      var oc = document.getElementById("occhat");
      if (oc) wireOne("onechat", oc.querySelector(".clog"), oc.querySelector("form"), oc);
      var jlog = document.getElementById("log"), jask = document.getElementById("ask");
      if (jlog && jask && !document.getElementById("occhat")) wireOne("joy", jlog, jask, jlog.parentNode);
    } catch (e) {}
  }
  scan();
  var n = 0;
  var iv = setInterval(function () { scan(); if (++n > 90) clearInterval(iv); }, 400);
  try {
    var mo = new MutationObserver(function () { scan(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { try { mo.disconnect(); } catch (e) {} }, 60000);
  } catch (e) {}
})();

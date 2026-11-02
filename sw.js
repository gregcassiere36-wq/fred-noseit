/* AIEDUME service worker: cache-first app shell, network-first pages.
   Fails safe: every step is guarded, so a worker problem can never break a page. */
var CACHE = "aiedume-shell-v174";
var SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./mobile.css",
  "./manifest.json",
  "./icon.svg",
  "./plugin-market.html",
  "./plugin-builder.html",
  "./signup.html",
  "./my-plugins.html",
  "./apple-touch-icon.png",
  "./favicon.png"
];
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); }).catch(function () {})
  );
});
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); }).catch(function () {})
  );
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  /* Media files: never intercept - let the browser stream them with Range support. */
  try { if (/\.(mp4|webm|mov|vtt)$/i.test(new URL(r.url).pathname)) return; } catch (err) {}
  if (r.method !== "GET") return;
  var sameOrigin = false;
  try { sameOrigin = new URL(r.url).origin === self.location.origin; } catch (err) {}
  if (!sameOrigin) return;
  if (r.mode === "navigate") {
    /* A navigation URL with a query string bypasses the cache entirely: always network, never cached. */
    var navHasQuery = false;
    try { navHasQuery = new URL(r.url).search.length > 0; } catch (err) {}
    if (navHasQuery) { e.respondWith(fetch(r)); return; }
    /* Pages: network first so the site is always fresh; cache is the offline fallback. */
    e.respondWith(
      fetch(r).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy).catch(function () {}); }).catch(function () {});
        return resp;
      }).catch(function () {
        return caches.match(r).then(function (m) { return m || caches.match("./index.html"); });
      })
    );
    return;
  }
  /* Code and data files (js/css/json): network first, so fixes actually reach
     the browser; the cache is only the offline fallback. (frame-fix2 2026-10-30:
     cache-first here froze an old zippy.js in place and hid same-day fixes.) */
  var isCode = false;
  try { isCode = /\.(js|css|json)$/i.test(new URL(r.url).pathname); } catch (err) {}
  if (isCode) {
    e.respondWith(
      fetch(r).then(function (resp) {
        if (resp && resp.status === 200) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(r, copy).catch(function () {}); }).catch(function () {});
        }
        return resp;
      }).catch(function () { return caches.match(r); })
    );
    return;
  }
  /* Everything else same-origin: cache first, then network (and keep a copy). */
  e.respondWith(
    caches.match(r).then(function (m) {
      if (m) return m;
      return fetch(r).then(function (resp) {
        if (resp && resp.status === 200) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(r, copy).catch(function () {}); }).catch(function () {});
        }
        return resp;
      });
    })
  );
});

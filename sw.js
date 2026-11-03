/* AIEDUME service worker: NETWORK-FIRST for everything; the cache is only
   an offline fallback. (sw-refresh, 2026-11-02: an older cache-first branch
   could freeze a stale copy of the site on a phone for weeks. Now this
   worker, the moment it activates, deletes EVERY older cache, claims the
   clients, and reloads any open window, so a stale phone heals itself on
   its next visit. Pages are registered with updateViaCache:"none", so the
   browser always checks the network for a new worker.)
   Fails safe: every step is guarded, so a worker problem can never break
   a page. */
var CACHE = "aiedume-shell-v180";
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
        /* cache:"reload" - precache the FRESH shell, never an HTTP-cached copy. */
        return fetch(u, { cache: "reload" }).then(function (r) {
          if (r && r.status === 200) return c.put(u, r);
        }).catch(function () { return c.add(u).catch(function () {}); });
      }));
    }).then(function () { return self.skipWaiting(); }).catch(function () {})
  );
});
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      /* Purge EVERY other cache - no older shell survives this worker. */
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); }).then(function () {
      /* Snap any already-open window to the fresh copy right now. */
      return self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
        return Promise.all(list.map(function (cl) {
          var p = null;
          try { p = cl.navigate(cl.url); } catch (err) {}
          return Promise.resolve(p).catch(function () {});
        }));
      }).catch(function () {});
    }).catch(function () {})
  );
});
self.addEventListener("message", function (e) {
  try { if (e && e.data === "SKIP_WAITING") self.skipWaiting(); } catch (err) {}
});
function freshFetch(r) {
  /* cache:"no-cache" - always revalidate with the network, so a same-named
     file can never be served stale from the HTTP cache either. */
  try { return fetch(r, { cache: "no-cache" }); } catch (err) { return fetch(r); }
}
function netFirst(r, isNav) {
  return freshFetch(r).then(function (resp) {
    if (resp && resp.status === 200) {
      var copy = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(r, copy).catch(function () {}); }).catch(function () {});
    }
    return resp;
  }).catch(function () {
    return caches.match(r).then(function (m) {
      if (m) return m;
      if (isNav) {
        return caches.match("./index.html").then(function (h) {
          return h || new Response("Offline", { status: 503, statusText: "Offline" });
        });
      }
      return new Response("", { status: 504, statusText: "Offline" });
    });
  });
}
self.addEventListener("fetch", function (e) {
  var r = e.request;
  /* Media files: never intercept - let the browser stream them with Range support. */
  try { if (/\.(mp4|webm|mov|vtt)$/i.test(new URL(r.url).pathname)) return; } catch (err) {}
  if (r.method !== "GET") return;
  var sameOrigin = false;
  try { sameOrigin = new URL(r.url).origin === self.location.origin; } catch (err) {}
  if (!sameOrigin) return;
  /* Pages AND code AND everything else same-origin: network first.
     The cache answers only when the network is unreachable. */
  e.respondWith(netFirst(r, r.mode === "navigate"));
});

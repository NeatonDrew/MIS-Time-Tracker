const CACHE_NAME = "godot-pwa-v1";
const OFFLINE_URL = "index.offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "index.html",
        "index.offline.html",
        "manifest.json",
        "index.wasm",
        "index.pck",
        "index.png",
        "index.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request) || caches.match(OFFLINE_URL))
  );
});

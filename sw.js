const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "sw.js",
  "icon-192.png",
  "icon-512.png",
  "index.wasm",
  "index.pck",
  "index.js",
  "index.offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

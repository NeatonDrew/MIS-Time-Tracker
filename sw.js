const CACHE_NAME = "pwa-cache-v2"; // Change version when updating
const FILES_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/index.offline.html",
  "index.manifest.json",
  "index.pck",
  "index.wasm",
  "index.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          cache.put(event.request, response.clone()); // Update cache with fresh version
          return response;
        })
        .catch(() => caches.match(event.request)); // Serve from cache if offline
    })
  );
});

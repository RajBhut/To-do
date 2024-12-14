const CACHE_NAME = "static_cache";

const STATIC_ASSETS = [
  "https://todo.rajb.codes/static/css/main.335dbbb5.css",
  "https://todo.rajb.codes/sw.js",
  "https://todo.rajb.codes/manifest.json",
  "https://todo.rajb.codes/favicon.ico",

  "https://todo.rajb.codes/static/js/main.57a13d0c.js",
  "https://todo.rajb.codes/logo192.png",
  "https://todo.rajb.codes/",
];
async function prefatch() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(STATIC_ASSETS);
}
self.addEventListener("install", (event) => {
  event.waitUntil(prefatch());
});

self.addEventListener("activate", (event) => {});

async function fetchasset(event) {
  try {
    const response = await fetch(event.request);
    return response;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(event.request);
  }
}

self.addEventListener("fetch", (event) => {
  event.respondWith(fetchasset(event));
});

/*const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
   // 'index.html',
    'https://towhattodo.netlify.app/static/js/main.e57458b6.js',
  //  '/static/js/bundle.js',
    'https://towhattodo.netlify.app/manifest.json',
   
'https://towhattodo.netlify.app/favicon.ico',
    'https://towhattodo.netlify.app/logo192.png',
    'https://towhattodo.netlify.app/sw.js',
    'https://towhattodo.netlify.app/static/css/main.6dd954a2.css',
    'https://towhattodo.netlify.app/'
];
async function prefatch()
{
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSATES)
}

self.addEventListener('install',event =>
{
    console.log("sw installed");
    event.waitUntil(prefatch())
})
self.addEventListener('activate',event =>
{
    console.log("sw activate");

})
async function fetchasset(event)
{
    try{
const response = await fetch(event.request)
return response;
    }catch(err)
    {
const cache = await caches.open(CACHE_NAME)
return cache.match(event.request)

    }
}
self.addEventListener('fetch',event =>
{
    console.log("sw fatched");
    event.respondWith(fetchasset(event))
})
*/
const CACHE_NAME = "static_cache";

const STATIC_ASSETS = [
  // 'index.html', // Uncomment if needed
  'https://towhattodo.netlify.app/static/js/main.e57458b6.js',
  // '/static/js/bundle.js', // Uncomment if needed
  'https://towhattodo.netlify.app/manifest.json',
  'https://towhattodo.netlify.app/favicon.ico',
  'https://towhattodo.netlify.app/logo192.png',
  'https://towhattodo.netlify.app/sw.js',
  'https://towhattodo.netlify.app/static/css/main.6dd954a2.css',
  'https://towhattodo.netlify.app/',
];

async function prefatch() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(STATIC_ASSETS); // Use the correct variable name
}

self.addEventListener('install', event => {
  console.log("sw installed");
  event.waitUntil(prefatch());
});

self.addEventListener('activate', event => {
  console.log("sw activate");
});

async function fetchasset(event) {
  try {
    const response = await fetch(event.request);
    return response;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(event.request);
  }
}

self.addEventListener('fetch', event => {
  console.log("sw fatched");
  event.respondWith(fetchasset(event));
});

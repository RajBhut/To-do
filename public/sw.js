const CACHE_NAME = "static_cache"
const STATIC_ASSATE = 
[
    'index.html',
    '/static/js/bundle.js',
    'manifest.json',
'/favicon.ico',
'/logo192.png',
'http://towhattodo.netlify.app/'
]
async function prefatch()
{
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSATE)
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
    console.log("sw installed");
    event.respondWith(fetchasset(event))
})
const cacheName = "v2";

// const cacheAssets = [
//     'index.html',
//     'restaurant.html',
//     'js/dbhelper.js',
//     'js/main.js',
//     'js/restaurant_info.js',
//     'js/service_worker.js',
//     'css/styles.css',
//     'img/1.jpg',
//     'img/2.jpg',
//     'img/3.jpg',
//     'img/4.jpg',
//     'img/5.jpg',
//     'img/6.jpg',
//     'img/7.jpg',
//     'img/8.jpg',
//     'img/9.jpg',
//     'img/10.jpg'
// ];

// call install event
self.addEventListener("install", e => {
    console.log("Service Worker : installed");
    // e.waitUntil(
    //     caches.open(cacheName).then(cache => {
    //         console.log("Service Worker : Caching Files");
    //         cache.addAll(cacheAssets);
    //     })
    //     .then(()=>{ self.skipWaiting() })
    // );
});


// call activate event
self.addEventListener("activate", e => {
    console.log("Service Worker : activated");

    // remove unwanted caches...
    e.waitUntil(
        caches.keys()
            .then(cacheNames =>  { 
                return Promise.all(
                    cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log("Service Worker : Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            )}
        )
    );
});


// call fetch event

self.addEventListener("fetch", e => {
    console.log("Service Worker : Fetching...");
    // e.respondWith(
    //     fetch(e.request)
    //     .catch(() => caches.match(e.request))
    // );
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // make a copy of the response so that we may store it in the cache
            const resCopy = res.clone();
            caches.open(cacheName)
            .then(cache => {
                // add response copy to the cache
                cache.put(e.request, resCopy);
            });
            return res;
        })
        .catch(err => chaches.match(e.request).then(res => res))
    );
});
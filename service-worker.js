let cacheName = "myappCache";
var filesToCache = [
  "index.html",
  "js/site.js",
  "css/style.css",
  "images/favicon.png",
  "images/desktop-bg.jpg",
  "images/mobile-bg-copy.jpg",
  "images/og-image.jpg"
];

self.addEventListener("install", function(e) {
  //console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      //console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(e) {
  //console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            //console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; // if valid response is found in cache return it
      } else {
        return fetch(event.request) //fetch from internet
          .then(function(res) {
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request.url, res.clone()); //save the response for future
              return res; // return the fetched data
            });
          })
          .catch(function(err) {
            // fallback mechanism
            return caches.open(cacheName).then(function(cache) {
              return cache.match("/offline.html");
            });
          });
      }
    })
  );
});

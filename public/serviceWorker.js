let cacheData = "appV1";

this.addEventListener("install", (e) => {
  e.waitUntill(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "index.html",
        "/",
        "contact/add",
      ]);
    })
  );
});

this.addEventListener("fetch", (e) => {
  if (!navigator.onLine) {
    e.respondWith(
      caches.match(e.request).then((result) => {
        if (result) {
          return result;
        }
        let requestUrl = e.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('better-chatgpt-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/public/logo-16.png',
        '/public/logo-32.png',
        '/public/logo-180.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  if (requestURL.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

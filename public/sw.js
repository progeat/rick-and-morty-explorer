const staticCacheName = 'static-site';
const dynamicCacheName = 'dynamic-site-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/icons/192.png',
  '/icons/vite.svg',
  '/assets/index-BHkHP5aS.js',
  '/assets/index-C5H9lPpu.css',
  '/assets/index-Cs7XEZ0n.js',
  '/assets/index-DcFY0CUy.css',
  '/assets/offline.html',
];

// instal event
self.addEventListener('install', (event) => {
  console.log('####: Service Worker has been instaled');
  caches.open(staticCacheName).then((cache) => {
    console.log('#### Caches add ASSETS');
    cache.addAll(ASSETS);
  });
});

// activate event
self.addEventListener('activate', async (event) => {
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete.key)
  );
});

// fetch event
self.addEventListener('fetch', (event) => {
  console.log('####: fetch', event.request.url);
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        console.log('#### response', response);
        return networkFirst(request);
      }))
    );
  } catch (error) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  console.log('####: networkFirst');
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match('/offline.html'));
  }
}

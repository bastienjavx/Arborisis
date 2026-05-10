const CACHE_NAME = 'arborisis-v3';
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/pwa-icons/icon.svg',
  '/manifest.json',
];

const STATIC_CACHE_STRATEGY = 'CacheFirst';
const API_CACHE_STRATEGY = 'NetworkFirst';
const IMAGE_CACHE_STRATEGY = 'StaleWhileRevalidate';

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Push: display notification
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data?.json() ?? {};
  } catch {
    data = { title: 'Arborisis', body: event.data?.text() ?? '' };
  }

  const title = data.title || 'Arborisis';
  const options = {
    body: data.body || '',
    icon: data.icon || '/pwa-icons/icon.svg',
    badge: data.badge || '/pwa-icons/icon.svg',
    tag: data.tag || `arborisis-${Date.now()}`,
    data: {
      url: data.url || '/',
      timestamp: data.timestamp || Date.now(),
    },
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click: open URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

// Fetch: routing strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except for Google Fonts)
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  // API routes: NetworkFirst
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/build/') || url.pathname.startsWith('/admin/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Never cache radio stream or playlist
  if (url.pathname === '/radio/stream' || url.pathname === '/radio/stream.m3u') {
    return;
  }

  // Images and media: StaleWhileRevalidate
  if (request.destination === 'image' || request.destination === 'audio' || request.destination === 'video') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Fonts: CacheFirst
  if (request.destination === 'font') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML navigation: NetworkFirst with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request).catch(() => {
        return caches.match('/offline');
      })
    );
    return;
  }

  // Default: CacheFirst
  event.respondWith(cacheFirst(request));
});

// CacheFirst strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
}

// NetworkFirst strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// StaleWhileRevalidate strategy
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  if (cached) {
    fetchPromise.catch(() => {});
    return cached;
  }

  return await fetchPromise;
}

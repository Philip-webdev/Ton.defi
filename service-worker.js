const CACHE_NAME = 'nekstpei-v1';
const STATIC_CACHE = 'nekstpei-static-v1';
const API_CACHE = 'nekstpei-api-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.imgur.com/PZlLQcl.png'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately without waiting for old SW to die
  self.skipWaiting();
});

// Activate 
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            // Delete old caches that don't match current version
            return (
              name !== STATIC_CACHE &&
              name !== API_CACHE &&
              name !== CACHE_NAME
            );
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch 
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip browser extensions and chrome-extension URLs
  if (!url.protocol.startsWith('http')) return;

  // API requests — Network first, fall back to cache 
  if (
    url.hostname.includes('onrender.com') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/home') ||
    url.pathname.startsWith('/market')
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

 
  if (
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('accounts.google.com') ||
    url.hostname.includes('oauth2')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Static assets (JS, CSS, images) — Cache first ───
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages — Network first, fall back to index.html ───
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Everything else — Network first ───
  event.respondWith(networkFirst(request));
});


async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Asset not available offline', { status: 503 });
  }
}


async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: 'You are offline', offline: true }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Try the specific page cache first
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fall back to index.html for SPA client-side routing
    const indexCache = await caches.match('/index.html');
    if (indexCache) return indexCache;

    return new Response(
      '<h1>You are offline</h1><p>Please check your connection.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Background Sync (for failed chat messages) 
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Placeholder — implement if you want to queue messages while offline
  console.log('[SW] Background sync triggered');
}

// Push Notifications 
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title || 'Robotich', {
      body: data.body || 'You have a new update',
      icon: 'https://i.imgur.com/PZlLQcl.png',
      badge: 'https://i.imgur.com/PZlLQcl.png',
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
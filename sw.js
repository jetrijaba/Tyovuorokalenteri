// Service worker: tallentaa sovelluksen tiedostot, jotta se toimii ilman verkkoa.
// Kun muutat jotain tiedostoa, kasvata VERSION-numeroa, niin puhelin hakee uudet tiedostot.
const VERSION = 'v1';
const CACHE = 'tyovuorot-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/tailwind.css',
  './css/fontawesome.css',
  './webfonts/fa-solid-900.woff2',
  './lib/pdf.min.mjs',
  './lib/pdf.worker.min.mjs',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('tyovuorot-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Sivu: verkosta jos mahdollista (saa päivitykset heti), muuten välimuistista
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Muut tiedostot: välimuistista, ja jos puuttuu, verkosta
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }))
  );
});

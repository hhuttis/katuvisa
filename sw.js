/* Katuvisa — service worker.
   Verkko ensin, välimuisti varalle.

   Tämä versio ei sisällä kiinteää tiedostolistaa: se tallentaa välimuistiin
   kaiken mitä sovellus käyttää sitä mukaa kun sitä ladataan. Niinpä uusien
   datatiedostojen lisääminen tai nimen vaihtaminen ei riko offline-tukea
   eikä vaadi muutoksia tähän tiedostoon. */

const CACHE = 'katuvisa-v3';

const SHELL = ['./', './index.html'];

const EXTRA_ORIGINS = ['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // Jokainen erikseen, jotta yksi puuttuva tiedosto ei kaada asennusta.
      .then(cache => Promise.all(
        SHELL.map(url => cache.add(url).catch(() => {}))
      ))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && EXTRA_ORIGINS.indexOf(url.hostname) === -1) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => {
          if (hit) return hit;
          if (req.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        })
      )
  );
});

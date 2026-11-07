// Service worker: menyimpan kerangka aplikasi agar bisa dibuka cepat.
// Data absensi selalu diambil langsung dari server (tidak disimpan).
const VERSI = 'absen-v1';
const KERANGKA = ['./', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(KERANGKA); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // API Apps Script & logo luar langsung ke jaringan

  if (req.mode === 'navigate') {
    // Halaman: utamakan versi terbaru, cadangan dari cache bila offline
    e.respondWith(
      fetch(req).then(function (res) {
        const salin = res.clone();
        caches.open(VERSI).then(function (c) { c.put('index.html', salin); });
        return res;
      }).catch(function () { return caches.match('index.html'); })
    );
    return;
  }
  // Aset lain: dari cache dulu, perbarui di latar belakang
  e.respondWith(
    caches.match(req).then(function (hit) {
      const jaringan = fetch(req).then(function (res) {
        if (res && res.ok) { const salin = res.clone(); caches.open(VERSI).then(function (c) { c.put(req, salin); }); }
        return res;
      }).catch(function () { return hit; });
      return hit || jaringan;
    })
  );
});

const CACHE = 'banafsajo-app-mwshzgh3';
const PRECACHE = ["/app/","/app/app-icon-192.png","/app/app-icon-512.png","/app/apple-touch-icon.png","/app/assets/baloo-bhaijaan-2-arabic-800-normal-53vlEMIg.woff","/app/assets/baloo-bhaijaan-2-arabic-800-normal-seqr1dGG.woff2","/app/assets/baloo-bhaijaan-2-latin-800-normal-2iymj7n2.woff2","/app/assets/baloo-bhaijaan-2-latin-800-normal-CKI2l_NE.woff","/app/assets/index-DP9b6OMO.css","/app/assets/index-Djs1BvQI.js","/app/assets/love-c_vtvKg2.webp","/app/assets/point-LebbYxZY.webp","/app/assets/read-BUMTawUt.webp","/app/assets/tajawal-arabic-400-normal-CyCXRvzh.woff2","/app/assets/tajawal-arabic-400-normal-DCQxawbB.woff","/app/assets/tajawal-arabic-500-normal-BZ8ojJNu.woff2","/app/assets/tajawal-arabic-500-normal-CbVEaYEW.woff","/app/assets/tajawal-arabic-700-normal-9L7Zusdl.woff","/app/assets/tajawal-arabic-700-normal-D2-eand5.woff2","/app/assets/tajawal-arabic-800-normal-Bp_4IW2m.woff","/app/assets/tajawal-arabic-800-normal-TQp-UTiE.woff2","/app/assets/tajawal-latin-700-normal-BypgxfGb.woff2","/app/assets/tajawal-latin-700-normal-CV3bxpHe.woff","/app/assets/think-BQQa-xSG.webp","/app/assets/thumbs-u4XlpGqT.webp","/app/assets/wave-DeY14-ao.webp","/app/assets/win-DwBQDryk.webp","/app/assets/wow-C5mQ7wUE.webp","/app/index.html","/app/manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !u.pathname.startsWith('/app/')) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/app/index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});

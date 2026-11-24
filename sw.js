/* بنفسجو — عامل الخدمة: يجعل المنصة تطبيقًا يعمل حتى دون إنترنت.
   الصفحات الأساسية تُحفظ عند التثبيت، وكل محطة أو لعبة يفتحها الطالب تُحفظ تلقائيًا بعد أول زيارة. */
const VERSION = 'bj-2026-11-24-6';
const CORE = [
  '/', '/index.html', '/games.html', '/claude.html', '/files.html', '/brand.html',
  '/manifest.webmanifest',
  '/assets/bj.css', '/assets/bj.js', '/assets/bj-icons.js', '/assets/bj-app.css', '/assets/bj-app.js',
  '/assets/brand/logo-horizontal.svg', '/assets/brand/logo-horizontal-white.svg', '/assets/brand/mark.svg',
  '/assets/brand/app-icon-192.png', '/assets/brand/app-icon-512.png', '/assets/brand/apple-touch-icon.png',
  '/assets/brand/bj-wave.webp', '/assets/brand/bj-wave-sm.webp', '/assets/brand/bj-point-sm.webp', '/assets/brand/bj-win.webp',
  '/assets/brand/poses/wave-sm.webp', '/assets/brand/poses/think-sm.webp', '/assets/brand/poses/win-sm.webp',
  '/files/list.json', '/claude/kb.json', '/assets/bj-anim.css', '/assets/bj-anim.js', '/assets/bj-scenes.js', '/assets/bj-scenes2.js', '/assets/bj-scenes3.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // نحفظ كل ملف على حدة حتى لا يفشل التثبيت كله بسبب ملف واحد
    await Promise.all(CORE.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('bj-') && k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isFont = (u) => u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';

async function networkFirst(req) {
  const c = await caches.open(VERSION);
  try {
    const res = await fetch(req);
    if (res && res.ok) c.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    return (await c.match('/claude.html')) || Response.error();
  }
}

async function staleWhileRevalidate(req, event) {
  const c = await caches.open(VERSION);
  const hit = await c.match(req);
  const net = fetch(req).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
    return res;
  }).catch(() => null);
  if (hit) { event.waitUntil(net); return hit; }
  return (await net) || Response.error();
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === self.location.origin) {
    // تطبيق بنفسجو 2.0 له عامل خدمة خاص، وملفات PBL ضخمة فلا نخزّنها
    if (u.pathname.startsWith('/app/') || u.pathname.startsWith('/pbl/')) return;
    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
      e.respondWith(networkFirst(req));
      return;
    }
    e.respondWith(staleWhileRevalidate(req, e));
    return;
  }
  if (isFont(u)) e.respondWith(staleWhileRevalidate(req, e));
});

/* بنفسجو — محرك الفيديوهات القصيرة
   كل فيديو دالة في الزمن: render(t) ترسم الإطار، فيمكن التقديم والتأخير والإعادة بلا تقطّع.
   الاستخدام: <div data-bjv="fractions"></div>  (أو data-bjv-mini للنسخة المصغّرة بلا أزرار) */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', AR = '٠١٢٣٤٥٦٧٨٩';
  var W = 640, H = 360;
  function ar(v) { return String(v).replace(/[0-9]/g, function (d) { return AR[+d]; }).replace(/-/g, '−').replace(/\./g, '٫'); }
  var C = { bg: '#0E0C26', bg2: '#17143A', ink: '#F4F1FF', dim: 'rgba(244,241,255,.38)', faint: 'rgba(244,241,255,.12)',
    cy: '#5EE6FF', pk: '#FF6B9A', yl: '#FFD25A', gr: '#62E6A8', vi: '#A98BFF', rd: '#FF5A6E' };
  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var ease = {
    lin: function (x) { return x; },
    out: function (x) { return 1 - Math.pow(1 - x, 3); },
    inn: function (x) { return x * x * x; },
    io: function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
    back: function (x) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
    pop: function (x) { return x < .6 ? ease.out(x / .6) * 1.15 : 1.15 - .15 * ease.io((x - .6) / .4); }
  };
  function P(t, a, b, e) { return (e || ease.io)(clamp((t - a) / (b - a), 0, 1)); }
  function mix(a, b, k) { return a + (b - a) * k; }
  function F(n, d) { return '<span class="sfr"><span>' + n + '</span><span>' + d + '</span></span>'; }

  /* ---------- أدوات SVG ---------- */
  function el(tag, a, parent) {
    var e = document.createElementNS(NS, tag);
    if (a) for (var k in a) e.setAttribute(k, a[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  /* يغيّر الخاصية فقط إن تغيّرت قيمتها (أسرع في كل إطار) */
  function put(e, a) {
    var c = e._c || (e._c = {});
    for (var k in a) { var v = a[k]; if (c[k] !== v) { c[k] = v; e.setAttribute(k, v); } }
    return e;
  }
  function vis(e, o) { o = o < .004 ? 0 : o > .996 ? 1 : o; put(e, { opacity: +o.toFixed(3) }); return e; }
  function tf(e, x, y, rot, sc) {
    put(e, { transform: 'translate(' + x.toFixed(2) + ',' + y.toFixed(2) + ')' + (rot ? ' rotate(' + rot.toFixed(2) + ')' : '') + (sc != null && sc !== 1 ? ' scale(' + sc.toFixed(3) + ')' : '') });
  }

  function makeKit(svg) {
    var K = { C: C, W: W, H: H, ar: ar, P: P, ease: ease, mix: mix, clamp: clamp, put: put, vis: vis, tf: tf, el: el, F: F };
    var root = el('g', {}, svg); K.root = root;
    K.g = function (parent) { return el('g', {}, parent || root); };
    K.rect = function (x, y, w, h, fill, o, parent) {
      o = o || {}; var a = { x: x, y: y, width: w, height: h, fill: fill || 'none' };
      if (o.r) a.rx = o.r; if (o.s) { a.stroke = o.s; a['stroke-width'] = o.sw || 2; } if (o.op != null) a.opacity = o.op; if (o.dash) a['stroke-dasharray'] = o.dash;
      return el('rect', a, parent || root);
    };
    K.line = function (x1, y1, x2, y2, stroke, w, o, parent) {
      o = o || {}; var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: stroke || C.ink, 'stroke-width': w || 2, 'stroke-linecap': 'round' };
      if (o.dash) a['stroke-dasharray'] = o.dash; if (o.op != null) a.opacity = o.op;
      return el('line', a, parent || root);
    };
    K.circle = function (cx, cy, r, fill, o, parent) {
      o = o || {}; var a = { cx: cx, cy: cy, r: r, fill: fill || 'none' };
      if (o.s) { a.stroke = o.s; a['stroke-width'] = o.sw || 2; } if (o.op != null) a.opacity = o.op;
      return el('circle', a, parent || root);
    };
    K.path = function (d, fill, stroke, w, o, parent) {
      o = o || {}; var a = { d: d, fill: fill || 'none' };
      if (stroke) { a.stroke = stroke; a['stroke-width'] = w || 2; a['stroke-linecap'] = 'round'; a['stroke-linejoin'] = 'round'; }
      if (o.op != null) a.opacity = o.op; if (o.dash) a['stroke-dasharray'] = o.dash;
      return el('path', a, parent || root);
    };
    K.text = function (x, y, str, size, fill, o, parent) {
      o = o || {};
      var an = o.a || 'middle'; if (!o.ltr && an !== 'middle') an = an === 'start' ? 'end' : 'start'; /* الصفحة RTL: نحوّل إلى محاذاة فيزيائية */
      var a = { x: x, y: o.mid ? y + size * .34 : y, 'font-size': size, fill: fill || C.ink, 'text-anchor': an, 'font-weight': o.w || 700 };
      if (o.ltr) a.style = 'direction:ltr;unicode-bidi:bidi-override'; if (o.op != null) a.opacity = o.op;
      var e = el('text', a, parent || root); e.textContent = str; return e;
    };
    /* كسر عمودي: البسط فوق خط الكسر والمقام تحته (وسطه عند cx,cy) */
    K.frac = function (cx, cy, n, d, size, fill, parent) {
      var g = el('g', {}, parent || root); fill = fill || C.ink;
      var tn = K.text(0, -size * .18, n, size, fill, { ltr: 1 }, g), td = K.text(0, size * .86, d, size, fill, { ltr: 1 }, g);
      var ln = el('line', { y1: 0, y2: 0, stroke: fill, 'stroke-width': Math.max(1.6, size / 11), 'stroke-linecap': 'round' }, g);
      function fit() { var w = Math.max(String(g.n.textContent).length, String(g.d.textContent).length) * size * .6 + size * .45; put(ln, { x1: -w / 2, x2: w / 2 }); g.w = w; }
      g.n = tn; g.d = td; g.ln = ln; g.size = size; g.set = function (a, b) { tn.textContent = a; td.textContent = b; fit(); };
      fit(); tf(g, cx, cy); return g;
    };
    /* صف تعبير رياضي مركزه (cx,cy): عناصره نصوص أو {f:[بسط,مقام]} ويُعاد كل عنصر ليتحكم المشهد بظهوره */
    K.row = function (cx, cy, items, size, fill, parent) {
      var g = el('g', {}, parent || root), out = [], gap = size * .22, widths = [], total = 0;
      items.forEach(function (it) {
        var w;
        if (typeof it === 'string') { w = it.length * size * (/^[+=−×÷<>]$/.test(it) ? .9 : .56) + (it === ' ' ? size * .3 : 0); }
        else { w = Math.max(String(it.f[0]).length, String(it.f[1]).length) * size * .6 + size * .45; }
        widths.push(w); total += w + gap;
      });
      total -= gap; var x = cx - total / 2;
      items.forEach(function (it, i) {
        var w = widths[i], e;
        if (typeof it === 'string') { e = K.text(x + w / 2, cy + size * .34, it, size, fill, { ltr: 1 }, g); }
        else { e = K.frac(x + w / 2, cy, it.f[0], it.f[1], size, fill, g); }
        out.push(e); x += w + gap;
      });
      out.g = g; return out;
    };
    /* شخصية خطية مرشدة: تلوّح في البداية وتشجّع في النهاية */
    K.guide = function (x, y, s, color) {
      color = color || C.vi;
      var g = el('g', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none', stroke: color, 'stroke-width': 3 }, root);
      var legs = el('path', {}, g), body = el('line', { x1: 0, y1: -43, x2: 0, y2: -18 }, g);
      var head = el('circle', { cx: 0, cy: -52, r: 9, fill: C.bg2 }, g);
      el('circle', { cx: -3.2, cy: -53, r: 1.3, fill: color, stroke: 'none' }, g); el('circle', { cx: 3.2, cy: -53, r: 1.3, fill: color, stroke: 'none' }, g);
      el('path', { d: 'M-2.6,-48.6 Q0,-46.6 2.6,-48.6', 'stroke-width': 1.6 }, g);
      el('path', { d: 'M5,-59 Q15,-62 13,-48', 'stroke-width': 2.4 }, g);
      el('circle', { cx: 6, cy: -59, r: 2.6, fill: C.yl, stroke: 'none' }, g);
      var armL = el('line', {}, g), armR = el('line', {}, g);
      function arm(e, a, L) { a = a * Math.PI / 180; put(e, { x1: 0, y1: -40, x2: (Math.cos(a) * L).toFixed(2), y2: (-40 + Math.sin(a) * L).toFixed(2) }); }
      return {
        g: g,
        update: function (t, cheerAt, o) {
          o = o || {}; var bob = Math.sin(t * 3) * 1.2, lift = 0, l = 112, r = 68;
          if (t < 1.8 && !o.noWave) { r = 300 + Math.sin(t * 9) * 22; }
          else if (o.point != null) { r = o.point; }
          if (cheerAt != null && t > cheerAt) { var k = Math.sin((t - cheerAt) * 7); l = 235 + k * 18; r = 305 - k * 18; lift = -Math.abs(k) * 6; }
          arm(armL, l, 21); arm(armR, r, 21);
          put(legs, { d: 'M-8,0 L0,-18 L8,0' });
          tf(g, x, y + lift + (lift ? 0 : bob * .3), 0, s);
        }
      };
    };
    return K;
  }

  /* ---------- سجل المشاهد ---------- */
  var SCENES = {};
  function scene(id, def) { SCENES[id] = def; }

  /* ---------- المشغّل ---------- */
  var RM = false;
  try { RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
  var HOLD = 2.4;

  function mount(host, id, opt) {
    opt = opt || {};
    var def = SCENES[id];
    if (!def || host._bjv) return null;
    host._bjv = true;
    var mini = !!opt.mini;
    host.classList.add('bjv'); if (mini) host.classList.add('mini');
    var stage = document.createElement('div'); stage.className = 'bjv-stage'; host.appendChild(stage);
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': def.title, preserveAspectRatio: 'xMidYMid meet' });
    stage.appendChild(svg);
    var defs = el('defs', {}, svg);
    var bgr = el('linearGradient', { id: 'bjg' + id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#17143A' }, bgr); el('stop', { offset: 1, 'stop-color': '#0B0A20' }, bgr);
    el('rect', { width: W, height: H, fill: 'url(#bjg' + id + ')' }, svg);
    var grid = el('g', { stroke: 'rgba(255,255,255,.045)', 'stroke-width': 1 }, svg);
    for (var gx = 40; gx < W; gx += 40) el('line', { x1: gx, y1: 0, x2: gx, y2: H }, grid);
    for (var gy = 40; gy < H; gy += 40) el('line', { x1: 0, y1: gy, x2: W, y2: gy }, grid);
    var K = makeKit(svg);
    var upd = def.build(K);
    var cap = null, bar = null, playBtn, seek, repBtn, big;
    if (!mini) {
      big = document.createElement('button'); big.type = 'button'; big.className = 'bjv-big'; big.setAttribute('aria-label', 'تشغيل الفيديو'); big.innerHTML = '<b>▶</b>'; stage.appendChild(big);
      cap = document.createElement('div'); cap.className = 'bjv-cap'; cap.setAttribute('aria-live', 'off'); host.appendChild(cap);
      bar = document.createElement('div'); bar.className = 'bjv-bar'; host.appendChild(bar);
      playBtn = document.createElement('button'); playBtn.type = 'button'; playBtn.className = 'bjv-play'; playBtn.setAttribute('aria-label', 'إيقاف مؤقت'); playBtn.textContent = '⏸';
      seek = document.createElement('input'); seek.type = 'range'; seek.min = 0; seek.max = 1000; seek.value = 0; seek.className = 'bjv-seek'; seek.setAttribute('aria-label', 'موضع الفيديو');
      repBtn = document.createElement('button'); repBtn.type = 'button'; repBtn.className = 'bjv-rep'; repBtn.setAttribute('aria-label', 'إعادة من البداية'); repBtn.textContent = '↻';
      bar.appendChild(playBtn); bar.appendChild(seek); bar.appendChild(repBtn);
      [playBtn, seek, repBtn, big].forEach(function (b) { b.addEventListener('keydown', function (e) { e.stopPropagation(); }); });
    }
    var dur = def.dur, t = RM ? dur : 0, playing = false, userPaused = RM, seen = false, last = 0, raf = 0, hold = 0, capI = -2, resetNext = false, dragging = false;
    function draw() {
      upd(t);
      if (cap) {
        var i = -1; for (var k = 0; k < def.caps.length; k++) if (t >= def.caps[k][0]) i = k;
        if (i !== capI) { capI = i; cap.innerHTML = i >= 0 ? def.caps[i][1] : ''; cap.classList.remove('in'); void cap.offsetWidth; cap.classList.add('in'); }
        seek.value = Math.round(t / dur * 1000);
      }
    }
    function setPlayUI() {
      if (!playBtn) return;
      var showPlay = userPaused || (!playing && !seen);
      playBtn.textContent = userPaused ? '▶' : '⏸'; playBtn.setAttribute('aria-label', userPaused ? 'تشغيل' : 'إيقاف مؤقت');
      host.classList.toggle('paused', userPaused);
    }
    function loop(now) {
      raf = 0; if (!playing) return;
      var dt = Math.min(.1, (now - last) / 1000); last = now;
      if (hold > 0) { hold -= dt; if (hold <= 0) { t = 0; } }
      else { t += dt; if (t >= dur) { t = dur; hold = mini ? .6 : HOLD; } }
      draw(); raf = requestAnimationFrame(loop);
    }
    function start() { if (playing || userPaused || !seen || document.hidden) return; playing = true; last = performance.now(); if (!raf) raf = requestAnimationFrame(loop); }
    function stop() { playing = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    function toggle() { userPaused = !userPaused; if (userPaused) stop(); else { if (t >= dur - .05) t = 0; hold = 0; start(); } setPlayUI(); }
    host._bjvApi = { seek: function (x) { t = clamp(x, 0, dur); hold = 0; draw(); }, dur: dur, play: function () { userPaused = false; setPlayUI(); start(); }, pause: function () { userPaused = true; stop(); setPlayUI(); }, restart: function () { t = 0; hold = 0; draw(); userPaused = false; setPlayUI(); start(); } };
    if (!mini) {
      playBtn.addEventListener('click', toggle);
      big.addEventListener('click', function () { if (userPaused || !playing) { if (t >= dur - .05) t = 0; userPaused = false; hold = 0; setPlayUI(); start(); } else toggle(); });
      stage.addEventListener('click', function (e) { if (e.target === big || big.contains(e.target)) return; toggle(); });
      repBtn.addEventListener('click', function () { t = 0; hold = 0; draw(); userPaused = false; setPlayUI(); start(); });
      seek.addEventListener('input', function () { t = seek.value / 1000 * dur; hold = 0; if (!dragging) { dragging = true; stop(); } draw(); });
      var endDrag = function () { if (dragging) { dragging = false; if (!userPaused) start(); } };
      seek.addEventListener('change', endDrag); seek.addEventListener('pointerup', endDrag); seek.addEventListener('blur', endDrag);
    }
    draw(); setPlayUI();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { seen = true; if (resetNext && !RM) { t = 0; hold = 0; resetNext = false; draw(); } start(); }
          else { seen = false; if (t > 0 && !RM) resetNext = true; stop(); }
        });
      }, { threshold: mini ? .2 : .35 });
      io.observe(host);
    } else { seen = true; start(); }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    return host._bjvApi;
  }

  function scan(root) {
    (root || document).querySelectorAll('[data-bjv]').forEach(function (h) { mount(h, h.getAttribute('data-bjv'), { mini: false }); });
    (root || document).querySelectorAll('[data-bjv-mini]').forEach(function (h) { mount(h, h.getAttribute('data-bjv-mini'), { mini: true }); });
  }
  window.BJV = { scene: scene, mount: mount, scan: scan, SCENES: SCENES, C: C, ar: ar, F: F, _kit: makeKit };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(scan, 0); }); else setTimeout(scan, 0);
})();

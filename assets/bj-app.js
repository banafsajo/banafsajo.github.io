/* ==========================================================
   بنفسجو — غلاف التطبيق المشترك لكل صفحات المنصة
   · زرّا «رجوع» و«الرئيسية» في كل صفحة
   · شريط تبويبات سفلي على الجوال
   · تثبيت المنصة كتطبيق + العمل دون إنترنت
   · حفظ تقدّم الطالب في كل محطة واحتفال لطيف عند إكمالها
   ========================================================== */
(function () {
  'use strict';
  var d = document, H = d.documentElement;
  var seg = location.pathname.split('/').filter(Boolean);
  var file = seg.length ? seg[seg.length - 1] : 'index.html';
  if (!/\.html?$/.test(file)) { seg.push('index.html'); file = 'index.html'; }
  var dir = seg.length > 1 ? seg[seg.length - 2] : '';
  if (dir === 'app' || dir === 'pbl' || dir === 'olou') return;
  var TYPE = (dir === 'lessons' || dir === 'student') ? 'deck'
    : dir === 'sims' ? 'sim'
    : (!dir && file === 'index.html') ? 'home' : 'top';
  var ROOT = '/';
  /* وضع التطبيق (نسخة الطالب): اسأل بنفسجو + الألعاب + الملفات، بلا المحطات والجولات */
  var APP = false;
  try {
    if (/[?&]source=app/.test(location.search)) sessionStorage.setItem('bja_app', '1');
    APP = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true || sessionStorage.getItem('bja_app') === '1';
  } catch (e) {}
  var HOME = APP ? 'claude.html' : 'index.html';
  if (APP && TYPE === 'home') { location.replace(ROOT + 'claude.html'); return; }
  if (APP && dir === 'lessons') { location.replace(ROOT + 'student/' + file + location.hash); return; }
  H.classList.add('bja', 'bja-' + TYPE);
  if (APP) H.classList.add('bja-app');

  /* ---------- الأنماط ---------- */
  if (!d.querySelector('link[href*="bj-app.css"]')) {
    var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = ROOT + 'assets/bj-app.css?v=2'; d.head.appendChild(l);
  }

  /* ---------- أيقونات ---------- */
  var IC = {
    back: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/><path d="M9 7h7"/>',
    game: '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".9" fill="currentColor"/><circle cx="17.8" cy="13.6" r=".9" fill="currentColor"/>',
    ask: '<path d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.3-4.4A8.5 8.5 0 1 1 20.5 12z"/><path d="M9 11h.01M12.5 11h.01M16 11h.01"/>',
    files: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 16.5h4"/>',
    install: '<path d="M12 3.5v11"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M5 20.5h14"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    share: '<path d="M12 3v12"/><path d="M7.5 7.5 12 3l4.5 4.5"/><path d="M6 11.5v9h12v-9"/>',
    plus: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>',
    dots: '<circle cx="12" cy="5.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="18.5" r="1.2" fill="currentColor"/>'
  };
  function ic(n) { return '<svg class="bja-ic" viewBox="0 0 24 24" aria-hidden="true">' + (IC[n] || '') + '</svg>'; }
  function el(tag, cls, html) { var e = d.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function ar(n) { return String(n).replace(/\d/g, function (c) { return AR[+c]; }); }
  function num(s) { return parseInt(String(s || '').replace(/[٠-٩]/g, function (c) { return AR.indexOf(c); }).replace(/[^\d]/g, ''), 10) || 0; }
  function load(k, def) { try { var v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? def : v; } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- الرجوع والرئيسية ---------- */
  function parentPage() {
    if (TYPE === 'deck') return dir === 'student' || APP ? ROOT + 'claude.html' : ROOT + 'index.html#stations';
    if (TYPE === 'sim') return ROOT + 'games.html';
    return ROOT + HOME;
  }
  function goBack() {
    var same = false;
    try { same = !!d.referrer && new URL(d.referrer).origin === location.origin && new URL(d.referrer).pathname !== location.pathname; } catch (e) {}
    if (same && history.length > 1) {
      var left = false;
      var mark = function () { left = true; };
      addEventListener('pagehide', mark, { once: true });
      history.back();
      setTimeout(function () { if (!left) location.href = parentPage(); }, 600);
    } else {
      location.href = parentPage();
    }
  }
  function navButtons(cls) {
    var b = el('button', 'bjb is-ghost bja-back ' + (cls || ''), ic('back') + '<span>رجوع</span>');
    b.type = 'button'; b.setAttribute('aria-label', 'الرجوع للصفحة السابقة'); b.onclick = goBack;
    var h = el('a', 'bjb is-sec bja-home ' + (cls || ''), ic('home') + '<span>الرئيسية</span>');
    h.href = ROOT + HOME; h.setAttribute('aria-label', 'الصفحة الرئيسية');
    return [b, h];
  }

  /* ---------- شريط التبويبات السفلي ---------- */
  function tabBar() {
    var items = APP ? [['claude.html', 'ask', 'اسأل بنفسجو'], ['games.html', 'game', 'الألعاب'], ['files.html', 'files', 'الملفات']]
      : [['index.html', 'home', 'الرئيسية'], ['games.html', 'game', 'الألعاب'], ['claude.html', 'ask', 'اسأل بنفسجو'], ['files.html', 'files', 'الملفات']];
    var nav = el('nav', 'bja-tabs');
    nav.setAttribute('aria-label', 'التنقل الرئيسي');
    nav.innerHTML = items.map(function (it) {
      var cur = (!dir && file === it[0]) ? ' aria-current="page"' : '';
      return '<a href="' + ROOT + it[0] + '"' + cur + '><span class="pip">' + ic(it[1]) + '</span>' + it[2] + '</a>';
    }).join('');
    d.body.appendChild(nav);
    d.body.classList.add('bja-has-tabs');
  }

  /* ---------- الصفحات العلوية (الألعاب، اسأل بنفسجو، الملفات، الهوية) ---------- */
  function topShell() {
    var hdr = d.querySelector('header.top');
    var ROOTS = /^(claude|games|files)\.html$/;
    if (APP && ROOTS.test(file)) H.classList.add('bja-root'); /* صفحات التبويب في التطبيق: الشعار بدل «رجوع» */
    else if (hdr && TYPE !== 'home') {
      var g = el('div', 'bja-hnav');
      navButtons().forEach(function (b) { g.appendChild(b); });
      hdr.insertBefore(g, hdr.firstChild);
    }
    tabBar();
  }

  /* ---------- المحاكاة ---------- */
  function simShell() {
    var hdr = d.querySelector('header.bar');
    var bs = navButtons();
    if (hdr) {
      var g = el('div', 'bja-hnav');
      bs.forEach(function (b) { g.appendChild(b); });
      hdr.insertBefore(g, hdr.firstChild);
      hdr.classList.add('bja-simbar');
      // زر «العودة للمنصة» القديم صار مكرّرًا مع «الرئيسية»
      hdr.querySelectorAll('a[href$="index.html"]').forEach(function (a) { if (!a.classList.contains('bjb')) a.hidden = true; });
    } else {
      var bar = el('div', 'bja-bar');
      bar.appendChild(bs[0]);
      bar.appendChild(el('div', 't', (d.title || '').split('·')[0]));
      bar.appendChild(bs[1]);
      d.body.insertBefore(bar, d.body.firstChild);
    }
  }

  /* ---------- العروض: المحطات والجولات ---------- */
  var ID = file.replace(/\.html?$/, '');
  function deckShell() {
    var box = el('div', 'bja-dk');
    box.setAttribute('role', 'navigation'); box.setAttribute('aria-label', 'التنقل');
    navButtons().forEach(function (b) { box.appendChild(b); });
    d.body.appendChild(box);
    var deck = d.getElementById('deck');
    function lay() {
      var W = innerWidth, Hh = innerHeight;
      var side = (W - Math.min(W / 1280, Hh / 720) * 1280) / 2;
      var top = 0;
      if (side >= 70) {
        H.classList.add('bja-side'); H.classList.remove('bja-top');
        H.style.setProperty('--bja-sw', Math.min(side - 12, 84) + 'px');
      } else {
        H.classList.add('bja-top'); H.classList.remove('bja-side');
        top = 56;
      }
      if (deck) deck.style.transform = 'scale(' + Math.min(W / 1280, (Hh - top) / 720) + ')';
    }
    var raf = 0;
    addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(lay); });
    d.addEventListener('fullscreenchange', function () { setTimeout(lay, 60); });
    lay();
    rotateHint();
    trackDeck();
  }

  function rotateHint() {
    var mq = matchMedia('(orientation: portrait) and (max-width: 700px)');
    var off = false; try { off = sessionStorage.getItem('bja_rot') === '1'; } catch (e) {}
    if (!mq.matches || off) return;
    var canLock = !!(d.documentElement.requestFullscreen && screen.orientation && screen.orientation.lock);
    var ov = el('div', 'bja-rot');
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'أدر جوالك');
    ov.innerHTML = '<div class="in"><div class="ph">' + ic('phone') + '</div><h2>أدر جوالك أفقيًا</h2><p>هذه المحطة مصمّمة كشاشة عرض عريضة، فتظهر أوضح وأكبر حين تُدير الجوال.</p><div class="bjb-row">' +
      (canLock ? '<button type="button" class="bjb is-pri" data-a="fs">عرض أفقي بملء الشاشة</button>' : '') +
      '<button type="button" class="bjb ' + (canLock ? 'is-ghost' : 'is-pri') + '" data-a="ok">' + (canLock ? 'متابعة بالوضع العمودي' : 'حسنًا، فهمت') + '</button></div></div>';
    function close() { ov.remove(); try { sessionStorage.setItem('bja_rot', '1'); } catch (e) {} }
    ov.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'fs') {
        d.documentElement.requestFullscreen().then(function () { return screen.orientation.lock('landscape'); }).catch(function () {});
      }
      close();
    });
    mq.addEventListener && mq.addEventListener('change', function (e) { if (!e.matches && ov.isConnected) close(); });
    d.body.appendChild(ov);
    var f = ov.querySelector('button'); if (f) f.focus();
  }

  /* تقدّم الطالب: أبعد شريحة وصلها وهل أكمل المحطة */
  function trackDeck() {
    var cur = d.getElementById('cur'), tot = d.getElementById('tot');
    if (!cur || !tot) return;
    var celebrated = false;
    function rec() {
      var c = num(cur.textContent), t = num(tot.textContent);
      if (!t || !c) return;
      var P = load('bj_prog', {});
      var p = P[ID] || {};
      p.s = Math.max(p.s || 0, c); p.t = t; p.v = Date.now(); p.m = dir;
      if (!p.done && p.s >= t) { p.done = Date.now(); if (!celebrated) { celebrated = true; celebrate('أنهيت ' + (d.title || 'المحطة').split('·')[0].trim() + ' 🎉'); } }
      P[ID] = p; save('bj_prog', P);
      save('bj_last', { id: ID, m: dir, href: location.pathname, at: Date.now() });
    }
    new MutationObserver(rec).observe(cur, { childList: true, characterData: true, subtree: true });
    new MutationObserver(rec).observe(tot, { childList: true, characterData: true, subtree: true });
    setTimeout(rec, 300);
  }

  /* احتفال بسيط لا يشتّت */
  function celebrate(msg) {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var box = el('div', 'bja-cel'); box.setAttribute('aria-hidden', 'true');
      var cols = ['#6342BE', '#1E9A7C', '#F2B33D', '#E6DEF7', '#CF5168'];
      for (var i = 0; i < 36; i++) {
        var p = d.createElement('i');
        p.style.left = (Math.random() * 100) + '%';
        p.style.background = cols[i % cols.length];
        p.style.animationDelay = (Math.random() * .5) + 's';
        p.style.animationDuration = (1.2 + Math.random() * .9) + 's';
        box.appendChild(p);
      }
      d.body.appendChild(box);
      setTimeout(function () { box.remove(); }, 2600);
    }
    if (msg) netToast(msg, 3200);
  }

  /* ---------- رسائل قصيرة: الاتصال والاحتفال ---------- */
  var tEl = null, tT = 0;
  function netToast(msg, ms) {
    if (!tEl) { tEl = el('div', 'bja-net'); tEl.setAttribute('role', 'status'); d.body.appendChild(tEl); }
    tEl.textContent = msg; void tEl.offsetWidth; tEl.classList.add('on');
    clearTimeout(tT); tT = setTimeout(function () { tEl.classList.remove('on'); }, ms || 2800);
  }
  addEventListener('offline', function () { netToast('أنت الآن دون إنترنت · ما فتحته سابقًا يعمل', 4200); });
  addEventListener('online', function () { netToast('عاد الاتصال ✓', 2000); });

  /* ---------- التثبيت كتطبيق ---------- */
  var deferred = null;
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; d.dispatchEvent(new Event('bja:installable')); });
  addEventListener('appinstalled', function () { deferred = null; netToast('تم تثبيت بنفسجو على جهازك 🎉', 3200); d.dispatchEvent(new Event('bja:installed')); });
  function installed() { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; }
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function install() {
    if (deferred) { deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; }); return; }
    var steps = isIOS()
      ? ['اضغط زر المشاركة ' + ic('share') + ' أسفل المتصفح', 'اختر «إضافة إلى الشاشة الرئيسية» ' + ic('plus'), 'اضغط «إضافة»، وستجد أيقونة بنفسجو بين تطبيقاتك']
      : ['افتح قائمة المتصفح ' + ic('dots') + ' أعلى الشاشة', 'اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»', 'اضغط «تثبيت»، وستجد أيقونة بنفسجو بين تطبيقاتك'];
    var sh = el('div', 'bja-sheet');
    sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-label', 'ثبّت بنفسجو');
    sh.innerHTML = '<div class="in"><h2>ثبّت بنفسجو على جوالك</h2><p>تفتح المنصة بلمسة من شاشتك الرئيسية مثل أي تطبيق، وتعمل الألعاب والمحطات التي فتحتها حتى دون إنترنت.</p><ol>' +
      steps.map(function (s) { return '<li><span>' + s + '</span></li>'; }).join('') + '</ol><button type="button" class="bjb is-pri wide">فهمت</button></div>';
    function close() { sh.remove(); d.removeEventListener('keydown', k); }
    function k(e) { if (e.key === 'Escape') close(); }
    sh.addEventListener('click', function (e) { if (e.target === sh || e.target.closest('.bjb')) close(); });
    d.addEventListener('keydown', k);
    d.body.appendChild(sh);
    sh.querySelector('.bjb').focus();
  }


  /* ---------- الكسور: كل «أ/ب» يُكتب بسطًا فوق مقام ---------- */
  var FD = '0123456789٠١٢٣٤٥٦٧٨٩', FV = 'أابتثجحخدذرزسشصضطظعغفقكلمنهوي';
  var UL = ['كم', 'م', 'سم', 'ملم', 'كجم', 'جم', 'ل', 'مل', 'ريال'], UR = ['س', 'ث', 'د', 'ساعة', 'ثانية', 'دقيقة', 'يوم', 'لتر'];
  function stackText(raw) {
    var store = [], P0 = 0xE000;
    var isph = function (c) { return !!c && c.charCodeAt(0) >= P0 && c.charCodeAt(0) < P0 + 4000; };
    var atom = function (c) { return !!c && (FD.indexOf(c) > -1 || FV.indexOf(c) > -1 || '.٫²³ⁿ'.indexOf(c) > -1 || isph(c)); };
    var word = function (c) { return !!c && /[ء-ي]/.test(c) && !atom(c); };
    var lettersOk = function (t) { return (t.match(/[ء-ي]+/g) || []).every(function (r) { return r.length <= 2; }); };
    function mR(s, j) { var d = 0; for (var k = j; k < s.length; k++) { if (s[k] === '(') d++; else if (s[k] === ')') { d--; if (!d) return k; } } return -1; }
    function mL(s, j) { var d = 0; for (var k = j; k >= 0; k--) { if (s[k] === ')') d++; else if (s[k] === '(') { d--; if (!d) return k; } } return -1; }
    function strip(t) { t = t.trim(); return (t[0] === '(' && mR(t, 0) === t.length - 1) ? t.slice(1, -1).trim() : t; }
    function isUnit(s, i) {
      var l = /([ء-ي]+)\s*$/.exec(s.slice(0, i)), r = /^\s*([ء-ي]+)/.exec(s.slice(i + 1));
      return !!(l && r && UL.indexOf(l[1].replace(/^(ال|بال|لل)/, '')) > -1 && UR.indexOf(r[1]) > -1);
    }
    function left(s, i) {
      var j = i - 1; while (j >= 0 && s[j] === ' ') j--; if (j < 0) return null;
      var end = j + 1, st;
      if (s[j] === ')') { st = mL(s, j); if (st < 0) return null; while (st > 0 && atom(s[st - 1])) st--; }
      else if (atom(s[j]) && '.٫'.indexOf(s[j]) < 0) { st = j; while (st > 0 && atom(s[st - 1])) st--; }
      else return null;
      if (word(s[st - 1])) return null;
      var tok = s.slice(st, end); if (!lettersOk(tok[0] === '(' ? tok.slice(1, -1) : tok.replace(/\(.*\)$/, ''))) return null;
      return [st, end];
    }
    function right(s, i) {
      var j = i + 1; while (j < s.length && s[j] === ' ') j++; if (j >= s.length) return null;
      var st = j, end;
      if (s[j] === '(') { end = mR(s, j); if (end < 0) return null; end++; }
      else if (atom(s[j])) {
        end = j; while (end < s.length && atom(s[end]) && !('.٫'.indexOf(s[end]) > -1 && FD.indexOf(s[end + 1] || 'x') < 0)) end++;
        if (s[end] === '(') { var k = mR(s, end); if (k > 0) end = k + 1; }
      } else return null;
      while (s[end] === '^') {
        if (s[end + 1] === '(') { var q = mR(s, end + 1); if (q < 0) break; end = q + 1; }
        else { var e2 = end + 1; while (e2 < s.length && atom(s[e2])) e2++; if (e2 === end + 1) break; end = e2; }
      }
      if (word(s[end])) return null;
      if (!lettersOk(s.slice(st, end).replace(/^\(|\)$/g, ''))) return null;
      return [st, end];
    }
    var s = raw.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
    // التواريخ مثل 16/11/2026 ليست كسورًا
    s = s.replace(/[0-9٠-٩]{1,2}\/[0-9٠-٩]{1,2}\/[0-9٠-٩]{2,4}/g, function (m) { store.push(m); return String.fromCharCode(P0 + store.length - 1); });
    var changed = true, any = false;
    while (changed) {
      changed = false;
      for (var i = 0; i < s.length; i++) {
        if (s[i] !== '/' || isUnit(s, i)) continue;
        var L = left(s, i), R = right(s, i); if (!L || !R) continue;
        var lt = s.slice(L[0], L[1]), rt = s.slice(R[0], R[1]);
        if (lt.indexOf('/') > -1 || rt.indexOf('/') > -1) continue;
        var n = strip(lt), d2 = strip(rt); if (!n || !d2) continue;
        store.push('<span class="sfr"><span>' + n + '</span><span>' + d2 + '</span></span>');
        s = s.slice(0, L[0]) + String.fromCharCode(P0 + store.length - 1) + s.slice(R[1]);
        changed = any = true; break;
      }
    }
    if (!any) return null;
    for (var g = 0; g < 10 && /[-]/.test(s); g++) s = s.replace(/[-]/g, function (c) { return store[c.charCodeAt(0) - P0]; });
    return s;
  }
  function stackFractions(root) {
    if (!root) return;
    var w = d.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentElement;
      if (!p || p.closest('script,style,textarea,input,svg,code,.sfr')) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.indexOf('/') > -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    var list = [], n; while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var h = stackText(t.nodeValue); if (h == null) return;
      var tpl = d.createElement('template'); tpl.innerHTML = h; t.parentNode.replaceChild(tpl.content, t);
    });
  }

  /* ---------- واجهة مشتركة تستعملها الصفحة الرئيسية ---------- */
  window.BJA = {
    app: APP, ar: ar, ic: ic, install: install, stack: stackFractions, stackText: stackText, installed: installed, celebrate: celebrate, toast: netToast,
    canPrompt: function () { return !!deferred; },
    prog: function () { return load('bj_prog', {}); },
    last: function () { return load('bj_last', null); }
  };

  /* ---------- عامل الخدمة: العمل دون إنترنت ---------- */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', function () { navigator.serviceWorker.register(ROOT + 'sw.js').catch(function () {}); });
  }

  function init() {
    if (TYPE === 'deck') deckShell();
    else if (TYPE === 'sim') simShell();
    else topShell();
    if (TYPE === 'home' || TYPE === 'top') {
      stackFractions(d.body);
      var mo = new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (x) { if (x.nodeType === 1) stackFractions(x); else if (x.nodeType === 3 && x.parentElement) stackFractions(x.parentElement); }); }); });
      mo.observe(d.body, { childList: true, subtree: true });
    }
    if (APP) {
      /* في التطبيق: أي رابط للرئيسية القديمة يذهب لصفحة الطالب، وخانة «المحطات والجولات» تختفي */
      d.querySelectorAll('a[href]').forEach(function (a) {
        var h = a.getAttribute('href');
        if (/^(\.\.\/|\/)?index\.html(#.*)?$/.test(h) || h === '/' || h === './') {
          if (a.closest('.tabs')) a.hidden = true; else a.setAttribute('href', ROOT + 'claude.html');
        }
      });
    }
    d.dispatchEvent(new Event('bja:ready'));
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();

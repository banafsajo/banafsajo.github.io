/* بنفسجو — حيوية العروض: يرسم أشكال كل شريحة أمام الطالب كأنها تُرسم بالقلم.
   لا يغيّر أي محتوى أو وظيفة؛ يضيف حركة الرسم فقط عند ظهور الشريحة. */
(function () {
  'use strict';
  var H = document.documentElement;
  H.classList.add('bjd');
  if (/\/student\//.test(location.pathname)) H.classList.add('bjd-s');

  /* ===== ١) الكسور في المعادلات: أفقية (س/ص) لأنها أسهل في القراءة داخل المعادلة ===== */
  var VAR = /(^|[\s(=+×÷−\-<>≤≥،,:/])[سصعن]([\s)=+×÷−\-<>²³٢٣،,.:؟/]|$)/;
  function flat(el) {
    var t = '';
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) t += n.nodeValue;
      else if (n.nodeType === 1) {
        if (n.classList.contains('sfr') && n.children.length === 2) t += ' (' + flat(n.children[0]) + ') / (' + flat(n.children[1]) + ') ';
        else t += flat(n);
      }
    });
    return t;
  }
  function horizontal() {
    document.querySelectorAll('.slide').forEach(function (sl) {
      if (!sl.querySelector('.sfr')) return;
      var hit = false;
      sl.querySelectorAll('.step, .gq2, .kopt, .gsol, .note, .ex').forEach(function (e) {
        if (hit) return; var t = flat(e); if (/=/.test(t) && VAR.test(t)) hit = true;
      });
      if (!hit) return;
      sl.classList.add('bjd-hf');
      sl.querySelectorAll('.sfr').forEach(function (f) {
        [].forEach.call(f.children, function (c) {
          var t = flat(c).trim();
          if (t.length > 1 && /[+−\-×÷ ]/.test(t) && !(c.children.length === 1 && c.children[0].classList.contains('sfr') && c.textContent.trim() === c.children[0].textContent.trim())) c.classList.add('bjd-par');
        });
      });
    });
  }

  /* ===== ٢) الشرح: بطاقات قصيرة منظّمة بدل صفوف الكلام ===== */
  function splitKey(step) {
    if (step.classList.contains('ans') || step.querySelector('.bjd-k')) return;
    var nodes = [].slice.call(step.childNodes), acc = 0;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.nodeType === 3) {
        var m = n.nodeValue.search(/[:←]/);
        if (m >= 0) {
          var before = acc + m; if (before < 2 || before > 34) return;
          var sep = n.nodeValue.charAt(m), head = n.nodeValue.slice(0, m), tail = n.nodeValue.slice(m + 1);
          var k = document.createElement('b'); k.className = 'bjd-k' + (sep === '←' ? ' arr' : '');
          for (var j = 0; j < i; j++) k.appendChild(nodes[j]);
          k.appendChild(document.createTextNode(head.trim()));
          var v = document.createElement('span'); v.className = 'bjd-v';
          v.appendChild(document.createTextNode(tail.replace(/^\s+/, '')));
          for (j = i + 1; j < nodes.length; j++) v.appendChild(nodes[j]);
          n.remove(); step.appendChild(k); step.appendChild(v);
          return;
        }
        acc += n.nodeValue.length;
      } else if (n.nodeType === 1) {
        if (n.classList.contains('sfr')) acc += 2; else acc += n.textContent.length;
        if (acc > 34) return;
      }
    }
  }
  function trimDot(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), last = null, n;
    while ((n = w.nextNode())) if (n.nodeValue.trim()) last = n;
    if (last) last.nodeValue = last.nodeValue.replace(/[.\s]+$/, '');
  }
  function cards() {
    document.querySelectorAll('.slide:not(.game) .ex:not(.slide)').forEach(function (ex) {
      var steps = [].slice.call(ex.children).filter(function (c) { return c.classList.contains('step'); });
      var plain = steps.filter(function (c) { return !c.classList.contains('ans'); });
      if (!plain.length) return;
      steps.forEach(function (st) {
        splitKey(st); trimDot(st);
        if (st.classList.contains('ans')) { var w = document.createTreeWalker(st, NodeFilter.SHOW_TEXT), t; while ((t = w.nextNode())) t.nodeValue = t.nodeValue.replace(/✅\s*/, ''); }
      });
      var sl = ex.closest('.slide'), fig = sl && sl.querySelector('.figc, .cols > svg');
      if (plain.length >= 5) { ex.classList.add('bjd-cards', 'bjd-law'); ex.style.setProperty('--c', 2); }
      else { ex.classList.add('bjd-cards'); ex.style.setProperty('--c', fig ? Math.min(plain.length, 2) : Math.min(plain.length, 4)); }
      var cc = +ex.style.getPropertyValue('--c');
      plain.forEach(function (c, i) { if (i === plain.length - 1) c.classList.add('bjd-last'); if ((i + 1) % cc === 0) c.classList.add('bjd-re'); });
    });
    /* عنوان الحل: «الحل · مثال ٥-١» كبير، والموضوع سطر صغير تحته */
    document.querySelectorAll('.slide:not(.game) h2').forEach(function (h) {
      if (h.querySelector('.bjd-sub')) return;
      var f = h.firstChild; if (!f || f.nodeType !== 3) return;
      var m = f.nodeValue.indexOf(':'); if (m < 4 || !/^[^\u0600-\u06FF]{0,6}(الحل|عدّة|عدة)/.test(f.nodeValue)) return;
      var tail = f.nodeValue.slice(m + 1).trim(); f.nodeValue = f.nodeValue.slice(0, m);
      var sm = document.createElement('small'); sm.className = 'bjd-sub'; sm.textContent = tail;
      while (f.nextSibling) sm.appendChild(f.nextSibling);
      h.appendChild(sm);
    });
    document.querySelectorAll('.ghint').forEach(function (g) {
      if (/فكّر أولًا/.test(g.textContent)) g.textContent = 'فكّر أولًا… ثم اكشف الحل خطوة بخطوة';
    });
  }
  function tidy() { try { horizontal(); } catch (e) { } try { cards(); } catch (e) { } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tidy); else tidy();

  var RM = false;
  try { RM = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
  if (RM || !Element.prototype.animate) return;

  var SHAPES = 'path,line,polyline,polygon,rect,circle,ellipse';
  function stroked(el) {
    var cs = getComputedStyle(el);
    return cs.stroke && cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0 && (!cs.strokeDasharray || cs.strokeDasharray === 'none');
  }
  function draw(svg) {
    if (svg.closest('.bjv')) return; /* الفيديوهات لها محركها الخاص */
    var els = svg.querySelectorAll(SHAPES + ',text');
    if (!els.length) return;
    if (els.length > 260) { svg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' }); return; }
    var k = 0;
    els.forEach(function (el) {
      var delay = Math.min(900, k * 28); k++;
      if (el.tagName.toLowerCase() === 'text') {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: delay + 250, easing: 'ease-out', fill: 'backwards' });
        return;
      }
      if (stroked(el)) {
        var had = el.getAttribute('pathLength');
        el.setAttribute('pathLength', '1');
        var cs = getComputedStyle(el), fillOn = cs.fill && cs.fill !== 'none' && cs.fillOpacity !== '0';
        var a = el.animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], { duration: 650, delay: delay, easing: 'cubic-bezier(.4,.1,.2,1)', fill: 'backwards' });
        if (fillOn) el.animate([{ fillOpacity: 0 }, { fillOpacity: cs.fillOpacity || 1 }], { duration: 400, delay: delay + 380, easing: 'ease-out', fill: 'backwards' });
        a.onfinish = a.oncancel = function () { if (had == null) el.removeAttribute('pathLength'); else el.setAttribute('pathLength', had); };
      } else {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, delay: delay, easing: 'ease-out', fill: 'backwards' });
      }
    });
  }
  function play(slide) {
    slide.querySelectorAll('.figc svg, .kfig svg, svg.fig, .box svg').forEach(draw);
  }
  function init() {
    var slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    var mo = new MutationObserver(function (list) {
      list.forEach(function (m) {
        var s = m.target;
        var on = s.classList.contains('cur'), was = (m.oldValue || '').split(/\s+/).indexOf('cur') >= 0;
        if (on && !was) play(s);
      });
    });
    slides.forEach(function (s) { mo.observe(s, { attributes: true, attributeFilter: ['class'], attributeOldValue: true }); });
    var cur = document.querySelector('.slide.cur'); if (cur) play(cur);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

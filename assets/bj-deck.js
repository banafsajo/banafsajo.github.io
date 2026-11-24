/* بنفسجو — حيوية العروض: يرسم أشكال كل شريحة أمام الطالب كأنها تُرسم بالقلم.
   لا يغيّر أي محتوى أو وظيفة؛ يضيف حركة الرسم فقط عند ظهور الشريحة. */
(function () {
  'use strict';
  var H = document.documentElement;
  H.classList.add('bjd');
  if (/\/student\//.test(location.pathname)) H.classList.add('bjd-s');
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

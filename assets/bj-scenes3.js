/* بنفسجو — مشاهد الفيديوهات القصيرة (٣): الجمع الذكي، القوى، فيثاغورس، المقارنة */
(function () {
  'use strict';
  var B = window.BJV; if (!B) return;
  var F = B.F;
  function M(s) { return '<bdi dir="ltr">' + s + '</bdi>'; }

  /* تعبير فيه أُسّ: مقاطع {b:أساس,e:أس} أو {t:نص}؛ مركزه (0,0) ويُنقل بـ tf */
  var BWID = { 'أ': .36, 'ب': .74, 'ج': .66, 'ن': .6 };
  function expr(K, parent, segs, size, fill) {
    var g = K.g(parent), gap = size * .16, total = 0, ws = [], out = [], x;
    segs.forEach(function (s) {
      var bw = s.t != null ? 0 : (BWID[s.b] || .58) * size;
      var w = s.t != null ? s.t.length * size * (/^[+=−×÷<>]$/.test(s.t) ? .9 : .56) : bw + size * .5;
      s._bw = bw; ws.push(w); total += w + gap;
    });
    total -= gap; x = -total / 2;
    segs.forEach(function (s, i) {
      var w = ws[i], gg = K.g(g), col = s.c || fill;
      if (s.t != null) K.text(x + w / 2, size * .34, s.t, size, col, { ltr: 1 }, gg);
      else {
        K.text(x + s._bw / 2, size * .34, s.b, size, col, { ltr: 1 }, gg);
        K.text(x + s._bw + size * .24, size * .06, s.e, size * .74, col, { ltr: 1 }, gg);
      }
      out.push(gg); x += w + gap;
    });
    g.parts = out; return g;
  }

  /* ============ ٩) الجمع الذكي: من ١ إلى ١٠ ============ */
  B.scene('smart', {
    title: 'فيديو قصير: مجموع الأعداد من ١ إلى ١٠ بطريقة ذكية', dur: 31,
    caps: [
      [0, 'كم يساوي ' + M('١ + ٢ + ٣ + … + ١٠') + ' ؟'],
      [1.2, 'نبني درجًا: العمود الأول مربع واحد، والثاني مربعان…'],
      [5, 'ثم نضيف نسخة مقلوبة من الدرج نفسه'],
      [9, 'الدرجان معًا يصنعان مستطيلًا كاملًا'],
      [12.5, 'عرضه ١٠ وارتفاعه ١١ (لأن ١٠ + ١ = ١١)'],
      [16, 'مساحة المستطيل = ١٠ × ١١ = ١١٠'],
      [19.5, 'وهذا هو المجموع مرتين، فنأخذ نصفه فقط'],
      [23, 'المجموع = ' + F('١١٠', '٢') + ' = ٥٥'],
      [27, 'القاعدة لأي عدد ن: ' + F(M('ن × (ن + ١)'), '٢')]
    ],
    build: function (K) {
      var C = K.C, P = K.P, vis = K.vis, tf = K.tf, put = K.put;
      var s = 22, X0 = 84, BASE = 312, N = 10, TOP = BASE - 11 * s;
      var gA = K.g(), cols = [], labs = [], pcols = [], c, r;
      for (c = 0; c < N; c++) {
        var cg = K.g(gA);
        for (r = 0; r <= c; r++) K.rect(X0 + c * s + 1, BASE - (r + 1) * s + 1, s - 2, s - 2, C.cy, { r: 4 }, cg);
        cols.push(cg);
        labs.push(K.text(X0 + c * s + s / 2, BASE + 19, K.ar(c + 1), 13, C.dim, {}, gA));
      }
      for (c = 0; c < N; c++) {
        var pg = K.g(gA);
        for (r = c + 1; r <= N; r++) K.rect(X0 + c * s + 1, BASE - (r + 1) * s + 1, s - 2, s - 2, C.pk, { r: 4 }, pg);
        pcols.push(pg);
      }
      var box = K.rect(X0 - 1, TOP - 1, N * s + 2, 11 * s + 2, 'none', { s: C.yl, sw: 3, r: 6 }, gA);
      var dim = K.g(gA);
      K.line(X0, TOP - 10, X0 + N * s, TOP - 10, C.yl, 2, {}, dim); K.line(X0, TOP - 16, X0, TOP - 4, C.yl, 2, {}, dim); K.line(X0 + N * s, TOP - 16, X0 + N * s, TOP - 4, C.yl, 2, {}, dim);
      K.text(X0 + N * s / 2, TOP - 20, '١٠', 20, C.yl, {}, dim);
      K.line(X0 - 12, TOP, X0 - 12, BASE, C.yl, 2, {}, dim); K.line(X0 - 18, TOP, X0 - 6, TOP, C.yl, 2, {}, dim); K.line(X0 - 18, BASE, X0 - 6, BASE, C.yl, 2, {}, dim);
      K.text(X0 - 30, TOP + 5 * s + 8, '١١', 20, C.yl, {}, dim);
      var q = K.text(470, 92, '١ + ٢ + … + ١٠ = ؟', 24, C.ink, { ltr: 1 });
      var t2 = K.text(470, 168, '١٠ × ١١ = ١١٠', 28, C.yl, { ltr: 1 });
      var r3 = K.row(470, 234, [{ f: ['١١٠', '٢'] }, '=', '٥٥'], 34, C.gr);
      var lab = K.text(470, 292, 'القاعدة العامة', 15, C.dim, {});
      var r4 = K.row(470, 326, [{ f: ['ن × (ن + ١)', '٢'] }], 24, C.vi);
      var gd = K.guide(34, 352, .58), qs = '';
      return function (t) {
        var keep = 1 - P(t, 19.5, 21) * .88, i;
        for (i = 0; i < N; i++) {
          var a = P(t, 1.2 + i * .35, 1.6 + i * .35); vis(cols[i], a); vis(labs[i], a);
          var p = P(t, 5 + i * .3, 5.6 + i * .3, K.ease.out); vis(pcols[i], p * keep); tf(pcols[i], 0, -50 * (1 - p));
        }
        vis(box, P(t, 9, 10)); vis(dim, P(t, 12.5, 13.5));
        vis(q, P(t, 0, .6)); vis(t2, P(t, 16, 17));
        r3.forEach(function (e, k) { vis(e, P(t, 23 + k * .3, 23.5 + k * .3)); });
        vis(lab, P(t, 27, 27.6)); r4.forEach(function (e) { vis(e, P(t, 27.4, 28.2)); });
        var str = t >= 23.6 ? '١ + ٢ + … + ١٠ = ٥٥' : '١ + ٢ + … + ١٠ = ؟';
        if (str !== qs) { qs = str; q.textContent = str; }
        gd.update(t, 29.5);
      };
    }
  });

  /* ============ ١٠) القوى: الضرب المتكرر ============ */
  B.scene('powers', {
    title: 'فيديو قصير: القوى — الضرب المتكرر', dur: 31,
    caps: [
      [0, 'القوة: طريقة مختصرة لكتابة الضرب المتكرر'],
      [2.5, '٢<sup>٣</sup> تعني أن نضرب ٢ في نفسها ٣ مرات'],
      [6, M('٢ × ٢ × ٢ = ٨')],
      [9.8, 'لنرَ ماذا يحدث كلما زاد الأس'],
      [10.6, 'الأس ١: عددان فقط'],
      [15, 'الأس ٢: نضاعف فيصير ٤'],
      [19.5, 'الأس ٣: نضاعف مرة أخرى فيصير ٨'],
      [24, 'الأس ٤: يصير ١٦'],
      [27.8, 'الأس = عدد مرات الضرب في العدد نفسه']
    ],
    build: function (K) {
      var C = K.C, P = K.P, vis = K.vis, tf = K.tf, put = K.put;
      var g1 = K.g(), big = expr(K, g1, [{ b: '٢', e: '٣', c: C.yl }], 78, C.yl); tf(big, 320, 96);
      var row = K.row(320, 196, ['=', '٢', '×', '٢', '×', '٢', '=', '٨'], 42, C.ink, g1);
      var g2 = K.g(), cx = [520, 400, 262, 112], d = 22, cy0 = 160, exps = ['١', '٢', '٣', '٤'], vals = ['٢', '٤', '٨', '١٦'];
      var ns = [2, 4, 8, 16], cc = [2, 2, 4, 4], dots = [], labs = [], arrows = [];
      for (var k = 0; k < 4; k++) {
        var rows = ns[k] / cc[k], list = [];
        for (var i = 0; i < ns[k]; i++) {
          var col = i % cc[k], rw = Math.floor(i / cc[k]);
          var x = cx[k] + (col - (cc[k] - 1) / 2) * d, y = cy0 + (rw - (rows - 1) / 2) * d;
          list.push({ e: K.circle(x, y, 8, i < ns[k] / 2 ? C.cy : C.pk, {}, g2), x: x, y: y, nw: i >= ns[k] / 2 });
        }
        dots.push(list);
        var lb = expr(K, g2, [{ b: '٢', e: exps[k] }, { t: '= ' + vals[k] }], 30, C.ink); tf(lb, cx[k], 262); labs.push(lb);
        if (k > 0) arrows.push(K.text((cx[k] + cx[k - 1]) / 2 + 2, cy0 + 8, '× ٢', 22, C.yl, { ltr: 1 }, g2));
      }
      var top = K.text(320, 62, 'كل أسّ جديد يضاعف الناتج', 22, C.yl, {}, g2);
      var gd = K.guide(34, 352, .58), ta = [10.4, 14.9, 19.4, 23.9];
      return function (t) {
        var o1 = P(t, 0, .7) * (1 - P(t, 9.2, 9.8)); vis(g1, o1);
        tf(big, 320, 96, 0, .8 + .2 * P(t, 0, .8, K.ease.back));
        row.forEach(function (e, i) { vis(e, P(t, 2.8 + i * .45, 3.3 + i * .45) * (i > 5 ? 1 : 1)); });
        vis(g2, P(t, 9.8, 10.4));
        for (var k = 0; k < 4; k++) {
          dots[k].forEach(function (D, i) {
            var a = D.nw ? ta[k] + 1.1 + (i - dots[k].length / 2) * .08 : ta[k];
            var p = P(t, a, a + .5, K.ease.back); put(D.e, { r: (8 * p).toFixed(2) }); vis(D.e, Math.min(1, p * 2));
          });
          vis(labs[k], P(t, ta[k] + 2.3, ta[k] + 2.9));
          if (k > 0) vis(arrows[k - 1], P(t, ta[k] - .8, ta[k] - .3));
        }
        vis(top, P(t, 27.5, 28.3));
        gd.update(t, 29.5);
      };
    }
  });

  /* ============ ١١) فيثاغورس: المربعات على الأضلاع ============ */
  B.scene('triangles', {
    title: 'فيديو قصير: نظرية فيثاغورس بالمربعات', dur: 36,
    caps: [
      [0, 'مثلث قائم الزاوية: ضلعاه القصيران ٣ و ٤ ووتره ٥'],
      [3.5, 'نرسم مربعًا على الضلع ٣: مساحته ٩ مربعات'],
      [8, 'ومربعًا على الضلع ٤: مساحته ١٦ مربعًا'],
      [13, 'ومربعًا على الوتر ٥: مساحته ٢٥ مربعًا'],
      [19.5, 'انظر: مربعا الضلعين يملآن مربع الوتر تمامًا'],
      [25, M('٩ + ١٦ = ٢٥') + ' ✓'],
      [29.5, 'في كل مثلث قائم: مربع الوتر = مجموع مربعي الضلعين الآخرين']
    ],
    build: function (K) {
      var C = K.C, P = K.P, vis = K.vis, tf = K.tf, put = K.put;
      var u = 24, Cx = 232, Cy = 214, Ax = Cx, Ay = Cy - 4 * u, Bx = Cx + 3 * u, By = Cy;
      var theta = Math.atan2(By - Ay, Bx - Ax) * 180 / Math.PI;
      var tri = K.path('M' + Cx + ',' + Cy + ' L' + Bx + ',' + By + ' L' + Ax + ',' + Ay + ' Z', 'rgba(255,255,255,.07)', C.ink, 3);
      var rm = K.path('M' + (Cx + 12) + ',' + Cy + ' v-12 h-12', 'none', C.ink, 2);
      var l3 = K.text(Cx + 36, Cy + 28, '٣', 22, C.cy), l4 = K.text(Cx - 20, Cy - 44, '٤', 22, C.pk), l5 = K.text(Bx - 4, Ay + 36, '٥', 22, C.yl);
      function square(tx, ty, rot, n, fill, ov) {
        var g = K.g(); tf(g, tx, ty, rot);
        var out = K.rect(0, ov ? -n * u : 0, n * u, n * u, 'rgba(255,255,255,.04)', { s: fill, sw: 3, r: 4 }, g), cells = [];
        for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) cells.push(K.rect(i * u + 1.5, (ov ? -(j + 1) * u : j * u) + 1.5, u - 3, u - 3, fill, { r: 3 }, g));
        return { g: g, out: out, cells: cells };
      }
      var sq3 = square(Cx, Cy, 0, 3, C.cy), sq4 = square(Cx - 4 * u, Cy - 4 * u, 0, 4, C.pk), sq5 = square(Ax, Ay, theta, 5, C.yl, 1);
      var ovl = [], i;
      for (i = 0; i < 25; i++) {
        var ci = Math.floor(i / 5), cj = i % 5, which = ci < 3 && cj < 3;
        ovl.push(K.rect(ci * u + 1.5, -(cj + 1) * u + 1.5, u - 3, u - 3, which ? C.cy : C.pk, { r: 3 }, sq5.g));
      }
      var n9 = K.text(Cx + 36, Cy + 36 + 8, '٩', 24, C.bg), n16 = K.text(Cx - 48, Cy - 48 + 8, '١٦', 26, C.bg), n25 = K.text(316, 130 + 8, '٢٥', 28, C.bg);
      var e1 = expr(K, null, [{ b: '٣', e: '٢', c: C.cy }, { t: '= ٩' }], 28, C.cy), e2 = expr(K, null, [{ b: '٤', e: '٢', c: C.pk }, { t: '= ١٦' }], 28, C.pk), e3 = expr(K, null, [{ b: '٥', e: '٢', c: C.yl }, { t: '= ٢٥' }], 28, C.yl);
      tf(e1, 520, 86); tf(e2, 520, 134); tf(e3, 520, 182);
      var e4 = K.text(520, 252, '٩ + ١٦ = ٢٥  ✓', 28, C.gr, { ltr: 1 });
      var e5 = expr(K, null, [{ b: 'أ', e: '٢', c: C.cy }, { t: '+' }, { b: 'ب', e: '٢', c: C.pk }, { t: '=' }, { b: 'ج', e: '٢', c: C.yl }], 30, C.ink); tf(e5, 520, 318);
      var gd = K.guide(34, 352, .58);
      function fillSq(sq, t0, step, t) { sq.cells.forEach(function (c, i) { var a = P(t, t0 + i * step, t0 + i * step + .35, K.ease.out); vis(c, a); }); }
      return function (t) {
        vis(tri, P(t, 0, 1)); vis(rm, P(t, 1, 1.6));
        var lo = P(t, 1.4, 2) * (1 - P(t, 3.2, 3.8)); vis(l3, lo); vis(l4, lo); vis(l5, lo);
        vis(sq3.out, P(t, 3.5, 4.2)); fillSq(sq3, 4, .2, t); vis(n9, P(t, 6, 6.6));
        vis(sq4.out, P(t, 8, 8.7)); fillSq(sq4, 8.6, .14, t); vis(n16, P(t, 11, 11.6));
        vis(sq5.out, P(t, 13, 13.7)); fillSq(sq5, 13.6, .11, t);
        ovl.forEach(function (o, k) { vis(o, P(t, 19.6 + k * .05, 20.2 + k * .05) * 1); });
        vis(n25, P(t, 15.8, 16.4) * (1 - P(t, 19.6, 20.1)));
        vis(e1, P(t, 6.2, 6.8)); vis(e2, P(t, 11.2, 11.8)); vis(e3, P(t, 17, 17.6));
        vis(e4, P(t, 25, 25.8)); vis(e5, P(t, 29.5, 30.3));
        gd.update(t, 32);
      };
    }
  });

  /* ============ ١٢) المقارنة: خط الأعداد ثم الكسور ============ */
  B.scene('compare', {
    title: 'فيديو قصير: مقارنة الأعداد على خط الأعداد ومقارنة الكسور', dur: 34,
    caps: [
      [0, 'على خط الأعداد: كلما اتجهنا يمينًا كبر العدد'],
      [3, 'قارن بين ' + M('−٣') + ' و ' + M('−١')],
      [6, 'نتحرك من ' + M('−٣') + ' يمينًا فنصل إلى ' + M('−١') + '، إذن ' + M('−١') + ' أكبر'],
      [10.5, 'ونضيف ٠ و ٢ لنرتّب أربعة أعداد'],
      [12.5, 'من الأصغر إلى الأكبر: ' + M('−٣ < −١ < ٠ < ٢')],
      [16, 'والآن أيّهما أكبر: ' + F('٣', '٤') + ' أم ' + F('٥', '٨') + ' ؟'],
      [19.5, 'نقسم كل ربع إلى جزأين متساويين'],
      [22.5, F('٣', '٤') + ' = ' + F('٦', '٨')],
      [25.5, 'المقامان صارا متساويين، فنقارن البسطين فقط'],
      [29, '٦ أكبر من ٥، إذن ' + F('٣', '٤') + ' أكبر من ' + F('٥', '٨')]
    ],
    build: function (K) {
      var C = K.C, P = K.P, vis = K.vis, tf = K.tf, put = K.put;
      var g1 = K.g(), LY = 170, X = function (v) { return 320 + 52 * v; };
      K.line(100, 62, 540, 62, C.dim, 2, {}, g1); K.path('M532,55 L542,62 L532,69', 'none', C.dim, 2, {}, g1);
      K.text(66, 68, 'أصغر', 16, C.dim, {}, g1); K.text(590, 68, 'أكبر', 16, C.dim, {}, g1);
      K.line(X(-5) - 12, LY, X(5) + 12, LY, C.ink, 3, {}, g1);
      var tl = {}, v;
      for (v = -5; v <= 5; v++) {
        K.line(X(v), LY - 8, X(v), LY + 8, C.ink, 2, {}, g1);
        tl[v] = K.text(X(v), LY + 36, (v < 0 ? '−' : '') + K.ar(Math.abs(v)), 17, C.dim, { ltr: 1 }, g1);
      }
      function dot(vv, col) { return { e: K.circle(X(vv), LY, 10, col, { s: C.bg, sw: 3 }, g1), v: vv, c: col }; }
      var dA = dot(-3, C.cy), dB = dot(-1, C.pk), dC = dot(0, C.yl), dD = dot(2, C.gr);
      var arc = K.path('M' + X(-3) + ',' + (LY - 22) + ' Q' + X(-2) + ',' + (LY - 78) + ' ' + X(-1) + ',' + (LY - 22), 'none', C.yl, 3, {}, g1);
      var head = K.path('M-7,-9 L0,0 L7,-9', 'none', C.yl, 3, {}, g1); tf(head, X(-1), LY - 20);
      var s1 = K.text(320, 272, '−٣ < −١', 36, C.ink, { ltr: 1 }, g1);
      var s2 = K.text(320, 272, '−٣ < −١ < ٠ < ٢', 34, C.ink, { ltr: 1 }, g1);
      var g2 = K.g(), x0 = 140, bw = 400, y1 = 100, y2 = 180, bh = 44, i;
      K.rect(x0, y1, bw, bh, 'rgba(255,255,255,.06)', { s: C.dim, sw: 2, r: 6 }, g2); K.rect(x0, y2, bw, bh, 'rgba(255,255,255,.06)', { s: C.dim, sw: 2, r: 6 }, g2);
      var sh1 = [], sh2 = [], dv8 = [];
      for (i = 0; i < 3; i++) sh1.push(K.rect(x0 + i * 100 + 1, y1 + 1, 98, bh - 2, C.cy, { r: 3 }, g2));
      for (i = 0; i < 5; i++) sh2.push(K.rect(x0 + i * 50 + 1, y2 + 1, 48, bh - 2, C.pk, { r: 3 }, g2));
      for (i = 1; i < 8; i++) { K.line(x0 + i * 50, y2 + 2, x0 + i * 50, y2 + bh - 2, C.bg, 2, {}, g2); if (i % 2) dv8.push(K.line(x0 + i * 50, y1 + 2, x0 + i * 50, y1 + bh - 2, C.bg, 2, {}, g2)); }
      for (i = 1; i < 4; i++) K.line(x0 + i * 100, y1 + 2, x0 + i * 100, y1 + bh - 2, C.bg, 4, {}, g2);
      var f1 = K.frac(88, y1 + 22, '٣', '٤', 32, C.cy, g2), f2 = K.frac(88, y2 + 22, '٥', '٨', 32, C.pk, g2);
      var hl = K.rect(x0 + 250, y1 - 3, 50, bh + 6, 'none', { s: C.yl, sw: 3, r: 5 }, g2), gl = K.line(x0 + 250, y1 - 8, x0 + 250, y2 + bh + 10, C.yl, 2, { dash: '5 5' }, g2);
      var lx = K.text(x0 + 275, y1 - 16, 'جزء زائد', 15, C.yl, {}, g2);
      var cmp = K.row(320, 300, [{ f: ['٦', '٨'] }, '>', { f: ['٥', '٨'] }], 34, C.ink, g2);
      var gd = K.guide(34, 352, .58), sw = false;
      return function (t) {
        vis(g1, P(t, 0, .6) * (1 - P(t, 15, 15.8)));
        [dA, dB, dC, dD].forEach(function (D, k) {
          var t0 = k < 2 ? 3 + k * .5 : 10.5 + (k - 2) * .5, p = P(t, t0, t0 + .7, K.ease.back);
          vis(D.e, Math.min(1, p * 2)); put(D.e, { cy: (LY - 46 * (1 - p)).toFixed(1) });
          put(tl[D.v], { fill: p > .5 ? D.c : C.dim });
        });
        var ap = P(t, 6, 7.6), fo = 1 - P(t, 11, 11.5); put(arc, { 'stroke-dasharray': 130, 'stroke-dashoffset': (130 * (1 - ap)).toFixed(1) });
        vis(arc, ap > 0 ? fo : 0); vis(head, P(t, 7.4, 7.8) * fo);
        vis(s1, P(t, 8, 8.8) * (1 - P(t, 11.3, 11.9))); vis(s2, P(t, 12.5, 13.3));
        vis(g2, P(t, 15.8, 16.6));
        sh1.forEach(function (r, k) { vis(r, P(t, 16.4 + k * .2, 16.9 + k * .2)); });
        dv8.forEach(function (l) { vis(l, P(t, 19.6, 20.4)); });
        sh2.forEach(function (r, k) { vis(r, P(t, 16.4 + k * .15, 16.9 + k * .15)); });
        var want = t >= 22.5; if (want !== sw) { sw = want; if (sw) f1.set('٦', '٨'); else f1.set('٣', '٤'); }
        vis(hl, P(t, 25.8, 26.4)); vis(gl, P(t, 25.8, 26.4)); vis(lx, P(t, 26, 26.6));
        cmp.forEach(function (e, k) { vis(e, P(t, 27.4 + k * .35, 27.9 + k * .35)); });
        gd.update(t, 30);
      };
    }
  });
})();

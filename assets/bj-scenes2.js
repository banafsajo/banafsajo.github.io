/* بنفسجو — مشاهد الفيديوهات القصيرة (٢): النسب، المعادلات، الزوايا، المساحة */
(function () {
  'use strict';
  var B = window.BJV; if (!B) return;
  var F = B.F;

  /* ============ ٥) النسب والتناسب ============ */
  B.scene('ratio', {
    title: 'فيديو قصير: توزيع مبلغ بنسبة ثم تكافؤ النسب', dur: 33,
    caps: [
      [0, 'نريد توزيع ٥٠ ريالًا بين ليلى وعمر بنسبة ٢ : ٣'],
      [3, '٢ + ٣ = ٥ أجزاء متساوية، نقسم الشريط إليها'],
      [6.6, 'قيمة الجزء الواحد = ' + F('٥٠', '٥') + ' = ١٠ ريالات'],
      [10.4, 'ليلى: ٢ × ١٠ = ٢٠ ريالًا · عمر: ٣ × ١٠ = ٣٠ ريالًا'],
      [14.4, 'نتحقق: ٢٠ + ٣٠ = ٥٠ ✓'],
      [18, 'وماذا لو ضاعفنا الطرفين معًا؟'],
      [21, 'النسبة ٢ : ٣ = ٤ : ٦ = ٦ : ٩'],
      [27, 'نضرب الطرفين في العدد نفسه فتبقى النسبة كما هي']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar;
      var g1 = K.g(), X0 = 120, BW = 400, Y = 100, BH = 60, w = BW / 5;
      K.text(320, 58, '٥٠ ريالًا', 26, C.yl, {}, g1);
      K.text(X0 + w, 88, 'ليلى', 17, C.pk, {}, g1); K.text(X0 + 3.5 * w, 88, 'عمر', 17, C.cy, {}, g1);
      K.rect(X0, Y, BW, BH, C.yl, { r: 8 }, g1);
      var blk = [], vals = [];
      for (var i = 0; i < 5; i++) {
        blk.push(K.rect(X0 + i * w + 1, Y, w - 2, BH, i < 2 ? C.pk : C.cy, { r: 6 }, g1));
        vals.push(K.text(X0 + i * w + w / 2, Y + BH / 2, '١٠', 26, C.bg, { mid: 1, ltr: 1 }, g1));
      }
      var cover = K.rect(X0, Y, BW, BH, C.yl, { r: 8 }, g1);
      var br1 = K.path('M' + (X0 + 2) + ',' + (Y + BH + 12) + ' v8 H' + (X0 + 2 * w - 2) + ' v-8', 'none', C.pk, 3, {}, g1), br2 = K.path('M' + (X0 + 2 * w + 2) + ',' + (Y + BH + 12) + ' v8 H' + (X0 + BW - 2) + ' v-8', 'none', C.cy, 3, {}, g1);
      var tx1 = K.text(X0 + w, Y + BH + 52, '٢ × ١٠ = ٢٠', 24, C.pk, { ltr: 1 }, g1), tx2 = K.text(X0 + 3.5 * w, Y + BH + 52, '٣ × ١٠ = ٣٠', 24, C.cy, { ltr: 1 }, g1);
      var one = K.row(320, 262, [{ f: ['٥٠', '٥'] }, '=', '١٠'], 30, C.ink, g1);
      var chk = K.text(320, 322, '٢٠ + ٣٠ = ٥٠  ✓', 28, C.gr, { ltr: 1 }, g1);
      var g2 = K.g(), BASE = 312, bh = 20, bw = 74, XP = 130, XC = 226, cols2 = [];
      K.line(XP - 20, BASE + 3, XC + bw + 20, BASE + 3, C.dim, 2, {}, g2);
      var pB = [], cB = [];
      for (var k = 0; k < 9; k++) { pB.push(K.rect(XP, BASE - (k + 1) * (bh + 2), bw, bh, C.pk, { r: 4 }, g2)); cB.push(K.rect(XC, BASE - (k + 1) * (bh + 2), bw, bh, C.cy, { r: 4 }, g2)); }
      var rt = [K.text(470, 108, '٢ : ٣', 40, C.ink, { ltr: 1 }, g2), K.text(470, 176, '= ٤ : ٦', 40, C.ink, { ltr: 1 }, g2), K.text(470, 244, '= ٦ : ٩', 40, C.ink, { ltr: 1 }, g2)];
      var tg = [K.text(570, 144, '× ٢', 22, C.yl, { ltr: 1 }, g2), K.text(570, 212, '× ٣', 22, C.yl, { ltr: 1 }, g2)];
      var gd = K.guide(34, 352, .58);
      return function (t) {
        vis(g1, P(t, 0, .6) * (1 - P(t, 17, 17.8)));
        vis(cover, 1 - P(t, 3, 4)); put(cover, { x: (X0 + BW * P(t, 3, 4)).toFixed(1), width: (BW * (1 - P(t, 3, 4))).toFixed(1) });
        blk.forEach(function (b, i) { vis(b, P(t, 3 + i * .35, 3.5 + i * .35)); });
        vals.forEach(function (v, i) { vis(v, P(t, 7.5 + i * .25, 8 + i * .25)); });
        vis(br1, P(t, 10.6, 11.2)); vis(br2, P(t, 11, 11.6)); vis(tx1, P(t, 11.4, 12)); vis(tx2, P(t, 12, 12.6));
        one.forEach(function (e, i) { vis(e, P(t, 6.8 + i * .4, 7.2 + i * .4)); });
        vis(chk, P(t, 14.6, 15.4));
        vis(g2, P(t, 17.8, 18.6));
        function nBlk(a, n, from) { return from + (n - from) * a; }
        var s1 = P(t, 21.2, 22.8), s2 = P(t, 24.2, 25.8);
        var np = Math.round(2 + 2 * s1 + 2 * s2), nc = Math.round(3 + 3 * s1 + 3 * s2);
        pB.forEach(function (b, i) { var base = i < 2 ? 1 : 0; var on = P(t, 18.8 + i * .12, 19.2 + i * .12) * (i < 2 ? 1 : 0) + (i >= 2 && i < 4 ? s1 : 0) + (i >= 4 && i < 6 ? s2 : 0); vis(b, on); });
        cB.forEach(function (b, i) { var on = P(t, 18.8 + i * .12, 19.2 + i * .12) * (i < 3 ? 1 : 0) + (i >= 3 && i < 6 ? s1 : 0) + (i >= 6 && i < 9 ? s2 : 0); vis(b, on); });
        vis(rt[0], P(t, 19, 19.6)); vis(rt[1], P(t, 22.6, 23.2)); vis(rt[2], P(t, 25.6, 26.2)); vis(tg[0], P(t, 21, 21.6) * (1 - P(t, 23.4, 23.8))); vis(tg[1], P(t, 24, 24.6) * (1 - P(t, 26.4, 26.8)));
        gd.update(t, 29.5);
      };
    }
  });

  /* ============ ٦) المعادلات: الميزان ============ */
  B.scene('equations', {
    title: 'فيديو قصير: ميزان المعادلة، ما تفعله بكفة تفعله بالأخرى', dur: 34,
    caps: [
      [0, 'الميزان متوازن: س + ٣ = ٨'],
      [3.2, 'نرفع ٣ من كفة واحدة فقط… فيختل الميزان!'],
      [6.2, 'نرفع ٣ من الكفة الأخرى أيضًا فيتوازن من جديد'],
      [9.4, 'الآن بقي س وحدها: س = ٥'],
      [12, 'نتحقق: ٥ + ٣ = ٨ ✓'],
      [15, 'معادلة ثانية: ٢س = ١٠'],
      [18.4, 'نقسم الكفتين على ٢: نأخذ نصف ما في كل كفة'],
      [24, 'س = ٥ مرة أخرى'],
      [28, 'القاعدة الذهبية: ما تفعله بطرف تفعله بالطرف الآخر']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf;
      var PX = 320, PY = 216, HL = 200;
      K.path('M' + PX + ',' + PY + ' L' + PX + ',318 M' + (PX - 54) + ',320 H' + (PX + 54), 'none', C.dim, 6);
      K.circle(PX, PY, 9, C.yl);
      var beam = K.g();
      K.line(-HL, 0, HL, 0, C.ink, 6, {}, beam);
      var eq = K.text(320, 56, 'س + ٣ = ٨', 40, C.ink, { ltr: 1 });
      function pan() {
        var g = K.g(); K.line(0, 0, -62, 66, C.dim, 2, {}, g); K.line(0, 0, 62, 66, C.dim, 2, {}, g);
        K.rect(-76, 66, 152, 8, C.vi, { r: 4 }, g); return g;
      }
      var pl = pan(), pr = pan();
      function chip(g, color) { var gg = K.g(g); K.rect(0, 0, 15, 15, color, { r: 3 }, gg); return gg; }
      function xb(g) { var gg = K.g(g); K.rect(0, 0, 34, 34, C.yl, { r: 6 }, gg); K.text(17, 17, 'س', 24, C.bg, { mid: 1 }, gg); return gg; }
      /* الجزء الأول */
      var x1 = xb(pl), l1 = [], r1 = [];
      for (var i = 0; i < 3; i++) l1.push(chip(pl, C.cy)); for (i = 0; i < 8; i++) r1.push(chip(pr, C.cy));
      /* الجزء الثاني */
      var x2a = xb(pl), x2b = xb(pl), r2 = []; for (i = 0; i < 10; i++) r2.push(chip(pr, C.cy));
      var tagL = K.text(0, -34, '', 24, C.rd, { ltr: 1 }, pl), tagR = K.text(0, -34, '', 24, C.rd, { ltr: 1 }, pr);
      var okT = K.text(320, 346, '', 20, C.gr, { ltr: 1 });
      function place(g, lx, ly, o, sc) { tf(g, lx, ly, 0, sc == null ? 1 : sc); vis(g, o); }
      var gd = K.guide(34, 352, .58);
      return function (t) {
        /* الجزء الأول: t < 14 ، الثاني: t >= 14.4 */
        var part2 = t >= 14.4, pr1 = 1 - P(t, 13.4, 14.2), pr2 = P(t, 14.4, 15.2);
        var kl = [P(t, 3.4, 4.2, K.ease.inn), P(t, 3.9, 4.7, K.ease.inn), P(t, 4.4, 5.2, K.ease.inn)];
        var kr = [P(t, 6.4, 7.2, K.ease.inn), P(t, 6.9, 7.7, K.ease.inn), P(t, 7.4, 8.2, K.ease.inn)];
        var weightL1 = 5 + (3 - (kl[0] + kl[1] + kl[2])), weightR1 = 8 - (kr[0] + kr[1] + kr[2]);
        var kx = P(t, 19.4, 20.4, K.ease.inn), kr2 = [0, 1, 2, 3, 4].map(function (j) { return P(t, 20 + j * .3, 20.8 + j * .3, K.ease.inn); });
        var weightL2 = 5 + 5 * (1 - kx), weightR2 = 10 - kr2.reduce(function (a, b) { return a + b; }, 0);
        var wl = part2 ? weightL2 : weightL1, wr = part2 ? weightR2 : weightR1;
        var th = K.clamp((wr - wl) * 3.4, -15, 15) * Math.PI / 180 * 1;
        var deg = th * 180 / Math.PI + Math.sin(t * 2.4) * .35;
        put(beam, { transform: 'translate(' + PX + ',' + PY + ') rotate(' + deg.toFixed(2) + ')' });
        var a = deg * Math.PI / 180, ex = HL * Math.cos(a), ey = HL * Math.sin(a);
        tf(pl, PX - ex, PY - ey); tf(pr, PX + ex, PY + ey);
        /* أماكن العناصر داخل الكفة (إحداثيات محلية، سطح الكفة y=66) */
        place(x1, -72, 66 - 34, pr1);
        l1.forEach(function (c, i) { place(c, -30 + i * 17, 66 - 15 - 0 - kl[i] * 70, (1 - kl[i]) * pr1); });
        r1.forEach(function (c, i) { var k = i >= 5 ? kr[i - 5] : 0; place(c, -42 + (i % 5) * 17, 66 - 15 - Math.floor(i / 5) * 17 - k * 70, (1 - k) * pr1); });
        place(x2a, -72, 66 - 34, pr2); place(x2b, -36, 66 - 34 - kx * 80, pr2 * (1 - kx));
        r2.forEach(function (c, i) { var k = i >= 5 ? kr2[i - 5] : 0; place(c, -42 + (i % 5) * 17, 66 - 15 - Math.floor(i / 5) * 17 - k * 70, pr2 * (1 - k)); });
        tagL.textContent = part2 ? '÷ ٢' : '− ٣'; tagR.textContent = part2 ? '÷ ٢' : '− ٣';
        var tl = part2 ? P(t, 18.6, 19.2) * (1 - P(t, 23, 23.6)) : P(t, 3.2, 3.8) * (1 - P(t, 8.6, 9.2));
        var trr = part2 ? P(t, 20, 20.6) * (1 - P(t, 23, 23.6)) : P(t, 6.2, 6.8) * (1 - P(t, 8.6, 9.2));
        vis(tagL, tl); vis(tagR, trr);
        var txt = !part2 ? (t < 9.2 ? 'س + ٣ = ٨' : 'س = ٥') : (t < 23.6 ? '٢س = ١٠' : 'س = ٥');
        if (eq.textContent !== txt) eq.textContent = txt;
        vis(eq, 1);
        okT.textContent = t > 12 && t < 14 ? '٥ + ٣ = ٨  ✓' : (t > 25 && t < 28 ? '٢ × ٥ = ١٠  ✓' : ''); vis(okT, P(t, 12, 12.6) * (1 - P(t, 13.4, 14)) + P(t, 25, 25.6) * (1 - P(t, 27.4, 28)));
        gd.update(t, 30);
      };
    }
  });

  /* ============ ٧) الزوايا: القاطع ومجموع زوايا المثلث ============ */
  B.scene('angles', {
    title: 'فيديو قصير: زوايا المتوازيين والقاطع، ومجموع زوايا المثلث', dur: 36,
    caps: [
      [0, 'مستقيمان متوازيان يقطعهما قاطع — ننظر إلى الزوايا الثماني'],
      [3.2, 'نُدير القاطع ونراقب القياسات'],
      [10, 'كل الزوايا الحادة متساوية دائمًا'],
      [14.4, 'وكل الزوايا المنفرجة متساوية أيضًا'],
      [17.2, 'والحادة + المنفرجة = ١٨٠° مهما أدرنا القاطع'],
      [20.4, 'والآن مثلث: نلوّن زواياه الثلاث'],
      [23, 'نقصّ الزوايا الثلاث ونجمعها عند نقطة واحدة'],
      [29, 'تكوّن خطًا مستقيمًا: مجموع زوايا المثلث = ١٨٠°']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar, rad = Math.PI / 180;
      function sec(g, cx, cy, r, a0, span, fill) {
        var x0 = cx + r * Math.cos(a0 * rad), y0 = cy + r * Math.sin(a0 * rad), x1 = cx + r * Math.cos((a0 + span) * rad), y1 = cy + r * Math.sin((a0 + span) * rad);
        return 'M' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' L' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + r + ',' + r + ' 0 ' + (span > 180 ? 1 : 0) + ' 1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Z';
      }
      var g1 = K.g(), Y1 = 96, Y2 = 226, MX = 320, MY = 161;
      K.line(50, Y1, 590, Y1, C.ink, 3, {}, g1); K.line(50, Y2, 590, Y2, C.ink, 3, {}, g1);
      K.text(60, Y1 - 10, '//', 18, C.dim, { a: 'start', ltr: 1 }, g1);
      var tr = K.line(0, 0, 0, 0, C.yl, 4, {}, g1);
      var S = []; /* ثمانية قطاعات */
      for (var i = 0; i < 8; i++) S.push(K.path('', i % 2 === 0 ? C.cy : C.pk, null, 0, { op: .5 }, g1));
      var lab = [K.text(0, 0, '', 15, C.cy, { ltr: 1 }, g1), K.text(0, 0, '', 15, C.pk, { ltr: 1 }, g1), K.text(0, 0, '', 15, C.cy, { ltr: 1 }, g1), K.text(0, 0, '', 15, C.pk, { ltr: 1 }, g1)];
      var rd = K.text(320, 40, '', 24, C.ink, { ltr: 1 }, g1), rd2 = K.text(320, 66, '', 18, C.dim, {}, g1);
      var cLeg1 = K.circle(470, 338, 6, C.cy, {}, g1), cLegT1 = K.text(500, 338, 'حادة', 15, C.cy, { mid: 1 }, g1), cLeg2 = K.circle(545, 338, 6, C.pk, {}, g1), cLegT2 = K.text(580, 338, 'منفرجة', 15, C.pk, { mid: 1 }, g1);
      /* المثلث */
      var g2 = K.g(), A = [150, 262], Bp = [410, 262], Cp = [150 + 239.6 * Math.cos(50 * rad), 262 - 239.6 * Math.sin(50 * rad)];
      var tri = K.path('M' + A + ' L' + Bp + ' L' + Cp + ' Z', 'rgba(255,255,255,.05)', C.ink, 3, {}, g2);
      function ang(p, q) { return Math.atan2(q[1] - p[1], q[0] - p[0]) / rad; }
      function norm(a) { while (a < 0) a += 360; while (a >= 360) a -= 360; return a; }
      var W = [
        { c: A, a0: norm(ang(A, Cp)), span: 0, color: C.cy, tgt: 0 },
        { c: Bp, a0: norm(ang(Bp, A)), span: 0, color: C.pk, tgt: 0 },
        { c: Cp, a0: norm(ang(Cp, Bp)), span: 0, color: C.yl, tgt: 0 }
      ];
      W[0].span = norm(ang(A, Bp) - W[0].a0 + 360); W[1].span = norm(ang(Bp, Cp) - W[1].a0 + 360); W[2].span = norm(ang(Cp, A) - W[2].a0 + 360);
      var Q = [330, 322], r2 = 34; /* هدف التجميع: فوق الخط المستقيم */
      /* الترتيب على الخط من اليسار: ب، ج، أ */
      var order = [1, 2, 0], sA = 180; W[1].tgt = 180; W[2].tgt = 180 + W[1].span; W[0].tgt = 180 + W[1].span + W[2].span;
      var wp = W.map(function (w) { return K.path('', w.color, null, 0, { op: .85 }, g2); });
      var wl = W.map(function (w) { return K.text(0, 0, '', 15, C.bg, { ltr: 1 }, g2); });
      var line180 = K.line(Q[0] - 90, Q[1], Q[0] + 90, Q[1], C.ink, 3, {}, g2);
      var sum = K.text(320, 346, Math.round(W[0].span) + ' ', 24, C.yl, { ltr: 1 }, g2);
      var vals = W.map(function (w) { return Math.round(w.span); });
      sum.textContent = ar(vals[0]) + '° + ' + ar(vals[1]) + '° + ' + ar(vals[2]) + '° = ' + ar(vals[0] + vals[1] + vals[2]) + '°';
      var gd = K.guide(34, 352, .58);
      return function (t) {
        vis(g1, P(t, 0, .6) * (1 - P(t, 19.4, 20.2)));
        var th = 60 + 60 * P(t, 3.4, 7.4) - 45 * P(t, 8, 11.6) + 30 * P(t, 12, 15.4); th = K.clamp(th, 30, 150);
        var cot = Math.cos(th * rad) / Math.sin(th * rad);
        var Tx = MX + (MY - Y1) * cot, Bx = MX - (Y2 - MY) * cot;
        var ex = Math.cos(th * rad), ey = -Math.sin(th * rad);
        put(tr, { x1: (Tx + ex * 40).toFixed(1), y1: (Y1 + ey * 40).toFixed(1), x2: (Bx - ex * 40).toFixed(1), y2: (Y2 - ey * 40).toFixed(1) });
        var r = 26, sp = [[-th, th, 0], [-180, 180 - th, 1], [180 - th, th, 0], [0, 180 - th, 1]];
        for (var i = 0; i < 4; i++) {
          put(S[i], { d: sec(0, Tx, Y1, r, sp[i][0], sp[i][1]) });
          put(S[i + 4], { d: sec(0, Bx, Y2, r, sp[i][0], sp[i][1]) });
        }
        var hl = P(t, 10, 10.6) * (1 - P(t, 14.2, 14.6)), ho = P(t, 14.4, 15) * (1 - P(t, 17, 17.4));
        for (i = 0; i < 8; i++) {
          var acute = i % 2 === 0, k = (acute ? hl : ho) * (.5 + .5 * Math.sin(t * 7));
          put(S[i], { 'fill-opacity': (.5 + .35 * k).toFixed(2), stroke: k > .02 ? '#fff' : 'none', 'stroke-width': k > .02 ? 2 : 0 });
        }
        var mid = function (a0, sp2, cx, cy, rr) { var m = (a0 + sp2 / 2) * rad; return [cx + rr * Math.cos(m), cy + rr * Math.sin(m)]; };
        var p0 = mid(-th, th, Tx, Y1, 46), p1 = mid(0, 180 - th, Tx, Y1, 46), p2 = mid(-th, th, Bx, Y2, 46), p3 = mid(0, 180 - th, Bx, Y2, 46);
        /* أربع تسميات: حادة علوية، منفرجة علوية، حادة سفلية، منفرجة سفلية */
        var T = Math.round(th), O = 180 - T;
        var L = [[p0, T], [p1, O], [p2, T], [p3, O]];
        lab.forEach(function (e, j) { put(e, { x: L[j][0][0].toFixed(1), y: (L[j][0][1] + 5).toFixed(1) }); e.textContent = ar(L[j][1]) + '°'; vis(e, P(t, 1.4, 2)); });
        rd.textContent = ar(T) + '° + ' + ar(O) + '° = ١٨٠°'; vis(rd, P(t, 3, 3.8));
        vis(cLeg1, P(t, 2, 2.6)); vis(cLegT1, P(t, 2, 2.6)); vis(cLeg2, P(t, 2, 2.6)); vis(cLegT2, P(t, 2, 2.6));
        /* المثلث */
        vis(g2, P(t, 19.8, 20.6));
        var show = P(t, 21, 22), mv = P(t, 24, 28, K.ease.io);
        W.forEach(function (w, j) {
          var c = [K.mix(w.c[0], Q[0], mv), K.mix(w.c[1], Q[1], mv)], a0 = K.mix(w.a0, w.tgt + (j === 1 ? 0 : 0), mv);
          if (j === 2) a0 = K.mix(w.a0, w.tgt, mv); else a0 = K.mix(w.a0 > 180 && w.tgt === 360 ? w.a0 : w.a0, w.tgt, mv);
          put(wp[j], { d: sec(0, c[0], c[1], r2, a0, w.span), opacity: show });
          var m = (a0 + w.span / 2) * rad; put(wl[j], { x: (c[0] + (r2 + 0) * .62 * Math.cos(m)).toFixed(1), y: (c[1] + r2 * .62 * Math.sin(m) + 5).toFixed(1) }); wl[j].textContent = ar(Math.round(w.span)) + '°'; vis(wl[j], show * (1 - 0));
        });
        vis(tri, 1); vis(line180, P(t, 26, 27)); vis(sum, P(t, 28, 29));
        gd.update(t, 31.5);
      };
    }
  });

  /* ============ ٨) المساحة: المثلث نصف المستطيل ============ */
  B.scene('area', {
    title: 'فيديو قصير: المساحة بالعدّ ثم المثلث نصف المستطيل', dur: 34,
    caps: [
      [0, 'مستطيل طوله ٨ وعرضه ٥ — كم مربعًا صغيرًا فيه؟'],
      [2.6, 'نعدّ الصفوف: كل صف فيه ٨ مربعات'],
      [8.4, '٨ × ٥ = ٤٠ مربعًا: مساحة المستطيل = الطول × العرض'],
      [12, 'نرسم قطرًا: المستطيل صار مثلثين متطابقين'],
      [15.6, 'مساحة المثلث = ' + F('١', '٢') + ' × القاعدة × الارتفاع = ' + F('٤٠', '٢') + ' = ٢٠'],
      [20, 'نحرّك رأس المثلث على الضلع العلوي…'],
      [26, 'الشكل يتغيّر، لكن المساحة تبقى ٢٠ لأن القاعدة والارتفاع لم يتغيّرا'],
      [31, 'المثلث = نصف المستطيل الذي له القاعدة والارتفاع نفسهما']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar;
      var cs = 34, X0 = 176, Y0 = 76, cols = 8, rows = 5, g1 = K.g();
      var cells = [];
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) cells.push(K.rect(X0 + c * cs + 1.5, Y0 + r * cs + 1.5, cs - 3, cs - 3, C.cy, { r: 4 }, g1));
      var outline = K.rect(X0, Y0, cols * cs, rows * cs, 'none', { s: C.ink, sw: 3 }, g1);
      var wTxt = K.text(X0 + cols * cs / 2, Y0 + rows * cs + 24, 'العرض ٨', 17, C.yl, {}, g1), hTxt = K.text(X0 - 14, Y0 + rows * cs / 2, 'الارتفاع ٥', 17, C.yl, { a: 'end', mid: 1 }, g1);
      var bw = K.line(X0, Y0 + rows * cs + 10, X0 + cols * cs, Y0 + rows * cs + 10, C.yl, 3, {}, g1), bh = K.line(X0 - 6, Y0, X0 - 6, Y0 + rows * cs, C.yl, 3, {}, g1);
      var count = K.text(X0 + cols * cs + 56, Y0 + 60, '٠', 56, C.cy, { ltr: 1 }, g1), cl = K.text(X0 + cols * cs + 56, Y0 + 92, 'مربع', 18, C.dim, {}, g1);
      var mulT = K.text(320, 328, '٨ × ٥ = ٤٠', 34, C.cy, { ltr: 1 }, g1);
      var g2 = K.g(), tri = K.path('', C.cy, null, 0, { op: .75 }, g2), l1 = K.path('', C.pk, null, 0, { op: .35 }, g2), l2 = K.path('', C.pk, null, 0, { op: .35 }, g2);
      var rect2 = K.rect(X0, Y0, cols * cs, rows * cs, 'none', { s: C.ink, sw: 3 }, g2);
      var diag = K.line(X0, Y0 + rows * cs, X0 + cols * cs, Y0, C.yl, 3, {}, g2);
      var apex = K.circle(0, Y0, 8, C.yl, {}, g2);
      var area = K.row(X0 + cols * cs + 56, Y0 + 40, [{ f: ['٤٠', '٢'] }], 30, C.ink, g2);
      var areaT = K.text(X0 + cols * cs + 56, Y0 + 112, '٢٠', 54, C.cy, { ltr: 1 }, g2), areaL = K.text(X0 + cols * cs + 56, Y0 + 140, 'المساحة', 17, C.dim, {}, g2);
      var gd = K.guide(34, 352, .58);
      return function (t) {
        var fin = 1 - P(t, 11.6, 12.4);
        vis(g1, P(t, 0, .6) * (1 - P(t, 12.2, 12.8) * 0));
        var n = 0;
        cells.forEach(function (c, i) { var r = Math.floor(i / cols), k = P(t, 2.6 + r * 1.1 + (i % cols) * .08, 2.6 + r * 1.1 + (i % cols) * .08 + .35, K.ease.out); if (k > .5) n++; vis(c, k); });
        count.textContent = ar(n); vis(wTxt, P(t, 1, 1.6)); vis(hTxt, P(t, 1, 1.6)); vis(bw, P(t, 1, 1.6)); vis(bh, P(t, 1, 1.6)); vis(count, P(t, 2.6, 3)); vis(cl, P(t, 2.6, 3)); vis(mulT, P(t, 8.4, 9));
        /* المرحلة الثانية فوق الأولى */
        var on2 = P(t, 11.8, 12.6);
        vis(g2, on2);
        var apexX = X0 + cols * cs; /* يبدأ عند الزاوية العليا اليمنى */
        var mvx = t < 20 ? 0 : t < 26 ? P(t, 20, 26, K.ease.lin) : 1;
        var ax = t < 20 ? apexX : X0 + cols * cs * (1 - Math.abs(Math.sin(mvx * Math.PI * 1.0)) * 0 - 0);
        /* الرأس يتحرك ذهابًا وإيابًا بين الطرفين */
        var u = t < 20 ? 1 : .5 + .5 * Math.cos((t - 20) / 6 * Math.PI * 2);
        ax = X0 + cols * cs * (t < 20 ? 1 : K.clamp(u, 0, 1));
        var by = Y0 + rows * cs;
        put(tri, { d: 'M' + X0 + ',' + by + ' L' + (X0 + cols * cs) + ',' + by + ' L' + ax.toFixed(1) + ',' + Y0 + ' Z' });
        put(l1, { d: 'M' + X0 + ',' + by + ' L' + ax.toFixed(1) + ',' + Y0 + ' L' + X0 + ',' + Y0 + ' Z' });
        put(l2, { d: 'M' + (X0 + cols * cs) + ',' + by + ' L' + (X0 + cols * cs) + ',' + Y0 + ' L' + ax.toFixed(1) + ',' + Y0 + ' Z' });
        put(apex, { cx: ax.toFixed(1) });
        var showTri = P(t, 12.4, 13.2); vis(tri, showTri * .9); vis(l1, P(t, 20, 21)); vis(l2, P(t, 20, 21)); vis(apex, P(t, 19.6, 20.4)); vis(diag, P(t, 11.8, 12.6) * (1 - P(t, 19.8, 20.4)));
        area.forEach(function (e) { vis(e, P(t, 15.6, 16.2)); }); vis(areaT, P(t, 16.4, 17)); vis(areaL, P(t, 16.4, 17));
        /* الخلايا تبهت في المرحلة الثانية */
        cells.forEach(function (c, i) { var r = Math.floor(i / cols); if (t > 11.6) put(c, { opacity: (.18 + .82 * (1 - P(t, 11.8, 12.6))).toFixed(2) }); });
        vis(mulT, P(t, 8.4, 9) * (1 - P(t, 11.8, 12.4))); vis(count, P(t, 2.6, 3) * (1 - P(t, 11.8, 12.4))); vis(cl, P(t, 2.6, 3) * (1 - P(t, 11.8, 12.4)));
        gd.update(t, 32);
      };
    }
  });
})();

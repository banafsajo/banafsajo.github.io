/* بنفسجو — مشاهد الفيديوهات القصيرة (كل مشهد: رسم + شرح نصي يظهر مع الزمن) */
(function () {
  'use strict';
  var B = window.BJV; if (!B) return;
  var F = B.F;

  /* ============ ١) الكسور: التكافؤ وجمع الكسور ============ */
  B.scene('fractions', {
    title: 'فيديو قصير: الكسور المتكافئة وجمع الكسور', dur: 33,
    caps: [
      [0, 'الشريط كله يساوي ١ — نقسّمه إلى نصفين'],
      [2.8, 'نلوّن نصفًا واحدًا: ' + F('١', '٢')],
      [4.6, 'نقسّم كل قطعة إلى قطعتين: ٤ قطع، ملوّنة منها ٢'],
      [7.6, 'ونقسّم من جديد: ٨ قطع، ملوّنة منها ٤'],
      [10, 'المقدار لم يتغيّر! ' + F('١', '٢') + ' = ' + F('٢', '٤') + ' = ' + F('٤', '٨')],
      [13.4, 'والآن نجمع ' + F('١', '٢') + ' + ' + F('١', '٣') + ' — قطعتان بحجمين مختلفين!'],
      [17.4, 'نقطّع الاثنتين إلى أسداس: ' + F('١', '٢') + ' = ' + F('٣', '٦') + ' و ' + F('١', '٣') + ' = ' + F('٢', '٦')],
      [21, 'الآن القطع متساوية الحجم، فنضعها معًا في شريط واحد'],
      [25, 'المجموع ' + F('٥', '٦') + ' — وحّدنا المقام ثم جمعنا البسطين فقط']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf;
      var g1 = K.g(), X0 = 80, BW = 360, Y = 78, BH = 54;
      K.text(X0 + BW / 2, 52, 'الشريط كله = ١', 18, C.dim, {}, g1);
      K.rect(X0, Y, BW, BH, 'rgba(255,255,255,.06)', { r: 6, s: C.dim, sw: 2 }, g1);
      var fill1 = K.rect(X0, Y, 0, BH, C.cy, { r: 5 }, g1);
      var L1 = [[1, 4], [2, 2], [2, 6], [3, 1], [3, 3], [3, 5], [3, 7]].map(function (a) { return [a[0], K.line(X0 + BW * a[1] / 8, Y, X0 + BW * a[1] / 8, Y + BH, C.ink, 2.5, {}, g1)]; });
      var NY = 192; K.line(X0 - 14, NY, X0 + BW + 14, NY, C.dim, 2, {}, g1);
      [0, .5, 1].forEach(function (v) { K.line(X0 + BW * v, NY - 6, X0 + BW * v, NY + 6, C.dim, 2, {}, g1); });
      K.text(X0, NY + 28, '٠', 20, C.dim, {}, g1); K.text(X0 + BW, NY + 28, '١', 20, C.dim, {}, g1); K.frac(X0 + BW / 2, NY + 24, '١', '٢', 18, C.dim, g1);
      var drop = K.line(X0 + BW / 2, Y + BH, X0 + BW / 2, NY, C.yl, 2, { dash: '5 5' }, g1), mark = K.circle(X0 + BW / 2, NY, 7, C.yl, {}, g1);
      var chain = K.row(X0 + BW / 2, 288, [{ f: ['١', '٢'] }, '=', { f: ['٢', '٤'] }, '=', { f: ['٤', '٨'] }], 34, C.cy, g1);

      var g2 = K.g(), X = 170, W6 = 300, ys = [40, 105, 185], bh = 38, c6 = W6 / 6;
      [0, 1, 2].forEach(function (i) { K.rect(X, ys[i], W6, bh, 'rgba(255,255,255,.06)', { r: 5, s: C.dim, sw: 2 }, g2); });
      var fA = K.rect(X, ys[0], 0, bh, C.cy, { r: 4 }, g2), fB = K.rect(X, ys[1], 0, bh, C.pk, { r: 4 }, g2);
      var dv = [];
      function dl(row, pos, n, stage) { dv.push([stage, K.line(X + W6 * pos / n, ys[row], X + W6 * pos / n, ys[row] + bh, C.ink, 2.2, {}, g2)]); }
      dl(0, 1, 2, 1); [1, 2, 4, 5].forEach(function (i) { dl(0, i, 6, 2); }); [1, 2].forEach(function (i) { dl(1, i, 3, 1); }); [1, 3, 5].forEach(function (i) { dl(1, i, 6, 2); });
      [1, 2, 3, 4, 5].forEach(function (i) { dl(2, i, 6, 3); });
      var lab1 = K.frac(120, ys[0] + bh / 2, '١', '٢', 26, C.cy, g2), lab2 = K.frac(120, ys[1] + bh / 2, '١', '٣', 26, C.pk, g2), lab3 = K.frac(120, ys[2] + bh / 2, '٥', '٦', 28, C.gr, g2);
      var plus = K.text(120, 93, '+', 24, C.dim, { ltr: 1 }, g2);
      var pc = [], pp = [];
      for (var i = 0; i < 3; i++) pc.push(K.rect(X + i * c6, ys[0], c6, bh, C.cy, { s: C.bg, sw: 1.5 }, g2));
      for (var j = 0; j < 2; j++) pp.push(K.rect(X + j * c6, ys[1], c6, bh, C.pk, { s: C.bg, sw: 1.5 }, g2));
      var form = K.row(320, 296, [{ f: ['١', '٢'] }, '+', { f: ['١', '٣'] }, '=', { f: ['٣', '٦'] }, '+', { f: ['٢', '٦'] }, '=', { f: ['٥', '٦'] }], 28, C.ink, g2);
      var gd = K.guide(34, 352, .6);
      return function (t) {
        vis(g1, P(t, 0, .8) * (1 - P(t, 12.4, 13.2)));
        put(fill1, { width: BW / 2 * P(t, 1.8, 3) });
        L1.forEach(function (l) { vis(l[1], P(t, [0, .8, 4.2, 7.2][l[0]], [0, 1.6, 5, 8][l[0]])); });
        vis(drop, P(t, 3, 3.6)); vis(mark, P(t, 3, 3.6)); put(mark, { r: 7 + 2 * Math.sin(t * 5) * P(t, 10, 10.6) });
        [[3, 3.6], [5, 5.4], [5.2, 5.8], [8, 8.4], [8.2, 8.8]].forEach(function (a, i) { vis(chain[i], P(t, a[0], a[1])); });
        vis(g2, P(t, 12.8, 13.6));
        put(fA, { width: W6 / 2 * P(t, 14, 15) }); put(fB, { width: W6 / 3 * P(t, 15.2, 16.2) });
        dv.forEach(function (d) { vis(d[1], d[0] === 1 ? P(t, 13.6, 14.4) : d[0] === 2 ? P(t, 17.4, 18.4) : P(t, 21.4, 22.2)); });
        vis(lab1, P(t, 14.2, 14.8)); vis(lab2, P(t, 15.8, 16.4)); vis(plus, P(t, 14.8, 15.4));
        if (t > 18.2) { lab1.set('٣', '٦'); lab2.set('٢', '٦'); } else { lab1.set('١', '٢'); lab2.set('١', '٣'); }
        var mv1 = P(t, 21, 22.8), mv2 = P(t, 22.6, 24.4);
        var fadeUnder = 1 - .75 * P(t, 21, 21.8);
        vis(fA, fadeUnder); vis(fB, fadeUnder);
        var showPc = P(t, 20.8, 21);
        pc.forEach(function (r, i) { vis(r, showPc); put(r, { y: (K.mix(ys[0], ys[2], mv1)).toFixed(2) }); });
        pp.forEach(function (r, j) { vis(r, showPc); put(r, { y: (K.mix(ys[1], ys[2], mv2)).toFixed(2), x: (X + K.mix(j, 3 + j, mv2) * c6).toFixed(2) }); });
        vis(lab3, P(t, 24.4, 25));
        form.forEach(function (e, i) { vis(e, P(t, 25 + .5 * i, 25.4 + .5 * i)); });
        gd.update(t, 30);
      };
    }
  });

  /* ============ ٢) النسبة المئوية: الشبكة وفخ الزيادة ثم الخصم ============ */
  B.scene('percent', {
    title: 'فيديو قصير: النسبة المئوية وفخ الخصم والزيادة', dur: 34,
    caps: [
      [0, 'الشبكة فيها ١٠٠ مربع، وكل مربع يساوي ١٪'],
      [2.4, 'نلوّن ربع الشبكة: ٢٥ مربعًا من ١٠٠'],
      [4.4, F('٢٥', '١٠٠') + ' = ' + F('١', '٤') + ' = ٢٥٪'],
      [8.2, 'نصف الشبكة: ٥٠٪ = ' + F('١', '٢')],
      [11, 'ثلاثة أرباع: ٧٥٪ = ' + F('٣', '٤')],
      [13.6, 'والشبكة كاملة: ١٠٠٪ = ١'],
      [16.4, 'فخ مشهور: سعر ١٠٠ ريال، خصم ٢٠٪'],
      [20, 'الخصم ٢٠٪ من ١٠٠ = ٢٠ ← يبقى ٨٠'],
      [24, 'ثم زيادة ٢٠٪ — لكن من ٨٠ لا من ١٠٠! ٢٠٪ من ٨٠ = ١٦'],
      [28.4, 'النتيجة ٩٦ وليست ١٠٠: الأساس تغيّر، فالنسبة نفسها تعني مقدارًا مختلفًا']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar;
      var g1 = K.g(), cell = 22, pitch = 24, GX = 70, GY = 52, cells = [];
      for (var r = 0; r < 10; r++) for (var c = 0; c < 10; c++) cells.push(K.rect(GX + c * pitch, GY + r * pitch, cell, cell, 'rgba(255,255,255,.07)', { r: 4 }, g1));
      var blocks = [[0, 0], [0, 5], [5, 0], [5, 5]], cols = [C.cy, C.gr, C.yl, C.pk];
      var order = [];
      blocks.forEach(function (b, bi) { for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) order.push([(b[0] + r) * 10 + b[1] + c, bi, r * 5 + c]); });
      var outl = K.rect(GX - 3, GY - 3, 5 * pitch + 2, 5 * pitch + 2, 'none', { r: 6, s: C.ink, sw: 3 }, g1);
      var pct = K.text(420, 118, '٠٪', 62, C.cy, { ltr: 1 }, g1);
      var fr = K.row(420, 215, [{ f: ['٢٥', '١٠٠'] }, '=', { f: ['١', '٤'] }], 40, C.ink, g1);
      var cnt = K.text(420, 275, '٠ مربع', 22, C.dim, {}, g1);
      var g2 = K.g(), BX = 170, BW = 300, BY = 96, BH = 54;
      K.text(320, 66, 'السعر الأصلي', 18, C.dim, {}, g2);
      var base = K.rect(BX, BY, BW, BH, C.cy, { r: 6 }, g2);
      var baseTxt = K.text(BX + BW * .4, BY + BH / 2, '١٠٠', 28, C.bg, { mid: 1, ltr: 1 }, g2);
      var cut = K.rect(BX + BW * .8, BY, BW * .2, BH, C.rd, { r: 6 }, g2), cutTxt = K.text(BX + BW * .9, BY + BH / 2, '٢٠', 22, C.ink, { mid: 1, ltr: 1 }, g2);
      var row2Lab = K.text(320, 196, '', 18, C.dim, {}, g2);
      var BY2 = 208, rest = K.rect(BX, BY2, BW * .8, BH, C.cy, { r: 6 }, g2), restTxt = K.text(BX + BW * .4, BY2 + BH / 2, '٨٠', 28, C.bg, { mid: 1, ltr: 1 }, g2);
      var up = K.rect(BX + BW * .8, BY2, 0, BH, C.gr, { r: 6 }, g2), upTxt = K.text(BX + BW * .8 + 24, BY2 + BH / 2, '١٦', 20, C.bg, { mid: 1, ltr: 1 }, g2);
      var ghost = K.rect(BX, BY2, BW, BH, 'none', { r: 6, s: C.dim, sw: 2, dash: '7 6' }, g2);
      var gap = K.rect(BX + BW * .96, BY2, BW * .04, BH, C.rd, { r: 3 }, g2), gapTxt = K.text(BX + BW * .98, BY2 + BH + 26, 'ناقص ٤', 20, C.rd, {}, g2);
      var fin = K.text(BX + BW * .48, BY2 + BH + 54, '٨٠ + ١٦ = ٩٦', 34, C.yl, { ltr: 1 }, g2);
      var gd = K.guide(34, 352, .6);
      return function (t) {
        vis(g1, P(t, 0, .6) * (1 - P(t, 15, 15.6)));
        var n = 0;
        order.forEach(function (o, i) {
          var tt = [2.4, 6.6, 9.4, 12][o[1]], k = P(t, tt + o[2] * .04, tt + o[2] * .04 + .3, K.ease.out);
          if (k > .5) n++;
          put(cells[o[0]], { fill: k > .02 ? cols[o[1]] : 'rgba(255,255,255,.07)', opacity: .35 + .65 * k, transform: 'translate(' + (cell / 2 * (1 - k) * 0).toFixed(1) + ',0)' });
        });
        var pv = n; pct.textContent = ar(pv) + '٪'; cnt.textContent = ar(n) + ' مربع من ١٠٠';
        vis(outl, P(t, 4.2, 4.8) * (1 - P(t, 6.4, 6.8)));
        var ci = t < 8 ? 0 : t < 10.8 ? 1 : t < 13.4 ? 2 : 3; var cb = t < 6.6 ? 0 : t < 9.4 ? 1 : t < 12 ? 2 : 3; put(pct, { fill: cols[cb] });
        var fx = [[0, '٢٥', '١٠٠', '١', '٤'], [1, '٥٠', '١٠٠', '١', '٢'], [2, '٧٥', '١٠٠', '٣', '٤'], [3, '١٠٠', '١٠٠', '١', '١']][ci];
        fr[0].set(fx[1], fx[2]); fr[2].set(fx[3], fx[4]);
        vis(fr.g, P(t, 4.2, 4.8)); vis(cnt, P(t, 2.4, 3));
        vis(g2, P(t, 15.6, 16.2));
        vis(cut, 1); put(cut, { y: (BY + (BH * 1.7) * P(t, 20, 21.6, K.ease.inn)).toFixed(1), opacity: 1 - P(t, 20, 21.6, K.ease.inn) });
        vis(cutTxt, 1 - P(t, 20, 20.8)); put(cutTxt, { y: (BY + BH / 2 + 7 + (BH * 1.7) * P(t, 20, 21.6, K.ease.inn)).toFixed(1) });
        put(base, { width: BW * (1 - .2 * P(t, 20.2, 20.6, K.ease.lin) * 0) }); put(baseTxt, { x: BX + BW * (t > 20.4 ? .4 : .4) });
        vis(rest, P(t, 21.4, 22.2)); vis(restTxt, P(t, 21.8, 22.4));
        vis(ghost, P(t, 22.6, 23.2)); put(up, { width: (BW * .16 * P(t, 24.2, 26, K.ease.out)).toFixed(1) }); vis(up, P(t, 24.2, 24.4)); vis(upTxt, P(t, 25.4, 26));
        put(upTxt, { x: (BX + BW * .8 + BW * .08).toFixed(1) });
        vis(gap, P(t, 27, 27.8)); vis(gapTxt, P(t, 27.2, 27.8)); vis(fin, P(t, 26.2, 27));
        gd.update(t, 30);
      };
    }
  });

  /* ============ ٣) السرعة: التلاقي والرسم البياني (كالموجة التي تُرسم مع الحركة) ============ */
  B.scene('speed', {
    title: 'فيديو قصير: سيارتان تتلاقيان ورسم المسافة مع الزمن', dur: 36,
    caps: [
      [0, 'سيارتان بينهما ٣٠٠ كم، تسيران نحو بعضهما'],
      [2.6, 'الزرقاء ٦٠ كم في الساعة، والوردية ٤٠ كم في الساعة'],
      [5, 'كل ساعة تقترب إحداهما من الأخرى بمقدار ٦٠ + ٤٠ = ١٠٠ كم'],
      [14, 'الخطّان في الرسم يلتقيان عند لحظة التلاقي'],
      [20, 'نقطة اللقاء على الرسم: بعد ٣ ساعات'],
      [24, 'زمن التلاقي = المسافة ÷ مجموع السرعتين'],
      [30, F('٣٠٠', '١٠٠') + ' = ٣ ساعات — وتكون الزرقاء قطعت ١٨٠ كم والوردية ١٢٠ كم']
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar;
      var RX0 = 60, RX1 = 580, RW = RX1 - RX0, RY = 62;
      K.rect(RX0 - 20, RY - 4, RW + 40, 46, '#2A2556', { r: 8 });
      K.line(RX0 - 14, RY + 19, RX1 + 14, RY + 19, 'rgba(255,255,255,.35)', 2, { dash: '14 12' });
      K.text(RX0, RY - 14, '٠ كم', 15, C.dim, { ltr: 1 }); K.text(RX1, RY - 14, '٣٠٠ كم', 15, C.dim, { ltr: 1 });
      function car(color, dir) {
        var g = K.g(); var s = dir; K.path('M-20,6 L20,6 L20,-4 Q20,-7 17,-7 L8,-7 L2,-16 L-10,-16 L-14,-7 L-18,-7 Q-20,-7 -20,-4 Z', color, null, 0, {}, g);
        K.circle(-11, 7, 5, '#14122E', { s: C.ink, sw: 1.5 }, g); K.circle(11, 7, 5, '#14122E', { s: C.ink, sw: 1.5 }, g);
        if (dir < 0) g.firstChild.setAttribute('transform', 'scale(-1,1)'); return g;
      }
      var cA = car(C.cy, 1), cB = car(C.pk, -1);
      var clock = K.text(320, 152, 'الزمن: ٠ ساعة', 20, C.yl, {});
      var gapT = K.text(320, RY + 68, '', 18, C.ink, {});
      var GX0 = 80, GX1 = 590, GY0 = 314, GY1 = 176; /* t:0..5h  , pos:0..300 */
      function gx(h) { return GX0 + (GX1 - GX0) * h / 5; } function gy(p) { return GY0 - (GY0 - GY1) * p / 300; }
      K.line(GX0, GY0, GX1 + 8, GY0, C.dim, 2); K.line(GX0, GY0, GX0, GY1 - 10, C.dim, 2);
      K.text(GX1 + 4, GY0 + 16, 'الزمن (ساعة)', 13, C.dim, { a: 'end' }); K.text(GX0 + 6, GY1 - 14, 'الموضع (كم)', 13, C.dim, { a: 'start' });
      [0, 1, 2, 3, 4, 5].forEach(function (h) { K.line(gx(h), GY0 - 4, gx(h), GY0 + 4, C.dim, 2); K.text(gx(h), GY0 + 16, ar(h), 12, C.dim, { ltr: 1 }); });
      [0, 100, 200, 300].forEach(function (p) { K.line(GX0 - 4, gy(p), GX0 + 4, gy(p), C.dim, 2); K.text(GX0 - 8, gy(p) + 4, ar(p), 11, C.dim, { a: 'end', ltr: 1 }); });
      var ghostA = K.path('M' + gx(0) + ',' + gy(0) + ' L' + gx(5) + ',' + gy(300), 'none', 'rgba(94,230,255,.16)', 3, { dash: '6 6' });
      var ghostB = K.path('M' + gx(0) + ',' + gy(300) + ' L' + gx(5) + ',' + gy(100), 'none', 'rgba(255,107,154,.16)', 3, { dash: '6 6' });
      var lineA = K.path('', 'none', C.cy, 4), lineB = K.path('', 'none', C.pk, 4);
      var dotA = K.circle(0, 0, 6, C.cy), dotB = K.circle(0, 0, 6, C.pk);
      var meet = K.circle(gx(3), gy(180), 0, 'none', { s: C.yl, sw: 3 }), meetDot = K.circle(gx(3), gy(180), 6, C.yl);
      var dropL = K.line(gx(3), gy(180), gx(3), GY0, C.yl, 2, { dash: '5 5' }), dropH = K.line(GX0, gy(180), gx(3), gy(180), C.yl, 2, { dash: '5 5' });
      var f3 = K.text(gx(3), GY0 + 33, '٣ ساعات', 14, C.yl, { ltr: 0 });
      var f180 = K.text(GX0 + 34, gy(180) - 8, '١٨٠', 15, C.yl, { ltr: 1 });
      var formLab = K.text(500, 236, 'زمن التلاقي =', 17, C.dim, {});
      var form = K.row(500, 274, [{ f: ['٣٠٠', '٦٠ + ٤٠'] }, '=', '٣'], 22, C.ink);
      var gd = K.guide(34, 352, .58);
      return function (t) {
        var tau = 5 * 0 + 3 * P(t, 6, 17, K.ease.lin);
        var pa = 60 * tau, pb = 300 - 40 * tau;
        function px(p) { return RX0 + RW * p / 300; }
        tf(cA, px(pa), RY + 32); tf(cB, px(pb), RY + 12);
        clock.textContent = 'الزمن: ' + ar(tau.toFixed(1)) + ' ساعة'; vis(clock, P(t, 5.4, 6.2));
        var gp = pb - pa; gapT.textContent = t > 6 ? 'المسافة بينهما: ' + ar(Math.max(0, Math.round(gp))) + ' كم' : ''; vis(gapT, P(t, 6, 6.8));
        vis(ghostA, P(t, 12, 14)); vis(ghostB, P(t, 12, 14));
        var d1 = 'M' + gx(0) + ',' + gy(0), d2 = 'M' + gx(0) + ',' + gy(300);
        d1 += ' L' + gx(tau) + ',' + gy(pa); d2 += ' L' + gx(tau) + ',' + gy(pb);
        put(lineA, { d: d1 }); put(lineB, { d: d2 });
        put(dotA, { cx: gx(tau).toFixed(1), cy: gy(pa).toFixed(1) }); put(dotB, { cx: gx(tau).toFixed(1), cy: gy(pb).toFixed(1) });
        var on = P(t, 5.6, 6.4); vis(dotA, on); vis(dotB, on);
        var m = P(t, 17.4, 18.2, K.ease.out); put(meet, { r: (6 + 18 * m + 3 * Math.sin(t * 6) * m).toFixed(1) }); vis(meet, m);
        vis(meetDot, m); vis(dropL, P(t, 19, 20)); vis(dropH, P(t, 19.6, 20.6)); vis(f3, P(t, 20.2, 21)); vis(f180, P(t, 20.6, 21.4));
        vis(formLab, P(t, 24, 24.6)); form.forEach(function (e, i) { vis(e, P(t, 25 + i * .9, 25.6 + i * .9)); });
        gd.update(t, 31);
      };
    }
  });

  /* ============ ٤) الاحتمال: الدوّار وتقارب التجربة من النظري ============ */
  B.scene('probability', {
    title: 'فيديو قصير: الاحتمال والتجربة التي تقترب من النظري', dur: 34,
    caps: [
      [0, 'دوّار فيه نصف وردي، وربع أزرق، وربع أصفر'],
      [2.2, 'نديره: كل مرة يقف على لون… والبداية متقلّبة!'],
      [11.5, 'نكرّر مئة مرة، ونراقب نسبة كل لون'],
      [20, 'كلما زادت المحاولات اقتربت النسبة التجريبية من النظرية'],
      [27, 'احتمال الوردي = ' + F('١', '٢') + ' ، والأزرق = ' + F('١', '٤') + ' ، والأصفر = ' + F('١', '٤')]
    ],
    build: function (K) {
      var C = K.C, P = K.P, put = K.put, vis = K.vis, tf = K.tf, ar = K.ar;
      var cx = 165, cy = 190, R = 105, cols = [C.pk, C.cy, C.yl], prob = [.5, .25, .25];
      var wheel = K.g();
      function sector(a0, a1, color) {
        var x0 = cx + R * Math.cos(a0 * Math.PI / 180), y0 = cy + R * Math.sin(a0 * Math.PI / 180), x1 = cx + R * Math.cos(a1 * Math.PI / 180), y1 = cy + R * Math.sin(a1 * Math.PI / 180);
        return K.path('M' + cx + ',' + cy + ' L' + x0.toFixed(2) + ',' + y0.toFixed(2) + ' A' + R + ',' + R + ' 0 ' + ((a1 - a0) > 180 ? 1 : 0) + ' 1 ' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' Z', color, C.bg, 3, {}, wheel);
      }
      var starts = [0, 180, 270]; sector(0, 180, C.pk); sector(180, 270, C.cy); sector(270, 360, C.yl);
      K.circle(cx, cy, 10, C.bg, { s: C.ink, sw: 3 }, wheel);
      K.path('M' + cx + ',' + (cy - R - 4) + ' l-11,-20 l22,0 Z', C.ink, null, 0, {});
      /* نتائج: أول ٨ يدوية متقلبة ثم الباقي موزّع ليطابق النسب تمامًا */
      var res = [0, 0, 1, 0, 2, 0, 0, 1], left = [50 - 5, 25 - 2, 25 - 1], pool = [];
      left.forEach(function (n, i) { for (var k = 0; k < n; k++) pool.push(i); });
      var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
      for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
      res = res.concat(pool);
      var cum = [[0, 0, 0]]; res.forEach(function (r) { var l = cum[cum.length - 1].slice(); l[r]++; cum.push(l); });
      var rot = [0], acc = 0; var rr = 11;
      res.forEach(function (r, i) {
        var inSec = starts[r] + (.15 + .7 * (((i * 37) % 11) / 11)) * (r === 0 ? 180 : 90);
        var target = 270 - inSec; /* المؤشر في الأعلى (٢٧٠°) */
        while (target <= acc + 360 * 2) target += 360; acc = target; rot.push(acc);
      });
      var BX = 380, BY0 = 300, BH = 190, bw = 56, gap = 30, bars = [], tg = [], pc = [];
      K.line(BX - 14, BY0, BX + 3 * bw + 2 * gap + 14, BY0, C.dim, 2);
      for (var b = 0; b < 3; b++) {
        var x = BX + b * (bw + gap);
        K.rect(x, BY0 - BH, bw, BH, 'rgba(255,255,255,.05)', { r: 6 });
        bars.push(K.rect(x, BY0, bw, 0, cols[b], { r: 5 }));
        tg.push(K.line(x - 6, BY0 - BH * prob[b], x + bw + 6, BY0 - BH * prob[b], C.ink, 2, { dash: '5 4' }));
        pc.push(K.text(x + bw / 2, BY0 + 22, '٠٪', 17, cols[b], { ltr: 1 }));
      }
      var cnt = K.text(BX + 90, 90, 'المحاولة ٠', 24, C.ink, {}), tgLab = K.text(BX + 90, 118, 'الخط المتقطع = الاحتمال النظري', 14, C.dim, {});
      var gd = K.guide(34, 352, .55);
      function trialAt(t) {
        if (t < 2.2) return 0;
        if (t < 11.2) return Math.min(8, (t - 2.2) / 9 * 8 + .001);
        return 8 + (100 - 8) * K.ease.out(K.clamp((t - 11.5) / 12.5, 0, 1));
      }
      var fx = [['١', '٢'], ['١', '٤'], ['١', '٤']].map(function (f, b) { return K.frac(BX + b * (bw + gap) + bw / 2, BY0 + 20, f[0], f[1], 21, cols[b]); });
      return function (t) {
        var tr = trialAt(t), n = Math.floor(tr), fr = tr - n;
        var cur = cum[n], nxt = cum[Math.min(100, n + 1)];
        var ang = t < 11.5 ? K.mix(rot[n], rot[Math.min(100, n + 1)], K.ease.out(K.clamp(fr * 1.35, 0, 1))) : (t < 23.6 ? t * 700 : rot[100]);
        if (t >= 11.5 && t < 23.6) ang = (t - 11.5) * 520;
        if (t >= 23.6) ang = rot[100] % 360 + 720 + K.ease.out(K.clamp((t - 23.6) / 1.6, 0, 1)) * 0;
        put(wheel, { transform: 'rotate(' + ang.toFixed(1) + ' ' + cx + ' ' + cy + ')' });
        var N = Math.max(1, n);
        for (var b = 0; b < 3; b++) {
          var f = n === 0 ? 0 : cur[b] / n; var h = BH * f;
          put(bars[b], { y: (BY0 - h).toFixed(1), height: h.toFixed(1) }); pc[b].textContent = ar(Math.round(f * 100)) + '٪';
        }
        cnt.textContent = 'المحاولة ' + ar(n); vis(cnt, P(t, 2, 2.6)); vis(tgLab, P(t, 3, 3.6));
        var fk = P(t, 27, 28); fx.forEach(function (e, i) { vis(e, P(t, 27 + i * .4, 27.6 + i * .4)); vis(pc[i], 1 - fk); });
        gd.update(t, 31);
      };
    }
  });
})();

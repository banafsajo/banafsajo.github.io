// The quantitative track. `ready` stations have the new 4-step content;
// the others still open their current version on the site.
export const TRACK = [
  { id: 'm01', n: 1, title: 'الحساب الذكي' },
  { id: 'm02', n: 2, title: 'الكسور والأعداد العشرية' },
  { id: 'm03', n: 3, title: 'النسبة المئوية', ready: true, minutes: 8 },
  { id: 'm04', n: 4, title: 'النسب والتناسب والتوزيع' },
  { id: 'm05', n: 5, title: 'السرعة والزمن والعمل والأعمار' },
  { id: 'm06', n: 6, title: 'الجبر والمعادلات' },
  { id: 'm07', n: 7, title: 'الأسس والجذور' },
  { id: 'm08', n: 8, title: 'الزوايا والمستقيمات والمضلعات' },
  { id: 'm09', n: 9, title: 'المثلثات والدوائر' },
  { id: 'm10', n: 10, title: 'المحيط والمساحة والحجوم' },
  { id: 'm11', n: 11, title: 'الإحصاء والاحتمال والعدّ' },
  { id: 'm12', n: 12, title: 'فنّ المقارنات' },
];

export const STATIONS = {
  m03: {
    id: 'm03',
    title: 'النسبة المئوية',
    idea: {
      headline: 'النسبة المئوية = كم من كل ١٠٠؟',
      start: 25,
      bubble: 'علامة ٪ تعني «من كل ١٠٠». يعني ٢٥٪ = ٢٥ قطعة من كل ١٠٠ قطعة.',
    },
    example: {
      prompt: 'في صفّ فيه ٢٠ طالبًا، ٥ منهم يلبسون نظّارة. ما نسبتهم المئوية؟',
      visual: { total: 20, shaded: 5, cols: 10 },
      steps: [
        { say: 'الجزء = ٥ ، والكل = ٢٠ ، فنكتب الكسر:', frac: [5, 20] },
        { say: 'نحوّل الكلّ إلى ١٠٠: نضرب البسط والمقام في ٥ ، لأن ٢٠ × ٥ = ١٠٠', frac: [25, 100] },
        { say: 'إذن النسبة المئوية =', result: 25 },
      ],
      shortcut: 'طريقة القدرات السريعة: كل طالب = ١٠٠ ÷ ٢٠ = ٥٪ ، و ٥ طلاب = ٢٥٪',
    },
    practice: [
      { prompt: 'كم النسبة المئوية للجزء الملوّن؟', caption: '٢٠ مربعًا، لوّنّا منها ٨', visual: { total: 20, shaded: 8, cols: 10 }, options: [20, 40, 8, 50], answer: 40, cell: '٥٪', hint: 'لا تحسب كثيرًا… لو كانت ١٠٠ مربع، كم مربعًا يصير ملوّنًا؟', explain: '١٠٠ ÷ ٢٠ = ٥ ، يعني كل مربع = ٥٪. انظر الأرقام داخل المربعات.', frac: [8, 20], to: [40, 100] },
      { prompt: 'كم النسبة المئوية للجزء الملوّن؟', caption: '١٠ مربعات، لوّنّا منها ٣', visual: { total: 10, shaded: 3, cols: 10, tall: true }, options: [3, 30, 13, 70], answer: 30, cell: '١٠٪', hint: 'كل مربع من العشرة يساوي كم من المئة؟', explain: '١٠٠ ÷ ١٠ = ١٠ ، يعني كل مربع = ١٠٪.', frac: [3, 10], to: [30, 100] },
      { prompt: 'كم النسبة المئوية للجزء الملوّن؟', caption: '٥٠ مربعًا، لوّنّا منها ١٢', visual: { total: 50, shaded: 12, cols: 10 }, options: [12, 24, 38, 50], answer: 24, cell: '٢٪', hint: 'الخمسون نصف المئة… فكل مربع يساوي ضعف نفسه.', explain: '١٠٠ ÷ ٥٠ = ٢ ، يعني كل مربع = ٢٪.', frac: [12, 50], to: [24, 100] },
    ],
    challenge: {
      seconds: 60,
      items: [
        { part: 1, whole: 2, options: [50, 20, 12], answer: 50 },
        { part: 1, whole: 4, options: [40, 25, 14], answer: 25 },
        { part: 3, whole: 4, options: [75, 34, 60], answer: 75 },
        { part: 1, whole: 5, options: [15, 50, 20], answer: 20 },
        { part: 1, whole: 10, options: [10, 1, 90], answer: 10 },
      ],
    },
    law: { title: 'النسبة المئوية', top: 'الجزء', bottom: 'الكل', tail: '× ١٠٠' },
  },
};

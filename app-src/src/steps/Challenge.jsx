import { useCallback, useState } from 'react';
import { Button, Mascot, Pie, TimeBar } from '../components/ui.jsx';
import { ar, pct } from '../lib/num.js';

export default function Challenge({ data, onFinish }) {
  const [phase, setPhase] = useState('ready'); // ready | play | over
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(null); // {v, ok}
  const items = data.items;
  const q = items[i];

  const end = useCallback(() => setPhase('over'), []);
  const answer = (v) => {
    if (flash) return;
    const ok = v === q.answer;
    setFlash({ v, ok });
    if (ok) setScore((x) => x + 1);
    setTimeout(() => {
      setFlash(null);
      if (i + 1 < items.length) setI(i + 1); else setPhase('over');
    }, ok ? 450 : 900);
  };

  if (phase === 'ready') {
    return (
      <div className="step">
        <h1 className="step-title">تحدّي {ar(data.seconds)} ثانية ⚡</h1>
        <Mascot pose="wow" size={110}>{ar(items.length)} أسئلة سريعة: انظر للدائرة واختر نسبتها المئوية. جاهز؟</Mascot>
        <div className="step-foot"><Button onClick={() => setPhase('play')}>انطلق</Button></div>
      </div>
    );
  }
  if (phase === 'over') {
    return (
      <div className="step">
        <h1 className="step-title">انتهى التحدّي!</h1>
        <div className="card center"><b className="score-big">{ar(score)} من {ar(items.length)}</b><span className="muted">إجابات صحيحة</span></div>
        <Mascot pose={score >= 4 ? 'win' : 'thumbs'} size={90}>{score >= 4 ? 'سرعة ودقّة! أنت جاهز لهذا النوع في الاختبار.' : 'جميل! كل مرة ستكون أسرع من التي قبلها.'}</Mascot>
        <div className="step-foot"><Button onClick={() => onFinish(score)}>اعرض نتيجتي</Button></div>
      </div>
    );
  }
  return (
    <div className="step">
      <TimeBar seconds={data.seconds} running={!flash} onEnd={end} label="⏱" />
      <span className="tag tag-coral">سؤال {ar(i + 1)} من {ar(items.length)} · الصحيح {ar(score)}</span>
      <div className="card center">
        <Pie part={q.part} whole={q.whole} size={150} />
        <span className="muted">لوّنّا {ar(q.part)} من {ar(q.whole)} أجزاء متساوية</span>
      </div>
      <div className="choices three" role="group" aria-label="الخيارات">
        {q.options.map((v) => {
          const st = flash ? (v === q.answer ? 'right' : flash.v === v ? 'wrong' : '') : '';
          return <button key={v} type="button" className={`choice ${st}`} onClick={() => answer(v)}>{pct(v)}</button>;
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button, CellGrid, Fraction, Mascot, TimeBar } from '../components/ui.jsx';
import { ar, pct } from '../lib/num.js';
import { useStore } from '../lib/store.js';

export default function Practice({ items, onFinish, review = false }) {
  const [s] = useStore();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [wrongs, setWrongs] = useState([]); // wrong values tried on this question
  const [hint, setHint] = useState(false);
  const [log, setLog] = useState([]); // per question: true if first try
  const q = items[i];
  const right = picked === q.answer;
  const showCells = hint || wrongs.length > 0;

  const pick = (v) => {
    if (right) return;
    setPicked(v);
    if (v !== q.answer && !wrongs.includes(v)) setWrongs([...wrongs, v]);
  };
  const next = () => {
    const nl = [...log, wrongs.length === 0];
    if (i + 1 < items.length) {
      setLog(nl); setI(i + 1); setPicked(null); setWrongs([]); setHint(false);
      window.scrollTo(0, 0);
    } else {
      const firstTry = nl.filter(Boolean).length;
      onFinish({ firstTry, missed: nl.map((ok, k) => (ok ? -1 : k)).filter((k) => k >= 0), points: nl.reduce((a, ok) => a + (ok ? 10 : 5), 0) });
    }
  };

  return (
    <div className="step">
      <span className="tag tag-sun">{review ? 'مراجعة' : 'دورك'} · السؤال {ar(i + 1)} من {ar(items.length)}</span>
      <h1 className="step-title sm">{q.prompt}</h1>
      {s.board && !right && <TimeBar key={i} seconds={20} label="⏱ فكّر" />}
      <div className="card center">
        <CellGrid key={i} total={q.visual.total} shaded={q.visual.shaded} cols={q.visual.cols} tall={q.visual.tall} label={showCells ? q.cell : ''} />
        <span className="muted">{q.caption}</span>
      </div>
      <div className="choices" role="group" aria-label="الخيارات">
        {q.options.map((v) => {
          const st = right && v === q.answer ? 'right' : wrongs.includes(v) ? 'wrong' : picked === v ? 'picked' : '';
          return (
            <button key={v} type="button" className={`choice ${st}`} onClick={() => pick(v)} disabled={right && v !== q.answer} aria-pressed={picked === v}>
              {pct(v)}{st === 'right' && <span className="sr"> صحيحة</span>}{st === 'wrong' && <span className="sr"> غير صحيحة</span>}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {!right && wrongs.length === 0 && (
          <Mascot pose="think" size={70}>
            {hint ? q.hint : 'اختر الإجابة التي تراها صحيحة.'}{' '}
            {!hint && <button type="button" className="inline-link" onClick={() => setHint(true)}>أعطني تلميحًا</button>}
          </Mascot>
        )}
        {!right && wrongs.length > 0 && (
          <div className="feedback wrong">
            <b>قريب! انظر للرسم مرة ثانية 👀</b>
            <p>{q.explain}</p>
          </div>
        )}
        {right && (
          <div className="feedback right">
            <Mascot pose="win" size={72}>
              <b>{wrongs.length === 0 ? (s.board ? 'إجابة صحيحة!' : 'رائع! +١٠ نجوم ⭐') : (s.board ? 'صحيح!' : 'صحيح! +٥ نجوم ⭐')}</b>
              <span className="eq-line"><Fraction n={q.frac[0]} d={q.frac[1]} size="sm" /> = <Fraction n={q.to[0]} d={q.to[1]} size="sm" /> = {pct(q.answer)}</span>
            </Mascot>
          </div>
        )}
      </div>
      {right && <div className="step-foot"><Button onClick={next}>{i + 1 < items.length ? 'السؤال التالي' : review ? 'انتهيت من المراجعة' : 'إلى التحدّي'}</Button></div>}
    </div>
  );
}

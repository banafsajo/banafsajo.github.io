import { Button, Fraction, poseSrc } from '../components/ui.jsx';
import { ar } from '../lib/num.js';
import { useStore } from '../lib/store.js';
import { go } from '../App.jsx';

export default function Done({ data, practice, score, saved, onRetry, onRestart }) {
  const [s] = useStore();
  const right = practice.firstTry + score;
  const total = data.practice.length + data.challenge.items.length;
  return (
    <main className="screen done-screen">
      <div className="stars" aria-label={`${ar(saved.stars)} من ٣ نجوم`}>
        {[1, 2, 3].map((k) => <span key={k} className={k <= saved.stars ? 'on' : ''} aria-hidden="true">★</span>)}
      </div>
      <div className="done-hero"><img src={poseSrc('win')} alt="بنفسجو يحتفل" width="200" height="200" /></div>
      <h1 className="done-title">أنهيت محطة {data.title}!</h1>
      <p className="done-sub">أفضل من أمس بخطوة… وهذا هو المطلوب 🦋</p>
      <div className="done-stats">
        <div><b className="mint">{ar(right)} من {ar(total)}</b><span>صحيحة من أول مرة</span></div>
        {!s.board && <div><b className="sun">+{ar(saved.earned)}</b><span>نجمة</span></div>}
        <div><b>{ar(practice.missed.length)}</b><span>للمراجعة</span></div>
      </div>
      <div className="lawcard">
        <span className="muted small">بطاقة القانون · حُفظت في «ملخّصاتي»</span>
        <div className="law-line">{data.law.title} = <Fraction n={data.law.top} d={data.law.bottom} size="sm" /> {data.law.tail}</div>
      </div>
      <div className="done-actions">
        <Button variant="sun" onClick={() => go('')}>إلى الرئيسية</Button>
        {onRetry ? <Button variant="link-light" onClick={onRetry}>أعيد الأسئلة التي أخطأت فيها</Button> : <Button variant="link-light" onClick={onRestart}>أعد المحطة من البداية</Button>}
      </div>
    </main>
  );
}

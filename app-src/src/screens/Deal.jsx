import { useEffect, useRef, useState } from 'react';
import { useStore, dealStatus, startDeal, closeDeal } from '../lib/store.js';
import { GOALS, REWARDS, TAXES, WHEN, WHERE, VERDICTS, SCIENCE } from '../data/deal.js';
import { ar } from '../lib/num.js';
import { Button, Mascot, poseSrc } from '../components/ui.jsx';
import { go } from '../App.jsx';

const STEP_NAMES = ['هدفك', 'مكافأتك', 'ضريبة الكسل', 'خطّتك', 'التوقيع'];

function Back({ onClick, label = 'رجوع' }) {
  return (
    <button type="button" className="icon-btn" aria-label={label} onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
    </button>
  );
}

function Pick({ items, value, onPick, custom, setCustom, placeholder }) {
  return (
    <div className="picks">
      {items.map((it) => (
        <button key={it.id} type="button" className={`pick${value === it.id ? ' on' : ''}`} aria-pressed={value === it.id} onClick={() => onPick(it.id)}>
          <span className="pick-e" aria-hidden="true">{it.e}</span>
          <span className="pick-t">{it.t}</span>
          {it.kind && <span className="pick-k">{it.kind}</span>}
        </button>
      ))}
      <label className={`pick pick-own${value === 'own' ? ' on' : ''}`}>
        <span className="pick-e" aria-hidden="true">✍️</span>
        <input type="text" value={custom} placeholder={placeholder} maxLength={80} onFocus={() => onPick('own')} onChange={(e) => { setCustom(e.target.value); onPick('own'); }} />
      </label>
    </div>
  );
}

/** Press and hold to sign. */
function HoldToSign({ onSigned }) {
  const [p, setP] = useState(0);
  const t = useRef(null);
  const start = () => { clearInterval(t.current); t.current = setInterval(() => setP((x) => { const n = x + 0.05; if (n >= 1) { clearInterval(t.current); onSigned(); } return Math.min(1, n); }), 60); };
  const stop = () => { clearInterval(t.current); setP((x) => (x >= 1 ? 1 : 0)); };
  useEffect(() => () => clearInterval(t.current), []);
  return (
    <button type="button" className="hold" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !e.repeat && start()} onKeyUp={stop} aria-label="اضغط مطوّلًا للتوقيع">
      <span className="hold-fill" style={{ width: `${p * 100}%` }} />
      <span className="hold-txt">{p >= 1 ? 'تم التوقيع ✓' : 'اضغط مطوّلًا لتوقّع 🖐️'}</span>
    </button>
  );
}

function Wizard({ onDone }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(120);
  const [rw, setRw] = useState(null); const [rwOwn, setRwOwn] = useState('');
  const [tx, setTx] = useState(null); const [txOwn, setTxOwn] = useState('');
  const [when, setWhen] = useState(WHEN[1]); const [where, setWhere] = useState(WHERE[0]);
  const [witness, setWitness] = useState('');
  const [signed, setSigned] = useState(false);
  const reward = rw === 'own' ? { e: '🎁', t: rwOwn.trim() } : REWARDS.find((r) => r.id === rw);
  const tax = tx === 'own' ? { e: '⚖️', t: txOwn.trim() } : TAXES.find((r) => r.id === tx);
  const can = [true, !!reward?.t, !!tax?.t, true, signed][step];

  useEffect(() => { window.scrollTo(0, 0); }, [step]);
  const next = () => {
    if (step < 4) return setStep(step + 1);
    startDeal({ goal, reward: { e: reward.e, t: reward.t }, tax: { e: tax.e, t: tax.t }, when, where, witness: witness.trim() });
    onDone();
  };

  return (
    <main className="screen">
      <div className="stepbar">
        <Back onClick={() => (step ? setStep(step - 1) : go(''))} label={step ? 'الخطوة السابقة' : 'رجوع إلى الرئيسية'} />
        <div className="stepbar-main">
          <span className="stepbar-label">صفقتي مع نفسي · {ar(step + 1)} من ٥ · {STEP_NAMES[step]}</span>
          <div className="segs" aria-hidden="true">{STEP_NAMES.map((_, i) => <span key={i} className={i <= step ? 'on' : ''} />)}</div>
        </div>
      </div>

      <div className="step" key={step}>
        {step === 0 && <>
          <h1 className="step-title">كم نجمة تَعِد نفسك هذا الأسبوع؟</h1>
          <div className="goals">
            {GOALS.map((g) => (
              <button key={g.v} type="button" className={`goal${goal === g.v ? ' on' : ''}`} aria-pressed={goal === g.v} onClick={() => setGoal(g.v)}>
                <b>⭐ {ar(g.v)}</b><span>{g.name}</span><small>{g.note}</small>
              </button>
            ))}
          </div>
          <Mascot pose="think" size={76}>اختر هدفًا يتعبك قليلًا ولا يكسرك. الهدف الواقعي الذي تُنجزه أقوى من الكبير الذي تتركه.</Mascot>
        </>}

        {step === 1 && <>
          <h1 className="step-title">إن وصلت… بماذا تكافئ نفسك؟</h1>
          <p className="lead">اختر شيئًا تحبّه فعلًا ويفرّحك، ولا يُغضب الله. ستحصل عليه فقط إن وصلت.</p>
          <Pick items={REWARDS} value={rw} onPick={setRw} custom={rwOwn} setCustom={setRwOwn} placeholder="أو اكتب مكافأتك أنت…" />
        </>}

        {step === 2 && <>
          <h1 className="step-title">وإن لم تصل… ما ضريبة الكسل؟</h1>
          <p className="lead">شيء لا تحبّه كثيرًا لكنه مفيد لك ولمن حولك. مزعج قليلًا، مضحك أحيانًا، ولا يؤذي أحدًا.</p>
          <Pick items={TAXES} value={tx} onPick={setTx} custom={txOwn} setCustom={setTxOwn} placeholder="أو اكتب ضريبتك أنت…" />
        </>}

        {step === 3 && <>
          <h1 className="step-title">خطّة «إذا… فإني»</h1>
          <p className="lead">من يحدّد متى وأين سيذاكر، ينفّذ أكثر بكثير ممن يقول «سأذاكر لاحقًا».</p>
          <span className="field-label">متى؟</span>
          <div className="chips">{WHEN.map((w) => <button key={w} type="button" className={`chipbtn${when === w ? ' on' : ''}`} aria-pressed={when === w} onClick={() => setWhen(w)}>{w}</button>)}</div>
          <span className="field-label">أين؟</span>
          <div className="chips">{WHERE.map((w) => <button key={w} type="button" className={`chipbtn${where === w ? ' on' : ''}`} aria-pressed={where === w} onClick={() => setWhere(w)}>{w}</button>)}</div>
          <div className="plan-line">«إذا جاء وقت <b>{when}</b>، فإني أجلس <b>{where}</b> وأفتح بنفسجو.»</div>
        </>}

        {step === 4 && <>
          <div className={`contract${signed ? ' signed' : ''}`}>
            <span className="contract-kicker">عقد بيني وبين نفسي</span>
            <p>أتعهّد أن أجمع <b>⭐ {ar(goal)}</b> خلال ٧ أيام، وأذاكر <b>{when}</b> <b>{where}</b>.</p>
            <div className="contract-row win"><span aria-hidden="true">{reward.e}</span><div><small>إن وصلت أكافئ نفسي بـ</small><b>{reward.t}</b></div></div>
            <div className="contract-row lose"><span aria-hidden="true">{tax.e}</span><div><small>وإن لم أصل، فضريبتي</small><b>{tax.t}</b></div></div>
            <label className="witness">
              <span>شاهد على العقد (اختياري): شخص تحبّه يسألك كل يوم</span>
              <input type="text" value={witness} maxLength={30} placeholder="مثل: أمي، أخي، صديقي…" onChange={(e) => setWitness(e.target.value)} />
            </label>
            {signed && <span className="stamp" aria-hidden="true">مُعتمد</span>}
          </div>
          <HoldToSign onSigned={() => setSigned(true)} />
        </>}

        <div className="step-foot"><Button onClick={next} disabled={!can}>{step < 4 ? 'التالي' : 'ابدأ الأسبوع'}</Button></div>
      </div>
    </main>
  );
}

function Ring({ pct, children }) {
  const r = 70, c = 2 * Math.PI * r;
  return (
    <div className="ring">
      <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#EDE3FF" strokeWidth="16" />
        {pct > 0 && <circle cx="90" cy="90" r={r} fill="none" stroke="#5F2EB8" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 90 90)" />}
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  );
}

function nudge(d) {
  const left = d.goal - d.got;
  if (d.pct >= 0.8) return `بقي لك ⭐ ${ar(left)} فقط! أنت على باب المكافأة 🔥`;
  if (d.pct >= 0.5) return 'تجاوزت النصف، والنصف الثاني دائمًا أسرع.';
  if (d.pct > 0) return 'بداية ممتازة. محطة واحدة اليوم تقرّبك كثيرًا.';
  return `تذكّر خطّتك: ${d.when} ${d.where}. الخطوة الأولى أهم خطوة.`;
}

export default function Deal() {
  const [s] = useStore();
  const d = dealStatus(s);
  const [mode, setMode] = useState(d ? 'view' : 'intro');
  const [did, setDid] = useState(false);
  const [lesson, setLesson] = useState(null);
  const verdict = useRef(VERDICTS[Math.floor(Math.random() * VERDICTS.length)]);

  if (mode === 'wizard') return <Wizard onDone={() => setMode('view')} />;

  if (!d) {
    return (
      <main className="screen">
        <div className="stepbar"><Back onClick={() => go('')} label="رجوع إلى الرئيسية" /><span className="stepbar-label">صفقتي مع نفسي</span></div>
        <div className="step">
          <div className="deal-hero"><img src={poseSrc('thumbs')} alt="بنفسجو يرفع إبهامه" width="150" height="150" /></div>
          <h1 className="step-title center-t">صفقة بينك وبين نفسك 🤝</h1>
          <ol className="how">
            <li><b>تحدّد هدفك</b> من النجوم لهذا الأسبوع.</li>
            <li><b>تختار مكافأتك</b> إن وصلت: شيء تحبّه ويفرّحك.</li>
            <li><b>وتختار ضريبة الكسل</b> إن لم تصل: شيء مفيد لا تحبّه كثيرًا.</li>
          </ol>
          <p className="lead center-t">أنت القاضي، وأنت المتّهم، وأنت الفائز. 😄</p>
          <details className="science">
            <summary>لماذا تنجح هذه الفكرة؟ (العلم وراءها)</summary>
            <ul>{SCIENCE.map((x) => <li key={x.t}><b>{x.t}:</b> {x.d}</li>)}</ul>
          </details>
          <div className="step-foot"><Button onClick={() => setMode('wizard')}>اصنع صفقتك</Button></div>
        </div>
      </main>
    );
  }

  if (d.state === 'won') {
    return (
      <main className="screen done-screen">
        <div className="stars" aria-hidden="true"><span className="on">★</span><span className="on">★</span><span className="on">★</span></div>
        <div className="done-hero"><img src={poseSrc('win')} alt="بنفسجو يحتفل" width="160" height="160" /></div>
        <h1 className="done-title">وفيتَ بوعدك! 🎉</h1>
        <p className="done-sub">جمعت ⭐ {ar(d.got)} من ⭐ {ar(d.goal)}. الوفاء بالوعد للنفس أوّل الطريق للوفاء مع الناس.</p>
        <div className="lawcard reward-card"><span className="muted small">مكافأتك تنتظرك، استحققتها بجدارة</span><div className="reward-line"><span aria-hidden="true">{d.reward.e}</span><b>{d.reward.t}</b></div></div>
        <div className="done-actions">
          <Button variant="sun" onClick={() => { closeDeal('won'); setMode('intro'); }}>استمتعت بها ✓ صفقة جديدة</Button>
          <Button variant="link-light" onClick={() => go('')}>إلى الرئيسية</Button>
        </div>
      </main>
    );
  }

  if (d.state === 'lost') {
    return (
      <main className="screen court">
        <div className="court-head"><span aria-hidden="true">⚖️</span><b>محكمة بنفسجو</b></div>
        <p className="court-intro">{verdict.current}</p>
        <div className="sentence">
          <span className="muted small">جمعتَ ⭐ {ar(d.got)} من ⭐ {ar(d.goal)}، لذلك تنفّذ:</span>
          <div className="reward-line"><span aria-hidden="true">{d.tax.e}</span><b>{d.tax.t}</b></div>
          {d.witness && <span className="muted small">الشاهد «{d.witness}» سيتأكّد من التنفيذ 👀</span>}
        </div>
        <label className="switch"><input type="checkbox" checked={did} onChange={(e) => setDid(e.target.checked)} /><span><b>نفّذتُ الحكم بشرف</b><small>الاعتراف بالتقصير شجاعة، والتنفيذ بطولة.</small></span></label>
        <span className="field-label">ما الذي ستغيّره الأسبوع القادم؟</span>
        <div className="chips">
          {['أبدأ أبكر', 'هدف أصغر وأثبت', 'الجوال بعيد وقت المذاكرة', 'أذاكر مع صديق'].map((x) => <button key={x} type="button" className={`chipbtn${lesson === x ? ' on' : ''}`} aria-pressed={lesson === x} onClick={() => setLesson(x)}>{x}</button>)}
        </div>
        <Mascot pose="love" size={76}>تعثّرت هذا الأسبوع، لا بأس. الذي يقوم بعد التعثّر أقوى من الذي لم يجرّب أصلًا.</Mascot>
        <div className="step-foot"><Button onClick={() => { closeDeal('lost', { lesson }); setMode('intro'); }} disabled={!did}>أسبوع جديد، بداية جديدة</Button></div>
      </main>
    );
  }

  return (
    <main className="screen">
      <div className="stepbar"><Back onClick={() => go('')} label="رجوع إلى الرئيسية" /><span className="stepbar-label">صفقتي مع نفسي · بقي {ar(d.daysLeft)} {d.daysLeft === 1 ? 'يوم' : 'أيام'}</span></div>
      <div className="step">
        <Ring pct={d.pct}><b>⭐ {ar(d.got)}</b><span>من {ar(d.goal)}</span></Ring>
        <Mascot pose={d.pct >= 0.8 ? 'wow' : 'point'} size={76}>{nudge(d)}</Mascot>
        <div className="contract-row win"><span aria-hidden="true">{d.reward.e}</span><div><small>مكافأتك إن وصلت</small><b>{d.reward.t}</b></div></div>
        <div className="contract-row lose"><span aria-hidden="true">{d.tax.e}</span><div><small>ضريبتك إن لم تصل</small><b>{d.tax.t}</b></div></div>
        <div className="plan-line">خطّتك: <b>{d.when}</b> · <b>{d.where}</b>{d.witness ? <> · الشاهد: <b>{d.witness}</b></> : null}</div>
        <div className="step-foot"><Button onClick={() => go('')}>اجمع نجومك الآن</Button></div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { useStore, streak, setStore, resetProgress, dealStatus } from '../lib/store.js';
import { TRACK } from '../data/stations.js';
import { ar } from '../lib/num.js';
import { Button, Mascot, Sheet, Fraction, poseSrc } from '../components/ui.jsx';
import { go } from '../App.jsx';

const CONTACT = 'mailto:hammad.renad.92@gmail.com?subject=' + encodeURIComponent('تواصل من تطبيق بنفسجو');

export default function Home() {
  const [s] = useStore();
  const [info, setInfo] = useState(null);
  const [me, setMe] = useState(false);
  const today = TRACK.find((t) => t.ready && !s.done[t.id]) || TRACK.find((t) => t.ready);
  const allDone = TRACK.filter((t) => t.ready).every((t) => s.done[t.id]);
  const days = streak(s.days);
  const deal = dealStatus(s);

  return (
    <main className="screen home">
      <header className="home-top">
        <span className="brand">بنفسجو</span>
        <div className="home-top-end">
          {!s.board && <span className="chip chip-sun" aria-label={`${ar(s.stars)} نجمة`}>⭐ {ar(s.stars)}</span>}
          <button type="button" className="icon-btn round" aria-label="حسابي" onClick={() => setMe(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
          </button>
        </div>
      </header>

      <section className={`today${!s.seenGuide ? ' spotlight' : ''}`} aria-label="محطة اليوم">
        <div className="today-row">
          <img src={poseSrc(allDone ? 'love' : 'point')} alt="" width="86" height="86" />
          <div>
            <span className="muted">{allDone ? 'أحسنت! أكملت المتاح' : `محطة اليوم · ${ar(today.minutes)} دقائق`}</span>
            <h1 className="today-title">{today.title}</h1>
            {days > 1 && !s.board && <span className="muted small">🔥 {ar(days)} أيام متتالية</span>}
          </div>
        </div>
        <Button onClick={() => { setStore({ seenGuide: true }); go('station/' + today.id); }}>{s.done[today.id] ? 'أعد المحطة' : 'ابدأ'}</Button>
      </section>

      {!s.board && (
        <a className="deal-card" href="#/deal">
          <span className="deal-e" aria-hidden="true">🤝</span>
          {!deal && <span className="deal-txt"><b>صفقة الأسبوع مع نفسك</b><small>هدف، ومكافأة تحبّها… وضريبة للكسل 😄</small></span>}
          {deal && deal.state === 'active' && <span className="deal-txt"><b>صفقتك: ⭐ {ar(deal.got)} من {ar(deal.goal)}</b><span className="deal-bar"><span style={{ width: `${deal.pct * 100}%` }} /></span><small>بقي {ar(deal.daysLeft)} {deal.daysLeft === 1 ? 'يوم' : 'أيام'} · {deal.reward.e} بانتظارك</small></span>}
          {deal && deal.state === 'won' && <span className="deal-txt"><b>وفيت بوعدك! 🎉</b><small>افتح لترى مكافأتك</small></span>}
          {deal && deal.state === 'lost' && <span className="deal-txt"><b>محكمة بنفسجو تنتظرك ⚖️</b><small>انتهى الأسبوع، افتح لترى الحكم</small></span>}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </a>
      )}

      <h2 className="section-label">طريقك في الكمّي</h2>
      <ol className="trail">
        {TRACK.map((t) => {
          const done = !!s.done[t.id];
          const here = t.id === today.id && !done;
          return (
            <li key={t.id} className={`trail-item${done ? ' done' : ''}${here ? ' here' : ''}${t.ready ? '' : ' later'}`}>
              <button type="button" className="trail-btn" onClick={() => (t.ready ? go('station/' + t.id) : setInfo(t))}>
                <span className="trail-dot" aria-hidden="true">{done ? '✓' : ar(t.n)}</span>
                <span className="trail-name">{t.title}{here && <em> · أنت هنا</em>}</span>
                {done && !s.board && <span className="trail-stars" aria-label={`${ar(s.done[t.id].stars)} نجوم`}>{'★'.repeat(s.done[t.id].stars)}</span>}
              </button>
            </li>
          );
        })}
      </ol>

      <footer className="home-foot"><a href={CONTACT}>تواصل معنا</a></footer>

      {!s.seenGuide && (
        <div className="guide" role="dialog" aria-modal="true" aria-label="مرحبًا بك">
          <div className="guide-card">
            <div className="guide-arrow" aria-hidden="true" />
            <b>أهلًا! أنا بنفسجو 👋</b>
            <p>اضغط «ابدأ» وأنا معك خطوة بخطوة. كل محطة ٨ دقائق فقط.</p>
            <Button variant="ghost" onClick={() => setStore({ seenGuide: true })}>فهمت</Button>
          </div>
          <img className="guide-mascot" src={poseSrc('wave')} alt="بنفسجو يلوّح" width="150" height="150" />
        </div>
      )}

      <Sheet open={!!info} title={info ? `المحطة ${ar(info.n)}: ${info.title}` : ''} onClose={() => setInfo(null)}>
        <Mascot pose="think" size={80}>هذه المحطة تنتقل إلى الشكل الجديد قريبًا. تقدر تذاكرها الآن بالنسخة الحالية.</Mascot>
        <div className="sheet-actions">
          {info && <Button href={`../lessons/${info.id}.html`}>افتح النسخة الحالية</Button>}
          <Button variant="link" onClick={() => setInfo(null)}>حسنًا</Button>
        </div>
      </Sheet>

      <Sheet open={me} title="حسابي" onClose={() => setMe(false)}>
        <div className="me-stats">
          <div><b>{ar(s.stars)}</b><span>نجمة</span></div>
          <div><b>{ar(Object.keys(s.done).length)}</b><span>محطة مكتملة</span></div>
          <div><b>{ar(days)}</b><span>أيام متتالية</span></div>
        </div>
        <h3 className="sheet-sub">ملخّصاتي</h3>
        {s.laws.length === 0 ? (
          <p className="muted">أكمل أي محطة لتُحفظ بطاقة قانونها هنا.</p>
        ) : (
          s.laws.map((l) => (
            <div key={l.id} className="lawcard small">
              <div className="law-line">{l.title} = <Fraction n={l.top} d={l.bottom} size="sm" /> {l.tail}</div>
            </div>
          ))
        )}
        <label className="switch">
          <input type="checkbox" checked={!!s.board} onChange={(e) => setStore({ board: e.target.checked })} />
          <span><b>وضع السبورة</b><small>للمعلّم: خط أكبر، بلا نجوم، ومؤقّت «فكّر» قبل كل سؤال</small></span>
        </label>
        <Button variant="ghost" href={CONTACT}>✉️ تواصل معنا</Button>
        <div className="sheet-actions">
          <Button variant="link" onClick={() => { if (window.confirm('مسح التقدّم والنجوم من هذا الجهاز؟')) { resetProgress(); setMe(false); } }}>مسح التقدّم والبدء من جديد</Button>
        </div>
      </Sheet>
    </main>
  );
}

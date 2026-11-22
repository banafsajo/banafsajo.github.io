import { useEffect, useRef, useState } from 'react';
import { ar } from '../lib/num.js';
import wave from '../assets/wave.webp';
import think from '../assets/think.webp';
import win from '../assets/win.webp';
import point from '../assets/point.webp';
import read from '../assets/read.webp';
import wow from '../assets/wow.webp';
import love from '../assets/love.webp';
import thumbs from '../assets/thumbs.webp';

const POSES = { wave, think, win, point, read, wow, love, thumbs };
const POSE_ALT = { wave: 'بنفسجو يلوّح', think: 'بنفسجو يفكّر', win: 'بنفسجو يحتفل', point: 'بنفسجو يشير', read: 'بنفسجو يقرأ', wow: 'بنفسجو مندهش', love: 'بنفسجو سعيد', thumbs: 'بنفسجو يرفع إبهامه' };

/** A fraction, always stacked (numerator over denominator). Digits are Arabic-Indic. */
export function Fraction({ n, d, size = 'md', tone }) {
  return (
    <span className={`frac frac-${size}${tone ? ' frac-' + tone : ''}`} role="math" aria-label={`${ar(n)} على ${ar(d)}`}>
      <span className="frac-n">{typeof n === 'number' ? ar(n) : n}</span>
      <span className="frac-d">{typeof d === 'number' ? ar(d) : d}</span>
    </span>
  );
}

export function Button({ children, variant = 'primary', href, onClick, disabled, className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  if (href) return <a className={cls} href={href} onClick={onClick} {...rest}>{children}</a>;
  return <button type="button" className={cls} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}

export function Mascot({ pose = 'wave', size = 90, children, side = 'start' }) {
  return (
    <div className={`mascot mascot-${side}`}>
      <img src={POSES[pose]} alt={POSE_ALT[pose]} width={size} height={size} style={{ width: size, height: 'auto' }} />
      {children && <div className="bubble">{children}</div>}
    </div>
  );
}
export const poseSrc = (p) => POSES[p];

/** Top bar inside a station: close (×), step label, 4-segment progress. */
export function StepBar({ step, total = 4, label, onClose }) {
  return (
    <div className="stepbar">
      <button type="button" className="icon-btn" aria-label="خروج إلى الرئيسية" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="stepbar-main">
        <span className="stepbar-label">الخطوة {ar(step)} من {ar(total)} · {label}</span>
        <div className="segs" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <span key={i} className={i < step ? 'on' : ''} />)}
        </div>
      </div>
    </div>
  );
}

/** A grid of equal cells, `shaded` of them colored. Optional per-cell label. */
export function CellGrid({ total, shaded, cols = 10, label, tall = false, animate = true }) {
  const [shown, setShown] = useState(animate ? 0 : shaded);
  useEffect(() => {
    if (!animate) { setShown(shaded); return; }
    setShown(0);
    let i = 0; const step = Math.max(1, Math.round(shaded / 18));
    const t = setInterval(() => { i = Math.min(shaded, i + step); setShown(i); if (i >= shaded) clearInterval(t); }, 30);
    return () => clearInterval(t);
  }, [shaded, total, animate]);
  return (
    <div className={`cellgrid${tall ? ' tall' : ''}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="img" aria-label={`${ar(shaded)} من ${ar(total)} مظلّلة`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < shown ? 'on' : ''}>{label || ''}</span>
      ))}
    </div>
  );
}

/** A pie showing part/whole. */
export function Pie({ part, whole, size = 120 }) {
  const r = 46, c = 2 * Math.PI * r, f = part / whole;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${ar(part)} من ${ar(whole)}`}>
      <circle cx="50" cy="50" r={r} fill="#EDE3FF" />
      <circle cx="50" cy="50" r={r / 2} fill="none" stroke="#5F2EB8" strokeWidth={r} strokeDasharray={`${(c / 2) * f} ${c}`} transform="rotate(-90 50 50)" />
      {Array.from({ length: whole }, (_, i) => {
        const a = (i / whole) * 2 * Math.PI - Math.PI / 2;
        return <line key={i} x1="50" y1="50" x2={50 + r * Math.cos(a)} y2={50 + r * Math.sin(a)} stroke="#FFFFFF" strokeWidth="2" />;
      })}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#5F2EB8" strokeWidth="3" />
    </svg>
  );
}

/** Countdown bar; calls onEnd once. */
export function TimeBar({ seconds, running = true, onEnd, label }) {
  const [left, setLeft] = useState(seconds);
  const ended = useRef(false);
  useEffect(() => { setLeft(seconds); ended.current = false; }, [seconds]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((l) => Math.max(0, +(l - 0.1).toFixed(1))), 100);
    return () => clearInterval(t);
  }, [running]);
  useEffect(() => { if (left <= 0 && !ended.current) { ended.current = true; onEnd && onEnd(); } }, [left, onEnd]);
  return (
    <div className="timebar" role="timer" aria-label={`${label || 'الوقت'}: ${ar(Math.ceil(left))} ثانية`}>
      <span className="timebar-txt">{label} {ar(Math.ceil(left))}</span>
      <div className="timebar-track"><span style={{ width: `${(left / seconds) * 100}%` }} /></div>
    </div>
  );
}

/** Bottom sheet dialog. */
export function Sheet({ open, title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  if (!open) return null;
  return (
    <div className="sheet-wrap" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
        <div className="sheet-head">
          <b>{title}</b>
          <button type="button" className="icon-btn" aria-label="إغلاق" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

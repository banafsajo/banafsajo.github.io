import { useEffect, useState, useCallback } from 'react';

const KEY = 'banafsajo.v2';
const blank = { stars: 0, done: {}, laws: [], seenGuide: false, board: false, days: [], deal: null, deals: [] };

function load() {
  try { return { ...blank, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...blank }; }
}
function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage may be blocked: app still works this session */ }
}
let state = load();
const subs = new Set();
function set(fn) {
  state = typeof fn === 'function' ? fn(state) : { ...state, ...fn };
  save(state);
  subs.forEach((f) => f(state));
}

/** Shared progress store, persisted on this device. */
export function useStore() {
  const [s, setS] = useState(state);
  useEffect(() => { subs.add(setS); return () => subs.delete(setS); }, []);
  return [s, useCallback(set, [])];
}

const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => ymd(new Date());
export function markActiveToday() {
  set((s) => (s.days.includes(today()) ? s : { ...s, days: [...s.days, today()].slice(-60) }));
}
/** Consecutive active days ending today (or yesterday). */
export function streak(days) {
  const set_ = new Set(days); let n = 0; const d = new Date();
  if (!set_.has(today())) d.setDate(d.getDate() - 1);
  while (set_.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
export function finishStation(id, { stars, earned, law }) {
  set((s) => {
    const prev = s.done[id]?.stars || 0;
    const laws = law && !s.laws.find((l) => l.id === id) ? [...s.laws, { id, ...law }] : s.laws;
    return { ...s, stars: s.stars + earned, done: { ...s.done, [id]: { stars: Math.max(prev, stars) } }, laws };
  });
}
export function resetProgress() { set({ ...blank, seenGuide: true }); }
export const setStore = set;

const DAY = 86400000;
/** Weekly self-contract: progress and state, derived from the stored deal. */
export function dealStatus(s, now = Date.now()) {
  const d = s.deal;
  if (!d) return null;
  const got = Math.max(0, s.stars - d.startStars);
  const daysLeft = Math.max(0, Math.ceil((d.end - now) / DAY));
  const state = d.closed ? d.closed : got >= d.goal ? 'won' : now >= d.end ? 'lost' : 'active';
  return { ...d, got, daysLeft, state, pct: Math.min(1, got / d.goal) };
}
export function startDeal(deal) {
  set((s) => ({ ...s, deal: { ...deal, startStars: s.stars, start: Date.now(), end: Date.now() + 7 * DAY } }));
}
export function closeDeal(result, extra = {}) {
  set((s) => ({ ...s, deal: null, deals: [...s.deals, { ...s.deal, closed: result, ...extra, at: Date.now() }].slice(-20) }));
}

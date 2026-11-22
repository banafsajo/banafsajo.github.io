import { useState } from 'react';
import { Button, CellGrid, Fraction, Mascot } from '../components/ui.jsx';
import { ar, pct } from '../lib/num.js';

export default function Idea({ data, onNext }) {
  const [n, setN] = useState(data.start);
  return (
    <div className="step">
      <h1 className="step-title">{data.headline.split('=')[0]}= <span className="accent">{data.headline.split('=')[1]}</span></h1>
      <div className="card center">
        <CellGrid total={100} shaded={n} cols={10} animate={false} />
        <label className="slider">
          <span>حرّك ولوّن بنفسك: <b>{ar(n)}</b> من ١٠٠</span>
          <input type="range" min="0" max="100" value={n} onChange={(e) => setN(+e.target.value)} aria-label="عدد المربعات الملوّنة" />
        </label>
      </div>
      <div className="equation" aria-live="polite">
        <span>{ar(n)} من ١٠٠</span><span>=</span><Fraction n={n} d={100} tone="light" /><span>=</span><b className="big-pct">{pct(n)}</b>
      </div>
      <Mascot pose="read" size={84}>{data.bubble}</Mascot>
      <div className="step-foot"><Button onClick={onNext}>فهمت، أرني مثالًا</Button></div>
    </div>
  );
}

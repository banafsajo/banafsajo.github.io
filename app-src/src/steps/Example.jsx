import { useState } from 'react';
import { Button, CellGrid, Fraction, Mascot } from '../components/ui.jsx';
import { pct } from '../lib/num.js';

export default function Example({ data, onNext }) {
  const [shown, setShown] = useState(1);
  const last = shown >= data.steps.length;
  return (
    <div className="step">
      <span className="tag tag-mint">بنفسجو يحل أمامك</span>
      <h1 className="step-title sm">{data.prompt}</h1>
      <div className="card center">
        <CellGrid total={data.visual.total} shaded={data.visual.shaded} cols={data.visual.cols} tall />
      </div>
      <ol className="solve" aria-live="polite">
        {data.steps.slice(0, shown).map((st, i) => (
          <li key={i} className="solve-step">
            <span className="solve-n" aria-hidden="true">{['١', '٢', '٣', '٤'][i]}</span>
            <div>
              <p>{st.say}</p>
              {st.frac && <Fraction n={st.frac[0]} d={st.frac[1]} />}
              {st.result != null && <b className="big-pct dark">{pct(st.result)}</b>}
            </div>
          </li>
        ))}
      </ol>
      {last && <Mascot pose="thumbs" size={72}>{data.shortcut}</Mascot>}
      <div className="step-foot">
        {last ? <Button onClick={onNext}>دوري الآن</Button> : <Button onClick={() => setShown(shown + 1)}>الخطوة التالية</Button>}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { StepBar } from '../components/ui.jsx';
import Idea from '../steps/Idea.jsx';
import Example from '../steps/Example.jsx';
import Practice from '../steps/Practice.jsx';
import Challenge from '../steps/Challenge.jsx';
import Done from '../steps/Done.jsx';
import { finishStation, markActiveToday } from '../lib/store.js';
import { go } from '../App.jsx';

const LABELS = ['الفكرة', 'مثال محلول', 'دورك', 'تحدّي'];

export default function Station({ data }) {
  const [step, setStep] = useState(1);
  const [practice, setPractice] = useState(null); // { firstTry, missed:[idx], points }
  const [score, setScore] = useState(null);
  const [retry, setRetry] = useState(null); // indices being replayed
  const [saved, setSaved] = useState(null);

  useEffect(() => { markActiveToday(); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const close = () => go('');

  const finishChallenge = (sc) => {
    setScore(sc);
    const stars = 1 + (practice.firstTry >= 2 ? 1 : 0) + (sc >= 4 ? 1 : 0);
    const earned = practice.points + sc * 5;
    finishStation(data.id, { stars, earned, law: data.law });
    setSaved({ stars, earned });
    setStep(5);
  };

  if (retry) {
    return (
      <main className="screen">
        <StepBar step={3} label="مراجعة الأخطاء" onClose={close} />
        <Practice key="retry" items={retry.map((i) => data.practice[i])} review onFinish={() => { setRetry(null); setPractice((p) => ({ ...p, missed: [] })); }} />
      </main>
    );
  }
  if (step === 5) {
    return <Done data={data} practice={practice} score={score} saved={saved} onRetry={practice.missed.length ? () => setRetry(practice.missed) : null} onRestart={() => { setPractice(null); setScore(null); setSaved(null); setStep(1); }} />;
  }
  return (
    <main className="screen">
      <StepBar step={step} label={LABELS[step - 1]} onClose={close} />
      {step === 1 && <Idea data={data.idea} onNext={() => setStep(2)} />}
      {step === 2 && <Example data={data.example} onNext={() => setStep(3)} />}
      {step === 3 && <Practice items={data.practice} onFinish={(r) => { setPractice(r); setStep(4); }} />}
      {step === 4 && <Challenge data={data.challenge} onFinish={finishChallenge} />}
    </main>
  );
}

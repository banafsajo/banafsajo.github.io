import { useEffect, useState } from 'react';
import Home from './screens/Home.jsx';
import Station from './screens/Station.jsx';
import { useStore, setStore } from './lib/store.js';
import { STATIONS } from './data/stations.js';

function parse() {
  const h = location.hash.replace(/^#\/?/, '');
  const [page, id] = h.split('/');
  if (page === 'station' && STATIONS[id]) return { page: 'station', id };
  return { page: 'home' };
}
export const go = (path) => { location.hash = '#/' + path; };

export default function App() {
  const [route, setRoute] = useState(parse);
  const [s] = useStore();
  useEffect(() => {
    const f = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  useEffect(() => {
    if (new URLSearchParams(location.search).get('board') === '1') setStore({ board: true });
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('board', !!s.board); }, [s.board]);
  return (
    <div className="shell">
      {route.page === 'station' ? <Station key={route.id} data={STATIONS[route.id]} /> : <Home />}
    </div>
  );
}

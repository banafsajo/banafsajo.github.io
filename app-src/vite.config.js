import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// Writes app/sw.js with every built file precached, so the app works offline from the first visit.
function serviceWorker() {
  return {
    name: 'banafsajo-sw',
    closeBundle() {
      const out = join(process.cwd(), '../app');
      const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
      const files = walk(out).map((f) => '/app/' + relative(out, f).split('\\').join('/')).filter((f) => !f.endsWith('sw.js'));
      const sw = readFileSync(join(process.cwd(), 'sw-template.js'), 'utf8')
        .replace('__VERSION__', Date.now().toString(36))
        .replace('__FILES__', JSON.stringify(['/app/', ...files]));
      writeFileSync(join(out, 'sw.js'), sw);
    },
  };
}

export default defineConfig({
  base: '/app/',
  plugins: [react(), serviceWorker()],
  build: { outDir: '../app', emptyOutDir: true, assetsInlineLimit: 0 },
});

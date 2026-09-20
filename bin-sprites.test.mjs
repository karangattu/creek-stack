import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const bins = ['landfill', 'recycling', 'compost', 'electronic'];
const page = await readFile(new URL('./index.html', import.meta.url), 'utf8');

for (const bin of bins) {
  assert.match(page, new RegExp(`assets/bins/${bin}\\.png`), `${bin} should use a generated bin sprite`);
  await access(new URL(`./assets/bins/${bin}.png`, import.meta.url));
}

console.log('All generated bin sprites are available.');

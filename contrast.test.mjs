import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('./index.html', import.meta.url), 'utf8');

assert.match(page, /\.legend-item\s*\{[^}]*color:\s*#f7fbff[^}]*text-shadow:/s, 'legend labels need a light foreground on dark cards');
assert.match(page, /class="subtitle start-copy"/, 'the main game instruction should have a dedicated readable treatment');
assert.match(page, /\.start-copy\s*\{[^}]*background:\s*rgba\(255,253,245,\.78\)/s, 'the main instruction needs a high-contrast backing panel');
assert.match(page, /class="subtitle control-hint"/, 'the compact controls instruction should have a dedicated readable treatment');

console.log('Start-screen contrast treatments are present.');

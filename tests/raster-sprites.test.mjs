import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const itemTypes = ['banana', 'apple', 'eggshell', 'coffee', 'can', 'box', 'bottle', 'paper', 'battery', 'phone', 'cable', 'bulb', 'pizza', 'cup', 'wrapper', 'bandage'];
const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

assert.match(page, /<img class="item-art"/, 'falling items should use generated raster sprites');
for (const type of itemTypes) {
  await access(new URL(`../assets/items/${type}.png`, import.meta.url));
}

console.log('All generated item sprites are available.');

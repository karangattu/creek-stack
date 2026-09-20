import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('./index.html', import.meta.url), 'utf8');

assert.match(page, /function difficultyFor\(elapsed\)/, 'the game needs staged difficulty');
assert.match(page, /if \(elapsed < 15\) return/, 'the opening should be an easy warm-up');
assert.match(page, /function fitRotationFor\(elapsed\)/, 'items need a target fit rotation');
assert.match(page, /classList\.add\('shape-' \+ shapeFor\(def\.type\)\)/, 'items should have varied visible shapes');
assert.match(page, /const isFitted = item\.rotation % 360 === item\.fitRotation;/, 'correct placement must require the target orientation');
assert.match(page, /const correct = matchesBin && isFitted;/, 'a matching bin alone should not score an unaligned piece');

console.log('Rotation and progressive-difficulty mechanics are configured.');

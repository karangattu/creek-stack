import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

assert.match(page, /class="game-scene"/, 'the play area should include a layered creek scene');
assert.match(page, /class="bin-mark"/, 'bins should use custom vector marks instead of emoji');
assert.match(page, /function itemArtwork\(/, 'falling items should render as custom vector artwork');
assert.doesNotMatch(page, /\bemoji\s*:/, 'item data should not rely on platform emoji artwork');
assert.match(page, /aria-live="polite"/, 'score updates should be announced accessibly');

console.log('Visual design structure is present.');

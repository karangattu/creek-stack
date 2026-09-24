import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

assert.match(page, /\.item\.needs-rotation/, 'items requiring rotation must have distinct visual styling');
assert.match(page, /\.bin\.hint-rotate/, 'bins must show a distinct cue when the lane matches but the item needs rotation');
assert.match(page, /btn-rotate-needed/, 'rotate button must highlight when rotation is required');
assert.match(page, /btn-rotate-fitted/, 'rotate button must indicate when fitting rotation is achieved');
assert.match(page, /fitGhost\.className = 'shape-' \+ shapeFor\(item\.def\.type\)/, 'fit ghost silhouette must adopt the shape of the active item');
assert.match(page, /mission-rot-tag/, 'mission banner must display whether the current item needs rotation or is ready to drop');
assert.match(page, /updateRotateButton/, 'game must maintain active rotate button state updates');

console.log('Rotation clarity and feedback features are verified.');

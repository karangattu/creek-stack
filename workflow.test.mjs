import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

let workflow = '';
try {
  workflow = await readFile(new URL('./.github/workflows/test.yml', import.meta.url), 'utf8');
} catch (error) {
  assert.equal(error?.code, 'ENOENT', 'reading the workflow should not fail unexpectedly');
}

assert.match(workflow, /^on:\n  push:/m, 'the test workflow should run on every push');
assert.match(workflow, /^  pull_request:/m, 'the test workflow should run for pull requests');
assert.match(workflow, /actions\/checkout@v7/, 'the workflow should use the latest checkout action');
assert.match(workflow, /actions\/setup-node@v7/, 'the workflow should use the latest setup-node action');
assert.match(workflow, /node-version: 24/, 'the workflow should use the current Node LTS line');
assert.match(workflow, /node --test/, 'the workflow should run the project tests');

console.log('Continuous test workflow is configured.');

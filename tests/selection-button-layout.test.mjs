import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('Selection primary controls render as requested 3 by 2 grid',()=>{
  assert.match(css,/\.selection-dock\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\);\}/);
  assert.match(css,/#paintSelectDepth\{display:contents;\}/);
  assert.match(css,/#paintSelectDepth \[data-paint-depth="visible"\]\{order:1;\}/);
  assert.match(css,/#paintSelectDepth \[data-paint-depth="through"\]\{order:2;\}/);
  assert.match(css,/#lassoSelectBtn\{order:3;\}/);
  assert.match(css,/#deselectAllBtn\{order:4;\}/);
  assert.match(css,/#selectAllBtn\{order:5;\}/);
  assert.match(css,/#invertSelectionBtn\{order:6;\}/);
});

test('270 cache-hops stylesheet',()=>{
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
});

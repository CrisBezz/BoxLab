import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('Selection primary controls use iPad-safe 3 by 2 layout',()=>{
  assert.match(css,/v0\.36\.18\.271 selection button layout - iPad-safe/);
  assert.match(css,/#paintSelectDepth\{order:1;display:grid!important;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:2px;grid-column:span 2;padding:2px;\}/);
  assert.match(css,/#lassoSelectBtn\{order:2;\}/);
  assert.match(css,/#deselectAllBtn\{order:3;\}/);
  assert.match(css,/#selectAllBtn\{order:4;\}/);
  assert.match(css,/#invertSelectionBtn\{order:5;\}/);
});

test('271 cache-hops stylesheet',()=>{
  assert.match(index,/styles\.css\?v=0\.36\.18\.271/);
});

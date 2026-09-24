import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('454 restores only Boolean presentation, not the failed broad UI wrapper',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.454/);
  assert.doesNotMatch(index,/ui-presentation-451\.js/);
});

test('453 leaves shared Tool Session and protected transform pins intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/tool-session-ui\.js\?v=0\.36\.18\.454/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
});

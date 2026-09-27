import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const array=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('418 active Tool Session reopens Active Tools if another handler collapses it',()=>{
  assert.ok(session.includes("drawer?.addEventListener('toggle'"));
  assert.ok(session.includes("if(active&&!drawer.open)queueMicrotask(enforceOpenWhileActive)"));
  assert.ok(session.includes("if(!active||!drawer||drawer.open)return"));
  assert.ok(session.includes("drawer.open=true"));
});

test('418 Array remains a Tool Session client and current runtime is wired',()=>{
  assert.ok(array.includes("toolSession()?.begin?.({id:'array'"));
  assert.ok(array.includes("if(!toolSession()?.isActive?.('array'))beginArraySession()"));
  assert.ok(index.includes('src/tool-session-ui.js?v='+version));
  assert.ok(index.includes('src/linear-array.js?v='+version));
});

test('418 protected multi-object transform pin remains untouched',()=>{
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});

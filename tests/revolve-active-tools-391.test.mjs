import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Revolve Active Tools runtime follows current app build',()=>{
  const wrapper=index.match(/revolve-profile\.js\?v=([^"]+)/)?.[1];
  assert.equal(wrapper,version);
  assert.match(ui,new RegExp("const VERSION='"+version.replaceAll('.','\\.')+"'"));
});

test('391 construction transform claims Active Tools',()=>{
  assert.match(ui,/initialPlaneSignature/);
  assert.match(ui,/currentPlaneSignature!==meta\.initialPlaneSignature/);
  assert.match(ui,/claimRevolveTools\(meta\)/);
});

test('391 uses established keep-open drawer contract',()=>{
  assert.match(ui,/editDrawer\.dataset\.keepOpen='true'/);
  assert.match(ui,/editDrawer\.open=true/);
  assert.match(ui,/unlockActiveTools/);
});

test('391 Edit Profile opens Revolve tools immediately',()=>{
  assert.match(ui,/if\(meta\.edit\)claimRevolveTools\(meta\)/);
});

test('391 Apply releases the drawer lock',()=>{
  const apply=ui.slice(ui.indexOf('function applyRevolve'),ui.indexOf('function installPenRange'));
  assert.match(apply,/unlockActiveTools\(\)/);
});

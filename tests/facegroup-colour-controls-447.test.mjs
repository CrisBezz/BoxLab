import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {faceGroupColour,normaliseFacegroupView,DEFAULT_FACEGROUP_VIEW} from '../src/facegroup-colours-core.js';

test('447 palette presets and reseed change display colours deterministically',()=>{
  const base=faceGroupColour('Patch',{palette:'default',seed:0,saturation:1,lightness:0,ungrouped:'#7f8792'});
  const vivid=faceGroupColour('Patch',{palette:'vivid',seed:0,saturation:1,lightness:0,ungrouped:'#7f8792'});
  const reseed=faceGroupColour('Patch',{palette:'default',seed:1,saturation:1,lightness:0,ungrouped:'#7f8792'});
  assert.notEqual(base.getHex(),vivid.getHex());
  assert.notEqual(base.getHex(),reseed.getHex());
  assert.equal(faceGroupColour('Patch',{seed:1}).getHex(),faceGroupColour('Patch',{seed:1}).getHex());
});

test('447 ungrouped colour is user-controlled and settings are clamped',()=>{
  const view=normaliseFacegroupView({palette:'nope',saturation:99,lightness:-99,seed:3.8,ungrouped:'#123456'});
  assert.equal(view.palette,'default');
  assert.equal(view.saturation,1.8);
  assert.equal(view.lightness,-.28);
  assert.equal(view.seed,3);
  assert.equal(faceGroupColour(null,view).getHexString(),'123456');
});

test('447 viewport controls are contextual and persistent without touching mesh data',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(render,/id='facegroupViewControls'|id="facegroupViewControls"/);
  assert.match(render,/data-facegroup-palette="default"/);
  assert.match(render,/data-facegroup-palette="soft"/);
  assert.match(render,/data-facegroup-palette="vivid"/);
  assert.match(render,/data-facegroup-palette="contrast"/);
  assert.match(render,/facegroupSaturation/);
  assert.match(render,/facegroupLightness/);
  assert.match(render,/facegroupUngrouped/);
  assert.match(render,/facegroupReseed/);
  assert.match(render,/facegroupReset/);
  assert.match(render,/panel\.hidden=mode!=='facegroups'/);
  assert.match(render,/localStorage\.setItem\(FACEGROUP_VIEW_KEY/);
  assert.match(render,/applyFaceGroupColours\(body\.geometry,source,facegroupView\)/);
  assert.match(index,/src\/render-modes\.js\?v=0\.36\.18\.447/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});

test('447 reset defaults remain stable',()=>{
  assert.deepEqual(DEFAULT_FACEGROUP_VIEW,{palette:'default',saturation:1,lightness:0,seed:0,ungrouped:'#7f8792'});
});

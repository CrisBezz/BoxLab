import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {faceGroupColour,normaliseFacegroupView,DEFAULT_FACEGROUP_VIEW} from '../src/facegroup-colours-core.js';

test('455 palette settings are deterministic and clamped',()=>{
 const base=faceGroupColour('Patch',{palette:'default',seed:0});
 const vivid=faceGroupColour('Patch',{palette:'vivid',seed:0});
 const reseed=faceGroupColour('Patch',{palette:'default',seed:1});
 assert.notEqual(base.getHex(),vivid.getHex());
 assert.notEqual(base.getHex(),reseed.getHex());
 const view=normaliseFacegroupView({palette:'nope',saturation:99,lightness:-99,seed:3.8,ungrouped:'#123456'});
 assert.equal(view.palette,'default'); assert.equal(view.saturation,1.8); assert.equal(view.lightness,-.28); assert.equal(view.seed,3);
 assert.equal(faceGroupColour(null,view).getHexString(),'123456');
 assert.deepEqual(DEFAULT_FACEGROUP_VIEW,{palette:'default',saturation:1,lightness:0,seed:0,ungrouped:'#7f8792'});
});

test('455 controls are contextual and render runtime remains intact',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 for(const token of ['function refreshStudio()','function syncStudio()','function applyMode(body)','data-render="studio"','data-render="facegroups"','facegroupViewControls','facegroupSaturation','facegroupLightness','facegroupUngrouped','facegroupReseed','facegroupReset','localStorage.setItem(FACEGROUP_VIEW_KEY']) assert.ok(s.includes(token),token);
 assert.match(s,/panel\.hidden=mode!==?'facegroups'/);
});

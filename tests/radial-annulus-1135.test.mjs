import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {radialToolPosition,compactRadialLabels} from '../src/radial-compact-labels.js';
const read=n=>fs.readFileSync(new URL('../'+n,import.meta.url),'utf8');
test('1135 all modelling targets clear the central drag annulus, with original cardinal primary slots',()=>{
 for(const [a,x,y] of [[0,0,-84],[90,84,0],[180,0,84],[270,-84,0]]){const p=radialToolPosition(a);assert(Math.abs(p.x-x)<1e-10&&Math.abs(p.y-y)<1e-10);}
 for(const match of read('src/total-gizmo.js').matchAll(/class="([^"]*tg-tool-sector[^"]*)"[^>]*style="--a:([\d.]+)deg/g)){
  const p=radialToolPosition(match[2],match[1].includes('outer')),dx=Math.max(0,Math.abs(p.x)-25),dy=Math.max(0,Math.abs(p.y)-27);
  assert(Math.hypot(dx,dy)>44.5,'full target rectangle must clear shaded ring and stroke');
 }
});
test('1135 packed decorator positions original buttons without replacing listeners or action targets',()=>{
 const style={'--a':'22.5deg',getPropertyValue(k){return this[k];},setProperty(k,v){this[k]=v;}},caption={textContent:'Join Coplanar'},button={style,classList:{contains:k=>k==='tg-tool-outer'},querySelector:()=>caption};
 compactRadialLabels([button],{});assert.equal(style['--radial-x'],'56px');assert.equal(style['--radial-y'],'-140px');assert.equal(style['--radial-unit-x'],.4);
});
test('1135 Paint and modelling share a true evenodd annulus with independently reachable centre controls',()=>{
 const model=read('src/total-gizmo.js'),paint=read('src/viewport-paint.js'),css=read('radial-compact.css');
 const paths=[model,paint].map(s=>s.match(/class="radial-drag-annulus" fill-rule="evenodd" d="([^"]+)"/)?.[1]);assert(paths[0]);assert.equal(paths[0],paths[1]);
 assert(paths[0].includes('a44 44'));assert(paths[0].includes('a30 30'));
 assert.equal([...model.matchAll(/class="tg-tool-center"[^>]*>×<\/button>/g)].length,4);assert(paint.includes('data-paint="hide-tools" class="paint-radial-centre"'));
 assert(css.includes('#totalGizmo[data-hub-state=tools] .tg-radial-move svg{display:block!important}'),'tools-only ring overrides original transform-only SVG visibility');assert(css.includes('pointer-events:fill'));assert(css.includes('pointer-events:none'));assert(css.includes('fill:#c9cdd38c'));
});

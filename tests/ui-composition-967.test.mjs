import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {bindViewportSizing} from '../src/viewport-sizing.js';
test('967 focus and visible-document return coalesce repaint through original sizing owner; hidden state and teardown stay inert',()=>{
 const events=new Map(),frames=new Map(),calls=[],doc={visibilityState:'visible',addEventListener:(n,f)=>events.set('doc:'+n,f),removeEventListener:n=>events.delete('doc:'+n)};let id=0;
 const win={document:doc,devicePixelRatio:2,addEventListener:(n,f)=>events.set(n,f),removeEventListener:n=>events.delete(n),requestAnimationFrame:f=>(frames.set(++id,f),id),cancelAnimationFrame:i=>frames.delete(i)};
 const dispose=bindViewportSizing({element:{clientWidth:1366,clientHeight:826},resize:(...args)=>calls.push(args),win,Observer:null});const flush=()=>{const jobs=[...frames.values()];frames.clear();jobs.forEach(f=>f());};flush();flush();const before=calls.length;
 doc.visibilityState='hidden';events.get('doc:visibilitychange')();events.get('focus')();flush();assert.equal(calls.length,before);
 doc.visibilityState='visible';events.get('doc:visibilitychange')();events.get('focus')();flush();assert.equal(calls.length,before+1);assert.deepEqual(calls.at(-1),[1366,826,2]);assert.equal(frames.size,0);
 events.get('focus')();dispose();assert.equal(frames.size,0);assert.equal(events.size,0);
});
test('967 compositor rules bound canvas and retain untransformed/unclipped UI menus and original header priority',()=>{
 const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8'),rules=css.slice(css.indexOf('/* .967:'));
 assert.match(rules,/#viewportWrap\{isolation:isolate;z-index:0\}/);assert.match(rules,/#viewport\{position:relative;z-index:0;contain:paint;isolation:isolate\}/);assert.match(rules,/\.topbar,\.statusbar,#objectBrowserPanel\{isolation:isolate;will-change:opacity\}/);assert.doesNotMatch(rules,/transform:|opacity:|display:|visibility:|overflow:|contain:.*\.topbar/);
 const view=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');assert.match(view,/\.viewport-menu-panel\{position:fixed;/);assert.match(css,/\.topbar\{[^}]*z-index:10/);
});

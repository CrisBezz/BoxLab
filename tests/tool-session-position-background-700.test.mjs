import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { placeToolSessionPanel } from '../src/tool-session-panel-position.js';

test('session dock anchors independently of model position and bounds its scrollable height',()=>{
  const panel={style:{left:'800px',top:'450px',transform:'translate(112px,-50%)'}};
  placeToolSessionPanel(panel);
  assert.equal(panel.style.left,'50%');assert.equal(panel.style.top,'12px');
  assert.equal(panel.style.transform,'translateX(-50%)');assert.equal(panel.style.overflowY,'auto');
  assert.equal(panel.style.maxHeight,'calc(100% - 24px)');
});

test('all viewport session proxies and floating numeric popup use the shared dock',()=>{
  const src=new URL('../src/',import.meta.url);
  const files=fs.readdirSync(src).filter(name=>/^selection-hub-.*-session\.js$/.test(name));
  assert.equal(files.length,10);
  for(const name of [...files,'total-gizmo.js']){
    const text=fs.readFileSync(new URL(name,src),'utf8');
    assert.match(text,/import \{ placeToolSessionPanel \} from '\.\/tool-session-panel-position\.js\?v=0\.36\.18\.715'/);
    assert.match(text,/placeToolSessionPanel\((?:panel|palette|floatPalette)\)/);
  }
});

function runTap({moved=false,cancelled=false,active=true}={}){
  const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  const start=main.indexOf("canvas.addEventListener('pointerup',event=>{\n  if(!backgroundTap");
  const end=main.indexOf("canvas.addEventListener('pointercancel'",start);
  const calls=[];
  const context={canvas:{addEventListener(type,fn){fn({pointerId:1,clientX:moved?40:0,clientY:0});}},backgroundTap:{pointerId:1,startX:0,startY:0,moved,cancelled},EDIT_DRAG_THRESHOLD:8,__boxlabFaceValueViewportSession:{active:()=>active},window:{dispatchEvent:e=>calls.push(e.type)},CustomEvent:class{constructor(type){this.type=type;}},resetEdgeHoldCycle(){},clearSelection:()=>calls.push('clear'),renderMesh(){}};
  vm.runInNewContext(main.slice(start,end),context);
  return calls;
}
test('owner-confirmed background taps finish contextual settings and preserve selection',()=>{
  assert.deepEqual(runTap(),['boxlab-viewport-background-tap']);
  assert.deepEqual(runTap({active:false}),['clear']);
});
test('background navigation drags and cancelled multi-touch taps do not finish settings',()=>{
  assert.deepEqual(runTap({moved:true}),[]);assert.deepEqual(runTap({cancelled:true}),[]);
});

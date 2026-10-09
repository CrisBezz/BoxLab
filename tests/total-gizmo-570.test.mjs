import {hasAssetReference,shellReleaseMatches,assertAssetReference,contract} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

// Execute the actual proxy construction block. DOM and event delivery are explicit
// doubles; this checks owner wiring, not Safari's native SVG hit-testing.
function hitZones(source=gizmo){
  const start=source.indexOf("for(const el of [...root.querySelectorAll('.tg-handle:not(.tg-center):not(.tg-plane)')]){");
  const end=source.indexOf("for(const el of root.querySelectorAll('.tg-handle'))",start);
  assert.ok(start>=0&&end>start,'actual hit-proxy construction block exists');
  const kinds=['tg-axis','tg-scale-node','tg-arc','tg-screen-ring','tg-scale-ring'];
  function element(kind){
    const classes=new Set([kind,'tg-handle']);
    return {classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)},
      style:{},attrs:{filter:'glow'},events:{},
      removeAttribute(k){delete this.attrs[k];},setAttribute(k,v){this.attrs[k]=v;},
      addEventListener(k,f){this.events[k]=f;},cloneNode(){return element(kind);},
      parentNode:{insertBefore(hit,visual){this.inserted={hit,visual};}}};
  }
  const elements=kinds.map(element),calls=[];
  vm.runInNewContext(source.slice(start,end),{root:{querySelectorAll:selector=>{
    assert.equal(selector,'.tg-handle:not(.tg-center):not(.tg-plane)');return elements;
  }},onHandleDown:function(event){calls.push({receiver:this,event});}});
  for(const [i,el] of elements.entries()){
    const hit=el.__hitProxy;
    assert.ok(hit&&hit!==el);assert.equal(hit.__visual,el);
    assert.equal(el.parentNode.inserted.hit,hit);assert.equal(el.parentNode.inserted.visual,el);
    assert.equal(hit.classList.contains('tg-hit'),true);assert.equal(hit.classList.contains('tg-handle'),false);
    assert.equal(hit.style.pointerEvents,'stroke');assert.equal(hit.style.fill,'none');assert.equal(hit.attrs.fill,'none');
    assert.equal(hit.style.stroke,'transparent');assert.equal(hit.attrs.filter,undefined);
    assert.equal(hit.style.strokeWidth,String([18,22,14,15,15][i]));
    hit.events.pointerenter();assert.equal(el.classList.contains('hover-proxy'),true);
    hit.events.pointerleave();assert.equal(el.classList.contains('hover-proxy'),false);
    const event={pointerId:70+i,pointerType:'pen'};hit.events.pointerdown(event);
    assert.equal(calls.at(-1).receiver,hit);assert.equal(calls.at(-1).event,event);
  }
  // The current CSS overrides inline widths to 16px; do not claim varying effective
  // widths or browser hit accuracy from this controlled construction fixture.
  assert.match(source,/#totalGizmo \.tg-hit\{fill:none!important;stroke:transparent!important;stroke-width:16!important\}/);
}

const checks=[
  ['version stamp',()=>{
    assertAssetReference(index,'total-gizmo.js');
    const record=contract.references.find(r=>r.owner==='index.html'&&r.target==='src/total-gizmo.js');
    assert.equal(crypto.createHash('sha256').update(gizmo).digest('hex'),record.sha256);
  }],
  ['object mode gate',gizmo.includes("currentMode()!=='object'")],
  ['free move center',gizmo.includes('data-tool="move" data-constraint="free" data-kind="free"')],
  ['screen rotate ring',gizmo.includes('data-tool="rotate" data-constraint="free" data-kind="screen"')],
  ['uniform scale ring',gizmo.includes('data-tool="scale" data-constraint="free" data-kind="uniform"')],
  ['axis move x/y/z',['x','y','z'].every(a=>gizmo.includes(`data-tool="move" data-constraint="${a}"`))],
  ['axis scale x/y/z',['x','y','z'].every(a=>gizmo.includes(`class="tg-handle tg-scale-node tg-${a}" data-tool="scale" data-constraint="${a}"`))],
  ['fat invisible hit zones',hitZones],
  ['hover proxy',gizmo.includes('hover-proxy')],
  ['live transform HUD',gizmo.includes("const hud=root.querySelector('.tg-hud')")&&gizmo.includes('new MutationObserver')],
  ['touch/Pencil forwarding',gizmo.includes("pointerType:'pen'")],
  ['projected axis template',gizmo.includes('syncAxisVisuals(center,camera)')],
  ['published module pin',hasAssetReference(index,'total-gizmo.js')],
  ['release version',shellReleaseMatches(index,JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version)],
  ['protected transform pin',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

for(const [name,ok] of checks)test("total-gizmo-570.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));

test('Gizmo proxy fixture rejects invisible-hit and forwarding regressions',()=>{
  for(const [from,to] of [
    ["hit.style.pointerEvents='stroke'","hit.style.pointerEvents='none'"],
    ["hit.style.stroke='transparent'","hit.style.stroke='black'"],
    ['hit.__visual=el','hit.__visual=null'],
    ['onHandleDown.call(hit,e)','onHandleDown.call(el,e)'],
  ]){
    assert.ok(gizmo.includes(from));assert.throws(()=>hitZones(gizmo.replace(from,to)));
  }
});

import fs from 'node:fs';

const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const checks=[
  ['version stamp',gizmo.includes('v0.36.18.570 — Total Gizmo v1')],
  ['object mode gate',gizmo.includes("currentMode()!=='object'")],
  ['free move center',gizmo.includes('data-tool="move" data-constraint="free" data-kind="free"')],
  ['screen rotate ring',gizmo.includes('data-tool="rotate" data-constraint="free" data-kind="screen"')],
  ['uniform scale ring',gizmo.includes('data-tool="scale" data-constraint="free" data-kind="uniform"')],
  ['axis move x/y/z',['x','y','z'].every(a=>gizmo.includes(`data-tool="move" data-constraint="${a}"`))],
  ['axis scale x/y/z',['x','y','z'].every(a=>gizmo.includes(`class="tg-handle tg-scale-node tg-${a}" data-tool="scale" data-constraint="${a}"`))],
  ['fat invisible hit zones',gizmo.includes("hit.style.strokeWidth='16'")],
  ['hover proxy',gizmo.includes('hover-proxy')],
  ['live transform HUD',gizmo.includes("const hud=root.querySelector('.tg-hud')")&&gizmo.includes('new MutationObserver')],
  ['touch/Pencil forwarding',gizmo.includes("pointerType:'pen'")],
  ['projected axis template',gizmo.includes('syncAxisVisuals(center,camera)')],
  ['published module pin',index.includes('src/total-gizmo.js?v=0.36.18.570')],
  ['release version',index.includes('data-release-version="0.36.18.570"')],
  ['protected transform pin',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

let failed=0;
for(const [name,ok] of checks){
  if(ok) console.log('PASS',name);
  else {console.error('FAIL',name);failed++;}
}
if(failed)process.exit(1);
console.log(`PASS: Total Gizmo .570 static regression ${checks.length}/${checks.length}`);

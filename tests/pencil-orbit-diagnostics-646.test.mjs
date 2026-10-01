import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['route log exists',gate.includes("gestureDebug('PEN ORBIT ROUTE'")],
 ['route captures mesh hit',gate.includes('meshHit,')&&gate.includes("route:blocked?'BLOCK_MESH_HIT':'FORWARD_ORBIT'")],
 ['route captures selection',gate.includes('selectionMode,')&&gate.includes('selectionCount,')],
 ['route captures tool/paint/controls',gate.includes('faceToolActive,')&&gate.includes('paintPending,')&&gate.includes('paintActive,')&&gate.includes('controlsEnabled,')],
 ['forwarded log exists',gate.includes("gestureDebug('PEN ORBIT FORWARDED'")],
 ['routing condition unchanged',gate.includes('const blocked=!!meshHit;')&&gate.includes('if (blocked) return;')],
 ['paint diagnostic API read-only getters',paint.includes('globalThis.__boxlabPaintSelectDebug')&&paint.includes('pending:()=>')&&paint.includes('active:()=>')],
 ['published gate pin .646',index.includes('src/pencil-orbit-gate.js?v=0.36.18.646')],
 ['published paint pin .646',index.includes('src/edge-paint-select.js?v=0.36.18.646')],
 ['release .646',index.includes('<title>BoxLab v0.36.18.646</title>')&&version.version==='0.36.18.646'],
 ['Sweep proxy retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .646 Pencil orbit diagnostics ${checks.length}/${checks.length}`);

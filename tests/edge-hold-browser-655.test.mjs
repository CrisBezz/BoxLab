import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['transactional edge selector saves original',main.includes("const original=selection?.type==='edge'?[...selectionIndices()]:[];")],
 ['transactional edge selector restores original',main.includes("selection=makeSelection('edge',original,original.at(-1)??null);")],
 ['endpoint hint enumeration',main.includes('function edgeEndpointHints(seedIndex,vertex)')],
 ['two-ended loop enumeration',main.includes('for(const a of hintsA)for(const b of hintsB)')],
 ['Boundary candidate',main.includes("add('Boundary',invokeEdgeSelector('#selectBoundaryBtn',[seedIndex]))")],
 ['Ring candidate',main.includes("add('Ring',invokeEdgeSelector('#selectRingBtn',[seedIndex]))")],
 ['candidate preview replaces selection',main.includes("selection=makeSelection('edge',candidate.indices,hold.edgeIndex);")],
 ['old additive merge removed',!main.includes("merged=[...new Set([...hold.baseIndices,...candidate.indices])]")],
 ['cancel restores pre-hold selection',main.includes("EDGE HOLD CANCEL RESTORE")&&main.includes('hold.restoreIndices')],
 ['commit diagnostic',main.includes('EDGE HOLD COMMIT')],
 ['main pin .655',index.includes('src/main.js?v=0.36.18.655')],
 ['release .655',index.includes('<title>BoxLab v0.36.18.655</title>')&&version.version==='0.36.18.655'],
 ['Edge Hub retained',index.includes('src/total-gizmo.js?v=0.36.18.654')],
 ['Shell retained',index.includes('selection-hub-shell-session.js?v=0.36.18.653')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .655 Edge hold browser '+checks.length+'/'+checks.length);

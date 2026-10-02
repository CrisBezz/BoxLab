import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const applyStart=main.indexOf('function applyEdgeHoldCandidate');
const applyEnd=main.indexOf('function cancelFaceHold',applyStart);
const apply=main.slice(applyStart,applyEnd);

const checks=[
 ['preview uses fixed base + current candidate',apply.includes("const merged=[...new Set([...(hold.baseIndices||[]),...candidate.indices])]")],
 ['preview writes merged only',apply.includes("selection=makeSelection('edge',merged,hold.edgeIndex);")],
 ['preview diagnostic separates base/candidate',apply.includes('baseCount:hold.baseIndices?.length||0')&&apply.includes('candidateCount:candidate.indices.length')],
 ['commit recomputes fixed base result',main.includes("const result=[...new Set([...(hold.baseIndices||[]),...candidate.indices])]")],
 ['commit stores base and contribution separately',main.includes("baseIndices:[...(hold.baseIndices||[])]")&&main.includes("contributionIndices:[...candidate.indices]")],
 ['cancel restore retained',main.includes('EDGE HOLD CANCEL RESTORE')&&main.includes('hold.restoreIndices')],
 ['transactional probes retained',main.includes("selection=makeSelection('edge',original,original.at(-1)??null);")],
 ['Face Boundary retained',main.includes("add('Face Boundary',perimeter)")],
 ['main pin .659',index.includes('src/main.js?v=0.36.18.659')],
 ['release .659',index.includes('<title>BoxLab v0.36.18.659</title>')&&version.version==='0.36.18.659'],
 ['radial availability .658 retained',index.includes('src/total-gizmo.js?v=0.36.18.658')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .659 additive Edge hold '+checks.length+'/'+checks.length);

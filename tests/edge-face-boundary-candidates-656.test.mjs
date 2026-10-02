import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['edge lookup helper exists',main.includes('function edgeIndexByVertices(a,b)')],
 ['face boundary generator exists',main.includes('function faceBoundaryCandidatesForEdge(seedIndex)')],
 ['generator walks seed incident faces',main.includes('for(const faceIndex of seed.faces||[])')],
 ['generator resolves every face perimeter segment',main.includes('face[(i+1)%face.length]')&&main.includes('edgeIndexByVertices')],
 ['generator requires seed in perimeter',main.includes('indices.includes(seedIndex)')],
 ['Face Boundary candidate added',main.includes("add('Face Boundary',perimeter)")],
 ['transactional preview retained',main.includes("selection=makeSelection('edge',candidate.indices,hold.edgeIndex);")],
 ['Loop candidate retained',main.includes("add('Loop',invokeEdgeSelector('#selectLoopBtn'")],
 ['Boundary candidate retained',main.includes("add('Boundary',invokeEdgeSelector('#selectBoundaryBtn',[seedIndex]))")],
 ['Ring candidate retained',main.includes("add('Ring',invokeEdgeSelector('#selectRingBtn',[seedIndex]))")],
 ['main pin .656',index.includes('src/main.js?v=0.36.18.656')],
 ['release .656',index.includes('<title>BoxLab v0.36.18.656</title>')&&version.version==='0.36.18.656'],
 ['Edge Hub retained',index.includes('src/total-gizmo.js?v=0.36.18.654')],
 ['Shell retained',index.includes('selection-hub-shell-session.js?v=0.36.18.653')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .656 Edge Face Boundary candidates '+checks.length+'/'+checks.length);

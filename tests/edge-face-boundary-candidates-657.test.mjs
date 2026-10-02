import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['lookup helper',main.includes('function edgeIndexByVertices(a,b)')],
 ['face helper',main.includes('function faceBoundaryCandidatesForEdge(seedIndex)')],
 ['incident faces',main.includes('for(const faceIndex of seed.faces||[])')],
 ['perimeter segment mapping',main.includes('edgeIndexByVertices(face[i],face[(i+1)%face.length])')],
 ['candidate inserted',main.includes("add('Face Boundary',perimeter)")],
 ['candidate-only preview retained',main.includes("selection=makeSelection('edge',candidate.indices,hold.edgeIndex);")],
 ['main pin .657',index.includes('src/main.js?v=0.36.18.657')],
 ['release .657',index.includes('<title>BoxLab v0.36.18.657</title>')&&version.version==='0.36.18.657'],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .657 Face Boundary candidates '+checks.length+'/'+checks.length);

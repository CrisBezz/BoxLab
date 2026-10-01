import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['listens for direct commit',giz.includes("document.addEventListener('boxlab-face-direct-committed'")],
 ['handles extrude and inset',giz.includes("tool!=='extrude'&&tool!=='inset'")],
 ['clears suppression',giz.includes("hubSuppressedKey='';")],
 ['returns closed puck',giz.includes("setHubState('closed',{reason:'direct-complete:'+tool})")],
 ['shows root',giz.includes("root.hidden=false;")],
 ['gizmo pin .649',index.includes('src/total-gizmo.js?v=0.36.18.649')],
 ['release .649',index.includes('<title>BoxLab v0.36.18.649</title>')&&version.version==='0.36.18.649'],
 ['Sweep retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .649 Selection Hub direct restore '+checks.length+'/'+checks.length);

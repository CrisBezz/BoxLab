import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const face=fs.readFileSync(new URL('../src/face-transform.js',import.meta.url),'utf8');
const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const loose=fs.readFileSync(new URL('../src/loose-bootstrap.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['direct Face tool tracks background tap',direct.includes('pendingBackgroundPress')],
 ['background tap clears Face selection',direct.includes("bridge()?.set?.('face',[])")],
 ['touch background remains navigation',direct.includes("if(event.pointerType==='touch')return;")],
 ['legacy Face transform yields to Total Gizmo',face.includes('__boxlabTotalGizmo?.visible?.()')],
 ['legacy Rotate transform yields to Total Gizmo',rotate.includes('__boxlabTotalGizmo?.visible?.()')],
 ['face transform cache pin .635',loose.includes('face-transform.js?v=0.36.18.635')],
 ['published pins .635',index.includes('multi-face-direct.js?v=0.36.18.635')&&index.includes('rotate-transform.js?v=0.36.18.635')&&index.includes('loose-bootstrap.js?v=0.36.18.635')],
 ['release version .635',index.includes('data-release-version="0.36.18.635"')&&index.includes('<title>BoxLab v0.36.18.635</title>')&&version.version==='0.36.18.635'],
 ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .635 armed selection ownership ${checks.length}/${checks.length}`);

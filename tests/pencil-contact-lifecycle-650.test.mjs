import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['active contact set exists',gate.includes('const activePenContacts = new Set();')],
 ['pointerdown tracks contact',gate.includes('activePenContacts.add(event.pointerId)')],
 ['moves trust tracked contact',gate.includes('if(activePenContacts.has(event.pointerId))return true;')],
 ['window release clears contact',gate.includes("window.addEventListener('pointerup',endPenContact,true)")&&gate.includes("window.addEventListener('pointercancel',endPenContact,true)")],
 ['diagnostics expose tracked contact',gate.includes('contactTracked:activePenContacts.has(event.pointerId)')],
 ['mesh routing unchanged',gate.includes('const blocked=!!meshHit;')&&gate.includes('if (blocked) return;')],
 ['registration handoff retained',gate.includes('explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0')],
 ['gate pin .650',index.includes('src/pencil-orbit-gate.js?v=0.36.18.650')],
 ['release .650',index.includes('<title>BoxLab v0.36.18.650</title>')&&version.version==='0.36.18.650'],
 ['Sweep retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .650 Pencil contact lifecycle '+checks.length+'/'+checks.length);

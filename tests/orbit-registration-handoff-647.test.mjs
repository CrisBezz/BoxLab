import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['gate has explicit registration depth',gate.includes('let orbitRegistrationDepth = 0')],
 ['gate exposes begin/end registration',gate.includes('function beginOrbitRegistration()')&&gate.includes('function endOrbitRegistration()')],
 ['pointer listeners wrapped explicitly during window',gate.includes('const explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0')],
 ['name fallback retained',gate.includes('const namedOrbitPointer = pointerEvent && /onPointer/i.test(name)')],
 ['main begins registration before OrbitControls',main.indexOf('beginOrbitRegistration?.()')<main.indexOf('new OrbitControls(camera,canvas)')],
 ['main ends registration after OrbitControls',main.indexOf('endOrbitRegistration?.()')>main.indexOf('new OrbitControls(camera,canvas)')],
 ['constructor protected by finally',main.includes('try{\n  controls=new OrbitControls(camera,canvas);\n}finally{')],
 ['routing policy unchanged',gate.includes("route:blocked?'BLOCK_MESH_HIT':'FORWARD_ORBIT'")&&gate.includes('if (blocked) return;')],
 ['gate pin .647',index.includes('src/pencil-orbit-gate.js?v=0.36.18.647')],
 ['main pin .647',index.includes('src/main.js?v=0.36.18.647')],
 ['release .647',index.includes('<title>BoxLab v0.36.18.647</title>')&&version.version==='0.36.18.647'],
 ['Sweep retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .647 OrbitControls registration handoff ${checks.length}/${checks.length}`);

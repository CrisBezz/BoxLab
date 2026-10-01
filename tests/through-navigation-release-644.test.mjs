import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const through=src.slice(src.indexOf("if(d.tool==='extrude'&&d.throughPlan)"),src.indexOf("}else if(d.tool==='extrude'){"));
const checks=[
 ['successful Through still clears Face selection',through.includes("bridge()?.set?.('face',[])")],
 ['successful Through disarms Extrude',through.includes('armed=null')],
 ['successful Through clears pending ownership',through.includes('pendingFacePress=null')&&through.includes('pendingBackgroundPress=null')],
 ['successful Through emits tool-none',through.includes("tool:'none',reason:'through-complete'")],
 ['debug marker exists',through.includes('FACE DIRECT THROUGH RELEASE')],
 ['normal Extrude branch still separate',src.includes("}else if(d.tool==='extrude'){")&&src.includes('preferSequentialUnselected=true')],
 ['published Face-direct pin .644',index.includes('src/multi-face-direct.js?v=0.36.18.644')],
 ['release .644',index.includes('<title>BoxLab v0.36.18.644</title>')&&version.version==='0.36.18.644'],
 ['Sweep proxy retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .644 Through navigation release ${checks.length}/${checks.length}`);

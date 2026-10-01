import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const finish=src.slice(src.indexOf('function finish(event){'),src.indexOf("window.addEventListener('pointerup',finish,true)"));
const checks=[
 ['release helper exists',src.includes('function releaseDirectPointer(pointerId)')&&src.includes('canvas.releasePointerCapture(pointerId)')],
 ['background completion releases first',finish.includes('pendingBackgroundPress=null;\n    releaseDirectPointer(event.pointerId);\n    event.preventDefault();event.stopImmediatePropagation();')],
 ['Face-tap completion releases first',finish.includes('pendingFacePress=null;\n    releaseDirectPointer(event.pointerId);\n    event.preventDefault();event.stopImmediatePropagation();')],
 ['drag completion releases first',finish.includes("if(!drag||drag.id!==event.pointerId)return;\n  releaseDirectPointer(event.pointerId);\n  event.preventDefault();event.stopImmediatePropagation();")],
 ['Through still disarms Extrude',finish.includes("tool:'none',reason:'through-complete'")],
 ['Through debug reports capture state',finish.includes("pointerCapture:canvas.hasPointerCapture?.(event.pointerId)||false")],
 ['published Face-direct pin .645',index.includes('src/multi-face-direct.js?v=0.36.18.645')],
 ['release .645',index.includes('<title>BoxLab v0.36.18.645</title>')&&version.version==='0.36.18.645'],
 ['Sweep proxy retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .645 Face-direct capture release ${checks.length}/${checks.length}`);

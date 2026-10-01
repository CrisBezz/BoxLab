import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Face-direct pointerup uses window capture',direct.includes("window.addEventListener('pointerup',finish,true)")],
 ['Face-direct pointercancel uses window capture',direct.includes("window.addEventListener('pointercancel',finish,true)")],
 ['old document finish listeners removed',!direct.includes("document.addEventListener('pointerup',finish,true)")&&!direct.includes("document.addEventListener('pointercancel',finish,true)")],
 ['finish debug marker present',direct.includes("'FACE DIRECT FINISH'")&&direct.includes("type:event.type")],
 ['published Face-direct pin .640',index.includes('multi-face-direct.js?v=0.36.18.640')],
 ['release .640',index.includes('<title>BoxLab v0.36.18.640</title>')&&version.version==='0.36.18.640'],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;for(const [n,ok] of checks){if(ok)console.log('PASS',n);else{console.error('FAIL',n);failed++;}}if(failed)process.exit(1);
console.log(`PASS: .640 Face-direct global release ${checks.length}/${checks.length}`);

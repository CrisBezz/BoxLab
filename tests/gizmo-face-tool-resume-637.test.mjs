import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['resume disarms transforms first',direct.includes('resumeAfterTransform:()=>')&&direct.includes('disarmTransforms();')&&direct.indexOf('disarmTransforms();',direct.indexOf('resumeAfterTransform:()=>'))<direct.indexOf('armed=transformSuspendedTool',direct.indexOf('resumeAfterTransform:()=>'))],
 ['resume clears gizmo transient state',direct.includes("globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});")],
 ['published pins .637',index.includes('multi-face-direct.js?v=0.36.18.637')&&index.includes('total-gizmo.js?v=0.36.18.637')],
 ['release .637',index.includes('<title>BoxLab v0.36.18.637</title>')&&version.version==='0.36.18.637'],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;for(const [n,ok] of checks){if(ok)console.log('PASS',n);else{console.error('FAIL',n);failed++;}}if(failed)process.exit(1);
console.log(`PASS: .637 single-owner restore ${checks.length}/${checks.length}`);

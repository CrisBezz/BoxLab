import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Face direct exposes suspend',direct.includes('suspendForTransform:()=>')],
 ['Face direct exposes resume',direct.includes('resumeAfterTransform:()=>')],
 ['gizmo suspends Face tool',gizmo.includes('__boxlabFaceDirect?.suspendForTransform?.()')],
 ['gizmo resumes Face tool',gizmo.includes('__boxlabFaceDirect?.resumeAfterTransform?.()')],
 ['component failed handoff blocked',gizmo.includes("if(!directSemanticHandoff&&mode!=='object')")&&gizmo.includes("GIZMO HANDOFF BLOCKED")],
 ['component block occurs before synthetic fallback',gizmo.indexOf("GIZMO HANDOFF BLOCKED")<gizmo.indexOf("if(!directSemanticHandoff)syntheticDown(event)")],
 ['published pins .636',index.includes('multi-face-direct.js?v=0.36.18.636')&&index.includes('total-gizmo.js?v=0.36.18.636')],
 ['release .636',index.includes('<title>BoxLab v0.36.18.636</title>')&&version.version==='0.36.18.636'],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;for(const [n,ok] of checks){if(ok)console.log('PASS',n);else{console.error('FAIL',n);failed++;}}if(failed)process.exit(1);
console.log(`PASS: .636 gizmo/direct-tool ownership ${checks.length}/${checks.length}`);

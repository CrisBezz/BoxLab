import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const block=src.slice(src.indexOf('function makeObjectsUnique('),src.indexOf('function makeActiveUnique('));
const checks=[
 ['authoritative evaluator exists',src.includes('function evaluatedLinkedMesh(object)')&&src.includes('transformEditableMesh(source.mesh,matrixForInstance(object))')],
 ['materializer stores evaluated mesh',src.includes('function materializeLinkedObject(object)')&&src.includes('object.mesh=evaluated.clone()')],
 ['Make Unique materializes before detach',block.indexOf('materializeLinkedObject(object)')>=0&&block.indexOf('materializeLinkedObject(object)')<block.indexOf('detachLinkedObject(object)')],
 ['active live mesh receives materialized result',block.includes('replaceMeshInPlace(live,evaluated)')],
 ['Object selection refreshes after detach',block.includes('__boxlabObjectSelection?.refresh?.()')],
 ['published multi-object pin .641',index.includes('src/multi-object.js?v=0.36.18.641')],
 ['release .641',index.includes('<title>BoxLab v0.36.18.641</title>')&&version.version==='0.36.18.641'],
 ['protected multi transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .641 Make Unique materialization ${checks.length}/${checks.length}`);

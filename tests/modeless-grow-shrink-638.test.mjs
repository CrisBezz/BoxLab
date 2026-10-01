import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Vertex hold exists',main.includes('function armVertexHold(event,vertexIndex)')],
 ['vertical scrub uses existing Grow/Shrink buttons',main.includes("#growSelectionBtn")&&main.includes("#shrinkSelectionBtn")&&main.includes('applyVerticalSelectionScrub')],
 ['Face axis-locks vertical/horizontal',main.includes("FACE SCRUB AXIS")&&main.includes("faceHold.scrubAxis==='vertical'")],
 ['Edge axis-locks vertical/horizontal',main.includes("EDGE SCRUB AXIS")&&main.includes("edgeHold.scrubAxis==='vertical'")],
 ['modeless API includes Vertex hold',main.includes("vertexHold?.pointerId===pointerId")],
 ['single Vertex dormant puck offset',gizmo.includes('[data-mode="vertex"][data-single-component="true"] .tg-activator')],
 ['expanded gizmo root remains centred',gizmo.includes("#totalGizmo{position:absolute")&&gizmo.includes("transform:translate(-50%,-50%)")],
 ['published pins .638',index.includes('main.js?v=0.36.18.638')&&index.includes('total-gizmo.js?v=0.36.18.638')&&index.includes('edge-paint-select.js?v=0.36.18.638')],
 ['release .638',index.includes('<title>BoxLab v0.36.18.638</title>')&&version.version==='0.36.18.638'],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;for(const [n,ok] of checks){if(ok)console.log('PASS',n);else{console.error('FAIL',n);failed++;}}if(failed)process.exit(1);
console.log(`PASS: .638 Grow/Shrink + Vertex hold ${checks.length}/${checks.length}`);

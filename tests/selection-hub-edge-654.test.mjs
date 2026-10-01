import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['tools allowed in Face and Edge',giz.includes("!['face','edge'].includes(mode)")],
 ['Edge ring exists',giz.includes('data-ring-mode="edge"')&&giz.includes('aria-label="Edge contextual tools"')],
 ['Edge Extrude proxy',giz.includes('data-tool-target="#edgeExtrudeBtn">Extrude</button>')],
 ['Bevel/Crease proxies',giz.includes('data-tool-target="#bevelBtn">Bevel</button>')&&giz.includes('data-tool-target="#applyCreaseBtn">Crease</button>')],
 ['Slide/Offset proxies',giz.includes('data-tool-target="#edgeSlideBtn">Slide</button>')&&giz.includes('data-tool-target="#offsetLoopBtn">Offset</button>')],
 ['Bridge/Dissolve/Delete proxies',giz.includes('data-tool-target="#bridgeEdgesBtn">Bridge</button>')&&giz.includes('data-tool-target="#dissolveEdgeBtn">Dissolve</button>')&&giz.includes('data-tool-target="#deleteEdgeBtn">Delete</button>')],
 ['ring click checks current mode',giz.includes("const ringMode=button.closest('.tg-tool-ring')?.dataset.ringMode||''")&&giz.includes('if(mode!==ringMode)return;')],
 ['Face/Edge tool rings display separately',giz.includes('[data-mode="face"] .tg-tool-ring[data-ring-mode="face"]')&&giz.includes('[data-mode="edge"] .tg-tool-ring[data-ring-mode="edge"]')],
 ['gizmo pin .654',index.includes('src/total-gizmo.js?v=0.36.18.654')],
 ['release .654',index.includes('<title>BoxLab v0.36.18.654</title>')&&version.version==='0.36.18.654'],
 ['Sweep retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['Shell retained',index.includes('selection-hub-shell-session.js?v=0.36.18.653')],
 ['Face-direct .652 retained',index.includes('src/multi-face-direct.js?v=0.36.18.652')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .654 Edge Selection Hub '+checks.length+'/'+checks.length);

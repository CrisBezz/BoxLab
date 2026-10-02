import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const bevel=fs.readFileSync(new URL('../src/direct-bevel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['main exposes direct owner',main.includes('globalThis.__boxlabMainDirectTool')&&main.includes('ownsModellingGesture:()=>!!directTool')],
 ['gate reads main direct owner',gate.includes('const mainDirectTool=globalThis.__boxlabMainDirectTool?.active?.()||null')&&gate.includes('mainDirectActive')],
 ['gate blocks modelling owner',gate.includes('const modellingToolActive=faceToolActive||mainDirectActive')&&gate.includes('BLOCK_MODELLING_TOOL')],
 ['Bevel pointerup disarms',bevel.includes("reason:current.preview?'bevel-complete':'bevel-cancel'")&&bevel.includes('disarm();')],
 ['Bevel pointercancel exists',bevel.includes("canvas?.addEventListener('pointercancel'")&&bevel.includes("reason:'bevel-cancel'")],
 ['Exact bevel disarms',bevel.includes("reason:'bevel-exact-complete'")],
 ['Bevel API exposes active/disarm',bevel.includes("globalThis.__boxlabDirectBevel={version:'0.36.18.660',applyExact,disarm,active:()=>armed};")],
 ['main pin .660',index.includes('src/main.js?v=0.36.18.660')],
 ['gate pin .660',index.includes('src/pencil-orbit-gate.js?v=0.36.18.660')],
 ['bevel pin .660',index.includes('src/direct-bevel.js?v=0.36.18.660')],
 ['release .660',index.includes('<title>BoxLab v0.36.18.660</title>')&&version.version==='0.36.18.660'],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .660 direct-tool ownership '+checks.length+'/'+checks.length);

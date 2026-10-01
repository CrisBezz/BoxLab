import fs from 'node:fs';
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['three-state controller exists',gizmo.includes("let hubState='closed'")&&gizmo.includes("['closed','transform','tools']")],
 ['transform centre opens Face tools',gizmo.includes("setHubState(currentMode()==='face'?'tools':'closed',{reason:'transform-centre'})")],
 ['tools centre returns closed',gizmo.includes("setHubState('closed',{reason:'tools-centre'})")],
 ['Face ring has authoritative tool proxies',gizmo.includes('data-tool-target="#extrudeBtn"')&&gizmo.includes('data-tool-target="#insetBtn"')&&gizmo.includes('data-tool-target="#duplicateFacesBtn"')&&gizmo.includes('data-tool-target="#shellFacesBtn"')],
 ['Sweep uses existing Face launcher',gizmo.includes(".sweep-selection-launch[data-sweep-selection-mode='face']")],
 ['tool launch suppresses hub for same selection',gizmo.includes('hubSuppressedKey=lastSelectionKey')&&gizmo.includes("const suppressed=mode==='face'&&hubSuppressedKey===key")],
 ['selection change clears suppression',gizmo.includes("hubSuppressedKey='';")&&gizmo.includes("reason:'selection-change'")],
 ['gizmo SVG only exists interactively in transform state',gizmo.includes('#totalGizmo:not([data-hub-state="transform"]) svg{display:none!important}')],
 ['tool ring only interactive in tools state',gizmo.includes('#totalGizmo[data-hub-state="tools"][data-mode="face"] .tg-tool-ring{display:block}')],
 ['published Total Gizmo pin .642',index.includes('src/total-gizmo.js?v=0.36.18.642')],
 ['release .642',index.includes('<title>BoxLab v0.36.18.642</title>')&&version.version==='0.36.18.642'],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .642 Selection Hub Face v1 ${checks.length}/${checks.length}`);

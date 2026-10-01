import fs from 'node:fs';
const hub=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const sweep=fs.readFileSync(new URL('../src/selection-hub-sweep-session.js',import.meta.url),'utf8');
const sweepOwner=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['hub emits semantic tool launch event',hub.includes("boxlab-selection-hub-tool")&&hub.includes("tool:toolLabel")],
 ['Sweep proxy listens only to radial Face Sweep',sweep.includes("event.detail?.tool!=='Sweep'||event.detail?.mode!=='face'")],
 ['Profile stage proxies existing controls',sweep.includes('#sweepStageProfile')&&sweep.includes('#sweepProfileCircle')&&sweep.includes('#sweepProfileUseSelection')],
 ['Path stage proxies existing controls',sweep.includes('#sweepStagePath')&&sweep.includes('#sweepFollowEdges')&&sweep.includes('#sweepDrawPath')],
 ['Finish proxies authoritative Apply/Cancel',sweep.includes('#sweepApplyBtn')&&sweep.includes('#sweepCancelBtn')],
 ['range proxies forward events',sweep.includes("target.dispatchEvent(new Event('input',{bubbles:true}))")&&sweep.includes("target.dispatchEvent(new Event('change',{bubbles:true}))")],
 ['existing Sweep owner unchanged by proxy',sweepOwner.includes('function applySweep()')&&sweepOwner.includes('function cancelSweepSession')],
 ['new session module published after sweep owner',index.indexOf('sweep-path.js?v=0.36.18.515')<index.indexOf('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['Total Gizmo pin .643',index.includes('total-gizmo.js?v=0.36.18.643')],
 ['release .643',index.includes('<title>BoxLab v0.36.18.643</title>')&&version.version==='0.36.18.643'],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log(`PASS: .643 Sweep viewport session proxy ${checks.length}/${checks.length}`);

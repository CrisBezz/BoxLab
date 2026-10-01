import fs from 'node:fs';
const proxy=fs.readFileSync(new URL('../src/selection-hub-shell-session.js',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['proxy listens only to radial Face Shell',proxy.includes("event.detail?.tool!=='Shell'||event.detail?.mode!=='face'")],
 ['thickness proxies authoritative control',proxy.includes('data-proxy-range="#shellThickness"')&&proxy.includes('data-proxy-output="#shellThicknessOut"')],
 ['apply/cancel proxy authoritative buttons',proxy.includes('data-proxy-click="#shellApplyBtn"')&&proxy.includes('data-proxy-click="#shellCancelBtn"')],
 ['range forwards input/change',proxy.includes("dispatchEvent(new Event('input',{bubbles:true}))")&&proxy.includes("dispatchEvent(new Event('change',{bubbles:true}))")],
 ['palette follows shell session lifecycle',proxy.includes("boxlab-tool-session-change")&&proxy.includes("detail.id!=='shell'")],
 ['Shell owner remains authoritative',shell.includes('function launchShell()')&&shell.includes('shellClosedMesh(live,previewFaces,thickness())')],
 ['proxy loads after Shell owner',index.indexOf('shell.js?v=0.36.18.444')<index.indexOf('selection-hub-shell-session.js?v=0.36.18.653')],
 ['release .653',index.includes('<title>BoxLab v0.36.18.653</title>')&&version.version==='0.36.18.653'],
 ['Sweep proxy retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['Face-direct .652 retained',index.includes('src/multi-face-direct.js?v=0.36.18.652')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .653 Shell viewport session '+checks.length+'/'+checks.length);

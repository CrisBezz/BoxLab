import fs from 'node:fs';
const session=fs.readFileSync(new URL('../src/selection-hub-bevel-session.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/direct-bevel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['radial semantic launch',session.includes("event.detail?.tool!=='Bevel'||event.detail?.mode!=='edge'")],
 ['width proxy',session.includes('data-proxy-range="#bevelWidth"')],
 ['segments proxy',session.includes('data-proxy-range="#bevelSegments"')],
 ['readout proxies',session.includes('#bevelWidthOut')&&session.includes('#bevelSegmentsOut')],
 ['captured launch selection',session.includes('launchSelection=currentEdgeSelection()')],
 ['exact delegates to owner',session.includes('__boxlabDirectBevel?.applyExact?.(width,launchSelection)')],
 ['cancel disarms owner',session.includes('__boxlabDirectBevel?.disarm?.()')],
 ['completion hides palette',session.includes("reason==='bevel-complete'")&&session.includes("reason==='bevel-exact-complete'")],
 ['direct owner active available',direct.includes("version:'0.36.18.662'")&&direct.includes('active:()=>armed')],
 ['session loaded after direct bevel',index.indexOf('direct-bevel.js?v=0.36.18.662')<index.indexOf('selection-hub-bevel-session.js?v=0.36.18.662')],
 ['release .662',index.includes('<title>BoxLab v0.36.18.662</title>')&&version.version==='0.36.18.662'],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .662 Bevel viewport session '+checks.length+'/'+checks.length);

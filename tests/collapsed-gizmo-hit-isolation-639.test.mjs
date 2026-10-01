import fs from 'node:fs';
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['collapsed SVG removed from hit-testing',gizmo.includes('#totalGizmo[data-expanded="false"] svg{display:none!important}')],
 ['collapsed handle runtime guard',gizmo.includes("mode!=='object'&&!expanded")&&gizmo.includes('GIZMO HANDLE REJECT COLLAPSED')],
 ['dormant puck remains outside SVG',gizmo.indexOf('class="tg-activator"')<gizmo.indexOf('<svg')],
 ['published total-gizmo pin .639',index.includes('total-gizmo.js?v=0.36.18.639')],
 ['release .639',index.includes('<title>BoxLab v0.36.18.639</title>')&&version.version==='0.36.18.639'],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;for(const [n,ok] of checks){if(ok)console.log('PASS',n);else{console.error('FAIL',n);failed++;}}if(failed)process.exit(1);
console.log(`PASS: .639 collapsed gizmo hit isolation ${checks.length}/${checks.length}`);

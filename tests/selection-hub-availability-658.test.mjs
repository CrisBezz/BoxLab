import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['availability sync function',giz.includes('function syncContextToolAvailability()')],
 ['disabled derives from target.disabled',giz.includes('const unavailable=!target||!!target.disabled;')],
 ['sector disabled mirrors target',giz.includes('sector.disabled=unavailable;')],
 ['unavailable class',giz.includes("sector.classList.toggle('tg-tool-unavailable',unavailable)")],
 ['active class mirrors target',giz.includes("target.classList.contains('active')")&&giz.includes("tg-tool-active")],
 ['ring open sync',giz.includes("if(next==='tools')syncContextToolAvailability();")],
 ['click guard',giz.includes('if(button.disabled)return;')],
 ['disabled styling',giz.includes('.tg-tool-sector.tg-tool-unavailable')],
 ['active styling',giz.includes('.tg-tool-sector.tg-tool-active')],
 ['gizmo pin .658',index.includes('src/total-gizmo.js?v=0.36.18.658')],
 ['release .658',index.includes('<title>BoxLab v0.36.18.658</title>')&&version.version==='0.36.18.658'],
 ['main .657 retained',index.includes('src/main.js?v=0.36.18.657')],
 ['Shell retained',index.includes('selection-hub-shell-session.js?v=0.36.18.653')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .658 Selection Hub availability '+checks.length+'/'+checks.length);

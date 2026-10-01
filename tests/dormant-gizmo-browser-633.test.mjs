import fs from 'node:fs';

const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
  ['component gizmo has dormant activator puck',gizmo.includes('class="tg-activator"')&&gizmo.includes("data-expanded")],
  ['selection change collapses component gizmo',gizmo.includes("setExpanded(mode==='object',{reason:'selection-change'})")],
  ['object mode keeps full gizmo',gizmo.includes("expanded=mode==='object'?true:!!next")],
  ['transform controls can expand component gizmo',gizmo.includes("reason:'transform-control'")],
  ['puck can expand component gizmo',gizmo.includes("reason:'puck'")],
  ['main exposes modeless browser ownership',main.includes('globalThis.__boxlabModelessSelection')&&main.includes('browsing:')],
  ['Paint Select yields to active browser',paint.includes('PAINT YIELD TO BROWSER')&&paint.includes('__boxlabModelessSelection?.browsing?.')],
  ['published pins .633',index.includes('src/total-gizmo.js?v=0.36.18.633')&&index.includes('src/main.js?v=0.36.18.633')&&index.includes('src/edge-paint-select.js?v=0.36.18.633')],
  ['release version .633',index.includes('data-release-version="0.36.18.633"')&&version.version==='0.36.18.633'],
  ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

let failed=0;
for(const [name,ok] of checks){
  if(ok) console.log('PASS',name);
  else {console.error('FAIL',name);failed++;}
}
if(failed)process.exit(1);
console.log(`PASS: .633 dormant gizmo + modeless browser regression ${checks.length}/${checks.length}`);

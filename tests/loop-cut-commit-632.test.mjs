import fs from 'node:fs';

const mod=fs.readFileSync(new URL('../src/loop-cut-commit.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
  ['no synthetic pointer replay',!mod.includes("dispatchEvent(new PointerEvent('pointerdown'")&&!mod.includes("dispatchEvent(new PointerEvent('pointerup'")],
  ['direct edge selection bridge',mod.includes("globalThis.__boxlabSelectionBridge?.set?.('edge', indices)")],
  ['undo/redo loop-slide commit retained',mod.includes("document.querySelector('#undoBtn')?.click()")&&mod.includes("document.querySelector('#redoBtn')?.click()")],
  ['published module pin .632',index.includes('src/loop-cut-commit.js?v=0.36.18.632')],
  ['release version .632',index.includes('data-release-version="0.36.18.632"')&&version.version==='0.36.18.632'],
  ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

let failed=0;
for(const [name,ok] of checks){
  if(ok) console.log('PASS',name);
  else {console.error('FAIL',name);failed++;}
}
if(failed)process.exit(1);
console.log(`PASS: .632 Loop Cut commit regression ${checks.length}/${checks.length}`);

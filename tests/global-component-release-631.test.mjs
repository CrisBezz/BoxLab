import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
  ['Face/Edge hold release uses window capture',main.includes("window.addEventListener('pointerup',event=>{finishFaceHold(event);finishEdgeHold(event);},true)")],
  ['Face/Edge hold cancel uses window capture',main.includes("window.addEventListener('pointercancel',event=>{finishFaceHold(event);finishEdgeHold(event);},true)")],
  ['Face hold release logs actual target',main.includes("'FACE HOLD POINTERUP'")&&main.includes("target:event.target?.id||event.target?.tagName||'unknown'")],
  ['Pending Paint release uses window capture',paint.includes("window.addEventListener('pointerup', endPaint, true)")],
  ['Pending Paint cancel uses window capture',paint.includes("window.addEventListener('pointercancel', event=>")],
  ['Main module pin .631',index.includes('src/main.js?v=0.36.18.631')],
  ['Paint module pin .631',index.includes('src/edge-paint-select.js?v=0.36.18.631')],
  ['Release version .631',index.includes('data-release-version="0.36.18.631"')&&version.version==='0.36.18.631'],
  ['Protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

let failed=0;
for(const [name,ok] of checks){
  if(ok) console.log('PASS',name);
  else {console.error('FAIL',name);failed++;}
}
if(failed)process.exit(1);
console.log(`PASS: .631 global component release ownership ${checks.length}/${checks.length}`);

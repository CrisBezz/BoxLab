import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const start=src.indexOf("if(!Number.isInteger(hit)){");
const end=src.indexOf("  const workingFaces=",start);
const block=src.slice(start,end);
const penStart=block.indexOf("if(event.pointerType==='pen'&&!synthetic){");
const penEnd=block.indexOf("    pendingBackgroundPress=",penStart);
const penBlock=block.slice(penStart,penEnd);

const checks=[
 ['pen background branch exists',penStart>=0],
 ['branch disarms tool',penBlock.includes('armed=null')],
 ['branch clears pending state',penBlock.includes('pendingBackgroundPress=null')&&penBlock.includes('pendingFacePress=null')&&penBlock.includes('pendingSelection=null')],
 ['branch emits navigation yield',penBlock.includes("reason:'background-navigation'")&&penBlock.includes('FACE DIRECT BACKGROUND YIELD')],
 ['branch does not prevent default',!penBlock.includes('preventDefault')],
 ['branch does not stop propagation',!penBlock.includes('stopImmediatePropagation')&&!penBlock.includes('stopPropagation')],
 ['branch does not capture pointer',!penBlock.includes('setPointerCapture')],
 ['Face-hit path remains after background branch',src.includes('const workingFaces=synthetic&&selectionBefore.length')],
 ['published Face-direct pin .652',index.includes('src/multi-face-direct.js?v=0.36.18.652')],
 ['release .652',index.includes('<title>BoxLab v0.36.18.652</title>')&&version.version==='0.36.18.652'],
 ['Sweep retained',index.includes('selection-hub-sweep-session.js?v=0.36.18.643')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS',name);else{console.error('FAIL',name);failed++;}}
if(failed)process.exit(1);
console.log('PASS: .652 Face-direct background yield '+checks.length+'/'+checks.length);

import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
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
 ['published Face-direct reviewed cache pin',hasAssetReference(index,'multi-face-direct.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("face-direct-background-yield-652.test: "+name,()=>assert.equal(ok,true,name));

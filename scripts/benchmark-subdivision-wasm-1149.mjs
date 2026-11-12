// Same actual browser comparison page, native owner and checked-in WASM; no VM kernel timing.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,profileSubdivide} from '../src/subdivision.js';
import {loadSubdivisionWasm,compareSubdivision} from '../src/subdivision-wasm-lab.js';
class Element{constructor(){this.children=[];this.events={};}append(x){this.children.push(x);}replaceChildren(){this.children=[];}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}}
const elements=Object.fromEntries(['run','copy','cancel','download','progress','results','report','wasm'].map(x=>['#'+x,new Element()]));
const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
const script=page.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*?;\s*$/gm,'').replace(/const loadSubdivisionTrial=.*?;\n/, 'const loadSubdivisionTrial=async()=>trial;\n');
const context={THREE,EditableMesh,subdivide,profileSubdivide,performance,trial:{loadSubdivisionWasm:()=>loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url))})}),compareSubdivision},document:{querySelector:s=>elements[s],visibilityState:'visible',createElement:()=>new Element()},navigator:{userAgent:`Desktop Node ${process.version}; not iPad acceptance`},window:{devicePixelRatio:1},requestAnimationFrame:f=>setTimeout(f,0)};
vm.createContext(context);vm.runInContext(script,context);await elements['#wasm'].click();
if(!elements['#report'].value)throw Error(elements['#progress'].textContent);
const report=JSON.parse(elements['#report'].value);await fs.writeFile(new URL('../docs/performance-subdivision-wasm-1149.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
for(const r of report.results)console.log(r.sourceFaces,r.levels,r.decision,r.metrics.js.medianMs.toFixed(2),r.metrics.wasm.medianMs.toFixed(2),r.metrics.medianReductionPercent?.toFixed(1)+'%');

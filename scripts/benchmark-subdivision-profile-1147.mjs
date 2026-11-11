// Drive the actual browser benchmark module using a minimal DOM; owner runs natively.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,profileSubdivide} from '../src/subdivision.js';
class Element{constructor(){this.children=[];this.events={};}append(x){this.children.push(x);}replaceChildren(){this.children=[];}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}}
const elements=Object.fromEntries(['run','copy','cancel','download','progress','results','report'].map(x=>['#'+x,new Element()]));
const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
const script=page.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*?;\s*$/gm,'');
const context={THREE,EditableMesh,subdivide,profileSubdivide,performance,document:{querySelector:s=>elements[s],visibilityState:'visible',createElement:()=>new Element()},navigator:{userAgent:`Desktop Node ${process.version}; not iPad acceptance`},window:{devicePixelRatio:1},requestAnimationFrame:f=>setTimeout(f,0)};
vm.createContext(context);vm.runInContext(script,context);await elements['#run'].click();
const report=JSON.parse(elements['#report'].value);await fs.writeFile(new URL('../docs/performance-subdivision-profile-1147.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
for(const row of report.results){const totals={};for(const phases of row.phaseSamplesMs)for(const [name,value] of Object.entries(phases))totals[name]=(totals[name]||0)+value;console.log(row.sourceFaces,row.level,row.medianMs,Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,2));}

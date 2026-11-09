import fs from 'node:fs';import vm from 'node:vm';
import {faceRuntime,snapshot} from './negative-extrude-runtime.mjs';
const baseline=fs.readFileSync(new URL('../fixtures/performance/face-inference-1118.js',import.meta.url),'utf8');
export function inferenceRuntime(mesh,ids,{legacy=false}={}){
 const r=faceRuntime(mesh,ids);if(legacy)vm.runInContext(baseline,r.context);
 let bounds=0,projections=0;let rect={left:0,top:0,width:900,height:600};
 r.elements.get('#viewport').getBoundingClientRect=()=>{bounds++;return {...rect};};
 r.elements.get('#inferenceSnapToggle').checked=true;
 // Count the actual screenPoint helper without changing its arguments or math.
 const project=r.context.screenPoint;r.context.screenPoint=(...args)=>{projections++;return project(...args);};
 return {...r,rect,reset(){bounds=0;projections=0;},counts:()=>({bounds,projections}),pick(e,faces=ids){return r.context.referenceUnderPointer({pointerId:22,...e},{before:mesh,faces,camera:r.state.camera});},signature:()=>snapshot(mesh)};
}
export const referenceSignature=ref=>ref?{...ref,point:ref.point?.toArray()}:ref;

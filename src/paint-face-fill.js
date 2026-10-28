import {createPaintFilterDomain} from './paint-filter-domain.js?v=0.36.18.951';
import {coplanarRegion,traceStrip,stepRegion} from './face-selection-regions.js?v=0.36.18.1004';
// Only plans pixel coverage. Original painter/layer own preview, cancellation/history.
export function createFaceFillPlan({mesh,geometry,size,seed,group=false}){
 if(!Number.isInteger(seed)||!mesh.faces[seed])throw Error('Fill needs original face ownership');
 let labels;try{labels=createPaintFilterDomain(geometry,size).labels;}catch(error){throw Error(error.message.replaceAll('Blur','Fill'));}
 const name=mesh.faceGroups?.[seed];
 if(group&&!(typeof name==='string'&&name.trim()))throw Error('Assign a Facegroup to this face first');
 const initial=group?mesh.faces.flatMap((_,i)=>mesh.faceGroups?.[i]===name?[i]:[]):[seed];
 let base=null,last='';
 function faces({held=false,dx=0,dy=0}={}){
  if(group||!held)return initial;
  base??=coplanarRegion(mesh,seed).indices;
  if(Math.max(Math.abs(dx),Math.abs(dy))<18)return base;
  if(Math.abs(dx)>Math.abs(dy))return traceStrip(mesh,seed,dx>0?0:1)||[seed];
  let ids=base;const steps=Math.min(32,Math.max(1,Math.round(Math.abs(dy)/30)));
  for(let i=0;i<steps;i++)ids=stepRegion(mesh,'face',ids,dy<0?'grow':'shrink');
  return ids;
 }
 return {render(layer,gesture){const ids=faces(gesture),key=[...ids].sort((a,b)=>a-b).join(',');if(key===last)return ids.length;last=key;
  const selected=new Set(ids),mask=new Uint8Array(size*size);for(let i=0;i<mask.length;i++)if(selected.has(labels[i]))mask[i]=1;
  layer.fill(mask,{replace:true});return ids.length;
 }};
}

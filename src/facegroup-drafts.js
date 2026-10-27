import {faceGroupPalette} from './facegroup-colours-core.js?v=0.36.18.992';
// Empty groups are UI drafts, scoped to the actual object (not the shared live mesh).
// Painting/Assign stores the name through the original faceGroups/history owner.
export function createFacegroupDrafts(){
 const drafts=new WeakMap();
 function names(object){return object&&drafts.get(object)||[];}
 function palette(mesh,object,view){
  const used=new Set((mesh?.faceGroups||[]).map(name=>typeof name==='string'?name.trim():null).filter(Boolean));
  const pending=names(object).filter(name=>!used.has(name));
  const faces=mesh?.faces||[],groups=faces.map((_,i)=>mesh.faceGroups?.[i]??null);
  const colours=faceGroupPalette({faces:[...faces,...pending.map(()=>[])],faceGroups:[...groups,...pending]},view);
  return {names:[...colours.keys()].sort((a,b)=>a.localeCompare(b)),colours,pending:new Set(pending)};
 }
 function add(mesh,object,current=''){
  if(!object||!mesh?.faces?.length)return null;
  const occupied=new Set([...(mesh.faceGroups||[]),...names(object),String(current).trim()]);
  let number=0;
  for(const name of occupied){const match=/^Group\s+(\d+)$/i.exec(name);const n=Number(match?.[1]);if(Number.isSafeInteger(n)&&n>=0&&n<Number.MAX_SAFE_INTEGER)number=Math.max(number,n);}
  number=number<Number.MAX_SAFE_INTEGER?number+1:1;
  while(occupied.has(`Group ${number}`))number=number<Number.MAX_SAFE_INTEGER?number+1:1;
  const name=`Group ${number}`;drafts.set(object,[...names(object),name]);return name;
 }
 return {add,palette};
}

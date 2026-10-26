import {assignSelectedFacegroup} from './facegroup-authoring.js?v=0.36.18.985';
const signature=mesh=>JSON.stringify([mesh?.vertices,mesh?.faces,mesh?.faceGroups]);
// The existing selection-brush event owner supplies hits and pointer completion.
export function createFacegroupStroke({context,notify=()=>{}}){
 let name=null,armed=false,stroke=null;
 const say=message=>notify(`Facegroups · ${message}`);
 function cancel(){if(!stroke)return false;stroke.controls.enabled=stroke.enabled;stroke=null;say('stroke cancelled');return true;}
 function arm(value){cancel();const text=String(value??'').trim();if(!text||text.length>64||/[\x00-\x1f\x7f]/.test(text)){armed=false;name=null;say('use a group name of 1–64 characters');return false;}name=text;armed=true;say(`Pencil strokes assign ${name} on lift`);return true;}
 function stop(){cancel();armed=false;name=null;}
 function begin(pointerId,index){
  const c=context(),o=c.manager?.objects?.find(o=>o.id===c.manager.activeId);
  if(!armed||stroke||c.selection?.mode?.()!=='face'||c.look!=='facegroups'||c.session?.isActive?.()||!c.controls||!c.mesh?.clone||!o||o.locked||o.sourceId||o.kind==='reference'||o.arrayRecipe||o.booleanRecipe||o.curveProfile||!c.history?.capture||!c.history?.checkpointSnapshot||!c.manager?.replaceActiveMesh)return false;
  if(!Number.isInteger(index)||index<0||index>=c.mesh.faces.length)return false;
  stroke={pointerId,objectId:o.id,mesh:c.mesh,signature:signature(c.mesh),ids:new Set([index]),controls:c.controls,enabled:c.controls.enabled};c.controls.enabled=false;say('1 face pending · lift to assign');return true;
 }
 function add(pointerId,index){if(stroke?.pointerId!==pointerId)return false;if(Number.isInteger(index)&&index>=0&&index<stroke.mesh.faces.length)stroke.ids.add(index);say(`${stroke.ids.size} faces pending · lift to assign`);return true;}
 function finish(pointerId){
  if(stroke?.pointerId!==pointerId)return false;
  const current=stroke;stroke=null;current.controls.enabled=current.enabled;
  const c=context();
  if(c.manager?.activeId!==current.objectId||c.mesh!==current.mesh||signature(c.mesh)!==current.signature||c.look!=='facegroups'||c.selection?.mode?.()!=='face'){say('context changed · stroke discarded');return true;}
  const result=assignSelectedFacegroup({...c,name,selection:{mode:()=> 'face',indices:()=>[...current.ids]}});
  say(result.ok?(result.changed?`${result.count} faces assigned to ${name}`:'no change needed'):result.reason);return true;
 }
 return {arm,stop,cancel,begin,add,finish,get armed(){return armed;},get pointerId(){return stroke?.pointerId??null;}};
}

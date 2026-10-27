// Metadata authoring through the original mesh and scene-history owners.
export function facegroupAuthoringTarget({manager,mesh,session}){
 const object=manager?.objects?.find(o=>o.id===manager.activeId);
 if(!object||!mesh?.clone||object.locked||object.kind==='reference'||object.sourceId||object.arrayRecipe||object.booleanRecipe||object.curveProfile)return {ok:false,reason:'Select an editable mesh'};
 if(session?.isActive?.())return {ok:false,reason:'Finish the active tool first'};
 return {ok:true,object};
}
export function assignSelectedFacegroup({manager,selection,mesh,history,session,name}){
 const fail=reason=>({ok:false,reason});
 const target=facegroupAuthoringTarget({manager,mesh,session});if(!target.ok)return target;
 if(selection?.mode?.()!=='face')return fail('Select faces in Face mode first');
 const ids=[...new Set(selection.indices?.()||[])];
 if(!ids.length||ids.some(i=>!Number.isInteger(i)||i<0||i>=mesh.faces.length))return fail('Select valid faces first');
 const group=name===null?null:String(name??'').trim();
 if(group!==null&&(!group||group.length>64||/[\x00-\x1f\x7f]/.test(group)))return fail('Use a group name of 1–64 characters');
 if(!history?.capture||!history?.checkpointSnapshot||!manager.replaceActiveMesh)return fail('History is not ready');
 if(ids.every(i=>(mesh.faceGroups?.[i]??null)===group))return {ok:true,changed:false,count:ids.length};
 const next=mesh.clone();next.faceGroups=next.faces.map((_,i)=>mesh.faceGroups?.[i]??null);
 for(const id of ids)next.faceGroups[id]=group;
 const before=history.capture();if(!before)return fail('History is not ready');
 if(!manager.replaceActiveMesh(next))return fail('Mesh update refused');
 history.checkpointSnapshot(before);
 return {ok:true,changed:true,count:ids.length,group};
}

export function existingFacegroupNames(mesh){
 return [...new Set((mesh?.faceGroups||[]).filter(name=>typeof name==='string'&&name.trim()))].sort((a,b)=>a.localeCompare(b));
}
export function selectedFacegroupName(mesh,selection){
 if(!Array.isArray(mesh?.faces))return {ok:false,reason:'Select an editable mesh'};
 if(selection?.mode?.()!=='face')return {ok:false,reason:'Select faces in Face mode first'};
 const ids=[...new Set(selection.indices?.()||[])];
 if(!ids.length||ids.some(i=>!Number.isInteger(i)||i<0||i>=mesh?.faces?.length))return {ok:false,reason:'Select valid faces first'};
 const names=new Set(ids.map(i=>mesh.faceGroups?.[i]??null));
 if(names.size!==1)return {ok:false,reason:'Selected faces belong to different groups'};
 const name=names.values().next().value;
 return name?{ok:true,name}:{ok:false,reason:'Selected faces are ungrouped'};
}

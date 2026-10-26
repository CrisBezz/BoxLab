// Metadata authoring through the original mesh and scene-history owners.
export function assignSelectedFacegroup({manager,selection,mesh,history,session,name}){
 const fail=reason=>({ok:false,reason});
 const object=manager?.objects?.find(o=>o.id===manager.activeId);
 if(!object||!mesh?.clone||object.locked||object.kind==='reference'||object.sourceId||object.arrayRecipe||object.booleanRecipe||object.curveProfile)return fail('Select an editable mesh');
 if(session?.isActive?.())return fail('Finish the active tool first');
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

// Exact .1096 group-context reader; frozen A/B baseline.
function selectedWholeGroupId(chosen=selectedObjects()){
  if(!chosen.length)return null;
  const ids=new Set(chosen.map(o=>o.groupId).filter(id=>id!=null));
  if(ids.size!==1)return null;
  const groupId=[...ids][0],members=groupMembers(groupId);
  return members.length===chosen.length&&members.every(o=>selectedIds.has(o.id))?groupId:null;
}

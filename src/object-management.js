const list=document.querySelector('#outlinerList');
const drawer=document.querySelector('#objectsDrawer .drawer-content');
const duplicateButton=document.querySelector('#outlinerDuplicateBtn');
const renameButton=document.querySelector('#outlinerRenameBtn');
const deleteButton=document.querySelector('#outlinerDeleteBtn');
const joinButton=document.querySelector('#joinObjectsBtn');
const linkedDuplicateButton=document.querySelector('#linkedDuplicateBtn');
const makeUniqueButton=document.querySelector('#makeUniqueBtn');
const status=document.querySelector('#selectionStatus');
let selectedIds=new Set(),multiEnabled=false,internalAction=false,toolbar=null,multiButton=null,allButton=null,visibilityButton=null,lockButton=null,clearButton=null,countLabel=null;const toolbarOwner=`object-management-${Date.now()}-${Math.random()}`;
let historyBridgeInstalled=false,hierarchyDecorating=false;
const collapsedGroups=new Set(),groupNames=new Map();
function manager(){return globalThis.__boxlabObjectManager;}
function objects(){return manager()?.objects||[];}
function activeId(){return manager()?.activeId??null;}
function selectedObjects(){return objects().filter(o=>selectedIds.has(o.id));}
function setStatus(text){if(status)status.textContent=text;}
function forceRender(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));manager()?.activate?.(activeId());}
function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function cloneSettings(settings={}){return{mirror:{...(settings.mirror||{})},subd:!!settings.subd,subdLevel:Number(settings.subdLevel||1),cage:settings.cage!==false};}
function snapshotObject(o){return{id:o.id,name:o.name,mesh:o.mesh.clone(),visible:o.visible!==false,locked:!!o.locked,kind:o.kind,settings:cloneSettings(o.settings),history:o.history,origin:o.origin?{...o.origin}:null,groupId:o.groupId,sourceId:o.sourceId||null,instanceMatrix:Array.isArray(o.instanceMatrix)?[...o.instanceMatrix]:null};}
function groupMetadataSnapshot(){return{names:[...groupNames.entries()],collapsed:[...collapsedGroups]};}
function restoreGroupMetadata(snapshot,restored){
  const validGroups=new Set(restored.map(o=>o.groupId).filter(id=>id!=null));
  groupNames.clear();collapsedGroups.clear();
  for(const [id,name] of snapshot?.groups?.names||[])if(validGroups.has(id)&&String(name||'').trim())groupNames.set(id,String(name));
  for(const id of snapshot?.groups?.collapsed||[])if(validGroups.has(id))collapsedGroups.add(id);
}
function captureScene(){const m=manager();if(!m)return null;const sceneObjects=m.objects.map(snapshotObject);return{activeId:m.activeId,objects:sceneObjects,selected:[...selectedIds],multi:multiEnabled,groups:groupMetadataSnapshot()};}
function restoreScene(snapshot){const m=manager();if(!m||!snapshot?.objects?.length)return;const target=m.objects,existing=new Map(target.map(o=>[o.id,o]));const restored=snapshot.objects.map(s=>{const prior=existing.get(s.id);const o={id:s.id,name:s.name,mesh:s.mesh.clone(),visible:s.visible!==false,locked:s.kind==='reference'?true:!!s.locked,kind:s.kind,settings:cloneSettings(s.settings),history:s.history||prior?.history||{undo:[],redo:[]}};if(s.origin)o.origin={...s.origin};if(s.groupId!=null)o.groupId=s.groupId;if(s.sourceId)o.sourceId=s.sourceId;if(Array.isArray(s.instanceMatrix)&&s.instanceMatrix.length===16)o.instanceMatrix=[...s.instanceMatrix];return o;});target.splice(0,target.length,...restored);restoreGroupMetadata(snapshot,restored);multiEnabled=!!snapshot.multi;selectedIds=new Set((snapshot.selected||[]).filter(id=>restored.some(o=>o.id===id)));const wanted=restored.some(o=>o.id===snapshot.activeId)?snapshot.activeId:restored[0]?.id;if(wanted!=null&&m.activeId!==wanted)m.activate?.(wanted);else forceRender();queueMicrotask(updateUI);}
function injectStyle(){if(document.querySelector('#boxlabObjectManagementStyle'))return;const s=document.createElement('style');s.id='boxlabObjectManagementStyle';s.textContent=`.object-management-tools{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:0 0 8px}.object-management-tools button{min-width:0;padding-left:6px;padding-right:6px}.object-management-tools .active{outline:1px solid currentColor}.object-management-count{grid-column:1/-1;font-size:11px;opacity:.72;padding:0 2px 2px}.outliner-row.object-selected:not(.active){box-shadow:inset 3px 0 0 currentColor}.outliner-row.object-selected .outliner-name{font-weight:600}.boxlab-group-block{position:relative;margin:1px 0 3px;border-radius:6px;background:transparent}.boxlab-group-row{display:grid;grid-template-columns:20px minmax(0,1fr) 26px 26px 26px;gap:2px;align-items:center;min-height:32px;padding:1px 2px;border:1px solid rgba(255,255,255,.08);border-radius:6px;background:rgba(255,255,255,.035)}.boxlab-group-row.group-selected{box-shadow:inset 2px 0 0 currentColor;border-color:rgba(255,255,255,.28);background:rgba(255,255,255,.09)}.boxlab-group-row.group-selected .boxlab-group-name{font-weight:750}.boxlab-group-row button,.boxlab-group-row summary{min-width:0;min-height:28px;margin:0;padding:3px 2px;border:0;border-radius:5px;background:transparent;color:inherit;font-size:11px}.boxlab-group-row button:active,.boxlab-group-row summary:active{background:rgba(255,255,255,.08)}.boxlab-group-row .boxlab-group-name{text-align:left;font-size:12px;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.boxlab-group-disclosure{font-size:13px!important;opacity:.78}.boxlab-group-children{display:grid;gap:2px;margin-left:10px;padding:2px 0 1px 10px;border-left:1px solid rgba(255,255,255,.14)}.boxlab-group-children>.outliner-row{margin:0;padding:2px;border-radius:6px;gap:3px}.boxlab-group-children>.outliner-row button{min-height:28px;border-radius:5px}.boxlab-group-more{position:relative;height:28px}.boxlab-group-more>summary{display:flex;align-items:center;justify-content:center;list-style:none;cursor:pointer}.boxlab-group-more>summary::-webkit-details-marker{display:none}.boxlab-group-menu{position:absolute;right:0;top:30px;z-index:50;display:grid;gap:3px;min-width:130px;padding:5px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(18,21,27,.98);box-shadow:0 8px 24px rgba(0,0,0,.35)}.boxlab-group-menu button{width:100%;text-align:left;padding:5px 8px;background:rgba(255,255,255,.04)}.boxlab-group-block.collapsed .boxlab-group-children{display:none}`;document.head.append(s);}
function buildToolbar(){if(!drawer||toolbar)return;injectStyle();toolbar=document.createElement('div');toolbar.className='object-management-tools';toolbar.id='objectManagementTools';toolbar.dataset.objectToolbarOwner=toolbarOwner;globalThis.__boxlabObjectToolbarOwner=toolbarOwner;
  multiButton=document.createElement('button');multiButton.type='button';multiButton.textContent='Multi';multiButton.title='Select more than one object';
  allButton=document.createElement('button');allButton.type='button';allButton.textContent='All';allButton.title='Select all objects';
  visibilityButton=document.createElement('button');visibilityButton.type='button';visibilityButton.textContent='Hide';
  lockButton=document.createElement('button');lockButton.type='button';lockButton.textContent='Lock';
  clearButton=document.createElement('button');clearButton.type='button';clearButton.textContent='Clear';
  countLabel=document.createElement('div');countLabel.className='object-management-count';toolbar.append(multiButton,allButton,visibilityButton,lockButton,clearButton,countLabel);const selectionHost=document.querySelector('#selectionDrawer');const prune=()=>{if(globalThis.__boxlabObjectToolbarOwner!==toolbarOwner)return;for(const candidate of document.querySelectorAll('#selectionDrawer #objectManagementTools,#selectionDrawer .object-management-tools'))if(candidate!==toolbar)candidate.remove();};prune();(selectionHost||drawer).appendChild(toolbar);prune();[0,50,150,400,900].forEach(delay=>setTimeout(prune,delay));
  multiButton.addEventListener('click',()=>{multiEnabled=!multiEnabled;selectedIds.clear();if(multiEnabled&&activeId()!=null)selectedIds.add(activeId());updateUI();});
  allButton.addEventListener('click',()=>{multiEnabled=true;const all=objects(),every=all.length&&all.every(o=>selectedIds.has(o.id));selectedIds=every?new Set():new Set(all.map(o=>o.id));updateUI();});
  joinButton.addEventListener('click',()=>{
    const chosen=selectedObjects();if(chosen.length<2)return;
    const result=manager()?.joinObjects?.([...selectedIds]);
    if(!result?.ok){setStatus(result?.reason||'Join failed');updateUI();return;}
    multiEnabled=false;selectedIds=new Set([result.primaryId]);updateUI();
  });
  visibilityButton.addEventListener('click',()=>{const chosen=selectedObjects();if(!chosen.length)return;const hide=chosen.some(o=>o.visible);for(const o of chosen)o.visible=!hide;forceRender();updateUI();});
  lockButton.addEventListener('click',()=>{const chosen=selectedObjects(),editable=chosen.filter(o=>o.kind!=='reference');if(!editable.length){setStatus('Reference guides stay read-only');return;}const lock=editable.some(o=>!o.locked);for(const o of editable)o.locked=lock;for(const o of chosen)if(o.kind==='reference')o.locked=true;if(lock&&editable.some(o=>o.id===activeId()))document.querySelector('#toolModes button[data-tool="move"]')?.click();setStatus(`${editable.length} editable object${editable.length===1?'':'s'} ${lock?'locked':'unlocked'}${chosen.length!==editable.length?' • Reference guides unchanged':''}`);forceRender();updateUI();});
  clearButton.addEventListener('click',()=>{selectedIds.clear();if(!multiEnabled&&activeId()!=null)selectedIds.add(activeId());updateUI();});
}
function cleanSelection(){const valid=new Set(objects().map(o=>o.id));selectedIds=new Set([...selectedIds].filter(id=>valid.has(id)));if(!multiEnabled){selectedIds.clear();if(activeId()!=null)selectedIds.add(activeId());}}
function groupMembers(groupId){return objects().filter(o=>o.groupId===groupId);}
function pruneGroupMetadata(){
  const valid=new Set(objects().map(o=>o.groupId).filter(id=>id!=null));
  for(const id of [...groupNames.keys()])if(!valid.has(id))groupNames.delete(id);
  for(const id of [...collapsedGroups])if(!valid.has(id))collapsedGroups.delete(id);
}
function groupLabel(groupId){return groupNames.get(groupId)||`Group ${groupId}`;}
function selectedWholeGroupId(chosen=selectedObjects()){
  if(!chosen.length)return null;
  const ids=new Set(chosen.map(o=>o.groupId).filter(id=>id!=null));
  if(ids.size!==1)return null;
  const groupId=[...ids][0],members=groupMembers(groupId);
  return members.length===chosen.length&&members.every(o=>selectedIds.has(o.id))?groupId:null;
}
function renameGroup(groupId){
  const value=window.prompt('Group name',groupLabel(groupId));if(value===null)return false;
  const clean=value.trim();if(!clean)return false;
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  groupNames.set(groupId,clean);updateUI();setStatus(`${clean} renamed`);return true;
}
function selectGroup(groupId){const members=groupMembers(groupId);multiEnabled=true;selectedIds=new Set(members.map(o=>o.id));updateUI();setStatus(`${groupLabel(groupId)} • ${members.length} objects selected`);}
function decorateHierarchy(){
  if(!list||hierarchyDecorating)return;
  const directRows=[...list.children].filter(el=>el.classList?.contains('outliner-row'));
  if(!directRows.length)return;
  const grouped=new Map();
  for(const row of directRows){const id=Number(row.dataset.objectId),object=objects().find(o=>o.id===id);if(object?.groupId!=null){if(!grouped.has(object.groupId))grouped.set(object.groupId,[]);grouped.get(object.groupId).push(row);}}
  if(!grouped.size)return;
  hierarchyDecorating=true;
  try{
    for(const [groupId,rows] of grouped){
      const first=rows[0],block=document.createElement('div'),header=document.createElement('div'),children=document.createElement('div');
      block.className=`boxlab-group-block${collapsedGroups.has(groupId)?' collapsed':''}`;block.dataset.groupId=String(groupId);
      header.className='boxlab-group-row';children.className='boxlab-group-children';
      const collapse=document.createElement('button');collapse.type='button';collapse.className='boxlab-group-disclosure';collapse.textContent=collapsedGroups.has(groupId)?'▸':'▾';collapse.title=collapsedGroups.has(groupId)?'Expand group':'Collapse group';collapse.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();collapsedGroups.has(groupId)?collapsedGroups.delete(groupId):collapsedGroups.add(groupId);updateUI();});
      const name=document.createElement('button');name.type='button';name.className='boxlab-group-name';name.textContent=groupLabel(groupId);name.title='Select whole group';name.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();selectGroup(groupId);});
      const visible=document.createElement('button');visible.type='button';const members=groupMembers(groupId),allHidden=members.length&&members.every(o=>!o.visible);visible.textContent=allHidden?'○':'●';visible.title=allHidden?'Show group':'Hide group';visible.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();globalThis.__boxlabObjectHistory?.checkpoint?.();const hide=groupMembers(groupId).some(o=>o.visible);for(const o of groupMembers(groupId))o.visible=!hide;forceRender();updateUI();});
      const lock=document.createElement('button');lock.type='button';const editableMembers=members.filter(o=>o.kind!=='reference'),allLocked=editableMembers.length&&editableMembers.every(o=>o.locked);lock.textContent=editableMembers.length?(allLocked?'■':'□'):'R';lock.title=editableMembers.length?(allLocked?'Unlock editable group members':'Lock editable group members'):'Reference-only group • read-only';lock.disabled=!editableMembers.length;lock.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const editable=groupMembers(groupId).filter(o=>o.kind!=='reference');if(!editable.length)return;globalThis.__boxlabObjectHistory?.checkpoint?.();const next=editable.some(o=>!o.locked);for(const o of editable)o.locked=next;for(const o of groupMembers(groupId))if(o.kind==='reference')o.locked=true;if(next&&editable.some(o=>o.id===activeId()))document.querySelector('#toolModes button[data-tool="move"]')?.click();forceRender();updateUI();});
      const more=document.createElement('details');more.className='boxlab-group-more';
      const moreSummary=document.createElement('summary');moreSummary.textContent='•••';moreSummary.title='Group actions';
      const menu=document.createElement('div');menu.className='boxlab-group-menu';
      const menuRename=document.createElement('button');menuRename.type='button';menuRename.textContent='Rename Group';menuRename.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();more.open=false;renameGroup(groupId);});
      const menuUngroup=document.createElement('button');menuUngroup.type='button';menuUngroup.textContent='Ungroup';menuUngroup.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();more.open=false;selectGroup(groupId);document.querySelector('#objectGroupTools [data-group-action="ungroup"]')?.click();});
      menu.append(menuRename,menuUngroup);more.append(moreSummary,menu);
      header.append(collapse,name,visible,lock,more);block.append(header,children);first.before(block);for(const row of rows)children.append(row);
    }
  }finally{hierarchyDecorating=false;}
}
function updateRows(){list?.querySelectorAll('.outliner-row').forEach(r=>{const id=Number(r.dataset.objectId);r.classList.toggle('object-selected',selectedIds.has(id));r.setAttribute('aria-selected',selectedIds.has(id)?'true':'false');});list?.querySelectorAll('.boxlab-group-row').forEach(r=>{const groupId=Number(r.parentElement?.dataset?.groupId),members=groupMembers(groupId);r.classList.toggle('group-selected',members.length>0&&members.every(o=>selectedIds.has(o.id)));});}
function syncGroupControls(chosen){const host=document.querySelector('#objectGroupTools'),groupButton=host?.querySelector('[data-group-action="group"]'),ungroupButton=host?.querySelector('[data-group-action="ungroup"]'),wholeGroupId=selectedWholeGroupId(chosen),canGroup=chosen.length>=2&&wholeGroupId==null;if(groupButton)groupButton.disabled=!canGroup;if(ungroupButton)ungroupButton.disabled=!chosen.some(o=>o.groupId!=null);if(host)host.hidden=!canGroup;}
function updateUI(){cleanSelection();pruneGroupMetadata();decorateHierarchy();const chosen=selectedObjects(),wholeGroupId=selectedWholeGroupId(chosen),lockable=chosen.filter(o=>o.kind!=='reference'),editable=chosen.filter(o=>o.kind!=='reference'),linked=chosen.filter(o=>(manager()?.linkedIds?.(o.id)?.length||0)>1);multiButton?.classList.toggle('active',multiEnabled);if(allButton)allButton.textContent=objects().length&&objects().every(o=>selectedIds.has(o.id))?'None':'All';if(visibilityButton)visibilityButton.textContent=chosen.length&&chosen.every(o=>!o.visible)?'Show':'Hide';if(lockButton)lockButton.textContent=lockable.length&&lockable.every(o=>o.locked)?'Unlock':'Lock';if(joinButton)joinButton.disabled=chosen.length<2||chosen.some(o=>o.locked||o.kind==='reference');if(visibilityButton)visibilityButton.disabled=!chosen.length;if(lockButton)lockButton.disabled=!lockable.length;if(clearButton)clearButton.disabled=!chosen.length;if(countLabel)countLabel.textContent=wholeGroupId!=null?`${groupLabel(wholeGroupId)} • ${chosen.length} objects selected`:multiEnabled?`${chosen.length} of ${objects().length} selected • active object remains primary`:'Single object selection';if(renameButton){renameButton.textContent=wholeGroupId!=null?'Rename Group':'Rename';renameButton.disabled=multiEnabled?!(chosen.length===1||wholeGroupId!=null):false;}if(multiEnabled){if(duplicateButton)duplicateButton.disabled=!chosen.length;if(linkedDuplicateButton)linkedDuplicateButton.disabled=!editable.length;if(makeUniqueButton)makeUniqueButton.disabled=!linked.length;if(deleteButton)deleteButton.disabled=!chosen.length||chosen.length>=objects().length;}updateRows();syncGroupControls(chosen);}
function toggleObjectSelection(id){selectedIds.has(id)?selectedIds.delete(id):selectedIds.add(id);updateUI();}
function nextGroupId(){let max=0;for(const o of objects())if(Number.isInteger(o.groupId))max=Math.max(max,o.groupId);return max+1;}
function duplicateSelection(){const m=manager();if(!m)return;const chosen=selectedObjects();if(!chosen.length)return;const sourceGroups=new Map();for(const o of chosen)if(o.groupId!=null){if(!sourceGroups.has(o.groupId))sourceGroups.set(o.groupId,nextGroupId()+sourceGroups.size);}const snapshots=chosen.map(o=>({name:o.name,mesh:o.mesh.clone(),visible:o.visible,kind:o.kind,origin:o.origin?{...o.origin}:null,groupId:o.groupId,settings:cloneSettings(o.settings)}));const created=[];for(const src of snapshots){const copy=m.addMesh(src.mesh,`${src.name} copy`,{visible:src.visible,locked:false,kind:src.kind,settings:src.settings,enterObjectMode:false});if(!copy)continue;if(src.origin)copy.origin={...src.origin};if(src.groupId!=null&&sourceGroups.has(src.groupId))copy.groupId=sourceGroups.get(src.groupId);created.push(copy.id);}for(const [sourceId,newId] of sourceGroups)if(groupNames.has(sourceId))groupNames.set(newId,`${groupNames.get(sourceId)} copy`);multiEnabled=created.length>1||multiEnabled;selectedIds=new Set(created);setStatus(`${created.length} object${created.length===1?'':'s'} duplicated${sourceGroups.size?' • group relationship preserved':''}`);forceRender();updateUI();requestAnimationFrame(()=>{if(currentMode()==='object')globalThis.__boxlabTransformArming?.activateRealMove?.();});}

function linkedDuplicateSelection(){
  const m=manager();if(!m)return;
  const chosen=selectedObjects(),editable=chosen.filter(o=>o.kind!=='reference');
  if(!editable.length){setStatus('Linked Duplicate • no editable objects selected');return;}
  const beforeScene=globalThis.__boxlabObjectHistory?.capture?.()||null;
  const sourceGroups=new Map();
  for(const o of editable)if(o.groupId!=null&&!sourceGroups.has(o.groupId))sourceGroups.set(o.groupId,nextGroupId()+sourceGroups.size);
  const created=[];
  for(const source of editable){
    const copy=m.linkedDuplicateObject?.(source.id,{name:`${source.name} linked`,enterObjectMode:false});
    if(!copy)continue;
    if(source.groupId!=null&&sourceGroups.has(source.groupId))copy.groupId=sourceGroups.get(source.groupId);
    created.push(copy.id);
  }
  if(!created.length){setStatus('Linked Duplicate • no copies created');return;}
  if(beforeScene)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(beforeScene);
  for(const [sourceId,newId] of sourceGroups)if(groupNames.has(sourceId))groupNames.set(newId,`${groupNames.get(sourceId)} linked`);
  multiEnabled=true;selectedIds=new Set(created);
  setStatus(`${created.length} linked duplicate${created.length===1?'':'s'} created${chosen.length!==editable.length?' • Reference guides skipped':''}${sourceGroups.size?' • group relationship preserved':''}`);
  forceRender();updateUI();
  requestAnimationFrame(()=>{if(currentMode()==='object')globalThis.__boxlabTransformArming?.activateRealMove?.();});
}

function makeUniqueSelection(){
  const m=manager();if(!m)return;
  const linked=selectedObjects().filter(o=>(m.linkedIds?.(o.id)?.length||0)>1);
  if(!linked.length){setStatus('Make Unique • selected objects are already unique');return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const detached=m.makeUniqueIds?.(linked.map(o=>o.id))||[];
  if(!detached.length){setStatus('Make Unique • no linked objects detached');return;}
  setStatus(`${detached.length} selected object${detached.length===1?'':'s'} made unique`);
  forceRender();updateUI();
}
function deleteSelection(){const m=manager();if(!m)return;const chosen=new Set(selectedIds),all=m.objects;if(!chosen.size)return;if(chosen.size>=all.length){setStatus('BoxLab keeps at least one object in the scene');return;}const current=m.activeId,activeSelected=chosen.has(current);for(let i=all.length-1;i>=0;i--){const o=all[i];if(chosen.has(o.id)&&o.id!==current)all.splice(i,1);}if(activeSelected){internalAction=true;deleteButton?.click();internalAction=false;}else m.activate(current);selectedIds.clear();if(m.activeId!=null)selectedIds.add(m.activeId);if(multiEnabled)selectedIds.clear();setStatus(`${chosen.size} object${chosen.size===1?'':'s'} deleted`);updateUI();}
function installCaptureHandlers(){list?.addEventListener('click',e=>{const b=e.target.closest('.outliner-name');if(!b)return;const id=Number(b.closest('.outliner-row')?.dataset.objectId);if(!Number.isFinite(id))return;if(multiEnabled){e.preventDefault();e.stopImmediatePropagation();toggleObjectSelection(id);return;}queueMicrotask(()=>{selectedIds=new Set(activeId()==null?[]:[activeId()]);updateUI();});},true);duplicateButton?.addEventListener('click',e=>{if(internalAction||!multiEnabled)return;e.preventDefault();e.stopImmediatePropagation();duplicateSelection();},true);linkedDuplicateButton?.addEventListener('click',e=>{if(internalAction||!multiEnabled)return;e.preventDefault();e.stopImmediatePropagation();linkedDuplicateSelection();},true);makeUniqueButton?.addEventListener('click',e=>{if(internalAction||!multiEnabled)return;e.preventDefault();e.stopImmediatePropagation();makeUniqueSelection();},true);renameButton?.addEventListener('click',e=>{if(internalAction||!multiEnabled)return;const chosen=selectedObjects(),wholeGroupId=selectedWholeGroupId(chosen);if(wholeGroupId!=null){e.preventDefault();e.stopImmediatePropagation();renameGroup(wholeGroupId);return;}const ids=[...selectedIds];if(ids.length!==1){e.preventDefault();e.stopImmediatePropagation();setStatus('Select one object or one whole group to rename');return;}if(ids[0]!==activeId())manager()?.activate?.(ids[0]);},true);deleteButton?.addEventListener('click',e=>{if(internalAction||!multiEnabled)return;e.preventDefault();e.stopImmediatePropagation();deleteSelection();},true);}
function installObserver(){if(!list)return;new MutationObserver(()=>{if(hierarchyDecorating)return;queueMicrotask(updateUI);}).observe(list,{childList:true,subtree:false});}
function installHistoryBridge(){if(historyBridgeInstalled)return;const h=globalThis.__boxlabHistory;if(!h||h.__boxlabObjectBridge)return;historyBridgeInstalled=true;h.__boxlabObjectBridge=true;const meta=new WeakMap(),basePush=h.push.bind(h),baseUndo=h.undo.bind(h),baseRedo=h.redo.bind(h);const tagLast=(stack,snapshot)=>{const token=stack?.[stack.length-1];if(token&&snapshot)meta.set(token,snapshot);};const checkpointSnapshot=snapshot=>{const live=globalThis.__boxlabBridgeState?.mesh;if(!live||!snapshot)return false;basePush(live);tagLast(h.undoStack,snapshot);return true;};const checkpoint=()=>checkpointSnapshot(captureScene());h.push=function(mesh){const snapshot=currentMode()==='object'?captureScene():null;basePush(mesh);if(snapshot)tagLast(h.undoStack,snapshot);};h.undo=function(current){const token=h.undoStack?.[h.undoStack.length-1],snapshot=token?meta.get(token):null,currentScene=snapshot?captureScene():null,result=baseUndo(current);if(snapshot&&result){tagLast(h.redoStack,currentScene);restoreScene(snapshot);}return result;};h.redo=function(current){const token=h.redoStack?.[h.redoStack.length-1],snapshot=token?meta.get(token):null,currentScene=snapshot?captureScene():null,result=baseRedo(current);if(snapshot&&result){tagLast(h.undoStack,currentScene);restoreScene(snapshot);}return result;};globalThis.__boxlabObjectHistory={checkpoint,checkpointSnapshot,capture:captureScene,restore:restoreScene};document.addEventListener('click',e=>{const target=e.target?.closest?.('#objectGroupTools button[data-group-action],#objectOriginTools button[data-origin],#outlinerDuplicateBtn,#outlinerDeleteBtn,#joinObjectsBtn,#quadCleanBtn');if(!target||target.disabled)return;
    const label=target.textContent?.trim();
    checkpoint();},true);}
function initialize(){if(globalThis.__boxlabObjectSelectionRuntime?.initialized)return true;if(!manager()||!drawer||!list)return false;globalThis.__boxlabObjectSelectionRuntime={initialized:true,owner:toolbarOwner};buildToolbar();selectedIds=new Set(activeId()==null?[]:[activeId()]);installCaptureHandlers();installObserver();updateUI();globalThis.__boxlabObjectSelection={__authoritative:true,owner:toolbarOwner,get ids(){return new Set(selectedIds);},get multi(){return multiEnabled;},select(ids=[]){multiEnabled=true;selectedIds=new Set(ids);updateUI();},clear(){selectedIds.clear();updateUI();}};installHistoryBridge();return true;}
if(!initialize()){const ready=()=>{if(!initialize())return;window.removeEventListener('boxlab-object-manager-ready',ready);};window.addEventListener('boxlab-object-manager-ready',ready);}

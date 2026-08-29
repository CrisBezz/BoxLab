const bridgeButton=document.querySelector('#bridgeFacesBtn');
const status=document.querySelector('#selectionStatus');
let session=null;

function state(){return globalThis.__boxlabBridgeState;}
function selection(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){const b=selection();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[...new Set(state()?.selectedFaces||[])];}
function restore(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function directedEdge(m,face,a,b){
  if(!face)return 0;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return -1;
  }
  return 0;
}
function candidatePlans(m,loopA,loopB,ignoredFaces){
  if(!loopA||!loopB||loopA.length!==loopB.length||loopA.length<3)return[];
  const n=loopA.length,plans=[],seen=new Set();
  for(const direction of [1,-1])for(let offset=0;offset<n;offset++){
    const mapped=Array.from({length:n},(_,i)=>loopB[(offset+direction*i+n*4)%n]);
    let distance=0;
    for(let i=0;i<n;i++)distance+=m.vertices[loopA[i]].distanceToSquared(m.vertices[mapped[i]]);
    for(const flip of [false,true]){
      const quads=[];
      for(let i=0;i<n;i++){
        const next=(i+1)%n;
        const q=flip?[loopA[i],mapped[i],mapped[next],loopA[next]]:[loopA[i],loopA[next],mapped[next],mapped[i]];
        if(new Set(q).size!==4){quads.length=0;break;}
        quads.push(q);
      }
      if(quads.length!==n)continue;
      let windingPenalty=0;
      for(const q of quads)for(let i=0;i<4;i++){
        const a=q[i],b=q[(i+1)%4];
        for(let fi=0;fi<m.faces.length;fi++){
          if(ignoredFaces.has(fi))continue;
          if(directedEdge(m,m.faces[fi],a,b)===1)windingPenalty++;
        }
      }
      const key=quads.map(q=>q.join(':')).join('|');
      if(seen.has(key))continue;seen.add(key);
      plans.push({quads,direction,offset,flip,windingPenalty,score:distance+windingPenalty*1e9,distance});
    }
  }
  plans.sort((a,b)=>a.score-b.score||a.distance-b.distance);
  return plans;
}
function controls(){
  let wrap=document.querySelector('#bridgePreviewControls');
  if(wrap)return wrap;
  wrap=document.createElement('div');wrap.id='bridgePreviewControls';wrap.style.display='none';wrap.style.gridTemplateColumns='1fr 1fr';wrap.style.gap='6px';wrap.style.marginTop='6px';
  const ok=document.createElement('button');ok.id='bridgePreviewConfirm';ok.textContent='✓ Use';
  const cancel=document.createElement('button');cancel.id='bridgePreviewCancel';cancel.textContent='× Cancel';
  wrap.append(ok,cancel);bridgeButton?.parentElement?.appendChild(wrap);
  ok.addEventListener('click',confirmPreview,true);cancel.addEventListener('click',cancelPreview,true);
  return wrap;
}
function showControls(show){const w=controls();if(w)w.style.display=show?'grid':'none';}
function applyPreview(index){
  if(!session)return false;
  const {m,before,faceIndices,plans}=session,plan=plans[index];if(!plan)return false;
  restore(m,before);
  [...faceIndices].sort((a,b)=>b-a).forEach(i=>m.faces.splice(i,1));
  const start=m.faces.length;
  m.faces.push(...plan.quads.map(q=>[...q]));m.edges();
  session.index=index;session.previewFaceIndices=Array.from({length:plan.quads.length},(_,i)=>start+i);
  selection()?.set?.('face',session.previewFaceIndices);
  bridgeButton.textContent='Next';bridgeButton.classList.add('active');showControls(true);render();
  if(status)status.textContent=`Bridge preview ${index+1}/${plans.length} • tap Next to cycle • ✓ Use to commit`;
  return true;
}
function startPreview(event){
  const m=mesh(),ids=selectedFaces(),info=m?.bridgeFaceSelectionInfo?.(ids);
  if(!m||!info)return false;
  const before=m.clone(),ignored=new Set(info.faceIndices),plans=candidatePlans(m,info.loops[0],info.loops[1],ignored);
  if(!plans.length)return false;
  event?.preventDefault?.();event?.stopImmediatePropagation?.();
  session={m,before,faceIndices:[...info.faceIndices],plans,index:0,previewFaceIndices:[]};
  return applyPreview(0);
}
function cyclePreview(event){
  if(!session)return false;
  event?.preventDefault?.();event?.stopImmediatePropagation?.();
  return applyPreview((session.index+1)%session.plans.length);
}
function finishUI(){bridgeButton.textContent='Bridge';bridgeButton.classList.remove('active');showControls(false);}
function confirmPreview(event){
  if(!session)return;event?.preventDefault?.();event?.stopImmediatePropagation?.();
  globalThis.__boxlabHistory?.push?.(session.before);
  const count=session.previewFaceIndices.length;session=null;finishUI();render();
  if(status)status.textContent=`Bridge created • ${count} quads`;
}
function cancelPreview(event){
  if(!session)return;event?.preventDefault?.();event?.stopImmediatePropagation?.();
  const {m,before,faceIndices}=session;restore(m,before);session=null;selection()?.set?.('face',faceIndices);finishUI();render();
  if(status)status.textContent='Bridge preview cancelled';
}

document.addEventListener('click',event=>{
  const target=event.target?.closest?.('#bridgeFacesBtn');if(!target)return;
  if(session){cyclePreview(event);return;}
  startPreview(event);
},true);

document.addEventListener('click',event=>{
  if(!session||event.target?.closest?.('#bridgeFacesBtn,#bridgePreviewControls'))return;
  if(event.target?.closest?.('#deselectAllBtn,#selectionModes,#deleteFaceBtn,#extractFacesBtn'))cancelPreview(event);
},true);

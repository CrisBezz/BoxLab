// BoxLab v0.36.18.26 — rollback to the stable v0.36.18.24 Dissolve selection behaviour.
// The v0.36.18.25 cleanup/co-planar merge pass was intentionally removed after
// it introduced bad internal geometry. Stable dissolve topology remains unchanged.

const edgeButton=document.querySelector('#dissolveEdgeBtn');
const loopButton=document.querySelector('#dissolveLoopBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}
function enableMulti(count){if(count<=1||!multiToggle||multiToggle.checked)return;multiToggle.checked=true;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
function selectEdges(ids){const clean=[...new Set(ids||[])].filter(Number.isInteger);bridge()?.set?.('edge',clean);enableMulti(clean.length);render();return clean;}

function activeLoopEdges(){
  const objects=state()?.edgeObjects;
  if(!(objects instanceof Map))return[];
  return[...objects.entries()].filter(([,object])=>object?.renderOrder===27).map(([index])=>index).filter(Number.isInteger).sort((a,b)=>a-b);
}
function loopCandidate(m){
  const selected=selectedEdges();
  if(selected.length>=3){const info=m?.dissolveLoopInfo?.(selected);if(info)return{ids:selected,info,source:'selection'};}
  const active=activeLoopEdges();
  if(active.length>=3){const info=m?.dissolveLoopInfo?.(active);if(info)return{ids:active,info,source:'active'};}
  return null;
}
function boundaryEdgesForFaces(m,faceIndices){
  const counts=new Map();
  for(const fi of faceIndices){
    const face=m.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const k=key(m,face[i],face[(i+1)%face.length]);
      counts.set(k,(counts.get(k)||0)+1);
    }
  }
  const indexByKey=new Map(m.edges().map((edge,index)=>[key(m,edge.a,edge.b),index]));
  return[...counts.entries()].filter(([,count])=>count===1).map(([k])=>indexByKey.get(k)).filter(Number.isInteger);
}

// Capture before the legacy dissolve-ui bubble handlers. Multi-edge dissolve is
// deliberately left to the stable existing owner because its ideal successor
// selection can be ambiguous across disconnected edits.
edgeButton?.addEventListener('click',event=>{
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history||!m.dissolveEdgeInfo?.(ids[0]))return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone(),result=m.dissolveEdge(ids[0]);
  if(!result){if(status)status.textContent='Dissolve Edge failed • invalid topology';return;}
  history.push(before);
  const next=boundaryEdgesForFaces(m,[result.faceIndex]);
  selectEdges(next);
  if(status)status.textContent=`Dissolve Edge • merged faces • ${next.length} boundary edge${next.length===1?'':'s'} selected`;
},true);

loopButton?.addEventListener('click',event=>{
  const m=mesh(),candidate=loopCandidate(m),history=globalThis.__boxlabHistory;
  if(!m||!candidate||!history)return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone(),replacementCount=candidate.info.replacements?.length||0,result=m.dissolveLoop(candidate.ids);
  if(!result){if(status)status.textContent='Dissolve Loop failed • invalid or changed topology';return;}
  history.push(before);
  const start=Math.max(0,m.faces.length-replacementCount),faces=Array.from({length:replacementCount},(_,i)=>start+i);
  const next=boundaryEdgesForFaces(m,faces);
  document.querySelector('#loopSlide')?.setAttribute('disabled','');
  selectEdges(next);
  if(status)status.textContent=`Dissolve Loop • removed ${result.removedEdges} edges + ${result.removedVertices} vertices • ${next.length} surviving boundary edges selected`;
},true);

globalThis.__boxlabDissolveSelectionPolish={version:'0.36.18.26'};

// BoxLab v0.36.18.174 — Mesh Health guided Inspect → Repair handoff.
// Recognised findings can open existing Inspect tools. Only findings with an
// existing deterministic repair path expose Repair, and Repair only opens the
// existing drawer; no geometry is changed until the user explicitly runs it.

const VERSION='0.36.18.174';
const faceTools=document.querySelector('[data-mode-tools="face"]');

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function finiteCount(value){return Number.isFinite(value)&&value>0?Math.floor(value):0;}
function run(globalName,m){
  try{return globalThis[globalName]?.inspect?.(m)||null;}
  catch(error){console.warn(`[Mesh Health] ${globalName} inspect failed`,error);return null;}
}

function metric(id,label,kind,mode,globalName,extract,actionable=true,repairable=false){
  return{id,label,kind,mode,globalName,extract,actionable,repairable};
}

const METRICS=[
  metric('degenerateFaces','Degenerate faces','issue','face','__boxlabSelectDegenerateFaces',info=>info?.count),
  metric('duplicateFaces','Duplicate faces','issue','face','__boxlabSelectDuplicateFaces',info=>info?.count),
  metric('winding','Inconsistent winding','issue','face','__boxlabSelectInconsistentWinding',info=>info?.count),
  metric('selfCrossing','Self-crossing faces','issue','face','__boxlabSelectSelfIntersectingFaces',info=>info?.count),
  metric('faceIntersections','Face intersections','issue','face','__boxlabSelectIntersectingFaces',info=>info?.count),
  metric('nonManifold','Non-manifold edges','issue','edge','__boxlabSelectNonManifold',info=>info?.count??info?.total),
  metric('looseVertices','Loose vertices','issue','vertex','__boxlabSelectLooseVertices',info=>info?.count??info?.total),
  metric('looseEdges','Loose edges','issue','edge','__boxlabSelectLooseEdges',info=>info?.count??info?.total),
  metric('cleanableVerts','Cleanable verts','issue','vertex','__boxlabSelectCleanableVerts',info=>info?.count??info?.total,true,true),
  metric('mergeableVerts','Mergeable verts','issue','vertex','__boxlabSelectMergeableVerts',info=>info?.count??info?.total,true,true),
  metric('nonPlanar','Non-planar faces','warning','face','__boxlabSelectNonPlanar',info=>info?.count??info?.total),
  metric('isolatedNonQuad','Isolated non-quads','warning','face','__boxlabSelectQuads',info=>info?.isolatedNonQuadTotal,false),
  metric('clusteredNonQuad','Non-quad clusters','warning','face','__boxlabSelectQuads',info=>info?.clusteredNonQuadTotal,false),
  metric('subdPoles','SubD poles','warning','vertex','__boxlabSelectVertexValence',info=>info?.subdPoleTotal??info?.polesTotal??info?.subdPoles?.length,false)
];

function topology(m){
  const vertices=Array.isArray(m?.vertices)?m.vertices.length:0;
  const faces=Array.isArray(m?.faces)?m.faces.length:0;
  const edgeUse=new Map();
  if(Array.isArray(m?.faces))for(const face of m.faces){
    if(!Array.isArray(face)||face.length<2)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=`${Math.min(a,b)}:${Math.max(a,b)}`;
      edgeUse.set(key,(edgeUse.get(key)||0)+1);
    }
  }
  let boundaryEdges=0;for(const count of edgeUse.values())if(count===1)boundaryEdges++;
  return{vertices,edges:edgeUse.size,faces,boundaryEdges};
}

function inspect(m=mesh()){
  if(!m)return{version:VERSION,available:false,topology:null,issues:[],warnings:[],issueCount:0,warningCount:0,totalFindings:0};
  const cache=new Map(),issues=[],warnings=[];
  for(const spec of METRICS){
    let info=cache.get(spec.globalName);
    if(info===undefined){info=run(spec.globalName,m);cache.set(spec.globalName,info);}
    if(!info)continue;
    const count=finiteCount(spec.extract(info));if(!count)continue;
    const finding={id:spec.id,label:spec.label,count,kind:spec.kind,mode:spec.mode,source:spec.globalName,actionable:spec.actionable,repairable:spec.repairable};
    (spec.kind==='issue'?issues:warnings).push(finding);
  }
  const issueCount=issues.reduce((sum,item)=>sum+item.count,0);
  const warningCount=warnings.reduce((sum,item)=>sum+item.count,0);
  return{version:VERSION,available:true,topology:topology(m),issues,warnings,issueCount,warningCount,totalFindings:issueCount+warningCount};
}

function inspectDrawer(mode){return document.querySelector(mode==='face'?'#faceInspectDrawer':`#${mode}InspectDrawer`);}
function repairDrawer(mode){return document.querySelector(mode==='face'?'#faceRepairDrawer':`#${mode}RepairDrawer`);}
function activateMode(mode){
  const button=document.querySelector(`#selectionModes button[data-mode="${mode}"]`);
  if(button&&!button.classList.contains('active'))button.click();
}
function inspectFinding(id){
  const spec=METRICS.find(item=>item.id===id);if(!spec?.actionable)return false;
  const api=globalThis[spec.globalName];if(typeof api?.apply!=='function')return false;
  activateMode(spec.mode);
  setTimeout(()=>{const drawer=inspectDrawer(spec.mode);if(drawer)drawer.open=true;try{api.apply();}catch(error){console.warn(`[Mesh Health] ${spec.id} Inspect handoff failed`,error);}},0);
  return true;
}
function repairFinding(id){
  const spec=METRICS.find(item=>item.id===id);if(!spec?.repairable)return false;
  activateMode(spec.mode);
  setTimeout(()=>{
    globalThis.__boxlabComponentInspectRepairDrawers?.sync?.();
    globalThis.__boxlabFaceRepairDrawer?.sync?.();
    const drawer=repairDrawer(spec.mode);if(drawer)drawer.open=true;
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`${spec.label} • review Repair options`;
  },0);
  return true;
}

function ensureUI(){
  if(!faceTools)return null;let details=document.querySelector('#meshHealthSummary');if(details)return details;
  details=document.createElement('details');details.id='meshHealthSummary';details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.025)';
  const summary=document.createElement('summary');summary.id='meshHealthSummaryLabel';summary.textContent='MESH HEALTH';
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';
  const body=document.createElement('div');body.id='meshHealthSummaryBody';body.style.cssText='padding:0 7px 7px;font-size:10px;line-height:1.45;opacity:.88';
  details.append(summary,body);
  const helperGroup=document.querySelector('#faceSelectionHelpersGroup'),precision=document.querySelector('#precisionFaceReadout');
  if(helperGroup?.parentElement===faceTools)helperGroup.insertAdjacentElement('beforebegin',details);
  else if(precision?.parentElement===faceTools)precision.insertAdjacentElement('afterend',details);else faceTools.appendChild(details);
  details.addEventListener('toggle',()=>{if(details.open)sync(true);});return details;
}

function row(text,muted=false){const div=document.createElement('div');div.textContent=text;if(muted)div.style.opacity='.62';return div;}
function actionButton(text,title,handler){
  const button=document.createElement('button');button.type='button';button.textContent=text;button.title=title;
  button.style.cssText='border:0;background:transparent;color:inherit;font:inherit;text-align:left;padding:1px 0;cursor:pointer;min-width:0';
  button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();handler();});return button;
}
function findingRow(item,muted=false){
  if(!item?.actionable)return row(`${item?.kind==='issue'?'⚠':'•'} ${item?.count||0} ${item?.label||''}`,muted);
  const wrap=document.createElement('div');wrap.style.cssText=`display:grid;grid-template-columns:${item.repairable?'1fr auto':'1fr'};gap:6px;align-items:center`;
  wrap.appendChild(actionButton(`${item.kind==='issue'?'⚠':'•'} ${item.count} ${item.label} ›`,`Select ${item.label.toLowerCase()} in Inspect`,()=>inspectFinding(item.id)));
  if(item.repairable){const repair=actionButton('Repair ›',`Open safe Repair options for ${item.label.toLowerCase()}`,()=>repairFinding(item.id));repair.style.opacity='.78';wrap.appendChild(repair);}
  if(muted)wrap.style.opacity='.72';return wrap;
}
function appendTopology(body,info){const t=info?.topology;if(!t)return;body.appendChild(row(`${t.vertices} verts • ${t.edges} edges • ${t.faces} faces`,true));body.appendChild(row(`${t.boundaryEdges} boundary edges`,true));}
function renderSummary(info){
  const details=ensureUI();if(!details)return false;const label=details.querySelector('#meshHealthSummaryLabel'),body=details.querySelector('#meshHealthSummaryBody');if(!label||!body)return false;
  body.replaceChildren();if(!info.available){label.textContent='MESH HEALTH';body.appendChild(row('No editable mesh',true));return true;}
  const issueText=info.issueCount===1?'1 issue':`${info.issueCount} issues`,warningText=info.warningCount===1?'1 warning':`${info.warningCount} warnings`;
  label.textContent=info.issueCount?`MESH HEALTH • ${issueText}`:info.warningCount?`MESH HEALTH • ${warningText}`:'MESH HEALTH • CLEAN';
  appendTopology(body,info);if(!info.totalFindings){body.appendChild(row('✓ No recognised mesh-health issues',true));return true;}
  info.issues.forEach(item=>body.appendChild(findingRow(item)));info.warnings.forEach(item=>body.appendChild(findingRow(item,true)));return true;
}
function sync(force=false){const details=ensureUI();if(!details)return false;if(!force&&!details.open)return null;const info=inspect(mesh());renderSummary(info);return info;}

ensureUI();
window.addEventListener('boxlab-bridge-state',()=>{const details=document.querySelector('#meshHealthSummary');if(details?.open)queueMicrotask(()=>sync(true));});
document.addEventListener('pointerup',()=>{const details=document.querySelector('#meshHealthSummary');if(details?.open)setTimeout(()=>sync(true),0);},true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>{const details=document.querySelector('#meshHealthSummary');if(details?.open)queueMicrotask(()=>sync(true));}));

globalThis.__boxlabMeshHealth={version:VERSION,inspect,sync,inspectFinding,repairFinding,metrics:METRICS.map(({id,label,kind,mode,globalName,actionable,repairable})=>({id,label,kind,mode,globalName,actionable,repairable}))};

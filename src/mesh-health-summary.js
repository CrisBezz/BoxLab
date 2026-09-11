// BoxLab v0.36.18.137 — Mesh Health summary foundation.
// Reuses existing non-destructive diagnostic inspectors to build one compact,
// default-collapsed health summary. This module does not select or alter mesh
// topology/history. It deliberately separates definite repair issues from
// modelling-quality warnings so intentional topology is not reported as broken.

const VERSION='0.36.18.137';
const faceTools=document.querySelector('[data-mode-tools="face"]');

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function finiteCount(value){return Number.isFinite(value)&&value>0?Math.floor(value):0;}
function run(globalName,m){
  try{return globalThis[globalName]?.inspect?.(m)||null;}
  catch(error){console.warn(`[Mesh Health] ${globalName} inspect failed`,error);return null;}
}

function metric(id,label,kind,globalName,extract){return{id,label,kind,globalName,extract};}

const METRICS=[
  metric('degenerateFaces','Degenerate faces','issue','__boxlabSelectDegenerateFaces',info=>info?.count),
  metric('duplicateFaces','Duplicate faces','issue','__boxlabSelectDuplicateFaces',info=>info?.count),
  metric('winding','Inconsistent winding','issue','__boxlabSelectInconsistentWinding',info=>info?.count),
  metric('selfCrossing','Self-crossing faces','issue','__boxlabSelectSelfIntersectingFaces',info=>info?.count),
  metric('faceIntersections','Face intersections','issue','__boxlabSelectIntersectingFaces',info=>info?.count),
  metric('nonManifold','Non-manifold edges','issue','__boxlabSelectNonManifold',info=>info?.count??info?.total),
  metric('looseVertices','Loose vertices','issue','__boxlabSelectLooseVertices',info=>info?.count??info?.total),
  metric('looseEdges','Loose edges','issue','__boxlabSelectLooseEdges',info=>info?.count??info?.total),
  metric('cleanableVerts','Cleanable verts','issue','__boxlabSelectCleanableVerts',info=>info?.count??info?.total),
  metric('mergeableVerts','Mergeable verts','issue','__boxlabSelectMergeableVerts',info=>info?.count??info?.total),
  metric('nonPlanar','Non-planar faces','warning','__boxlabSelectNonPlanar',info=>info?.count??info?.total),
  metric('isolatedNonQuad','Isolated non-quads','warning','__boxlabSelectQuads',info=>info?.isolatedNonQuadTotal),
  metric('clusteredNonQuad','Non-quad clusters','warning','__boxlabSelectQuads',info=>info?.clusteredNonQuadTotal),
  metric('subdPoles','SubD poles','warning','__boxlabSelectVertexValence',info=>info?.subdPoleTotal??info?.polesTotal??info?.subdPoles?.length)
];

function inspect(m=mesh()){
  if(!m)return{version:VERSION,available:false,issues:[],warnings:[],issueCount:0,warningCount:0,totalFindings:0};
  const cache=new Map(),issues=[],warnings=[];
  for(const spec of METRICS){
    let info=cache.get(spec.globalName);
    if(info===undefined){info=run(spec.globalName,m);cache.set(spec.globalName,info);}
    if(!info)continue;
    const count=finiteCount(spec.extract(info));
    if(!count)continue;
    const finding={id:spec.id,label:spec.label,count,kind:spec.kind,source:spec.globalName};
    (spec.kind==='issue'?issues:warnings).push(finding);
  }
  const issueCount=issues.reduce((sum,item)=>sum+item.count,0);
  const warningCount=warnings.reduce((sum,item)=>sum+item.count,0);
  return{version:VERSION,available:true,issues,warnings,issueCount,warningCount,totalFindings:issueCount+warningCount};
}

function ensureUI(){
  if(!faceTools)return null;
  let details=document.querySelector('#meshHealthSummary');
  if(details)return details;
  details=document.createElement('details');
  details.id='meshHealthSummary';
  details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.025)';
  const summary=document.createElement('summary');
  summary.id='meshHealthSummaryLabel';
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';
  summary.textContent='MESH HEALTH';
  const body=document.createElement('div');
  body.id='meshHealthSummaryBody';
  body.style.cssText='padding:0 7px 7px;font-size:10px;line-height:1.45;opacity:.88';
  details.append(summary,body);
  const helperGroup=document.querySelector('#faceSelectionHelpersGroup');
  const precision=document.querySelector('#precisionFaceReadout');
  if(helperGroup?.parentElement===faceTools)helperGroup.insertAdjacentElement('beforebegin',details);
  else if(precision?.parentElement===faceTools)precision.insertAdjacentElement('afterend',details);
  else faceTools.appendChild(details);
  return details;
}

function row(text,muted=false){
  const div=document.createElement('div');
  div.textContent=text;
  if(muted)div.style.opacity='.62';
  return div;
}

function renderSummary(info){
  const details=ensureUI();if(!details)return false;
  const label=details.querySelector('#meshHealthSummaryLabel');
  const body=details.querySelector('#meshHealthSummaryBody');
  if(!label||!body)return false;
  body.replaceChildren();
  if(!info.available){label.textContent='MESH HEALTH';body.appendChild(row('No editable mesh',true));return true;}
  const issueText=info.issueCount===1?'1 issue':`${info.issueCount} issues`;
  const warningText=info.warningCount===1?'1 warning':`${info.warningCount} warnings`;
  if(info.issueCount)label.textContent=`MESH HEALTH • ${issueText}`;
  else if(info.warningCount)label.textContent=`MESH HEALTH • ${warningText}`;
  else label.textContent='MESH HEALTH • CLEAN';
  if(!info.totalFindings){body.appendChild(row('✓ No recognised mesh-health issues',true));return true;}
  info.issues.forEach(item=>body.appendChild(row(`⚠ ${item.count} ${item.label}`)));
  info.warnings.forEach(item=>body.appendChild(row(`• ${item.count} ${item.label}`,true)));
  if(info.issues.length&&info.warnings.length)body.insertBefore(row('Issues',true),body.firstChild);
  return true;
}

function sync(){const info=inspect(mesh());renderSummary(info);return info;}

window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,60,160,360,800,1200].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabMeshHealth={version:VERSION,inspect,sync,metrics:METRICS.map(({id,label,kind,globalName})=>({id,label,kind,globalName}))};

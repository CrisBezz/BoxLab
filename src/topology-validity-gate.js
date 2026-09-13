// BoxLab v0.36.18.200 — topology validity / Boolean readiness gate.
// Non-destructive foundation for future clean-mesh and Boolean operations.
const VERSION='0.36.18.200';

function state(){return globalThis.__boxlabBridgeState||null;}
function mesh(){return state()?.mesh||null;}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function point(v){return v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);}

function validate(m=mesh()){
  const result={
    version:VERSION,available:!!m,valid:false,booleanReady:false,
    vertices:0,faces:0,edges:0,boundaryEdges:0,nonManifoldEdges:0,
    invalidVertexRefs:0,invalidVertices:0,shortFaces:0,repeatedFaceVertices:0,
    collapsedEdges:0,duplicateFaces:0,issues:[]
  };
  if(!m||!Array.isArray(m.vertices)||!Array.isArray(m.faces))return result;
  result.vertices=m.vertices.length;result.faces=m.faces.length;
  const edgeUse=new Map(),faceKeys=new Set();
  const epsilonSq=1e-16;

  m.vertices.forEach(v=>{if(!point(v))result.invalidVertices++;});
  for(const face of m.faces){
    if(!Array.isArray(face)||face.length<3){result.shortFaces++;continue;}
    let invalid=false;
    const seen=new Set();
    for(const index of face){
      if(!Number.isInteger(index)||index<0||index>=m.vertices.length){result.invalidVertexRefs++;invalid=true;continue;}
      if(seen.has(index))result.repeatedFaceVertices++;
      seen.add(index);
    }
    if(invalid)continue;
    const canonical=[...seen].sort((a,b)=>a-b).join(':');
    if(faceKeys.has(canonical))result.duplicateFaces++;else faceKeys.add(canonical);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(a===b){result.collapsedEdges++;continue;}
      const va=m.vertices[a],vb=m.vertices[b];
      if(point(va)&&point(vb)){
        const dx=va.x-vb.x,dy=va.y-vb.y,dz=va.z-vb.z;
        if(dx*dx+dy*dy+dz*dz<=epsilonSq)result.collapsedEdges++;
      }
      const key=edgeKey(a,b);edgeUse.set(key,(edgeUse.get(key)||0)+1);
    }
  }
  result.edges=edgeUse.size;
  for(const count of edgeUse.values()){
    if(count===1)result.boundaryEdges++;
    else if(count>2)result.nonManifoldEdges++;
  }

  const checks=[
    ['Invalid vertices',result.invalidVertices],
    ['Invalid vertex references',result.invalidVertexRefs],
    ['Faces with fewer than 3 vertices',result.shortFaces],
    ['Repeated vertices inside faces',result.repeatedFaceVertices],
    ['Collapsed / zero-length edges',result.collapsedEdges],
    ['Duplicate faces',result.duplicateFaces],
    ['Non-manifold edges',result.nonManifoldEdges]
  ];
  result.issues=checks.filter(([,count])=>count>0).map(([label,count])=>({label,count}));
  result.valid=result.issues.length===0;
  result.booleanReady=result.valid&&result.boundaryEdges===0&&result.faces>0&&result.vertices>0;
  return result;
}

function ensureUI(){
  const faceTools=document.querySelector('[data-mode-tools="face"]');if(!faceTools)return null;
  let details=document.querySelector('#topologyValidityGate');if(details)return details;
  details=document.createElement('details');details.id='topologyValidityGate';details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.025)';
  const summary=document.createElement('summary');summary.id='topologyValidityGateLabel';summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';summary.textContent='TOPOLOGY GATE';
  const body=document.createElement('div');body.id='topologyValidityGateBody';body.style.cssText='padding:0 7px 7px;font-size:10px;line-height:1.45;opacity:.88';
  details.append(summary,body);
  const health=document.querySelector('#meshHealthSummary');
  if(health?.parentElement===faceTools)health.insertAdjacentElement('afterend',details);else faceTools.appendChild(details);
  details.addEventListener('toggle',()=>{if(details.open)sync();});
  return details;
}
function line(text,opacity=1){const div=document.createElement('div');div.textContent=text;div.style.opacity=String(opacity);return div;}
function render(info){
  const details=ensureUI();if(!details)return false;
  const label=details.querySelector('#topologyValidityGateLabel'),body=details.querySelector('#topologyValidityGateBody');if(!label||!body)return false;
  body.replaceChildren();
  if(!info.available){label.textContent='TOPOLOGY GATE';body.appendChild(line('No editable mesh',.62));return true;}
  label.textContent=info.booleanReady?'TOPOLOGY GATE • BOOLEAN READY':info.valid?'TOPOLOGY GATE • OPEN MESH':'TOPOLOGY GATE • NOT READY';
  body.appendChild(line(`${info.vertices} verts • ${info.edges} edges • ${info.faces} faces`,.62));
  body.appendChild(line(`${info.boundaryEdges} boundary edges`,.62));
  if(info.booleanReady){body.appendChild(line('✓ Closed manifold topology'));body.appendChild(line('Ready for future Boolean kernel input',.72));return true;}
  if(info.valid&&info.boundaryEdges>0){body.appendChild(line(`• Open boundary: ${info.boundaryEdges} edge${info.boundaryEdges===1?'':'s'}`));body.appendChild(line('Close the mesh before Boolean operations',.72));return true;}
  info.issues.forEach(item=>body.appendChild(line(`⚠ ${item.count} ${item.label}`)));
  return true;
}
function sync(){const info=validate(mesh());render(info);return info;}

ensureUI();
window.addEventListener('boxlab-bridge-state',()=>{const details=document.querySelector('#topologyValidityGate');if(details?.open)queueMicrotask(sync);});
document.addEventListener('pointerup',()=>{const details=document.querySelector('#topologyValidityGate');if(details?.open)setTimeout(sync,0);},true);

globalThis.__boxlabTopologyGate={version:VERSION,validate,sync,get current(){return validate(mesh());}};

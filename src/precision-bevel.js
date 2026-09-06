// BoxLab v0.36.18.15 — precision Bevel.
// Adds exact percentage entry for the existing edge/vertex bevel kernels.
// Does not alter bevel topology or drag ownership.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const edgeButton=document.querySelector('#bevelBtn');
const vertexButton=document.querySelector('#vertexBevelBtn');
const edgeWidth=document.querySelector('#bevelWidth');
const edgeOut=document.querySelector('#bevelWidthOut');
const vertexWidth=document.querySelector('#vertexBevelWidth');
const vertexOut=document.querySelector('#vertexBevelWidthOut');
const segments=document.querySelector('#bevelSegments');
const status=document.querySelector('#selectionStatus');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function clampPercent(value){return Math.max(2,Math.min(49,value));}
function selected(mode){const b=bridge();return b?.mode?.()===mode?[...new Set(b.indices?.()||[])]:[];}
function clearSelection(mode){bridge()?.set?.(mode,[]);}

function makeRow(host,id,labelText){
  if(!host)return null;
  const row=document.createElement('div');row.id=id;row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:6px 0 2px';
  const label=document.createElement('span');label.textContent=labelText;label.style.cssText='font-size:10px;opacity:.72';
  const input=document.createElement('input');input.type='number';input.min='2';input.max='49';input.step='0.1';input.inputMode='decimal';input.placeholder='20.0';input.style.cssText='min-width:0;width:100%;box-sizing:border-box;padding:5px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.055);color:inherit;font:inherit';
  const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';apply.style.cssText='padding:5px 8px;white-space:nowrap';
  row.append(label,input,apply);host.append(row);
  const readout=document.createElement('div');readout.style.cssText='font-size:10px;opacity:.72;margin:2px 0 1px;min-height:12px';host.append(readout);
  return{row,input,apply,readout};
}

const edgeUi=makeRow(edgeTools,'precisionEdgeBevelRow','Exact %');
const vertexUi=makeRow(vertexTools,'precisionVertexBevelRow','Exact %');

function restore(mesh,snapshot){mesh.vertices=snapshot.vertices.map(v=>v.clone());mesh.faces=snapshot.faces.map(f=>[...f]);mesh.creases=new Map(snapshot.creases);if(snapshot.looseEdges instanceof Set)mesh.looseEdges=new Set(snapshot.looseEdges);if(snapshot.looseVertices instanceof Set)mesh.looseVertices=new Set(snapshot.looseVertices);mesh.edges?.();}

function applyEdge(){
  const mesh=state()?.mesh,ids=selected('edge'),raw=Number(edgeUi?.input.value);
  if(!mesh||!ids.length){if(edgeUi)edgeUi.readout.textContent='Select edge(s) first';return;}
  if(!Number.isFinite(raw)){if(edgeUi)edgeUi.readout.textContent='Enter a bevel percentage';return;}
  const valid=mesh.generalBevelSelectionInfo?.(ids);
  if(!valid){if(edgeUi)edgeUi.readout.textContent=mesh.__lastBevelError||'Selection cannot be bevelled';return;}
  const pct=clampPercent(raw),before=mesh.clone(),seg=Math.max(1,Math.min(4,Math.round(Number(segments?.value||1))));
  const result=mesh.generalBevelSelection?.(valid.ids,pct/100,seg);
  if(!result){restore(mesh,before);if(edgeUi)edgeUi.readout.textContent=mesh.__lastBevelError||'Bevel failed';return;}
  globalThis.__boxlabHistory?.push(before);
  if(edgeWidth)edgeWidth.value=String(Math.round(pct));if(edgeOut)edgeOut.textContent=`${pct.toFixed(1)}%`;
  clearSelection('edge');render();
  if(edgeUi)edgeUi.readout.textContent=`Edge Bevel exact • ${pct.toFixed(1)}% • ${seg} segment${seg===1?'':'s'}`;
  if(status)status.textContent=`Bevel committed • ${pct.toFixed(1)}%`;
}

function applyVertex(){
  const mesh=state()?.mesh,ids=selected('vertex'),raw=Number(vertexUi?.input.value);
  if(!mesh||!ids.length){if(vertexUi)vertexUi.readout.textContent='Select vertex/vertices first';return;}
  if(!Number.isFinite(raw)){if(vertexUi)vertexUi.readout.textContent='Enter a bevel percentage';return;}
  const valid=mesh.multiVertexBevelInfo?.(ids);
  if(!valid){if(vertexUi)vertexUi.readout.textContent='Selection cannot be bevelled';return;}
  const pct=clampPercent(raw),before=mesh.clone(),ok=mesh.bevelVertices?.(valid.ids,pct/100);
  if(!ok){restore(mesh,before);if(vertexUi)vertexUi.readout.textContent='Vertex bevel failed';return;}
  globalThis.__boxlabHistory?.push(before);
  if(vertexWidth)vertexWidth.value=String(Math.round(pct));if(vertexOut)vertexOut.textContent=`${pct.toFixed(1)}%`;
  clearSelection('vertex');render();
  if(vertexUi)vertexUi.readout.textContent=`Vertex Bevel exact • ${pct.toFixed(1)}%`;
  if(status)status.textContent=`Vertex Bevel committed • ${pct.toFixed(1)}%`;
}

edgeUi?.apply.addEventListener('click',applyEdge);vertexUi?.apply.addEventListener('click',applyVertex);
edgeUi?.input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyEdge();edgeUi.input.blur();}});
vertexUi?.input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyVertex();vertexUi.input.blur();}});

// Existing direct bevel tools update their native sliders during drag. Mirror those
// values into a precision readout without intercepting the modelling gesture.
window.addEventListener('pointermove',()=>{
  queueMicrotask(()=>{
    if(edgeButton?.classList.contains('active')&&edgeUi&&edgeWidth)edgeUi.readout.textContent=`Live Edge Bevel • ${Number(edgeWidth.value||0).toFixed(1)}%`;
    if(vertexButton?.classList.contains('active')&&vertexUi&&vertexWidth)vertexUi.readout.textContent=`Live Vertex Bevel • ${Number(vertexWidth.value||0).toFixed(1)}%`;
  });
},true);

edgeButton?.addEventListener('click',()=>queueMicrotask(()=>{if(edgeUi)edgeUi.readout.textContent=edgeButton.classList.contains('active')?'Edge Bevel armed • drag or enter Exact %':'Edge Bevel';}));
vertexButton?.addEventListener('click',()=>queueMicrotask(()=>{if(vertexUi)vertexUi.readout.textContent=vertexButton.classList.contains('active')?'Vertex Bevel armed • drag or enter Exact %':'Vertex Bevel';}));

if(edgeUi)edgeUi.readout.textContent='Edge Bevel • drag normally or enter Exact %';
if(vertexUi)vertexUi.readout.textContent='Vertex Bevel • drag normally or enter Exact %';

globalThis.__boxlabPrecisionBevel={version:'0.36.18.15',edge:value=>{if(edgeUi){edgeUi.input.value=String(value);applyEdge();}},vertex:value=>{if(vertexUi){vertexUi.input.value=String(value);applyVertex();}}};

// BoxLab v0.36.18.16 — exact Edge Slide percentage.
// Adds signed numeric slide control without changing component-slide drag behaviour.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const edgeSlideButton=document.querySelector('#edgeSlideBtn');
const status=document.querySelector('#selectionStatus');
if(!edgeTools||!edgeSlideButton) throw new Error('Precision Edge Slide UI dependencies missing');

const row=document.createElement('div');
row.id='precisionEdgeSlideRow';
row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:6px 0 2px';
const label=document.createElement('span');label.textContent='Slide %';label.style.cssText='font-size:10px;opacity:.72';
const input=document.createElement('input');input.type='number';input.inputMode='decimal';input.step='0.1';input.min='-98';input.max='98';input.placeholder='± %';input.style.cssText='min-width:0;width:100%;box-sizing:border-box;padding:5px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.055);color:inherit;font:inherit';
const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';apply.style.cssText='padding:5px 8px';
row.append(label,input,apply);
const anchor=document.querySelector('.loop-slide-option');
(anchor?.parentElement||edgeTools).insertBefore(row,anchor||null);

const readout=document.createElement('div');
readout.id='precisionEdgeSlideReadout';
readout.style.cssText='font-size:10px;opacity:.72;margin:2px 0 4px;min-height:12px';
readout.textContent='Exact Edge Slide: + toward one side, − toward the other';
row.insertAdjacentElement('afterend',readout);

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function realFaces(m,e){return(e?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function sideTargets(m,edgeIndex){
  const e=m.edges()[edgeIndex];if(!e||e.loose)return null;
  const faces=realFaces(m,e);if(faces.length!==2||faces.some(fi=>m.faces[fi]?.length!==4))return null;
  const sides=[];
  for(const fi of faces){
    const f=m.faces[fi],ia=f.indexOf(e.a),ib=f.indexOf(e.b);if(ia<0||ib<0)return null;
    const n=f.length;let aTarget=null,bTarget=null;
    if((ia+1)%n===ib){aTarget=f[(ia-1+n)%n];bTarget=f[(ib+1)%n];}
    else if((ib+1)%n===ia){aTarget=f[(ia+1)%n];bTarget=f[(ib-1+n)%n];}
    else return null;
    if(aTarget===bTarget||!m.vertices[aTarget]||!m.vertices[bTarget])return null;
    sides.push({aTarget,bTarget});
  }
  return{edgeIndex,edge:e,sides};
}
function sideTarget(info,side,vertex){if(vertex===info.edge.a)return side.aTarget;if(vertex===info.edge.b)return side.bTarget;return null;}
function solveAssignments(infos,positive){
  const byIndex=new Map(infos.map(i=>[i.edgeIndex,i])),remaining=new Set(infos.map(i=>i.edgeIndex)),assignments=new Map(),vertexTargets=new Map();
  const assign=(info,sideIndex)=>{
    const side=info.sides[sideIndex];if(!side)return false;
    for(const v of[info.edge.a,info.edge.b]){const target=sideTarget(info,side,v),prior=vertexTargets.get(v);if(prior!==undefined&&prior!==target)return false;}
    assignments.set(info.edgeIndex,sideIndex);vertexTargets.set(info.edge.a,side.aTarget);vertexTargets.set(info.edge.b,side.bTarget);remaining.delete(info.edgeIndex);return true;
  };
  const grow=rootIndex=>{
    const root=byIndex.get(rootIndex);if(!root||!assign(root,positive?0:1))return false;
    let changed=true;
    while(changed){changed=false;for(const edgeIndex of[...remaining]){const info=byIndex.get(edgeIndex),shared=[info.edge.a,info.edge.b].filter(v=>vertexTargets.has(v));if(!shared.length)continue;const candidates=info.sides.map((side,sideIndex)=>({side,sideIndex})).filter(c=>shared.every(v=>sideTarget(info,c.side,v)===vertexTargets.get(v)));if(candidates.length!==1||!assign(info,candidates[0].sideIndex))return false;changed=true;}}
    return true;
  };
  while(remaining.size){if(!grow(remaining.values().next().value))return null;}
  return{assignments,vertexTargets};
}
function applyExact(){
  const m=mesh(),ids=selectedEdges(),raw=Number(input.value);if(!m||!ids.length){readout.textContent='Select a slide-compatible edge or edge set first';return;}if(!Number.isFinite(raw)||input.value.trim()===''){readout.textContent='Enter a signed slide percentage';return;}if(Math.abs(raw)<1e-6){readout.textContent='Enter a non-zero slide percentage';return;}
  const percent=Math.max(-98,Math.min(98,raw)),infos=ids.map(i=>sideTargets(m,i));if(infos.some(x=>!x)){readout.textContent='Selected edges are not compatible with Edge Slide';return;}
  const solved=solveAssignments(infos,percent>0);if(!solved){readout.textContent='Selected edges do not form a compatible slide set';return;}
  const before=m.clone(),t=Math.abs(percent)/100;globalThis.__boxlabHistory?.push(before);
  for(const[vertex,target]of solved.vertexTargets)m.vertices[vertex].copy(before.vertices[vertex]).lerp(before.vertices[target],t);
  render();bridge()?.set?.('edge',ids);
  const text=`Exact Edge Slide • ${percent>0?'+':''}${percent.toFixed(1)}%`;
  readout.textContent=text;if(status)status.textContent=text;
}
apply.addEventListener('click',applyExact);
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyExact();input.blur();}});

new MutationObserver(()=>{const text=status?.textContent||'',m=text.match(/(?:Multi Edge|Edge) Slide.*?([0-9]+)%/i);if(m)readout.textContent=`Live Edge Slide • ${Number(m[1]).toFixed(1)}%`;}).observe(status,{childList:true,characterData:true,subtree:true});

globalThis.__boxlabPrecisionEdgeSlide={version:'0.36.18.16',apply:value=>{input.value=String(value);applyExact();}};

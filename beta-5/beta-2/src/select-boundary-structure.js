import * as THREE from 'three';

// BoxLab v0.36.18.131 — non-destructive boundary-structure inspection.
// Classifies face-backed boundary edges (exactly one real adjacent face) into
// simple closed loops, simple open chains, malformed/branched components, and
// refines valid closed loops into planar vs warped hole candidates.
// Loose edges are deliberately excluded. Geometry/history are untouched.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function validOwners(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}

const group=document.createElement('div');
group.id='boundaryStructureSelectionGroup';
group.style.cssText='margin:4px 0 0';

const primaryRow=document.createElement('div');
primaryRow.className='outliner-actions';
primaryRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 4px';

const holeRow=document.createElement('div');
holeRow.className='outliner-actions';
holeRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 4px';

const malformedRow=document.createElement('div');
malformedRow.className='outliner-actions';
malformedRow.style.cssText='grid-template-columns:1fr;margin:0';

function makeButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 3px';
  return button;
}

const closedButton=makeButton('selectClosedBoundaryLoopsBtn','Closed Loops');
const openButton=makeButton('selectOpenBoundaryChainsBtn','Open Chains');
const planarHoleButton=makeButton('selectPlanarHoleLoopsBtn','Planar Holes');
const warpedHoleButton=makeButton('selectWarpedHoleLoopsBtn','Warped Holes');
const malformedButton=makeButton('selectMalformedBoundaryBtn','Malformed Boundary');
primaryRow.append(closedButton,openButton);
holeRow.append(planarHoleButton,warpedHoleButton);
malformedRow.append(malformedButton);
group.append(primaryRow,holeRow,malformedRow);

function place(){
  if(group.isConnected)return true;
  if(!edgeTools)return false;
  const classification=document.querySelector('#edgeClassificationSelectionGroup');
  if(classification?.parentElement===edgeTools){classification.insertAdjacentElement('afterend',group);return true;}
  const topologyLabel=[...edgeTools.querySelectorAll('.edge-section-label')].find(el=>el.textContent?.trim()==='Topology');
  if(topologyLabel?.parentElement){topologyLabel.insertAdjacentElement('beforebegin',group);return true;}
  edgeTools.appendChild(group);
  return true;
}

function componentPlanarity(m,component,edges){
  const vertices=[...new Set(component.flatMap(index=>{
    const edge=edges[index];
    return edge?[edge.a,edge.b]:[];
  }))].filter(index=>m.vertices?.[index]);
  if(vertices.length<3)return null;
  const pts=vertices.map(index=>m.vertices[index]);
  let a=null,b=null,c=null;
  outer:for(let i=0;i<pts.length-2;i++)for(let j=i+1;j<pts.length-1;j++)for(let k=j+1;k<pts.length;k++){
    const ab=pts[j].clone().sub(pts[i]);
    const ac=pts[k].clone().sub(pts[i]);
    if(ab.cross(ac).lengthSq()>1e-20){a=pts[i];b=pts[j];c=pts[k];break outer;}
  }
  if(!a||!b||!c)return null;
  const normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
  const box=new THREE.Box3();
  pts.forEach(point=>box.expandByPoint(point));
  const tolerance=Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
  let maxDeviation=0;
  pts.forEach(point=>{maxDeviation=Math.max(maxDeviation,Math.abs(point.clone().sub(a).dot(normal)));});
  return{planar:maxDeviation<=tolerance,maxDeviation,tolerance};
}

function inspect(m){
  if(!m)return{closed:[],open:[],planarHoles:[],warpedHoles:[],malformed:[],junctionVertices:[],closedComponents:0,openComponents:0,planarHoleComponents:0,warpedHoleComponents:0,malformedComponents:0};
  const edges=m.edges?.()||[];
  const boundary=[];
  edges.forEach((edge,index)=>{
    if(validOwners(m,edge).length===1)boundary.push({edge,index});
  });

  const byVertex=new Map();
  boundary.forEach(item=>{
    for(const vertex of [item.edge.a,item.edge.b]){
      if(!byVertex.has(vertex))byVertex.set(vertex,[]);
      byVertex.get(vertex).push(item.index);
    }
  });

  const boundarySet=new Set(boundary.map(item=>item.index));
  const seen=new Set(),closed=[],open=[],planarHoles=[],warpedHoles=[],malformed=[],junctionVertices=[];
  let closedComponents=0,openComponents=0,planarHoleComponents=0,warpedHoleComponents=0,malformedComponents=0;

  for(const seed of boundarySet){
    if(seen.has(seed))continue;
    const queue=[seed],component=[];
    seen.add(seed);
    while(queue.length){
      const index=queue.shift(),edge=edges[index];
      if(!edge)continue;
      component.push(index);
      for(const vertex of [edge.a,edge.b]){
        for(const next of byVertex.get(vertex)||[]){
          if(!seen.has(next)){seen.add(next);queue.push(next);}
        }
      }
    }

    const degree=new Map();
    component.forEach(index=>{
      const edge=edges[index];if(!edge)return;
      degree.set(edge.a,(degree.get(edge.a)||0)+1);
      degree.set(edge.b,(degree.get(edge.b)||0)+1);
    });
    const degrees=[...degree.values()];
    const endCount=degrees.filter(value=>value===1).length;
    const allTwo=degrees.length>=3&&degrees.every(value=>value===2);
    const simpleOpen=endCount===2&&degrees.every(value=>value===1||value===2);

    if(allTwo){
      closed.push(...component);closedComponents++;
      const plane=componentPlanarity(m,component,edges);
      if(plane?.planar){planarHoles.push(...component);planarHoleComponents++;}
      else if(plane){warpedHoles.push(...component);warpedHoleComponents++;}
    }
    else if(simpleOpen){open.push(...component);openComponents++;}
    else{
      malformed.push(...component);malformedComponents++;
      degree.forEach((value,vertex)=>{if(value>2)junctionVertices.push(vertex);});
    }
  }

  return{
    closed:[...new Set(closed)].sort((a,b)=>a-b),
    open:[...new Set(open)].sort((a,b)=>a-b),
    planarHoles:[...new Set(planarHoles)].sort((a,b)=>a-b),
    warpedHoles:[...new Set(warpedHoles)].sort((a,b)=>a-b),
    malformed:[...new Set(malformed)].sort((a,b)=>a-b),
    junctionVertices:[...new Set(junctionVertices)].sort((a,b)=>a-b),
    closedComponents,openComponents,planarHoleComponents,warpedHoleComponents,malformedComponents
  };
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const indices=kind==='open'?info.open:kind==='planarHoles'?info.planarHoles:kind==='warpedHoles'?info.warpedHoles:kind==='malformed'?info.malformed:info.closed;
  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('edge',indices);
    render();
    if(status){
      const componentCount=kind==='open'?info.openComponents:kind==='planarHoles'?info.planarHoleComponents:kind==='warpedHoles'?info.warpedHoleComponents:kind==='malformed'?info.malformedComponents:info.closedComponents;
      const label=kind==='open'?'Open Boundary Chains':kind==='planarHoles'?'Planar Hole Loops':kind==='warpedHoles'?'Warped Hole Loops':kind==='malformed'?'Malformed Boundary':'Closed Boundary Loops';
      const extra=kind==='malformed'&&info.junctionVertices.length?` • ${info.junctionVertices.length} junction vert${info.junctionVertices.length===1?'':'s'}`:'';
      status.textContent=indices.length
        ?`${label} • ${componentCount} component${componentCount===1?'':'s'} • ${indices.length} edges selected${extra}`
        :`${label} • 0 found`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [closedButton,openButton,planarHoleButton,warpedHoleButton,malformedButton].forEach(button=>button.disabled=!m);
  closedButton.title=m
    ?`Select face-backed closed boundary loops • ${info.closedComponents} loop${info.closedComponents===1?'':'s'} • ${info.closed.length} edges`
    :'No editable mesh';
  openButton.title=m
    ?`Select face-backed open boundary chains • ${info.openComponents} chain${info.openComponents===1?'':'s'} • ${info.open.length} edges`
    :'No editable mesh';
  planarHoleButton.title=m
    ?`Select planar closed boundary loops suitable for direct hole filling • ${info.planarHoleComponents} loop${info.planarHoleComponents===1?'':'s'} • ${info.planarHoles.length} edges`
    :'No editable mesh';
  warpedHoleButton.title=m
    ?`Select non-planar closed boundary loops that need a triangulate/project strategy • ${info.warpedHoleComponents} loop${info.warpedHoleComponents===1?'':'s'} • ${info.warpedHoles.length} edges`
    :'No editable mesh';
  malformedButton.title=m
    ?`Select branched or malformed face-backed boundary components • ${info.malformedComponents} component${info.malformedComponents===1?'':'s'} • ${info.malformed.length} edges • ${info.junctionVertices.length} junction verts`
    :'No editable mesh';
}

closedButton.addEventListener('click',()=>apply('closed'));
openButton.addEventListener('click',()=>apply('open'));
planarHoleButton.addEventListener('click',()=>apply('planarHoles'));
warpedHoleButton.addEventListener('click',()=>apply('warpedHoles'));
malformedButton.addEventListener('click',()=>apply('malformed'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectBoundaryStructure={version:'0.36.18.131',inspect,apply,sync};

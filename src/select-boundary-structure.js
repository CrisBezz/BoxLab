// BoxLab v0.36.18.130 — non-destructive boundary-structure inspection.
// Classifies face-backed boundary edges (exactly one real adjacent face) into
// simple closed loops, simple open chains, and malformed/branched components.
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
const malformedButton=makeButton('selectMalformedBoundaryBtn','Malformed Boundary');
primaryRow.append(closedButton,openButton);
malformedRow.append(malformedButton);
group.append(primaryRow,malformedRow);

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

function inspect(m){
  if(!m)return{closed:[],open:[],malformed:[],junctionVertices:[],closedComponents:0,openComponents:0,malformedComponents:0};
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
  const seen=new Set(),closed=[],open=[],malformed=[],junctionVertices=[];
  let closedComponents=0,openComponents=0,malformedComponents=0;

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

    if(allTwo){closed.push(...component);closedComponents++;}
    else if(simpleOpen){open.push(...component);openComponents++;}
    else{
      malformed.push(...component);malformedComponents++;
      degree.forEach((value,vertex)=>{if(value>2)junctionVertices.push(vertex);});
    }
  }

  return{
    closed:[...new Set(closed)].sort((a,b)=>a-b),
    open:[...new Set(open)].sort((a,b)=>a-b),
    malformed:[...new Set(malformed)].sort((a,b)=>a-b),
    junctionVertices:[...new Set(junctionVertices)].sort((a,b)=>a-b),
    closedComponents,openComponents,malformedComponents
  };
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const indices=kind==='open'?info.open:kind==='malformed'?info.malformed:info.closed;
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
      const componentCount=kind==='open'?info.openComponents:kind==='malformed'?info.malformedComponents:info.closedComponents;
      const label=kind==='open'?'Open Boundary Chains':kind==='malformed'?'Malformed Boundary':'Closed Boundary Loops';
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
  closedButton.disabled=!m;
  openButton.disabled=!m;
  malformedButton.disabled=!m;
  closedButton.title=m
    ?`Select face-backed closed boundary loops • ${info.closedComponents} loop${info.closedComponents===1?'':'s'} • ${info.closed.length} edges`
    :'No editable mesh';
  openButton.title=m
    ?`Select face-backed open boundary chains • ${info.openComponents} chain${info.openComponents===1?'':'s'} • ${info.open.length} edges`
    :'No editable mesh';
  malformedButton.title=m
    ?`Select branched or malformed face-backed boundary components • ${info.malformedComponents} component${info.malformedComponents===1?'':'s'} • ${info.malformed.length} edges • ${info.junctionVertices.length} junction verts`
    :'No editable mesh';
}

closedButton.addEventListener('click',()=>apply('closed'));
openButton.addEventListener('click',()=>apply('open'));
malformedButton.addEventListener('click',()=>apply('malformed'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectBoundaryStructure={version:'0.36.18.130',inspect,apply,sync};

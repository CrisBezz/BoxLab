// BoxLab v0.36.18.135 — non-destructive Merge by Distance inspection.
// Selects nearby regular-mesh vertex clusters only when the existing
// Merge by Distance planner confirms that cluster is safe to weld.
// Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function planner(){return globalThis.__boxlabMergeByDistance?.plan||null;}
function tolerance(){const input=document.querySelector('#mergeByDistanceValue');const value=Number(input?.value);return Number.isFinite(value)&&value>0?value:null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='mergeableVertexSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin:4px 0 0';

const button=document.createElement('button');
button.id='selectMergeableVerticesBtn';
button.type='button';
button.textContent='Mergeable Verts';
button.disabled=true;
button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 3px';
row.append(button);

function place(){
  if(row.isConnected)return true;
  if(!vertexTools)return false;
  const cleanable=document.querySelector('#cleanableVertexSelectionRow');
  if(cleanable?.parentElement===vertexTools){cleanable.insertAdjacentElement('afterend',row);return true;}
  const valence=document.querySelector('#vertexValenceSelectionGroup');
  if(valence?.parentElement===vertexTools){valence.insertAdjacentElement('afterend',row);return true;}
  vertexTools.appendChild(row);
  return true;
}

function candidateVertices(m){
  const used=new Set();
  for(const face of m?.faces||[])if(Array.isArray(face))for(const v of face)if(Number.isInteger(v)&&m.vertices?.[v])used.add(v);
  return [...used].sort((a,b)=>a-b);
}

function proximityClusters(m,ids,tol){
  const parent=new Map(ids.map(v=>[v,v]));
  const find=v=>{let p=parent.get(v);while(p!==parent.get(p)){parent.set(p,parent.get(parent.get(p)));p=parent.get(p);}return p;};
  const unite=(a,b)=>{a=find(a);b=find(b);if(a===b)return;parent.set(Math.max(a,b),Math.min(a,b));};
  for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++)if(m.vertices[ids[i]].distanceTo(m.vertices[ids[j]])<=tol)unite(ids[i],ids[j]);
  const groups=new Map();
  for(const v of ids){const root=find(v);if(!groups.has(root))groups.set(root,[]);groups.get(root).push(v);}
  return [...groups.values()].filter(group=>group.length>1);
}

function inspect(m){
  const plan=planner(),tol=tolerance();
  if(!m||!plan||!tol)return{indices:[],clusters:[],rejected:0,tolerance:tol};
  const groups=proximityClusters(m,candidateVertices(m),tol),safe=[];
  let rejected=0;
  for(const group of groups){
    const result=plan(m,group,tol);
    if(result?.ok)safe.push(group);
    else rejected++;
  }
  return{indices:[...new Set(safe.flat())].sort((a,b)=>a-b),clusters:safe,rejected,tolerance:tol};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('vertex',info.indices);
    render();
    if(status)status.textContent=info.indices.length
      ?`Mergeable Verts • ${info.indices.length} verts in ${info.clusters.length} safe cluster${info.clusters.length===1?'':'s'} selected`
      :`Mergeable Verts • 0 safe clusters${info.rejected?` • ${info.rejected} rejected`:''}`;
  });
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.135';
  document.title='BoxLab v0.36.18.135';
}

function sync(){
  place();
  const m=mesh(),plan=planner(),tol=tolerance();
  button.disabled=!m||!plan||!tol;
  button.title=!m?'No editable mesh':!plan?'Merge by Distance planner unavailable':!tol?'Set Merge Dist above 0':`Select vertex clusters safely mergeable at distance ${tol}`;
}

button.addEventListener('click',apply);
document.querySelector('#mergeByDistanceValue')?.addEventListener('input',sync);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectMergeableVerts={version:'0.36.18.135',inspect,apply,sync};

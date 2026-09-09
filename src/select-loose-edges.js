// BoxLab v0.36.18.75 — non-destructive Edge topology inspection, grouped UI.
const status=document.querySelector('#selectionStatus');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const multiToggle=document.querySelector('#multiSelectToggle');
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function realFaces(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
const button=document.createElement('button');button.id='selectLooseEdgesBtn';button.type='button';button.textContent='Select Loose Edges';button.style.minWidth='0';
function place(){const row=document.querySelector('#edgeInspectionRow')||document.querySelector('#selectNonManifoldBtn')?.parentElement;if(row){row.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(button.parentElement!==row)row.appendChild(button);return true;}if(!button.isConnected&&edgeTools){const host=document.createElement('div');host.className='outliner-actions';host.style.gridTemplateColumns='1fr';host.appendChild(button);edgeTools.appendChild(host);}return false;}
function inspect(m){if(!m)return{indices:[],count:0};const indices=[];m.edges().forEach((edge,index)=>{if(edge?.loose||realFaces(m,edge).length===0)indices.push(index);});return{indices,count:indices.length};}
function apply(){const m=mesh();if(!m)return;const info=inspect(m);const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();queueMicrotask(()=>{if(multiToggle){const wanted=info.indices.length>1;if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}}bridge()?.set?.('edge',info.indices);render();if(status)status.textContent=info.count?`Loose Edges • ${info.count} edge${info.count===1?'':'s'} selected`:'Topology check • 0 loose edges';});}
function sync(){place();const m=mesh();button.disabled=!m;if(!m){button.title='No editable mesh';return;}const info=inspect(m);button.title=info.count?`Select ${info.count} loose/wire edge${info.count===1?'':'s'}`:'No loose edges found';}
button.addEventListener('click',apply);window.addEventListener('boxlab-bridge-state',sync);document.addEventListener('pointerup',()=>queueMicrotask(sync),true);[0,40,120,300].forEach(delay=>setTimeout(sync,delay));
globalThis.__boxlabSelectLooseEdges={version:'0.36.18.75',inspect,apply};

// BoxLab v0.36.18.20 — predictable Vertex / Edge / Face selection conversion.
// Captures the source component selection before the existing mode switch,
// then replaces any legacy carry-over with an explicit topology conversion.

const modes=document.querySelector('#selectionModes');
const multiToggle=document.querySelector('#multiSelectToggle');
const status=document.querySelector('#selectionStatus');
let pending=null;

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function unique(values){return [...new Set(values||[])].filter(Number.isInteger);}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

function convert(mesh,from,to,source){
  if(!mesh||!['vertex','edge','face'].includes(from)||!['vertex','edge','face'].includes(to))return null;
  if(from===to)return [...source];
  const sourceSet=new Set(source),edges=mesh.edges();
  const edgeIndexByKey=new Map(edges.map((e,i)=>[key(e.a,e.b),i]));

  if(from==='face'){
    const vertices=new Set(),edgeIds=new Set();
    for(const fi of source){
      const face=mesh.faces[fi];if(!Array.isArray(face))continue;
      face.forEach(v=>vertices.add(v));
      for(let i=0;i<face.length;i++){
        const ei=edgeIndexByKey.get(key(face[i],face[(i+1)%face.length]));
        if(Number.isInteger(ei))edgeIds.add(ei);
      }
    }
    return to==='vertex'?[...vertices]:[...edgeIds];
  }

  if(from==='edge'){
    if(to==='vertex'){
      const vertices=new Set();
      for(const ei of source){const e=edges[ei];if(e){vertices.add(e.a);vertices.add(e.b);}}
      return [...vertices];
    }
    // Up-conversion is conservative: select only faces whose complete boundary
    // is represented by the selected edge set.
    const faces=[];
    mesh.faces.forEach((face,fi)=>{
      if(!Array.isArray(face)||face.length<3)return;
      for(let i=0;i<face.length;i++){
        const ei=edgeIndexByKey.get(key(face[i],face[(i+1)%face.length]));
        if(!Number.isInteger(ei)||!sourceSet.has(ei))return;
      }
      faces.push(fi);
    });
    return faces;
  }

  if(from==='vertex'){
    if(to==='edge')return edges.flatMap((e,i)=>sourceSet.has(e.a)&&sourceSet.has(e.b)?[i]:[]);
    // Same conservative rule for Vertex -> Face: all face vertices must be selected.
    return mesh.faces.flatMap((face,fi)=>Array.isArray(face)&&face.length>=3&&face.every(v=>sourceSet.has(v))?[fi]:[]);
  }
  return [];
}

function enableMultiFor(result){
  if(!multiToggle||result.length<=1||multiToggle.checked)return;
  multiToggle.checked=true;
  multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
}

modes?.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-mode]');if(!button)return;
  const b=bridge(),from=b?.mode?.(),to=button.dataset.mode;
  if(!['vertex','edge','face'].includes(from)||!['vertex','edge','face'].includes(to)||from===to){pending=null;return;}
  pending={from,to,source:unique(b.indices?.()||[]),mesh:state()?.mesh||null};
},true);

modes?.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-mode]');if(!button||!pending)return;
  const snapshot=pending;pending=null;
  queueMicrotask(()=>{
    const b=bridge(),mesh=state()?.mesh;
    if(!b?.set||b.mode?.()!==snapshot.to||!mesh||mesh!==snapshot.mesh)return;
    const result=snapshot.source.length?convert(mesh,snapshot.from,snapshot.to,snapshot.source):[];
    if(!result)return;
    b.set(snapshot.to,result);
    enableMultiFor(result);
    render();
    if(status){
      const from=snapshot.from[0].toUpperCase()+snapshot.from.slice(1),to=snapshot.to[0].toUpperCase()+snapshot.to.slice(1);
      status.textContent=result.length?`${from} → ${to} • ${snapshot.source.length} → ${result.length} selected`:`${from} → ${to} • no fully matching ${snapshot.to}s`;
    }
  });
});

globalThis.__boxlabSelectionConversionPolish={version:'0.36.18.20',convert};

const canvas=document.querySelector('#viewport');
const TAP=8;
let press=null;

function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function ids(){return [...new Set(bridge()?.indices?.()||[])].sort((a,b)=>a-b);}
function same(a,b){return a.length===b.length&&a.every((v,i)=>v===b[i]);}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active,#applyCreaseBtn.active,#addVertexBtn.active');}

canvas?.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||directToolActive())return;
  const m=mode();
  if(!['vertex','edge','face'].includes(m))return;
  press={id:e.pointerId,mode:m,before:ids(),x:e.clientX,y:e.clientY,moved:false};
},true);

canvas?.addEventListener('pointermove',e=>{
  if(!press||press.id!==e.pointerId)return;
  if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>=TAP)press.moved=true;
},true);

canvas?.addEventListener('pointerup',e=>{
  if(!press||press.id!==e.pointerId)return;
  const p=press;press=null;
  if(p.moved||Math.hypot(e.clientX-p.x,e.clientY-p.y)>=TAP)return;
  setTimeout(()=>{
    const b=bridge();
    if(!b||b.mode?.()!==p.mode||!p.before.length)return;
    const after=ids();
    if(!same(after,p.before))return;
    if(p.before.length===1)b.set(p.mode,[]);
  },0);
},true);

canvas?.addEventListener('pointercancel',e=>{if(press?.id===e.pointerId)press=null;},true);

// The existing puck owns its own tap. A drag/cancel must never finish selection.
export function bindDragSelectionPuck(puck,{input,ready,onFinish}){
 let press=null;
 const finish=(expected=null)=>{const anchor=ready();if(!input()?.dragFaces?.()||!anchor||(expected&&anchor!==expected))return;input().setDrag(false);onFinish(anchor);};
 puck?.addEventListener('pointerdown',event=>{
  if(!input()?.dragFaces?.())return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!event.isPrimary||event.button>0||!ready()){press=null;return;}
  press={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false,anchor:ready()};
  try{puck.setPointerCapture?.(event.pointerId);}catch{press=null;}
 });
 puck?.addEventListener('pointermove',event=>{
  if(!press||press.id!==event.pointerId)return;
  if(Math.hypot(event.clientX-press.x,event.clientY-press.y)>=8)press.moved=true;
  event.preventDefault();event.stopImmediatePropagation();
 });
 const end=event=>{
  if(!press||press.id!==event.pointerId)return;const p=press;press=null;
  event.preventDefault();event.stopImmediatePropagation();
  try{puck.releasePointerCapture?.(event.pointerId);}catch{}
  if(event.type==='pointerup'&&!p.moved&&Math.hypot(event.clientX-p.x,event.clientY-p.y)<8)finish(p.anchor);
 };
 for(const type of ['pointerup','pointercancel','lostpointercapture'])puck?.addEventListener(type,end);
 puck?.addEventListener('click',event=>{if(event.detail===0&&input()?.dragFaces?.()){event.preventDefault();finish();}});
}

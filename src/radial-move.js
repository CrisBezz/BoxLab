// Presentation offsets only. Geometry, transforms and selection remain with their owners.
export function bindRadialMove(handle,{active,mode,changed,window}){
 const offsets=new Map();let drag=null;
 const offset=key=>({...offsets.get(key)||{x:0,y:0}});
 const stop=e=>{e.preventDefault?.();e.stopImmediatePropagation?.();};
 function end(e,cancel=false){
  if(!drag||e.pointerId!==drag.id)return;stop(e);
  const previous=drag;drag=null;
  if(cancel)offsets.set(previous.mode,previous.offset);
  try{handle.releasePointerCapture?.(previous.id);}catch{}
  changed();
 }
 handle.addEventListener('pointerdown',e=>{
  if(!active()||drag||(e.button!==undefined&&e.button!==0))return;
  stop(e);const key=mode();drag={id:e.pointerId,mode:key,x:e.clientX,y:e.clientY,offset:offset(key)};
  try{handle.setPointerCapture?.(e.pointerId);}catch{}
 });
 window.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  if(!active()||mode()!==drag.mode){end(e,true);return;}
  stop(e);offsets.set(drag.mode,{x:drag.offset.x+e.clientX-drag.x,y:drag.offset.y+e.clientY-drag.y});changed();
 },{capture:true,passive:false});
 window.addEventListener('pointerup',e=>end(e),{capture:true,passive:false});
 window.addEventListener('pointercancel',e=>end(e,true),{capture:true,passive:false});
 handle.addEventListener('lostpointercapture',e=>end(e,true));
 handle.addEventListener('click',stop);
 return {offset};
}

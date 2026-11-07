// Called exclusively by main's existing touch/tap owner. No raw event listeners.
export function createThreeFingerCommands({controls,paint,light,allowed=()=>true}){
 let state=null;
 const center=touches=>{const a=Array.from(touches);return{x:a.reduce((n,t)=>n+t.clientX,0)/a.length,y:a.reduce((n,t)=>n+t.clientY,0)/a.length};};
 function end(cancel=false){
  if(!state)return;const s=state;state=null;
  if(s.axis==='size')s.painter?.endBrushResize?.(cancel);
  if(s.claimed)controls.enabled=s.enabled;
 }
 return{
  start(touches){
   if(state){if(touches.length>3){state.invalid=true;state.moved=true;}return;}
   if(touches.length!==3||!controls.enabled||!allowed())return;
   const p=paint(),c=center(touches);
   state={...c,axis:null,moved:false,enabled:controls.enabled,claimed:true,painter:p?.active?p:null};
   controls.stopSpin?.();controls.enabled=false;
  },
  move(touches){
   if(!state||touches.length!==3||state.invalid)return false;
   const p=center(touches),dx=p.x-state.x,dy=p.y-state.y;
   if(!state.axis){
    if(Math.hypot(dx,dy)<=12)return false;
    state.moved=true;
    if(Math.abs(dx)>=Math.abs(dy)){
     const l=light();if(!l?.setAngle){state.invalid=true;return true;}
     state.axis='light';state.light=l;state.angle=l.angle;
    }else if(state.painter?.beginBrushResize?.())state.axis='size';
    else{state.invalid=true;return true;}
   }
   if(state.axis==='light'){
    const angle=((state.angle+dx*.5+180)%360+360)%360-180;
    state.light.setAngle(angle);
   }else state.painter.updateBrushResize(dy);
   return true;
  },
  release(touches,cancel=false){const moved=!!state?.moved;if(!touches.length||cancel)end(cancel);return moved;},
  cancel(){end(true);},
  get active(){return !!state;}
 };
}

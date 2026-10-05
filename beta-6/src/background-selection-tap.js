// Receives confirmed taps from existing gesture owners; owns no pointer listeners.
export function createBackgroundSelectionTap({now=()=>performance.now(),delay=500,radius=32,trace=()=>{}}={}){
 let previous=null;
 return {
  reset(reason='cancel'){if(previous)trace({action:'reset',reason});previous=null;},
  tap(point,{context,mesh=null,read,clear,invert}){
   const time=Number.isFinite(point.timeStamp)?point.timeStamp:now(),seed=read();
   const same=previous&&previous.context===context&&previous.mesh===mesh&&time>=previous.time&&time-previous.time<=delay&&Math.hypot(point.clientX-previous.x,point.clientY-previous.y)<=radius&&JSON.stringify(seed)===previous.after;
   const dt=previous?Math.round(time-previous.time):null,px=previous?Math.hypot(point.clientX-previous.x,point.clientY-previous.y):null;
   const reason=!previous?'first':previous.context!==context?'context':previous.mesh!==mesh?'mesh':time<previous.time||time-previous.time>delay?'time':px>radius?'distance':JSON.stringify(seed)!==previous.after?'selection':'match';
   trace({action:same?'invert':'clear',reason,dt,px:px===null?null:Math.round(px),seed:previous?.seed?.length??seed.length,current:seed.length});
   if(same){const before=previous.seed;previous=null;invert(before);return 'invert';}
   clear();previous={context,mesh,time,x:point.clientX,y:point.clientY,seed,after:JSON.stringify(read())};return 'clear';
  }
 };
}

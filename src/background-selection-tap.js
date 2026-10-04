// Receives confirmed taps from existing gesture owners; owns no pointer listeners.
export function createBackgroundSelectionTap({now=()=>performance.now(),delay=500,radius=32}={}){
 let previous=null;
 return {
  reset(){previous=null;},
  tap(point,{context,mesh=null,read,clear,invert}){
   const time=Number.isFinite(point.timeStamp)?point.timeStamp:now(),seed=read();
   const same=previous&&previous.context===context&&previous.mesh===mesh&&time>=previous.time&&time-previous.time<=delay&&Math.hypot(point.clientX-previous.x,point.clientY-previous.y)<=radius&&JSON.stringify(seed)===previous.after;
   if(same){const before=previous.seed;previous=null;invert(before);return 'invert';}
   clear();previous={context,mesh,time,x:point.clientX,y:point.clientY,seed,after:JSON.stringify(read())};return 'clear';
  }
 };
}

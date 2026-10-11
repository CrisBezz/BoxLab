// Scheduling only; geometry and history belong to the editable Boolean controller.
export function createLiveBooleanPreview({read,update,result=()=>{},setTimer=setTimeout,clearTimer=clearTimeout,delay=150}){
  let timer=null,session=null,attempted=null,generation=0;
  function stop(){if(timer!==null)clearTimer(timer);timer=null;session=null;attempted=null;generation++;}
  function notify(){
    const current=read();
    if(!current?.signature){stop();return;}
    if(current.session!==session){stop();session=current.session;}
    if(current.signature===attempted||current.signature===current.previewSignature){if(timer!==null)clearTimer(timer);timer=null;return;}
    // Keep the first deadline rather than restarting it on every drag frame.
    if(timer!==null)return;
    const epoch=generation;
    timer=setTimer(()=>{
      if(epoch!==generation)return;timer=null;
      const latest=read();if(!latest?.signature||latest.session!==session)return;
      if(latest.signature===attempted||latest.signature===latest.previewSignature)return;
      attempted=latest.signature;
      const value=update();
      if(epoch===generation&&read()?.session===session)result(value);
    },delay);
  }
  return{notify,stop};
}

import { EditableMesh } from './mesh.js?v=0.12';

// BoxLab v0.36.18.180 — Loop Cut availability feedback.
// Diagnostic/UI only: preserves the final installed Loop Cut implementation and
// reports when that implementation legitimately has no continuous quad path.
const VERSION='0.36.18.180';
const MESSAGE='Loop Cut unavailable • no continuous quad path from this edge';
let installed=false;

function showUnavailable(){
  const status=document.querySelector('#selectionStatus');
  if(status)status.textContent=MESSAGE;
}

function install(){
  if(installed)return true;
  if(!globalThis.__boxlabAddedVertexLoopPromotion)return false;
  const proto=EditableMesh.prototype;
  if(proto.__boxlabLoopCutFeedback===VERSION){installed=true;return true;}
  const loopCut=proto.loopCut;
  const loopCuts=proto.loopCuts;
  if(typeof loopCut!=='function'||typeof loopCuts!=='function')return false;
  proto.loopCut=function(...args){
    const result=loopCut.apply(this,args);
    if(!result)showUnavailable();
    return result;
  };
  proto.loopCuts=function(...args){
    const result=loopCuts.apply(this,args);
    if(!result)showUnavailable();
    return result;
  };
  proto.__boxlabLoopCutFeedback=VERSION;
  installed=true;
  globalThis.__boxlabLoopCutFeedback={version:VERSION,message:MESSAGE};
  return true;
}

if(!install()){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(install()||attempts>=50)clearInterval(timer);
  },100);
}

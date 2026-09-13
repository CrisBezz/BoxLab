// BoxLab release version owner.
// This is the sole runtime owner of the visible app release number and document title.
const VERSION='0.36.18.178';
const label=document.querySelector('#appVersion');
globalThis.__boxlabReleaseVersionObserver?.disconnect?.();
function stamp(){
  if(label&&label.textContent!==`v${VERSION}`)label.textContent=`v${VERSION}`;
  const title=`BoxLab v${VERSION}`;
  if(document.title!==title)document.title=title;
}
stamp();
if(label){
  const observer=new MutationObserver(stamp);
  observer.observe(label,{childList:true,characterData:true,subtree:true});
  globalThis.__boxlabReleaseVersionObserver=observer;
}
window.addEventListener('pageshow',stamp);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)stamp();});
globalThis.__boxlabReleaseVersion={version:VERSION,stamp};

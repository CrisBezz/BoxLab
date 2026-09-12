// BoxLab release version owner.
// Feature modules must not control the visible app release number.
const VERSION='0.36.18.148';
const label=document.querySelector('#appVersion');
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
[0,50,150,400,900,1800,3000].forEach(delay=>setTimeout(stamp,delay));
globalThis.__boxlabReleaseVersion={version:VERSION,stamp};

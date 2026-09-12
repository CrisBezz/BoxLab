// BoxLab release version owner.
// This is the sole runtime owner of the visible app release number and document title.
const VERSION='0.36.18.154';
const label=document.querySelector('#appVersion');
function stamp(){
  if(label&&label.textContent!==`v${VERSION}`)label.textContent=`v${VERSION}`;
  const title=`BoxLab v${VERSION}`;
  if(document.title!==title)document.title=title;
}
stamp();
window.addEventListener('pageshow',stamp);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)stamp();});
globalThis.__boxlabReleaseVersion={version:VERSION,stamp};

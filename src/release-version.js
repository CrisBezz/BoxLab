// BoxLab release version owner.
// version.json announces available releases; only the loaded shell identifies
// running code. Returning to an old tab must never advertise unexecuted code.
const label=document.querySelector('#appVersion');
const SHELL_VERSION=String(globalThis.__boxlabLoadedShellVersion||label?.dataset?.releaseVersion||'').trim();
let VERSION=(SHELL_VERSION||document.title.match(/BoxLab\s+v([^\s]+)/i)?.[1]||label?.textContent?.replace(/^v/,'')||'').trim();
let LATEST_VERSION=null;

globalThis.__boxlabReleaseVersionObserver?.disconnect?.();

function stamp(){
  const next=String(SHELL_VERSION||VERSION||'').trim();
  if(!next)return;
  VERSION=next;
  if(label&&label.textContent!==`v${VERSION}`)label.textContent=`v${VERSION}`;
  if(label&&label.dataset.releaseVersion!==VERSION)label.dataset.releaseVersion=VERSION;
  const title=`BoxLab v${VERSION}`;
  if(document.title!==title)document.title=title;
  globalThis.__boxlabReleaseVersion={version:VERSION,latest:LATEST_VERSION,stamp,refresh};
}

async function refresh(){
  try{
    const url=new URL('../version.json',import.meta.url);
    url.searchParams.set('_',String(Date.now()));
    const response=await fetch(url,{cache:'no-store',credentials:'same-origin'});
    if(!response.ok)throw new Error(`release manifest ${response.status}`);
    const data=await response.json();
    const latest=String(data?.version||'').trim();
    if(latest)LATEST_VERSION=latest;
    stamp(SHELL_VERSION||VERSION);
  }catch(error){
    console.warn('BoxLab release version check failed',error);
    stamp(SHELL_VERSION||VERSION);
  }
}

stamp(SHELL_VERSION||VERSION);
if(label){
  const observer=new MutationObserver(()=>stamp());
  observer.observe(label,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['data-release-version']});
  globalThis.__boxlabReleaseVersionObserver=observer;
}
window.addEventListener('pageshow',()=>refresh());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
refresh();

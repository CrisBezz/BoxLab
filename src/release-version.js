// BoxLab release version owner.
// version.json is the single source of truth for the visible app release number and document title.
const label=document.querySelector('#appVersion');
let VERSION=(document.title.match(/BoxLab\s+v([^\s]+)/i)?.[1]||label?.textContent?.replace(/^v/,'')||'').trim();

globalThis.__boxlabReleaseVersionObserver?.disconnect?.();

function stamp(version=VERSION){
  const next=String(version||'').trim();
  if(!next)return;
  VERSION=next;
  if(label&&label.textContent!==`v${VERSION}`)label.textContent=`v${VERSION}`;
  const title=`BoxLab v${VERSION}`;
  if(document.title!==title)document.title=title;
  globalThis.__boxlabReleaseVersion={version:VERSION,stamp,refresh};
}

async function refresh(){
  try{
    const url=new URL('../version.json',import.meta.url);
    url.searchParams.set('_',String(Date.now()));
    const response=await fetch(url,{cache:'no-store',credentials:'same-origin'});
    if(!response.ok)throw new Error(`release manifest ${response.status}`);
    const data=await response.json();
    const latest=String(data?.version||'').trim();
    if(latest)stamp(latest);
  }catch(error){
    console.warn('BoxLab release version check failed',error);
    stamp();
  }
}

stamp();
if(label){
  const observer=new MutationObserver(()=>stamp());
  observer.observe(label,{childList:true,characterData:true,subtree:true});
  globalThis.__boxlabReleaseVersionObserver=observer;
}
window.addEventListener('pageshow',()=>refresh());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
refresh();

// BoxLab build freshness guard — v0.36.19.2.1
// GitHub Pages/browser caches can briefly serve an older shell on a normal refresh.
// A cache-busted build manifest lets a successfully loaded current shell self-heal
// on subsequent visits without a service worker.

const CURRENT='0.36.19.2.1';

async function check(){
  try{
    const response=await fetch(`./build.json?_=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)return;
    const data=await response.json();
    const latest=String(data?.version||'').trim();
    if(!latest||latest===CURRENT)return;
    const url=new URL(location.href);
    if(url.searchParams.get('_boxlab')===latest)return;
    url.searchParams.set('_boxlab',latest);
    location.replace(url.href);
  }catch{}
}

check();

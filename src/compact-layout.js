/* .1012 — explicit narrow-pane layout choice. Presentation only; original owners. */
(()=>{
  const key='boxlab.compact-layout.v1',html=document.documentElement;
  let requested=false,active=false;
  try{requested=sessionStorage.getItem(key)==='1';}catch{}
  const button=document.querySelector('#continueCompactView');
  function sync(){
    active=requested&&(innerWidth<=760||(innerWidth<=900&&innerHeight>innerWidth));
    html.classList.toggle('boxlab-compact-ui',active);
  }
  function choose(){
    requested=true;
    try{sessionStorage.setItem(key,'1');}catch{}
    sync();
  }
  // Use the same nodes, labels, routing text and icon artwork. Late Paint controls
  // get compact coordinates without overwriting their normal inline positions.
  function decorate(node){
    if(node.nodeType!==1)return;
    const selector='.tg-tool-sector,#boxlabPaintRadial button';
    const buttons=[...(node.matches?.(selector)?[node]:[]),...node.querySelectorAll(selector)];
    for(const item of buttons){
      const label=item.getAttribute('aria-label')||item.textContent.trim();
      if(!item.hasAttribute('aria-label'))item.setAttribute('aria-label',label);
      if(!item.hasAttribute('title'))item.setAttribute('title',label);
      if(item.closest('#boxlabPaintRadial')){
        const x=parseFloat(item.style.left),y=parseFloat(item.style.top);
        if(Number.isFinite(x)&&Number.isFinite(y)){
          item.style.setProperty('--compact-x',`${146+(x-175)*.8}px`);
          item.style.setProperty('--compact-y',`${146+(y-175)*.8}px`);
        }
      }
    }
  }
  const observer=new MutationObserver(records=>{
    for(const record of records)for(const node of record.addedNodes)decorate(node);
  });
  function observe(){observer.observe(document.body,{childList:true,subtree:true});}
  function restore(){sync();decorate(document.body);observe();}
  button?.addEventListener('click',choose);
  window.addEventListener('resize',sync);
  window.addEventListener('orientationchange',sync);
  window.addEventListener('pageshow',restore);
  window.addEventListener('pagehide',()=>observer.disconnect());
  function placeRadial(left,top,width,height){
    const radius=Math.max(70,Math.min(230,(width-68)/2,(height-160)/2));
    const halfWidth=width<=400?104:radius+26,halfHeight=width<=400?164:radius+26;
    const fit=(value,half,extent,reserve)=>Math.max(half+8,Math.min(value,extent-half-reserve));
    return{left:fit(left,halfWidth,width,8),top:fit(top,halfHeight,height,80),radius};
  }
  globalThis.__boxlabCompactLayout={get active(){return active;},placeRadial};
  restore();
})();

// One coalesced sizing owner; no synthetic resize events or per-frame polling.
export function bindViewportSizing({element,resize,win=window,doc=win.document,Observer=globalThis.ResizeObserver}){
 let frame=null,settle=null,last='',force=false;
 const size=()=>[element.clientWidth,element.clientHeight,Math.min(win.devicePixelRatio||1,2)];
 function apply(){frame=null;const [w,h,dpr]=size();if(w<=0||h<=0||![w,h,dpr].every(Number.isFinite))return;const key=[w,h,dpr].join(':');if(force||key!==last){force=false;last=key;resize(w,h,dpr);}}
 function schedule(repaint=false){force=force||repaint;if(frame===null)frame=win.requestAnimationFrame(apply);}
 const changed=()=>schedule(),repaint=()=>schedule(true);
 const visible=()=>{if(doc?.visibilityState!=='hidden')repaint();};
 const observer=Observer?new Observer(changed):null;observer?.observe(element);
 win.addEventListener('focus',visible);doc?.addEventListener('visibilitychange',visible);
 win.addEventListener('resize',repaint);win.addEventListener('orientationchange',repaint);win.addEventListener('pageshow',repaint);win.addEventListener('boxlab-tool-session-change',repaint);win.visualViewport?.addEventListener('resize',repaint);
 schedule(true);settle=win.requestAnimationFrame(()=>{settle=null;schedule(true);});
 return ()=>{if(frame!==null)win.cancelAnimationFrame(frame);if(settle!==null)win.cancelAnimationFrame(settle);observer?.disconnect();win.removeEventListener('focus',visible);doc?.removeEventListener('visibilitychange',visible);for(const name of ['resize','orientationchange','pageshow','boxlab-tool-session-change'])win.removeEventListener(name,repaint);win.visualViewport?.removeEventListener('resize',repaint);};
}

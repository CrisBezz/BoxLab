// BoxLab v0.36.18.187 — passive runtime guard.
// Diagnostic only: never changes geometry, selection, tool state, or UI.

const VERSION='0.36.18.187';

function protectedTransformLoaderOk(){
  return [...document.scripts].some(script=>{
    const src=script.getAttribute('src')||'';
    return src.endsWith('./src/multi-object-transform.js?v=0.36.1.0')||
      src.endsWith('/src/multi-object-transform.js?v=0.36.1.0');
  });
}

function run(){
  const live=globalThis.__boxlabLiveMeshBridge?.mesh?.()||null;
  const checks={
    release:globalThis.__boxlabReleaseVersion?.version===VERSION,
    liveMesh:!!live&&Array.isArray(live.vertices)&&Array.isArray(live.faces)&&typeof live.edges==='function',
    selectionBridge:typeof globalThis.__boxlabSelectionBridge?.indices==='function',
    history:typeof globalThis.__boxlabHistory?.push==='function',
    addVertex:typeof globalThis.__boxlabAddVertex?.isActive==='function',
    vertexSlide:typeof globalThis.__boxlabVertexSlidePolish?.isArmed==='function',
    addedVertexLoop:!!globalThis.__boxlabAddedVertexLoopPromotion,
    loopCutFeedback:globalThis.__boxlabLoopCutFeedback?.version===VERSION,
    protectedMultiTransform:protectedTransformLoaderOk()
  };
  const failures=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
  const result={version:VERSION,pass:failures.length===0,checks,failures,checkedAt:Date.now()};
  globalThis.__boxlabBetaRuntimeGuard.last=result;
  if(result.pass)console.info('BoxLab runtime guard: PASS',result);
  else console.warn('BoxLab runtime guard: FAIL',result);
  return result;
}

globalThis.__boxlabBetaRuntimeGuard={version:VERSION,last:null,run};
setTimeout(run,1400);
window.addEventListener('pageshow',()=>setTimeout(run,350));

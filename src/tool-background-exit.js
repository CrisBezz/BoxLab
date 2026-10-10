// Session policy only: main's existing window owner recognizes taps and movement.
// Empty-space input remains available to drawing/placement/cycle tools.
const entry=()=>{
 const g=globalThis;
 if(g.__boxlabEdgeViewportSession?.active?.())return {legacy:true};
 if(g.__boxlabFaceValueViewportSession?.active?.())return {legacy:true};
 if(g.__boxlabSlideViewportSession?.active?.())return {legacy:true};
 if(g.__boxlabBevelViewportSession?.edgeActive?.())return {legacy:true};
 if(g.__boxlabDirectBevel?.faceActive?.())return {busy:()=>g.__boxlabDirectBevel.busy?.(),exit:()=>g.__boxlabDirectBevel.cancelFaces?.()};
 const vertex=g.__boxlabVertexViewportSession;
 if(vertex?.active?.())return vertex.backgroundExitAllowed?.()?{exit:()=>vertex.close?.()}:null;
 for(const [name,method] of [
  ['__boxlabFaceAlignViewportSession','close'],['__boxlabFaceRepairViewportSession','close'],
  ['__boxlabKnifeViewportSession','close'],['__boxlabFaceBridgeViewportSession','cancel'],
  ['__boxlabBridgeViewportSession','close'],['__boxlabOffsetViewportSession','close'],['__boxlabCreaseViewportSession','close']
 ]){const api=g[name];if(api?.active?.())return {exit:()=>api[method]?.()};}
 if(g.__boxlabEdgeExtrude?.isArmed?.())return {busy:()=>g.__boxlabEdgeExtrude?.busy?.(),exit:()=>{g.__boxlabTotalGizmo?.setHubState?.('closed',{reason:'background-tool-exit'});g.__boxlabEdgeExtrudeViewportSession?.close?.();g.__boxlabEdgeExtrude.setArmed(false);}};
 const id=g.__boxlabToolSession?.current?.()?.id;
 const specs={solidify:['__boxlabSolidifyPreview','cancel'],shell:['__boxlabShell','cancel'],array:['__boxlabLinearArray','cancel'],boolean:['__boxlabBooleanToolSession','close'],'boolean-edit':['__boxlabEditableBoolean','cancel'],'mesh-health':['__boxlabMeshHealth','close']};
 const spec=specs[id];if(!spec)return null;
 const api=g[spec[0]];return {busy:()=>!!api?.dragging,exit:()=>api?.[spec[1]]?.()};
};
globalThis.__boxlabToolBackgroundExit={
 active:()=>!!entry(),
 ownsPoint:event=>(!!globalThis.__boxlabLinearArray?.active&&!!globalThis.__boxlabLinearArray?.ownsPoint?.(event))||!!globalThis.__boxlabVertexExtrude?.ownsPoint?.(event)||!!globalThis.__boxlabEdgeExtrude?.ownsPoint?.(event)
};
window.addEventListener('boxlab-viewport-background-tap',()=>{
 const route=entry();if(!route||route.legacy||route.busy?.()||globalThis.__boxlabMainDirectTool?.busy?.())return;
 route.exit?.();
});

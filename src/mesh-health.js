import {installFacegroupUVWorkflow} from './facegroup-uv-workflow.js?v=0.36.18.1004';
import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.443';
import {safeRepairMesh} from './mesh-health-repair-core.js?v=0.36.18.443';
import {autoCloseSimpleHoles,simpleBoundaryLoops} from './mesh-auto-close-core.js?v=0.36.18.443';
import {boundaryDiagnostics} from './mesh-boundary-diagnostics-core.js?v=0.36.18.443';
import {unifyFaceWinding,flipAllFaces,triangulateMesh} from './mesh-normals-triangulate-core.js?v=0.36.18.443';
import {inspectImportedUV} from './imported-uv-inspection.js?v=0.36.18.951';
import {stitchNativeUVEdge,cutNativeUVEdges,clearNativePaint,rotateImportedUV,flipImportedUV,moveImportedUV,scaleImportedUV,rotateImportedUVByAngle,fitImportedUVToTile,packImportedUVIslands,equalizeImportedUVDensity,createPlanarUV,createFaceAtlasUV,createCoplanarAtlasUV,createBoxUV,createCylinderUV,createSphereUV,createTorusUV} from './imported-uv-edit.js?v=0.36.18.1000';
import {createUVWorkspace} from './uv-workspace.js?v=0.36.18.1032';

// One-shot Edge action uses the original selected edge indices and native history.
const cutUVButton=document.createElement('button');
cutUVButton.id='cutUVEdgesBtn';cutUVButton.type='button';cutUVButton.textContent='Cut UVs';
cutUVButton.title='Split and repack existing UV islands along selected complete cuts; clear paint first';
document.querySelector('.mode-tools[data-mode-tools="edge"]')?.appendChild(cutUVButton);
cutUVButton.addEventListener('click',cutSelectedUVEdges);
const stitchUVButton=document.createElement('button');
stitchUVButton.id='stitchUVEdgeBtn';stitchUVButton.type='button';stitchUVButton.textContent='Stitch UVs';
stitchUVButton.title='Join two flat UV islands across one selected seam and repack; clear paint first';
document.querySelector('.mode-tools[data-mode-tools="edge"]')?.appendChild(stitchUVButton);
stitchUVButton.addEventListener('click',stitchSelectedUVEdge);
function cutSelectedUVEdges(){
 const selection=globalThis.__boxlabSelectionBridge;
 if(currentMode()!=='edge'||selection?.mode?.()!=='edge')return false;
 const object=activeObject(),mesh=liveMesh(),ids=selection.indices?.()||[];
 if(!object||!mesh||!ids.length){setStatus('Cut UVs • select mesh edges first');return false;}
 const edges=mesh.edges(),pairs=ids.map(id=>Number.isInteger(id)&&edges[id]?[edges[id].a,edges[id].b]:null);
 const result=cutNativeUVEdges(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,pairs);
 if(result.ok&&result.changed){
  manager()?.saveActive?.();
  globalThis.__boxlabBridgeState?.scene?.traverse(body=>{if(body.userData?.kind==='body')globalThis.__boxlabRenderModes?.apply?.(body);});
 }
 setStatus(result.ok?result.changed?`UVs cut + repacked • ${result.islandCount} islands • Undo to restore`:'Cut UVs • selected edges are already UV seams or mesh boundaries':`Cut UVs • ${result.reason}`);
 return result.ok;
}

function stitchSelectedUVEdge(){
 const selection=globalThis.__boxlabSelectionBridge;
 if(currentMode()!=='edge'||selection?.mode?.()!=='edge')return false;
 const object=activeObject(),mesh=liveMesh(),ids=selection.indices?.()||[];
 if(!object||!mesh||ids.length!==1){setStatus('Stitch UVs • select one shared edge between flat UV islands');return false;}
 const edges=mesh.edges(),edge=Number.isInteger(ids[0])?edges[ids[0]]:null;
 const result=stitchNativeUVEdge(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,edge?[edge.a,edge.b]:null);
 if(result.ok&&result.changed){
  manager()?.saveActive?.();
  globalThis.__boxlabBridgeState?.scene?.traverse(body=>{if(body.userData?.kind==='body')globalThis.__boxlabRenderModes?.apply?.(body);});
 }
 setStatus(result.ok?result.changed?`UVs stitched + repacked • ${result.islandCount} islands • Undo to restore`:'Stitch UVs • selected edge is already joined':`Stitch UVs • ${result.reason}`);
 return result.ok;
}

const VERSION='0.36.18.880';
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');

const launchRow=document.createElement('div');
launchRow.className='outliner-actions mesh-health-launch-row';
launchRow.style.gridTemplateColumns='repeat(2,1fr)';
launchRow.innerHTML='<button id="meshHealthBtn" type="button">Mesh Health</button><button id="uvToolsBtn" type="button">UV</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#meshHealthBtn');
const uvLaunchButton=launchRow.querySelector('#uvToolsBtn');
let uvOnly=false;
const sessionId=()=>uvOnly?'uv-tools':'mesh-health';

const panel=document.createElement('div');
panel.id='meshHealthSession';
panel.className='boxlab-tool-session-shell mesh-health-session';
panel.hidden=true;
panel.innerHTML=`
  <div id="uvToolsNotice" role="status" aria-live="polite" class="boxlab-tool-session-subtitle" style="grid-column:1/-1;color:#ffd38a" hidden></div>
  <div class="boxlab-tool-session-title"><span id="meshHealthTitle">Mesh Health</span><span id="meshHealthSubtitle" class="boxlab-tool-session-subtitle">Inspect · safe repair</span></div>
  <div id="meshHealthDiagnosticsSummary">
  <div id="meshHealthVerdict" style="font-size:16px;font-weight:750;padding:4px 0"></div>
  <div id="meshHealthSummary" class="boxlab-tool-session-subtitle"></div>
  </div>
  <details id="meshHealthUVDetails">
    <summary class="boxlab-tool-session-section">UVs</summary>
    <div id="meshHealthUVSummary" class="boxlab-tool-session-subtitle" aria-live="polite"></div>
    <label class="boxlab-tool-session-subtitle">Auto atlas join angle <input id="meshHealthUVAtlasAngle" type="number" min="0" max="30" step="1" value="15" style="width:54px" aria-label="Auto atlas maximum edge angle in degrees">° · 0 = flat; higher angles may stretch</label>
    <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)"><button id="meshHealthUVPlanarXY" type="button">Planar XY</button><button id="meshHealthUVPlanarXZ" type="button">Planar XZ</button><button id="meshHealthUVPlanarYZ" type="button">Planar YZ</button><button id="meshHealthUVCoplanarAtlas" type="button" title="Group connected faces within the join angle; up to 4096 faces. Clear paint first.">Auto atlas</button><button id="meshHealthUVFaceAtlas" type="button" title="One packed island per face; up to 4096 faces. Clear paint first.">Face atlas</button><button id="meshHealthUVBox" type="button">Box UVs</button><button id="meshHealthUVCylinder" type="button">Cylinder UVs (Y)</button><button id="meshHealthUVSphere" type="button" title="Round spheres with Y-axis vertex poles; replaces native UVs">Sphere UVs (Y)</button><button id="meshHealthUVTorus" type="button" title="Round upright Y-axis torus with regular quads; replaces native UVs">Torus UVs (Y)</button></div><div class="boxlab-tool-session-subtitle">Planar / Box / Cylinder: upright cylinders, cones, Revolves / round Sphere / Torus · Base meshes · replaces native UVs</div><div class="boxlab-tool-session-subtitle">Face atlas: one island per face, up to 4096 faces. Clear paint first. Curved faces may stretch. Auto atlas groups connected faces within the join angle; sharp bends remain seams. Packing is a single bounded pass. Both atlases: 20,000 corners maximum.</div>
    <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="meshHealthClearPaint" type="button">Clear paint</button><button id="meshHealthClearPaintUV" type="button">Clear paint + UVs</button></div>
    <div class="boxlab-tool-session-subtitle">Restart: removes all colour layers, images, AO, roughness and metalness paint. Keep UVs, or remove them and project again. Undo restores.</div>
    <button id="meshHealthUVOpen" type="button" disabled>Open UV Editor</button>
    <div id="meshHealthUVStorage" hidden>
    <canvas id="meshHealthUVPreview" width="256" height="200" role="img" aria-label="UV islands in different colours, orange seams, grey square marks UV tile zero to one" style="width:256px;max-width:100%;height:auto;margin:6px 0" hidden></canvas>
    <div id="meshHealthUVNote" class="boxlab-tool-session-subtitle"></div>
    <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
      <button id="meshHealthUVRotate" type="button" title="Rotate the complete imported UV layout around the tile centre; one Undo step" disabled>Rotate UVs 90°</button>
      <button id="meshHealthUVFlipU" type="button" title="Mirror the complete UV layout horizontally around the tile centre; one Undo step" disabled>Flip U</button>
      <button id="meshHealthUVFlipV" type="button" title="Mirror the complete UV layout vertically around the tile centre; one Undo step" disabled>Flip V</button>
    </div>
    </div>
  </details>
  <div id="meshHealthDiagnosticsTools">
  <div class="boxlab-tool-session-section">Topology</div>
  <div id="meshHealthTopology" style="display:grid;grid-template-columns:1fr auto;gap:4px 10px;font-size:11px"></div>
  <div class="boxlab-tool-session-section">Findings</div>
  <div id="meshHealthFindings" style="display:flex;flex-direction:column;gap:4px;font-size:11px"></div>
  <div class="boxlab-tool-session-section">Boundary diagnostics</div>
  <div id="meshHealthBoundarySummary" class="boxlab-tool-session-subtitle"></div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="meshHealthSelectBoundary" type="button">Select Boundary</button>
    <button id="meshHealthSelectNonManifold" type="button">Select Non-Manifold</button>
  </div>
  <div class="boxlab-tool-session-section">Normals / triangulation</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
    <button id="meshHealthUnifyWinding" type="button">Unify Winding</button>
    <button id="meshHealthFlipNormals" type="button">Flip Normals</button>
    <button id="meshHealthTriangulate" type="button">Triangulate</button>
  </div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="meshHealthRepair" type="button">Safe Repair</button>
    <button id="meshHealthAutoClose" type="button">Auto Close</button>
  </div>
  </div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="meshHealthRefresh" type="button">Refresh</button><button id="meshHealthClose" class="boxlab-tool-session-primary" type="button">Close</button></div>
`;
objectTools?.appendChild(panel);

const verdict=panel.querySelector('#meshHealthVerdict');
const summary=panel.querySelector('#meshHealthSummary');
const topology=panel.querySelector('#meshHealthTopology');
const findings=panel.querySelector('#meshHealthFindings');
const boundarySummary=panel.querySelector('#meshHealthBoundarySummary');
const refreshButton=panel.querySelector('#meshHealthRefresh');
const repairButton=panel.querySelector('#meshHealthRepair');
const autoCloseButton=panel.querySelector('#meshHealthAutoClose');
const selectBoundaryButton=panel.querySelector('#meshHealthSelectBoundary');
const selectNonManifoldButton=panel.querySelector('#meshHealthSelectNonManifold');
const unifyButton=panel.querySelector('#meshHealthUnifyWinding');
const flipNormalsButton=panel.querySelector('#meshHealthFlipNormals');
const triangulateButton=panel.querySelector('#meshHealthTriangulate');
const closeButton=panel.querySelector('#meshHealthClose');
const uvDetails=panel.querySelector('#meshHealthUVDetails');
const uvSummary=panel.querySelector('#meshHealthUVSummary');
const uvPreview=panel.querySelector('#meshHealthUVPreview');
const uvNote=panel.querySelector('#meshHealthUVNote');
const uvRotate=panel.querySelector('#meshHealthUVRotate');
const uvFlipU=panel.querySelector('#meshHealthUVFlipU');
const uvFlipV=panel.querySelector('#meshHealthUVFlipV');
const uvOpen=panel.querySelector('#meshHealthUVOpen');
const uvPlanar=['XY','XZ','YZ'].map(axis=>panel.querySelector('#meshHealthUVPlanar'+axis));
const uvFaceAtlas=panel.querySelector('#meshHealthUVFaceAtlas');
const uvCoplanarAtlas=panel.querySelector('#meshHealthUVCoplanarAtlas');
const uvAtlasAngle=panel.querySelector('#meshHealthUVAtlasAngle');
const uvBox=panel.querySelector('#meshHealthUVBox');
const uvCylinder=panel.querySelector('#meshHealthUVCylinder');
const uvSphere=panel.querySelector('#meshHealthUVSphere');
const uvTorus=panel.querySelector('#meshHealthUVTorus');
const clearPaint=panel.querySelector('#meshHealthClearPaint'),clearPaintUV=panel.querySelector('#meshHealthClearPaintUV');
let active=false,last=null,lastBoundary=null,objectId=null,uvWorkspace=null,uvMesh=null,uvPayload=null;

function renderUVReport(object,mesh){
 uvMesh=mesh;uvPayload=object?.glbPassthrough;
 const resetReady=object&&!object.locked&&object.kind!=='reference'&&!object.sourceId&&!object.booleanRecipe&&!object.arrayRecipe&&!object.curveProfile&&!object.materials&&!object.textures&&(!object.glbPassthrough||object.glbPassthrough.source==='boxlab')&&!!globalThis.__boxlabObjectHistory?.capture&&!!globalThis.__boxlabObjectHistory?.checkpointSnapshot;
 const hasPaint=!!(object?.colourPaint||object?.roughnessPaint||object?.metalnessPaint);
 clearPaint.disabled=!resetReady||!hasPaint;clearPaintUV.disabled=!resetReady||!hasPaint&&!object?.glbPassthrough;
 const nativeReady=object&&!object.locked&&object.kind!=='reference'&&!object.sourceId&&!object.booleanRecipe&&!object.arrayRecipe&&!object.curveProfile&&!object.materials&&!object.textures&&!object.settings?.subd&&!Object.values(object.settings?.mirror||{}).some(Boolean)&&(!object.glbPassthrough||object.glbPassthrough.source==='boxlab')&&!!globalThis.__boxlabObjectHistory?.capture&&!!globalThis.__boxlabObjectHistory?.checkpointSnapshot;
 for(const button of uvPlanar)button.disabled=!nativeReady;uvBox.disabled=uvCylinder.disabled=uvSphere.disabled=!nativeReady;uvTorus.disabled=!nativeReady;uvFaceAtlas.disabled=!nativeReady||hasPaint;uvCoplanarAtlas.disabled=!nativeReady||hasPaint;uvAtlasAngle.disabled=!nativeReady||hasPaint;
 const report=inspectImportedUV(mesh,object?.glbPassthrough,globalThis.__boxlabExportAs?.topologySignature);
 const messages={absent:'No UV channel on this mesh. Plain Base meshes can create planar UVs.',stale:'Stored UVs no longer match the current topology.',invalid:'Stored UV channel is incomplete or invalid.',unavailable:'UV inspection is not ready. Try Refresh.'};
 uvSummary.textContent=report.state==='ready'?`${report.mappedFaces} / ${report.faces} faces have UVs · ${report.islandCount} island${report.islandCount===1?'':'s'} · ${report.seamEdges} seam edge${report.seamEdges===1?'':'s'}${report.nonManifoldEdges?` · ${report.nonManifoldEdges} ambiguous edge${report.nonManifoldEdges===1?'':'s'}`:''}${report.missingFaces?` · ${report.missingFaces} missing`:''}${report.outsideCorners?` · ${report.outsideCorners} corners outside tile 0–1`:''}`:messages[report.state];
 uvPreview.hidden=report.state!=='ready';
 uvOpen.disabled=report.state!=='ready';
 uvRotate.disabled=report.state!=='ready'||report.missingFaces>0||report.mappedFaces!==report.faces||!object||object.locked||object.kind==='reference'||!!(object.sourceId||object.booleanRecipe||object.arrayRecipe||object.curveProfile)||object.glbPassthrough?.version!==1||!['glb','boxlab'].includes(object.glbPassthrough?.source)||!globalThis.__boxlabObjectHistory?.capture||!globalThis.__boxlabObjectHistory?.checkpointSnapshot;
 uvFlipU.disabled=uvFlipV.disabled=uvRotate.disabled;
 uvNote.textContent=report.state==='ready'?`${object?.glbPassthrough?.source==='boxlab'?'BoxLab native':'Imported base'} UVs · island colours · orange = seams · grey square = tile 0–1${report.nonManifoldEdges?' · ambiguous edges do not join islands':''}${report.previewFaces.length<report.mappedFaces?` · preview shows ${report.previewFaces.length} of ${report.mappedFaces} mapped faces`:''}`:report.state==='stale'?'Stored data is retained; this preview is hidden.':'Read-only inspection of imported UVs.';
 uvWorkspace?.setReport(report,`${object?.name||'UVs'} · ${uvSummary.textContent}`);
 return report;
}
function openUVEditor(){
 const object=activeObject();if(!active||currentMode()!=='object'||!object||object.id!==objectId)return false;
 uvWorkspace??=createUVWorkspace({canvas:uvPreview,note:uvNote,controls:uvRotate.parentElement,onDone:close,onTransform:transformUVs,getTransformContext:()=>({object:activeObject(),mesh:liveMesh(),payload:uvPayload}),canEdit:()=>!uvRotate.disabled,onHistory:action=>{
  document.querySelector(action==='redo'?'#redoBtn':'#undoBtn')?.click();
  queueMicrotask(()=>{if(active)renderReport();});
 }});
 if(!uvWorkspace)return false;
 renderReport();if(!uvWorkspace.open())return false;panel.hidden=true;toolSession()?.suspendSurface?.(sessionId());return true;
}
uvOpen.addEventListener('click',openUVEditor);
uvDetails.addEventListener('toggle',()=>{if(active&&uvDetails.open)renderUVReport(activeObject(),liveMesh());});
function resetPaint(clearUVs=false){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=clearNativePaint(object,mesh,globalThis.__boxlabObjectHistory,clearUVs);
 if(result.ok&&result.changed){
  manager()?.saveActive?.();
  globalThis.__boxlabBridgeState?.scene?.traverse(body=>{if(body.userData?.kind==='body')globalThis.__boxlabRenderModes?.apply?.(body);});
 }
 renderReport();setStatus(result.ok?result.changed?(clearUVs?'Paint + UVs cleared • choose a UV projection, then Paint • Undo to restore':'Paint cleared • UVs kept • open Paint to start again • Undo to restore'):'Nothing to clear':`Paint reset • ${result.reason}`);
 return result.ok;
}
clearPaint.addEventListener('click',()=>resetPaint());
clearPaintUV.addEventListener('click',()=>resetPaint(true));
function projectUVs(plane){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createPlanarUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,plane);
 renderReport();setStatus(result.ok?result.changed?'Planar UVs created • Undo to restore':'Planar UVs • no change needed':`Planar UVs • ${result.reason}`);
 return result.ok;
}
uvPlanar.forEach((button,i)=>button.addEventListener('click',()=>projectUVs(['xy','xz','yz'][i])));
function boxUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createBoxUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory);
 renderReport();setStatus(result.ok?result.changed?'Box UVs created • Undo to restore':'Box UVs • no change needed':`Box UVs • ${result.reason}`);
 return result.ok;
}
uvBox.addEventListener('click',boxUVs);
function faceAtlasUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createFaceAtlasUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,globalThis.__boxlabExportAs);
 renderReport();setStatus(result.ok?result.changed?'Face atlas created • one island per face • Undo to restore':'Face atlas • no change needed':`Face atlas • ${result.reason}`);
 return result.ok;
}
uvFaceAtlas.addEventListener('click',faceAtlasUVs);
function coplanarAtlasUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createCoplanarAtlasUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,globalThis.__boxlabExportAs,uvAtlasAngle.value.trim()===''?NaN:Number(uvAtlasAngle.value));
 renderReport();setStatus(result.ok?result.changed?'Auto atlas created • connected faces grouped by angle • Undo to restore':'Auto atlas • no change needed':`Auto atlas • ${result.reason}`);
 return result.ok;
}
uvCoplanarAtlas.addEventListener('click',coplanarAtlasUVs);

function cylinderUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createCylinderUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory);
 renderReport();setStatus(result.ok?result.changed?'Cylinder UVs created • Undo to restore':'Cylinder UVs • no change needed':`Cylinder UVs • ${result.reason}`);
 return result.ok;
}
uvCylinder.addEventListener('click',cylinderUVs);
function sphereUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createSphereUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory);
 renderReport();setStatus(result.ok?result.changed?'Sphere UVs created • Undo to restore':'Sphere UVs • no change needed':`Sphere UVs • ${result.reason}`);
 return result.ok;
}
uvSphere.addEventListener('click',sphereUVs);
function torusUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const result=createTorusUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory);
 renderReport();setStatus(result.ok?result.changed?'Torus UVs created • Undo to restore':'Torus UVs • no change needed':`Torus UVs • ${result.reason}`);
 return result.ok;
}
uvTorus.addEventListener('click',torusUVs);
function rotateUVs(){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const scope=typeof uvWorkspace!=='undefined'&&uvWorkspace?.active&&Number.isInteger(uvWorkspace.selectedIsland)?{island:uvWorkspace.selectedIsland,payload:uvPayload}:undefined;
 const result=rotateImportedUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,scope);
 renderReport();
 if(result.selectedFaces)uvWorkspace?.retainSelection(result.selectedFaces);
 setStatus(result.ok?result.changed?'UVs rotated 90° • Undo to restore':'UV rotation • no change needed':`UV rotation • ${result.reason}`);
 return result.ok;
}
uvRotate.addEventListener('click',rotateUVs);
function flipUVs(axis){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh)return false;
 const scope=typeof uvWorkspace!=='undefined'&&uvWorkspace?.active&&Number.isInteger(uvWorkspace.selectedIsland)?{island:uvWorkspace.selectedIsland,payload:uvPayload}:undefined;
 const result=flipImportedUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,axis,scope);
 renderReport();
 if(result.selectedFaces)uvWorkspace?.retainSelection(result.selectedFaces);
 setStatus(result.ok?result.changed?`UVs flipped ${axis.toUpperCase()} • Undo to restore`:'UV flip • no change needed':`UV flip • ${result.reason}`);
 return result.ok;
}
uvFlipU.addEventListener('click',()=>flipUVs('u'));
uvFlipV.addEventListener('click',()=>flipUVs('v'));

function transformUVs(kind,a,b,expected){
 const object=activeObject(),mesh=liveMesh();
 if(!active||currentMode()!=='object'||!object||object.id!==objectId||!mesh||!uvWorkspace?.active||(!['pack','density'].includes(kind)&&!Number.isInteger(uvWorkspace.selectedIsland)))return false;
 if(expected&&(expected.object!==object||expected.mesh!==mesh||expected.payload!==uvPayload||expected.payload!==object.glbPassthrough))return false;
 const scope={island:uvWorkspace.selectedIsland,payload:uvPayload};
 const result=kind==='density'?equalizeImportedUVDensity(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,scope):kind==='pack'?packImportedUVIslands(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,scope):kind==='move'?moveImportedUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,a,b,scope):kind==='scale'?scaleImportedUV(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,a,scope):kind==='rotate'?rotateImportedUVByAngle(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,a,scope):kind==='fit'?fitImportedUVToTile(object,mesh,globalThis.__boxlabExportAs?.topologySignature,globalThis.__boxlabObjectHistory,scope):{ok:false,reason:'Choose Move, Scale, Rotate, Fit to tile, Pack all or Equalize density'};
 renderReport();if(result.selectedFaces)uvWorkspace.retainSelection(result.selectedFaces);
 setStatus(result.ok?result.changed?`${['pack','density'].includes(kind)?'UV islands':'UV island'} ${kind==='density'?'density equalized':kind==='pack'?'packed':kind==='move'?'moved':kind==='rotate'?'rotated':kind==='fit'?'fitted to tile':'scaled'} • Undo to restore`:'UV transform • no change needed':`UV transform • ${result.reason}`);
 return result.ok;
}

function manager(){return globalThis.__boxlabObjectManager;}
function toolSession(){return globalThis.__boxlabToolSession;}
function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function liveMesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function setStatus(text){if(status)status.textContent=text;}
function addMetric(label,value){
  const a=document.createElement('span'),b=document.createElement('strong');
  a.textContent=label;b.textContent=String(value);
  topology.append(a,b);
}
function addFinding(kind,item){
  const row=document.createElement('div');
  row.dataset.healthKind=kind;
  row.textContent=`${kind==='issue'?'⚠':'•'} ${item.label}: ${item.count}`;
  findings.append(row);
}
function renderReport(){
  const object=activeObject(),mesh=liveMesh();
  if(!active||!object||object.id!==objectId||!mesh)return false;
  manager()?.saveActive?.();
  if(uvOnly){renderUVReport(object,mesh);setStatus(`UV · ${object.name} · ${uvSummary.textContent}`);return true;}
  last=analyzeMeshHealth(mesh);
  verdict.textContent=last.label;
  verdict.dataset.healthState=last.state;
  summary.textContent=`${object.name} · ${last.vertices} verts · ${last.faces} faces · ${last.edges} edges`;
  renderUVReport(object,mesh);
  topology.replaceChildren();
  addMetric('Triangles',last.triangles);addMetric('Quads',last.quads);addMetric('Ngons',last.ngons);
  addMetric('Boundary edges',last.boundaryEdges);addMetric('Non-manifold edges',last.nonManifoldEdges);
  addMetric('Orphan vertices',last.orphanVertices);
  findings.replaceChildren();
  for(const item of last.issues)addFinding('issue',item);
  for(const item of last.warnings)addFinding('warning',item);
  const repairable=Number(last.duplicateFaces||0)+Number(last.zeroAreaFaces||0)+Number(last.orphanVertices||0);
  if(repairButton)repairButton.disabled=!repairable;
  const boundary=last.state==='open-clean'?simpleBoundaryLoops(mesh):null;
  if(autoCloseButton)autoCloseButton.disabled=!(last.state==='open-clean'&&boundary?.ok&&boundary.loops?.length);
  lastBoundary=boundaryDiagnostics(mesh);
  if(boundarySummary){
    const parts=[];
    if(lastBoundary.boundaryEdges)parts.push(`${lastBoundary.components.length} group${lastBoundary.components.length===1?'':'s'} · ${lastBoundary.loops} loop${lastBoundary.loops===1?'':'s'} · ${lastBoundary.chains} chain${lastBoundary.chains===1?'':'s'} · ${lastBoundary.branched} branched`);
    if(lastBoundary.nonManifoldEdges)parts.push(`${lastBoundary.nonManifoldEdges} non-manifold edge${lastBoundary.nonManifoldEdges===1?'':'s'}`);
    boundarySummary.textContent=parts.length?parts.join(' · '):'No boundary or non-manifold edge diagnostics';
  }
  if(selectBoundaryButton)selectBoundaryButton.disabled=!lastBoundary.boundaryEdgeIndices.length;
  if(selectNonManifoldButton)selectNonManifoldButton.disabled=!lastBoundary.nonManifoldEdgeIndices.length;
  if(unifyButton)unifyButton.disabled=!last.inconsistentWindingEdges;
  if(flipNormalsButton)flipNormalsButton.disabled=!last.faces;
  if(triangulateButton)triangulateButton.disabled=!(last.quads||last.ngons);
  if(!last.issues.length&&!last.warnings.length){
    const row=document.createElement('div');row.textContent='✓ No topology findings';findings.append(row);
  }
  setStatus(`Mesh Health • ${object.name} • ${last.label} • ${last.boundaryEdges} boundary • ${last.nonManifoldEdges} non-manifold`);
  return true;
}
function repair(){
  const object=activeObject(),mesh=liveMesh(),history=globalThis.__boxlabObjectHistory;
  if(!active||!object||object.id!==objectId||!mesh)return false;
  const beforeScene=history?.capture?.()||null;
  const result=safeRepairMesh(mesh);
  if(!result.ok){
    setStatus(result.reason==='safe-repair-validation-refused'?'Mesh Health • Safe Repair refused by topology guard':'Mesh Health • Safe Repair failed');
    return false;
  }
  if(!result.changed){
    setStatus('Mesh Health • no safe automatic repairs available');
    renderReport();
    return false;
  }
  manager()?.saveActive?.();
  if(beforeScene)history?.checkpointSnapshot?.(beforeScene);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  window.dispatchEvent(new CustomEvent('boxlab-mesh-health-repair',{detail:result}));
  renderReport();
  const parts=[];
  if(result.duplicatesRemoved)parts.push(`${result.duplicatesRemoved} duplicate face${result.duplicatesRemoved===1?'':'s'} removed`);
  if(result.zeroAreaRemoved)parts.push(`${result.zeroAreaRemoved} zero-area face${result.zeroAreaRemoved===1?'':'s'} removed`);
  if(result.orphanVerticesRemoved)parts.push(`${result.orphanVerticesRemoved} orphan vert${result.orphanVerticesRemoved===1?'ex':'ices'} removed`);
  setStatus(`Mesh Health • Safe Repair • ${parts.join(' • ')}`);
  return true;
}
function autoClose(){
  const object=activeObject(),mesh=liveMesh(),history=globalThis.__boxlabObjectHistory;
  if(!active||!object||object.id!==objectId||!mesh)return false;
  const beforeScene=history?.capture?.()||null;
  const result=autoCloseSimpleHoles(mesh);
  if(!result.ok){
    setStatus(result.reason==='branched-boundary'?'Mesh Health • Auto Close refused • boundary branches':'Mesh Health • Auto Close refused • repair manually');
    renderReport();
    return false;
  }
  if(!result.changed){
    setStatus(result.reason==='already-closed'?'Mesh Health • already watertight':'Mesh Health • no closable boundary loops');
    renderReport();
    return false;
  }
  manager()?.saveActive?.();
  if(beforeScene)history?.checkpointSnapshot?.(beforeScene);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  window.dispatchEvent(new CustomEvent('boxlab-mesh-auto-close',{detail:result}));
  renderReport();
  setStatus(`Mesh Health • Auto Close • ${result.holesClosed} hole${result.holesClosed===1?'':'s'} capped • WATERTIGHT`);
  return true;
}
function handoffEdges(indices,label){
  const bridge=globalThis.__boxlabSelectionBridge;
  const unique=[...new Set(indices||[])].filter(Number.isInteger);
  if(!unique.length)return false;
  active=false;objectId=null;panel.hidden=true;toolSession()?.end?.('mesh-health');
  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  edgeMode?.click();
  setTimeout(()=>{
    const ok=!!bridge?.set?.('edge',unique);
    document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
    setStatus(ok?`Mesh Health • ${label} selected • ${unique.length} edge${unique.length===1?'':'s'}`:'Mesh Health • diagnostic selection handoff failed');
  },0);
  return true;
}
function selectBoundary(){return handoffEdges(lastBoundary?.boundaryEdgeIndices,'boundary');}
function selectNonManifold(){return handoffEdges(lastBoundary?.nonManifoldEdgeIndices,'non-manifold');}
function commitTopologyAction(action,label){
  const object=activeObject(),mesh=liveMesh(),history=globalThis.__boxlabObjectHistory;
  if(!active||!object||object.id!==objectId||!mesh)return false;
  const beforeScene=history?.capture?.()||null;
  const result=action(mesh);
  if(!result?.ok){setStatus(`Mesh Health • ${label} refused • ${result?.reason||'validation'}`);renderReport();return false;}
  if(!result.changed){setStatus(`Mesh Health • ${label} • no change needed`);renderReport();return false;}
  manager()?.saveActive?.();
  if(beforeScene)history?.checkpointSnapshot?.(beforeScene);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  renderReport();
  setStatus(`Mesh Health • ${label} applied`);
  return true;
}
function unifyWinding(){return commitTopologyAction(unifyFaceWinding,'Unify Winding');}
function flipNormals(){return commitTopologyAction(flipAllFaces,'Flip Normals');}
function triangulate(){return commitTopologyAction(triangulateMesh,'Triangulate');}
function close(){
  if(!active)return;
  active=false;objectId=null;uvWorkspace?.close();panel.hidden=true;toolSession()?.end?.(sessionId());
  setStatus(uvOnly?'UV tools closed':'Mesh Health closed • no geometry changed');
}
function launch({uvOnly:showUV=false}={}){
  const object=activeObject(),mesh=liveMesh();
  if(currentMode()!=='object'||!object||!mesh)return;
  if(active)close();
  const reminder=panel.querySelector('#uvToolsNotice');if(reminder){reminder.hidden=true;reminder.textContent='';}
  uvOnly=showUV;
  panel.querySelector('#meshHealthTitle').textContent=uvOnly?'UV':'Mesh Health';
  panel.querySelector('#meshHealthSubtitle').textContent=uvOnly?'Project · edit UVs':'Inspect · safe repair';
  panel.querySelector('#meshHealthDiagnosticsSummary').hidden=uvOnly;
  panel.querySelector('#meshHealthDiagnosticsTools').hidden=uvOnly;
  uvDetails.hidden=!uvOnly;uvDetails.open=uvOnly;
  uvWorkspace?.close();objectId=object.id;active=true;panel.hidden=false;
  toolSession()?.begin?.({id:sessionId(),title:uvOnly?'UV':'Mesh Health',node:panel,subtitle:uvOnly?'Project · edit UVs':'Inspect · safe repair'});
  renderReport();
}
launchButton?.addEventListener('click',launch);
uvLaunchButton?.addEventListener('click',()=>launch({uvOnly:true}));
refreshButton?.addEventListener('click',renderReport);
repairButton?.addEventListener('click',repair);
autoCloseButton?.addEventListener('click',autoClose);
selectBoundaryButton?.addEventListener('click',selectBoundary);
selectNonManifoldButton?.addEventListener('click',selectNonManifold);
unifyButton?.addEventListener('click',unifyWinding);
flipNormalsButton?.addEventListener('click',flipNormals);
triangulateButton?.addEventListener('click',triangulate);
closeButton?.addEventListener('click',close);
window.addEventListener('boxlab-bridge-state',()=>{
  if(!active)return;
  const object=activeObject();
  if(currentMode()!=='object'||!object||object.id!==objectId)close();
  else if(uvOnly||uvWorkspace?.active)queueMicrotask(()=>{if(active&&(liveMesh()!==uvMesh||activeObject()?.glbPassthrough!==uvPayload))renderReport();});
});
document.querySelector('#resetBtn')?.addEventListener('click',()=>{if(active)close();});
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>{if(active&&currentMode()!=='object')close();}));

globalThis.__boxlabMeshHealth={version:VERSION,analyze:analyzeMeshHealth,repair,autoClose,selectBoundary,selectNonManifold,unifyWinding,flipNormals,triangulate,get active(){return active;},get last(){return last;},get boundary(){return lastBoundary;},refresh:renderReport,close};

const uvNotice=panel.querySelector('#uvToolsNotice');
globalThis.__boxlabUVTools={
 open({notice=''}={}){
  launch({uvOnly:true});if(!active||!uvOnly)return false;
  uvNotice.textContent=notice;uvNotice.hidden=!notice;return true;
 },close,get busy(){return facegroupUVFlow.busy;},get active(){return active&&uvOnly;}
};
const facegroupUVFlow=installFacegroupUVWorkflow({document,host:uvDetails,notice:uvNotice,say:setStatus,
 getContext:()=>{
  if(!active||!uvOnly||uvWorkspace?.active||currentMode()!=='object'||activeObject()?.id!==objectId)return null;
  let body;const scene=globalThis.__boxlabBridgeState?.scene;scene?.traverse(o=>{if(o.userData?.kind==='body')body=o;});
  return {object:activeObject(),mesh:liveMesh(),scene,body,owner:globalThis.__boxlabExportAs,history:globalThis.__boxlabObjectHistory};
 },onCommit:()=>{
  manager()?.saveActive?.();
  document.querySelector('#viewportRenderLooks [data-render="uvchecker"]')?.click();
  renderReport();
 }
});

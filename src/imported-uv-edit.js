import {inspectImportedUV,importedUVIslandCentre,importedUVIslandBounds,rotateImportedUVPoint} from './imported-uv-inspection.js?v=0.36.18.874';
// UV transforms keep the existing imported face-corner channel
// and native scene history. All untouched resource buffers remain read-only.
export function rotateImportedUV(object,mesh,topologySignature,history,scope){
 return editImportedUV(object,mesh,topologySignature,history,'rotate',scope);
}
export function flipImportedUV(object,mesh,topologySignature,history,axis,scope){
 if(axis!=='u'&&axis!=='v')return {ok:false,reason:'Choose UV axis U or V'};
 return editImportedUV(object,mesh,topologySignature,history,axis,scope);
}
export function moveImportedUV(object,mesh,topologySignature,history,u,v,scope){
 if(scope===undefined||!Number.isFinite(u)||!Number.isFinite(v))return {ok:false,reason:'Select an island and enter finite U / V offsets'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'move',u,v},scope);
}
export function scaleImportedUV(object,mesh,topologySignature,history,factor,scope){
 if(scope===undefined||!Number.isFinite(factor)||factor<=0)return {ok:false,reason:'Select an island and enter a positive scale factor'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'scale',factor},scope);
}
export function rotateImportedUVByAngle(object,mesh,topologySignature,history,degrees,scope){
 if(scope===undefined||!Number.isFinite(degrees))return {ok:false,reason:'Select an island and a finite rotation angle'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'angle',degrees},scope);
}
export function fitImportedUVToTile(object,mesh,topologySignature,history,scope){
 if(scope===undefined)return {ok:false,reason:'Select a UV island to fit'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'fit'},scope);
}
function editImportedUV(object,mesh,topologySignature,history,operation,scope){
 if(!object||object.locked||object.kind==='reference'||object.sourceId||object.booleanRecipe||object.arrayRecipe||object.curveProfile||object.glbPassthrough?.version!==1||object.glbPassthrough?.source!=='glb')return {ok:false,reason:'Select an independent imported mesh'};
 const report=inspectImportedUV(mesh,object.glbPassthrough,topologySignature);
 if(report.state!=='ready'||report.missingFaces||report.mappedFaces!==report.faces)return {ok:false,reason:'Complete matching imported UVs are required'};
 const previous=object.glbPassthrough;
 let selectedFaces=null,centreU=.5,centreV=.5;
 if(scope!==undefined){
  if(scope?.payload!==previous||!Number.isInteger(scope.island)||scope.island<0||scope.island>=report.islandCount)return {ok:false,reason:'Select the UV island again'};
  selectedFaces=report.faceIslands.flatMap((id,fi)=>id===scope.island?[fi]:[]);
  if(!selectedFaces.length)return {ok:false,reason:'Select the UV island again'};
  const centre=importedUVIslandCentre(previous.uvCorners,selectedFaces);
  if(!centre)return {ok:false,reason:'Select the UV island again'};
  [centreU,centreV]=centre;
 }
 let fit=null;
 if(operation.kind==='fit'){
  const bounds=importedUVIslandBounds(previous.uvCorners,selectedFaces);
  const magnitude=Math.max(1,...Object.values(bounds).map(Math.abs));
  const span=Math.max(bounds.maxU/magnitude-bounds.minU/magnitude,bounds.maxV/magnitude-bounds.minV/magnitude);
  if(!span)return {ok:false,reason:'The selected UV island has no extent to fit'};
  // Avoid repeated history from floating-point noise after an already-fitted island.
  if(magnitude===1&&Math.abs(span-.96)<=8*Number.EPSILON&&Math.abs(centreU-.5)<=8*Number.EPSILON&&Math.abs(centreV-.5)<=8*Number.EPSILON)return {ok:true,changed:false,selectedFaces};
  fit={magnitude,span,minU:bounds.minU/magnitude,minV:bounds.minV/magnitude,width:bounds.maxU/magnitude-bounds.minU/magnitude,height:bounds.maxV/magnitude-bounds.minV/magnitude};
 }
 const selected=selectedFaces&&new Set(selectedFaces);
 const uvCorners=previous.uvCorners.map((face,fi)=>selected&&!selected.has(fi)?face:face.map(([u,v])=>{
  if(fit)return [.5+((u/fit.magnitude-fit.minU)/fit.span-fit.width/fit.span/2)*.96,.5+((v/fit.magnitude-fit.minV)/fit.span-fit.height/fit.span/2)*.96];
  if(operation.kind==='angle')return rotateImportedUVPoint([u,v],[centreU,centreV],operation.degrees);
  if(operation.kind==='move')return [u+operation.u,v+operation.v];
  if(operation.kind==='scale')return operation.factor===1?[u,v]:[centreU+(u-centreU)*operation.factor,centreV+(v-centreV)*operation.factor];
  if(!selected)return operation==='u'?[1-u,v]:operation==='v'?[u,1-v]:[1-v,u];
  return operation==='u'?[centreU+(centreU-u),v]:operation==='v'?[u,centreV+(centreV-v)]:[centreU+(centreV-v),centreV+(u-centreU)];
 }));
 if(uvCorners.some(face=>face.some(uv=>!uv.every(Number.isFinite))))return {ok:false,reason:'UV transform exceeds the coordinate range'};
 if(uvCorners.every((face,i)=>face.every((uv,j)=>uv.every((value,k)=>value===previous.uvCorners[i][j][k]))))return selectedFaces?{ok:true,changed:false,selectedFaces}:{ok:true,changed:false};
 if(!history?.capture||!history?.checkpointSnapshot)return {ok:false,reason:'Scene history is not ready'};
 const next={...previous,uvCorners};
 // Imported tangents describe the old UV basis; never export them as current.
 delete next.tangentCorners;delete next.tangentTopologySignature;delete next.tangentGeometrySignature;
 const before=history.capture();
 if(!before||!history.checkpointSnapshot(before,mesh))return {ok:false,reason:'Could not record the UV edit'};
 object.glbPassthrough=next;
 return selectedFaces?{ok:true,changed:true,selectedFaces}:{ok:true,changed:true};
}

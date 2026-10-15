import {inspectImportedUV} from './imported-uv-inspection.js?v=0.36.18.867';
// UV transforms keep the existing imported face-corner channel
// and native scene history. All untouched resource buffers remain read-only.
export function rotateImportedUV(object,mesh,topologySignature,history){
 return editImportedUV(object,mesh,topologySignature,history,'rotate');
}
export function flipImportedUV(object,mesh,topologySignature,history,axis){
 if(axis!=='u'&&axis!=='v')return {ok:false,reason:'Choose UV axis U or V'};
 return editImportedUV(object,mesh,topologySignature,history,axis);
}
function editImportedUV(object,mesh,topologySignature,history,operation){
 if(!object||object.locked||object.kind==='reference'||object.sourceId||object.booleanRecipe||object.arrayRecipe||object.curveProfile||object.glbPassthrough?.version!==1||object.glbPassthrough?.source!=='glb')return {ok:false,reason:'Select an independent imported mesh'};
 const report=inspectImportedUV(mesh,object.glbPassthrough,topologySignature);
 if(report.state!=='ready'||report.missingFaces||report.mappedFaces!==report.faces)return {ok:false,reason:'Complete matching imported UVs are required'};
 const previous=object.glbPassthrough,uvCorners=previous.uvCorners.map(face=>face.map(([u,v])=>operation==='u'?[1-u,v]:operation==='v'?[u,1-v]:[1-v,u]));
 if(uvCorners.every((face,i)=>face.every((uv,j)=>uv.every((value,k)=>value===previous.uvCorners[i][j][k]))))return {ok:true,changed:false};
 if(!history?.capture||!history?.checkpointSnapshot)return {ok:false,reason:'Scene history is not ready'};
 const next={...previous,uvCorners};
 // Imported tangents describe the old UV basis; never export them as current.
 delete next.tangentCorners;delete next.tangentTopologySignature;delete next.tangentGeometrySignature;
 const before=history.capture();
 if(!before||!history.checkpointSnapshot(before,mesh))return {ok:false,reason:'Could not record the UV edit'};
 object.glbPassthrough=next;
 return {ok:true,changed:true};
}

import {inspectImportedUV,importedUVIslandCentre,importedUVIslandBounds,rotateImportedUVPoint} from './imported-uv-inspection.js?v=0.36.18.878';
// UV transforms keep the existing stored face-corner channel
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
 if(!object||object.locked||object.kind==='reference'||object.sourceId||object.booleanRecipe||object.arrayRecipe||object.curveProfile||object.glbPassthrough?.version!==1||!['glb','boxlab'].includes(object.glbPassthrough?.source))return {ok:false,reason:'Select an independent UV mesh'};
 const report=inspectImportedUV(mesh,object.glbPassthrough,topologySignature);
 if(report.state!=='ready'||report.missingFaces||report.mappedFaces!==report.faces)return {ok:false,reason:'Complete matching UVs are required'};
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

// Native BoxLab UVs reuse the established read-only resource/history transport,
// with explicit boxlab provenance; they never impersonate an imported GLB.
export function createPlanarUV(object,mesh,topologySignature,history,plane){
 const axes={xy:['x','y'],xz:['x','z'],yz:['y','z']}[plane];
 if(!['xy','xz','yz'].includes(plane))return {ok:false,reason:'Choose planar UV axes XY, XZ or YZ'};
 const error=nativeUVTargetError(object,mesh,topologySignature);if(error)return {ok:false,reason:error};
 const values=[];
 for(const face of mesh.faces){
  if(!Array.isArray(face)||face.length<3)return {ok:false,reason:'Invalid mesh faces'};
  const corners=[];
  for(const id of face){const vertex=mesh.vertices[id];if(!Number.isInteger(id)||!vertex||!['x','y','z'].every(axis=>Number.isFinite(vertex[axis])))return {ok:false,reason:'Invalid mesh coordinates'};corners.push(axes.map(axis=>vertex[axis]));}
  values.push(corners);
 }
 // Normalize before subtracting so large/tiny finite coordinates stay safe.
 let magnitude=0;for(const face of values)for(const p of face)for(const v of p)magnitude=Math.max(magnitude,Math.abs(v));
 if(!magnitude)return {ok:false,reason:'This projection plane has no extent'};
 let minU=Infinity,maxU=-Infinity,minV=Infinity,maxV=-Infinity;
 for(const face of values)for(const [u,v] of face){minU=Math.min(minU,u/magnitude);maxU=Math.max(maxU,u/magnitude);minV=Math.min(minV,v/magnitude);maxV=Math.max(maxV,v/magnitude);}
 const width=maxU-minU,height=maxV-minV,span=Math.max(width,height);
 if(!span)return {ok:false,reason:'This projection plane has no extent'};
 const uvCorners=values.map(face=>face.map(([u,v])=>[.5+((u/magnitude-minU)/span-width/span/2)*.96,.5+((v/magnitude-minV)/span-height/span/2)*.96]));
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}
function nativeUVTargetError(object,mesh,topologySignature){
 if(!object||object.locked||object.kind==='reference'||object.sourceId||object.booleanRecipe||object.arrayRecipe||object.curveProfile||object.materials||object.textures||mesh?.uvs||mesh?.faceUVs||mesh?.uvLayers||object.settings?.subd||Object.values(object.settings?.mirror||{}).some(Boolean)||object.glbPassthrough&&(object.glbPassthrough.source!=='boxlab'||object.glbPassthrough.version!==1))return 'UV projection requires a plain independent Base mesh';
 if(typeof topologySignature!=='function'||!mesh?.faces?.length||!mesh?.vertices?.length)return 'UV projection is not ready';
 return null;
}
function commitNativeUV(object,mesh,topologySignature,history,uvCorners){
 if(uvCorners.some(face=>face.some(p=>!p.every(Number.isFinite))))return {ok:false,reason:'UV projection exceeds the coordinate range'};
 const signature=topologySignature(mesh);if(typeof signature!=='string'||!signature)return {ok:false,reason:'Topology signature is not ready'};
 const previous=object.glbPassthrough;
 if(previous?.uvTopologySignature===signature&&JSON.stringify(previous.uvCorners)===JSON.stringify(uvCorners))return {ok:true,changed:false};
 if(!history?.capture||!history?.checkpointSnapshot)return {ok:false,reason:'Scene history is not ready'};
 const before=history.capture();if(!before||!history.checkpointSnapshot(before,mesh))return {ok:false,reason:'Could not record UV projection'};
 object.glbPassthrough={version:1,source:'boxlab',uvTopologySignature:signature,uvCorners};
 return {ok:true,changed:true};
}

// Six fixed directional cells. Faces in the same direction share one projection;
// all cells use one scale, preserving proportions and equal world-unit UV density.
export function createBoxUV(object,mesh,topologySignature,history){
 const error=nativeUVTargetError(object,mesh,topologySignature);if(error)return {ok:false,reason:error};
 let magnitude=0;
 for(const face of mesh.faces){
  if(!Array.isArray(face)||face.length<3)return {ok:false,reason:'Invalid mesh faces'};
  for(const id of face){const v=mesh.vertices[id];if(!Number.isInteger(id)||!v||!['x','y','z'].every(k=>Number.isFinite(v[k])))return {ok:false,reason:'Invalid mesh coordinates'};magnitude=Math.max(magnitude,Math.abs(v.x),Math.abs(v.y),Math.abs(v.z));}
 }
 if(!magnitude)return {ok:false,reason:'Box projection requires faces with area'};
 const normalized=mesh.vertices.map(v=>[v.x/magnitude,v.y/magnitude,v.z/magnitude]);
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 for(const face of mesh.faces)for(const id of face)normalized[id].forEach((v,k)=>{min[k]=Math.min(min[k],v);max[k]=Math.max(max[k],v);});
 const span=Math.max(...max.map((v,k)=>v-min[k]));if(!span)return {ok:false,reason:'Box projection has no extent'};
 const directions=[{u:2,sign:-1,v:1},{u:2,sign:1,v:1},{u:0,sign:1,v:2,vsign:-1},{u:0,sign:1,v:2},{u:0,sign:1,v:1},{u:0,sign:-1,v:1}];
 const scale=(1/3-.04)/span,uvCorners=[];
 for(const face of mesh.faces){
  const n=[0,0,0];
  for(let j=0;j<face.length;j++){const a=normalized[face[j]],b=normalized[face[(j+1)%face.length]];n[0]+=(a[1]-b[1])*(a[2]+b[2]);n[1]+=(a[2]-b[2])*(a[0]+b[0]);n[2]+=(a[0]-b[0])*(a[1]+b[1]);}
  let axis=0;for(let k=1;k<3;k++)if(Math.abs(n[k])>Math.abs(n[axis]))axis=k;
  if(!Number.isFinite(n[axis])||n[axis]===0)return {ok:false,reason:'Box projection requires non-degenerate faces'};
  const cell=axis*2+(n[axis]<0?1:0),d=directions[cell],cu=(cell%3+.5)/3,cv=(Math.floor(cell/3)+.5)/2;
  const centreU=min[d.u]/2+max[d.u]/2,centreV=min[d.v]/2+max[d.v]/2;
  uvCorners.push(face.map(id=>[cu+(normalized[id][d.u]-centreU)*d.sign*scale,cv+(normalized[id][d.v]-centreV)*(d.vsign||1)*scale]));
 }
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}

// Upright, round aligned rings: unfold measured polygon edge lengths into one
// side strip, with a deterministic existing-vertex seam and separate planar caps.
export function createCylinderUV(object,mesh,topologySignature,history){
 const error=nativeUVTargetError(object,mesh,topologySignature);if(error)return {ok:false,reason:error};
 const used=new Set();let magnitude=0;
 for(const face of mesh.faces){
  if(!Array.isArray(face)||face.length<3)return {ok:false,reason:'Invalid mesh faces'};
  for(const id of face){const v=mesh.vertices[id];if(!Number.isInteger(id)||!v||!['x','y','z'].every(k=>Number.isFinite(v[k])))return {ok:false,reason:'Invalid mesh coordinates'};used.add(id);magnitude=Math.max(magnitude,Math.abs(v.x),Math.abs(v.y),Math.abs(v.z));}
 }
 if(!magnitude)return {ok:false,reason:'Cylinder mapping needs radial and Y extent'};
 const positions=new Map(),columns=new Map();let minY=Infinity,maxY=-Infinity;
 for(const id of used){const v=mesh.vertices[id],p=[v.x/magnitude,v.y/magnitude,v.z/magnitude];positions.set(id,p);minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);const key=p[0]+':'+p[2];if(!columns.has(key))columns.set(key,{x:p[0],z:p[2],key});}
 const height=maxY-minY;if(!height)return {ok:false,reason:'Cylinder mapping needs Y height'};
 const points=[...columns.values()],cx=points.reduce((s,p)=>s+p.x/points.length,0),cz=points.reduce((s,p)=>s+p.z/points.length,0);
 let radius=0;for(const p of points){p.radius=Math.hypot(p.x-cx,p.z-cz);radius=Math.max(radius,p.radius);}
 if(!radius)return {ok:false,reason:'Cylinder mapping needs radial extent'};
 const ring=points.filter(p=>p.radius>radius*1e-8);
 if(ring.length<3||ring.some(p=>Math.abs(p.radius-radius)>radius*1e-7))return {ok:false,reason:'Cylinder UVs require round aligned rings about world Y'};
 let anchor=ring[0];for(const p of ring)if(p.x>anchor.x||p.x===anchor.x&&p.z<anchor.z)anchor=p;
 const start=Math.atan2(anchor.z-cz,anchor.x-cx);
 for(const p of ring){p.angle=Math.atan2(p.z-cz,p.x-cx)-start;if(p.angle<0)p.angle+=2*Math.PI;}
 ring.sort((a,b)=>a.angle-b.angle);let circumference=0;
 for(let i=0;i<ring.length;i++){ring[i].u=circumference;const next=ring[(i+1)%ring.length];circumference+=Math.hypot(next.x-ring[i].x,next.z-ring[i].z);}
 const scale=Math.min(.96/circumference,.54/height,.36/(2*radius)),uvCorners=[];
 if(!Number.isFinite(scale)||scale<=0)return {ok:false,reason:'Cylinder UV scale is out of range'};
 for(const face of mesh.faces){
  const corners=face.map(id=>positions.get(id)),bottom=corners.every(p=>p[1]===minY),top=corners.every(p=>p[1]===maxY);
  if(bottom||top){uvCorners.push(corners.map(p=>[(bottom ? .25 : .75)+(p[0]-cx)*scale,.80+(p[2]-cz)*(bottom?1:-1)*scale]));continue;}
  const angular=corners.map(p=>columns.get(p[0]+':'+p[2]));
  if(angular.some(p=>!Number.isFinite(p.u))||corners.every(p=>p[1]===corners[0][1]))return {ok:false,reason:'Cylinder sides must stay off the Y axis and have height'};
  const us=angular.map(p=>p.u);if(Math.max(...us)-Math.min(...us)>circumference/2)for(let i=0;i<us.length;i++)if(us[i]<circumference/2)us[i]+=circumference;
  if(Math.max(...us)>circumference*(1+1e-12)||Math.max(...us)-Math.min(...us)>circumference*(.5+1e-12))return {ok:false,reason:'Cylinder mapping needs an aligned seam column'};
  uvCorners.push(corners.map((p,i)=>[.5-(us[i]-circumference/2)*scale,.30+((p[1]-minY)-height/2)*scale]));
 }
 if(uvCorners.some(face=>{let area=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];area+=a[0]*b[1]-a[1]*b[0];}return !Number.isFinite(area)||area===0;}))return {ok:false,reason:'Cylinder projection would collapse a face'};
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}

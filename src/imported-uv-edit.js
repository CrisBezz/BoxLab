import {meshTopologySignature} from './mesh-topology-signature.js?v=0.36.18.939';
import {inspectImportedUV,importedUVIslandCentre,importedUVIslandBounds,rotateImportedUVPoint} from './imported-uv-inspection.js?v=0.36.18.932';
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
export function packImportedUVIslands(object,mesh,topologySignature,history,scope){
 if(!scope||scope.payload!==object?.glbPassthrough||scope.island!=null&&!Number.isInteger(scope.island))return {ok:false,reason:'Refresh the UV layout before packing'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'pack'},scope.island==null?undefined:scope);
}
// Equal average UV area per Base surface area; island centres/orientation stay fixed.
// This does not remove internal stretch or overlap. Pack all remains a separate action.
export function equalizeImportedUVDensity(object,mesh,topologySignature,history,scope){
 if(!Array.isArray(mesh?.faces)||!mesh.faces.length||mesh.faces.some(face=>!Array.isArray(face)||face.length<3))return {ok:false,reason:'Equalize density needs valid Base faces'};
 if(!scope||scope.payload!==object?.glbPassthrough||scope.island!=null&&!Number.isInteger(scope.island))return {ok:false,reason:'Refresh the UV layout before equalizing density'};
 return editImportedUV(object,mesh,topologySignature,history,{kind:'density'},scope.island==null?undefined:scope);
}
function densityLayout(mesh,payload,report){
 const refuse=()=>({reason:'Equalize density needs non-degenerate UVs and finite planar Base faces'});
 const count=report.islandCount;if(count<1||count>128)return {reason:'Equalize density supports 1–128 UV islands'};
 const faces=Array.from({length:count},()=>[]);report.faceIslands.forEach((id,fi)=>faces[id].push(fi));
 const bounds=faces.map(ids=>importedUVIslandBounds(payload.uvCorners,ids));
 let worldMagnitude=0,uvMagnitude=0;
 for(const face of mesh.faces)for(const id of face){const p=mesh.vertices?.[id];if(!Number.isInteger(id)||!p||!['x','y','z'].every(k=>Number.isFinite(p[k])))return refuse();worldMagnitude=Math.max(worldMagnitude,Math.abs(p.x),Math.abs(p.y),Math.abs(p.z));}
 for(const b of bounds)for(const v of Object.values(b))uvMagnitude=Math.max(uvMagnitude,Math.abs(v));
 if(!worldMagnitude||!uvMagnitude)return refuse();
 const worldArea=Array(count).fill(0),uvArea=Array(count).fill(0);
 for(let fi=0;fi<mesh.faces.length;fi++){
  const face=mesh.faces[fi];if(face.length<3||new Set(face).size!==face.length)return refuse();
  const points=face.map(id=>{const p=mesh.vertices[id];return [p.x/worldMagnitude,p.y/worldMagnitude,p.z/worldMagnitude];});
  const origin=points[0],local=points.map(p=>p.map((v,k)=>v-origin[k])),normal=[0,0,0];
  for(let i=1;i<local.length-1;i++){const a=local[i],b=local[i+1];normal[0]+=a[1]*b[2]-a[2]*b[1];normal[1]+=a[2]*b[0]-a[0]*b[2];normal[2]+=a[0]*b[1]-a[1]*b[0];}
  const area=Math.hypot(...normal);let extent=0;for(const p of local)extent=Math.max(extent,Math.hypot(...p));
  if(!(area>0)||!Number.isFinite(area)||local.some(p=>Math.abs(p.reduce((sum,v,k)=>sum+v*(normal[k]/area),0))>extent*1e-7))return refuse();
  const uv=payload.uvCorners[fi].map(p=>p.map(v=>v/uvMagnitude)),start=uv[0];let signed=0;
  for(let i=1;i<uv.length-1;i++)signed+=(uv[i][0]-start[0])*(uv[i+1][1]-start[1])-(uv[i][1]-start[1])*(uv[i+1][0]-start[0]);
  if(!Number.isFinite(signed)||signed===0)return refuse();
  const id=report.faceIslands[fi];worldArea[id]+=area;uvArea[id]+=Math.abs(signed);
 }
 const target=uvArea.reduce((a,b)=>a+b,0)/worldArea.reduce((a,b)=>a+b,0);
 const scales=uvArea.map((area,id)=>Math.sqrt(target/(area/worldArea[id])));
 if(scales.some(s=>!Number.isFinite(s)||s<=0))return refuse();
 // An already-equal layout is a real no-op, including after roundoff on repeat.
 if(scales.every(s=>Math.abs(s-1)<=1e-12))return {uvCorners:payload.uvCorners};
 const centres=bounds.map(b=>[b.minU/2+b.maxU/2,b.minV/2+b.maxV/2]);
 const uvCorners=payload.uvCorners.map((face,fi)=>{const id=report.faceIslands[fi],centre=centres[id];return face.map(p=>p.map((v,k)=>centre[k]+(v-centre[k])*scales[id]));});
 if(uvCorners.some(face=>face.some(p=>p.some(v=>!Number.isFinite(v)||!Number.isFinite(Math.fround(v))))))return {reason:'Equalizing density exceeds the export coordinate range'};
 if(uvCorners.some((face,fi)=>face.some((p,j)=>{const a=payload.uvCorners[fi][j],b=payload.uvCorners[fi][(j+1)%face.length],q=face[(j+1)%face.length];return (a[0]!==b[0]||a[1]!==b[1])&&p[0]===q[0]&&p[1]===q[1]||(Math.fround(a[0])!==Math.fround(b[0])||Math.fround(a[1])!==Math.fround(b[1]))&&Math.fround(p[0])===Math.fround(q[0])&&Math.fround(p[1])===Math.fround(q[1]);})))return {reason:'Equalizing density would collapse an existing UV edge'};
 return {uvCorners};
}
// Deterministic grid packing, not an optimal atlas solver. One common scale
// preserves existing relative UV density; island bounds stay in separate cells.
function packedLayout(uvCorners,report){
 const count=report.islandCount;if(count<1||count>128)return {reason:'Pack all supports 1–128 UV islands'};
 const faces=Array.from({length:count},()=>[]);report.faceIslands.forEach((id,fi)=>faces[id].push(fi));
 const bounds=faces.map(ids=>importedUVIslandBounds(uvCorners,ids));let magnitude=0;
 for(const b of bounds)for(const value of Object.values(b))magnitude=Math.max(magnitude,Math.abs(value));
 if(!magnitude)return {reason:'UV islands need extent to pack'};
 const normalized=bounds.map(b=>({minU:b.minU/magnitude,minV:b.minV/magnitude,width:b.maxU/magnitude-b.minU/magnitude,height:b.maxV/magnitude-b.minV/magnitude}));
 if(normalized.some(b=>!b.width&&!b.height))return {reason:'A UV island has no packable extent'};
 const width=Math.max(...normalized.map(b=>b.width)),height=Math.max(...normalized.map(b=>b.height));let best=null;
 for(let columns=count;columns>=1;columns--){
  const rows=Math.ceil(count/columns),cellWidth=(.96-(columns-1)*.02)/columns,cellHeight=(.96-(rows-1)*.02)/rows;
  if(cellWidth<=0||cellHeight<=0)continue;
  const scale=Math.min(width?cellWidth/width:Infinity,height?cellHeight/height:Infinity);
  if(Number.isFinite(scale)&&scale>0&&(!best||scale>best.scale*(1+32*Number.EPSILON)))best={columns,rows,cellWidth,cellHeight,scale};
 }
 if(!best)return {reason:'UV island scale is out of range'};
 const result=uvCorners.map((face,fi)=>{const id=report.faceIslands[fi],b=normalized[id],u=.02+(id%best.columns)*(best.cellWidth+.02)+best.cellWidth/2,v=.02+Math.floor(id/best.columns)*(best.cellHeight+.02)+best.cellHeight/2;return face.map(([x,y])=>[u+((x/magnitude-b.minU)-b.width/2)*best.scale,v+((y/magnitude-b.minV)-b.height/2)*best.scale]);});
 // Refuse numeric collapse of any existing island extent rather than losing it.
 if(faces.some((ids,id)=>{const b=importedUVIslandBounds(result,ids),old=bounds[id];return old.maxU>old.minU&&b.maxU===b.minU||old.maxV>old.minV&&b.maxV===b.minV;}))return {reason:'UV packing exceeds the coordinate range'};
 if(result.some((face,fi)=>face.some((uv,j)=>{const k=(j+1)%face.length,a=uvCorners[fi][j],b=uvCorners[fi][k],next=face[k];return (a[0]!==b[0]||a[1]!==b[1])&&uv[0]===next[0]&&uv[1]===next[1]||(Math.fround(a[0])!==Math.fround(b[0])||Math.fround(a[1])!==Math.fround(b[1]))&&Math.fround(uv[0])===Math.fround(next[0])&&Math.fround(uv[1])===Math.fround(next[1]);})))return {reason:'UV packing would collapse an existing UV edge'};
 return {uvCorners:result};
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
 const packing=operation.kind==='pack'?packedLayout(previous.uvCorners,report):operation.kind==='density'?densityLayout(mesh,previous,report):null;
 if(packing?.reason)return {ok:false,reason:packing.reason};
 const selected=selectedFaces&&new Set(selectedFaces);
 const uvCorners=packing?packing.uvCorners:previous.uvCorners.map((face,fi)=>selected&&!selected.has(fi)?face:face.map(([u,v])=>{
  if(fit)return [.5+((u/fit.magnitude-fit.minU)/fit.span-fit.width/fit.span/2)*.96,.5+((v/fit.magnitude-fit.minV)/fit.span-fit.height/fit.span/2)*.96];
  if(operation.kind==='angle')return rotateImportedUVPoint([u,v],[centreU,centreV],operation.degrees);
  if(operation.kind==='move')return [u+operation.u,v+operation.v];
  if(operation.kind==='scale')return operation.factor===1?[u,v]:[centreU+(u-centreU)*operation.factor,centreV+(v-centreV)*operation.factor];
  if(!selected)return operation==='u'?[1-u,v]:operation==='v'?[u,1-v]:[1-v,u];
  return operation==='u'?[centreU+(centreU-u),v]:operation==='v'?[u,centreV+(centreV-v)]:[centreU+(centreV-v),centreV+(u-centreU)];
 }));
 if(uvCorners.some(face=>face.some(uv=>!uv.every(Number.isFinite))))return {ok:false,reason:'UV transform exceeds the coordinate range'};
 if(operation.kind==='density'){
  const nextReport=inspectImportedUV(mesh,{...previous,uvCorners},topologySignature);
  if(nextReport.state!=='ready'||nextReport.faceIslands.some((id,i)=>id!==report.faceIslands[i]))return {ok:false,reason:'Equalizing density would change UV island connectivity'};
 }
 if(operation.kind==='pack'&&uvCorners.every((face,i)=>face.every((uv,j)=>uv.every((value,k)=>Math.abs(value-previous.uvCorners[i][j][k])<=32*Number.EPSILON))))return selectedFaces?{ok:true,changed:false,selectedFaces}:{ok:true,changed:false};
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
// Only createNativeUVCandidate can access this token. Scene projections still
// require their original checkpoint; creation stages a private payload before Add.
const nativeUVCandidate=Symbol('native UV candidate');
export function createNativeUVCandidate(mesh,projection){
 const project={box:createBoxUV,xz:(o,m,s,h)=>createPlanarUV(o,m,s,h,'xz'),cylinder:createCylinderUV,sphere:createSphereUV}[projection];
 if(!project)throw new Error('This shape has no automatic UV projection yet');
 const candidate={},result=project(candidate,mesh,meshTopologySignature,nativeUVCandidate);
 if(!result.ok)throw new Error(result.reason);
 return candidate.glbPassthrough;
}
function commitNativeUV(object,mesh,topologySignature,history,uvCorners){
 if(uvCorners.some(face=>face.some(p=>!p.every(Number.isFinite))))return {ok:false,reason:'UV projection exceeds the coordinate range'};
 const signature=topologySignature(mesh);if(typeof signature!=='string'||!signature)return {ok:false,reason:'Topology signature is not ready'};
 const previous=object.glbPassthrough;
 if(previous?.uvTopologySignature===signature&&JSON.stringify(previous.uvCorners)===JSON.stringify(uvCorners))return {ok:true,changed:false};
 if(history!==nativeUVCandidate){
  if(!history?.capture||!history?.checkpointSnapshot)return {ok:false,reason:'Scene history is not ready'};
  const before=history.capture();if(!before||!history.checkpointSnapshot(before,mesh))return {ok:false,reason:'Could not record UV projection'};
 }
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
 if(ring.length<3||ring.some(p=>Math.abs(p.radius-radius)>radius*1e-7))return createRevolvedCylinderUV(object,mesh,topologySignature,history,positions);
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
  if(angular.some(p=>!Number.isFinite(p.u))||corners.every(p=>p[1]===corners[0][1]))return createRevolvedCylinderUV(object,mesh,topologySignature,history,positions);
  const us=angular.map(p=>p.u);if(Math.max(...us)-Math.min(...us)>circumference/2)for(let i=0;i<us.length;i++)if(us[i]<circumference/2)us[i]+=circumference;
  if(Math.max(...us)>circumference*(1+1e-12)||Math.max(...us)-Math.min(...us)>circumference*(.5+1e-12))return {ok:false,reason:'Cylinder mapping needs an aligned seam column'};
  uvCorners.push(corners.map((p,i)=>[.5-(us[i]-circumference/2)*scale,.30+((p[1]-minY)-height/2)*scale]));
 }
 if(uvCorners.some(face=>{let area=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];area+=a[0]*b[1]-a[1]*b[0];}return !Number.isFinite(area)||area===0;}))return {ok:false,reason:'Cylinder projection would collapse a face'};
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}

// Cones and applied Y-axis Revolves have a chain of concentric rings, rather
// than constant-radius columns. Recover that chain from the existing Base mesh;
// measured profile distance also unfolds horizontal shoulders and return walls.
// No procedural metadata is changed and ordinary cylinders retain their old UVs.
function createRevolvedCylinderUV(object,mesh,topologySignature,history,positions){
 const refuse=()=>({ok:false,reason:'Cylinder UVs require aligned round rings about world Y (cylinder, cone or upright Revolve)'});
 const tolerance=1e-7,levels=[];
 for(const [id,p] of positions){
  let level=levels.find(row=>Math.abs(row.y-p[1])<tolerance);
  if(!level){level={y:p[1],ids:[]};levels.push(level);}level.ids.push(id);
 }
 const widest=levels.reduce((a,b)=>a.ids.length>b.ids.length?a:b),centre=[0,0];
 for(const id of widest.ids){const p=positions.get(id);centre[0]+=p[0]/widest.ids.length;centre[1]+=p[2]/widest.ids.length;}
 const rings=[],membership=new Map();let radius=0;
 for(const level of levels)for(const id of level.ids){
  const p=positions.get(id),r=Math.hypot(p[0]-centre[0],p[2]-centre[1]);
  let ring=rings.find(row=>Math.abs(row.y-level.y)<tolerance&&Math.abs(row.radius-r)<tolerance);
  if(!ring){ring={y:level.y,radius:r,ids:[],links:new Set()};rings.push(ring);}
  ring.ids.push(id);membership.set(id,ring);radius=Math.max(radius,r);
 }
 if(!(radius>tolerance)||rings.length<2)return refuse();
 let reference=null;
 for(const ring of rings){
  ring.pole=ring.radius<tolerance;
  if(ring.pole){if(ring.ids.length!==1)return refuse();continue;}
  if(ring.ids.length<3)return refuse();
  ring.angular=ring.ids.map(id=>{const p=positions.get(id);return {id,angle:(Math.atan2(p[2]-centre[1],p[0]-centre[0])+2*Math.PI)%(2*Math.PI)};}).sort((a,b)=>a.angle-b.angle);
  if(!reference||ring.radius>reference.radius)reference=ring;
 }
 if(!reference)return refuse();
 const count=reference.ids.length,start=reference.angular[0].angle,angles=new Map();
 for(const ring of rings){
  if(ring.pole)continue;
  if(ring.ids.length!==count)return refuse();
  const columns=new Set();
  for(const p of ring.angular){
   const column=Math.round(((p.angle-start+2*Math.PI)%(2*Math.PI))*count/(2*Math.PI))%count;
   const expected=start+column*2*Math.PI/count,delta=Math.atan2(Math.sin(p.angle-expected),Math.cos(p.angle-expected));
   if(Math.abs(delta)>tolerance||columns.has(column))return refuse();columns.add(column);angles.set(p.id,column/count);
  }
 }
 for(const face of mesh.faces){
  const owners=[...new Set(face.map(id=>membership.get(id)))];
  if(new Set(face).size!==face.length||owners.length>2)return refuse();
  if(owners.length===2){owners[0].links.add(owners[1]);owners[1].links.add(owners[0]);}
  else if(owners[0].pole||face.length!==count)return refuse();
 }
 const ends=rings.filter(ring=>ring.links.size===1).sort((a,b)=>a.y-b.y||a.radius-b.radius);
 if(ends.length!==2||rings.some(ring=>ring.links.size<1||ring.links.size>2))return refuse();
 let previous=null,current=ends[0],distance=0;const visited=new Set();
 while(current&&!visited.has(current)){
  visited.add(current);current.v=distance;
  const next=[...current.links].find(ring=>ring!==previous);
  if(next)distance+=Math.hypot(next.y-current.y,next.radius-current.radius);
  previous=current;current=next;
 }
 if(visited.size!==rings.length||!Number.isFinite(distance)||distance<=0)return refuse();
 const circumference=2*count*radius*Math.sin(Math.PI/count),scale=Math.min(.96/circumference,.54/distance,.36/(2*radius)),uvCorners=[];
 for(const face of mesh.faces){
  const owners=face.map(id=>membership.get(id));
  if(owners.every(ring=>ring===owners[0])){
   const bottom=owners[0]===ends[0];
   uvCorners.push(face.map(id=>{const p=positions.get(id);return [(bottom ? .25 : .75)+(p[0]-centre[0])*scale,.80+(p[2]-centre[1])*(bottom?1:-1)*scale];}));continue;
  }
  const us=face.map(id=>angles.get(id)),regular=us.filter(Number.isFinite);
  if(regular.length<2)return refuse();
  if(Math.max(...regular)-Math.min(...regular)>.5)for(let i=0;i<us.length;i++)if(us[i]<.5)us[i]+=1;
  const low=Math.min(...us.filter(Number.isFinite)),high=Math.max(...us.filter(Number.isFinite));
  if(high-low>1/count+tolerance)return refuse();
  uvCorners.push(us.map((u,i)=>[.5-((Number.isFinite(u)?u:(low+high)/2)-.5)*circumference*scale,.30+(owners[i].v-distance/2)*scale]));
 }
 if(uvCorners.some(face=>{let area=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];area+=a[0]*b[1]-a[1]*b[0];}return !Number.isFinite(area)||Math.abs(area)<Number.EPSILON;}))return refuse();
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}

// Equirectangular projection for round spheres with vertex poles on world Y.
// The UV pole is split per face wedge; geometry and existing export owners stay intact.
export function createSphereUV(object,mesh,topologySignature,history){
 const error=nativeUVTargetError(object,mesh,topologySignature);if(error)return {ok:false,reason:error};
 const refuse=()=>({ok:false,reason:'Sphere UVs require a round sphere with Y-axis vertex poles'});
 const used=new Set();let magnitude=0;
 for(const face of mesh.faces){
  if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return refuse();
  for(const id of face){const v=mesh.vertices[id];if(!Number.isInteger(id)||!v||!['x','y','z'].every(k=>Number.isFinite(v[k])))return refuse();used.add(id);magnitude=Math.max(magnitude,Math.abs(v.x),Math.abs(v.y),Math.abs(v.z));}
 }
 if(!magnitude)return refuse();
 const points=new Map([...used].map(id=>{const v=mesh.vertices[id];return [id,[v.x/magnitude,v.y/magnitude,v.z/magnitude]];}));
 let north=null,south=null;
 for(const p of points.values()){if(!north||p[1]>north[1])north=p;if(!south||p[1]<south[1])south=p;}
 const radius=(north[1]-south[1])/2,centre=[north[0]/2+south[0]/2,north[1]/2+south[1]/2,north[2]/2+south[2]/2];
 if(!(radius>0)||Math.hypot(north[0]-south[0],north[2]-south[2])>radius*1e-7)return refuse();
 const coords=new Map();let poles=0,seam=null;
 for(const [id,p] of points){
  const [x,y,z]=p.map((v,k)=>(v-centre[k])/radius),length=Math.hypot(x,y,z);
  if(Math.abs(length-1)>1e-7)return refuse();
  const pole=Math.hypot(x,z)<1e-7;
  if(pole)poles++;
  const angle=Math.atan2(z,x)/(2*Math.PI);if(!pole&&seam===null)seam=angle;
  let u=(angle-(seam??0)+1)%1;if(Math.abs(u-1)<1e-14||Math.abs(u)<1e-14)u=0;
  coords.set(id,{u,v:.5+Math.asin(Math.max(-1,Math.min(1,y)))/Math.PI,pole});
 }
 if(poles!==2)return refuse();
 const uvCorners=[];
 for(const face of mesh.faces){
  const corners=face.map(id=>coords.get(id)),ring=corners.filter(p=>!p.pole);
  if(ring.length<2||corners.length-ring.length>1)return refuse();
  let min=Math.min(...ring.map(p=>p.u)),max=Math.max(...ring.map(p=>p.u));
  const wrap=max-min>.5;
  const us=ring.map(p=>p.u+(wrap&&p.u<.5?1:0));
  min=Math.min(...us);max=Math.max(...us);if(max-min>.5+1e-12||max>1+1e-12)return refuse();
  const poleU=min/2+max/2;
  const uv=corners.map(p=>[.02+.96*(p.pole?poleU:p.u+(wrap&&p.u<.5?1:0)),.02+.96*p.v]);
  let area=0;for(let j=0;j<uv.length;j++){const a=uv[j],b=uv[(j+1)%uv.length];area+=a[0]*b[1]-a[1]*b[0];}
  if(Math.abs(area)<1e-14)return refuse();
  uvCorners.push(uv);
 }
 return commitNativeUV(object,mesh,topologySignature,history,uvCorners);
}

// Read-only inspection of the importer's existing face-corner channel. The
// exporter supplies its authoritative topology signature; no second UV owner.
export function inspectImportedUV(mesh,payload,topologySignature,{maxPreviewCorners=20000}={}){
 const faces=mesh?.faces||[],uvs=payload?.uvCorners;
 const report={state:'absent',faces:faces.length,mappedFaces:0,missingFaces:0,invalidFaces:0,outsideCorners:0,previewFaces:[],previewFaceIndices:[],previewCorners:0,bounds:{minU:0,minV:0,maxU:1,maxV:1}};
 if(!Array.isArray(uvs)||!uvs.some(Boolean))return report;
 if(typeof topologySignature!=='function'){report.state='unavailable';return report;}
 if(!payload.uvTopologySignature||payload.uvTopologySignature!==topologySignature(mesh)){report.state='stale';return report;}
 if(uvs.length!==faces.length){report.state='invalid';return report;}
 for(let i=0;i<faces.length;i++){
  const corners=uvs[i];
  if(corners==null){report.missingFaces++;continue;}
  if(!Array.isArray(corners)||corners.length!==faces[i].length||corners.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))){report.invalidFaces++;continue;}
  report.mappedFaces++;
  for(const [u,v] of corners){
   report.bounds.minU=Math.min(report.bounds.minU,u);report.bounds.minV=Math.min(report.bounds.minV,v);
   report.bounds.maxU=Math.max(report.bounds.maxU,u);report.bounds.maxV=Math.max(report.bounds.maxV,v);
   if(u<0||u>1||v<0||v>1)report.outsideCorners++;
  }
  if(report.previewCorners+corners.length<=maxPreviewCorners){report.previewFaces.push(corners);report.previewFaceIndices.push(i);report.previewCorners+=corners.length;}
 }
 report.state=report.invalidFaces?'invalid':report.mappedFaces?'ready':'absent';
 if(report.state==='ready')inspectConnectivity(faces,uvs,report);
 return report;
}
function inspectConnectivity(faces,uvs,report){
 // Diagnostic adjacency only: never call mesh.edges(), which legacy bridges may
 // wrap with live-mesh publication side effects. Never weld or author UV data.
 const parent=new Int32Array(faces.length).fill(-1),edges=new Map();
 for(let fi=0;fi<faces.length;fi++){
  if(uvs[fi])parent[fi]=fi;
  const face=faces[fi];
  for(let i=0;i<face.length;i++){
   const a=face[i],b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`;
   if(!edges.has(key))edges.set(key,[]);
   edges.get(key).push({fi,i,a,b});
  }
 }
 const root=fi=>{while(parent[fi]!==fi){parent[fi]=parent[parent[fi]];fi=parent[fi];}return fi;};
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 const endpoints=o=>{const points=uvs[o.fi],next=(o.i+1)%points.length;return o.a<o.b?[points[o.i],points[next]]:[points[next],points[o.i]];};
 const preview=new Set(report.previewFaceIndices);
 report.seamEdges=0;report.boundaryEdges=0;report.nonManifoldEdges=0;report.previewSeams=[];
 for(const owners of edges.values()){
  const mapped=owners.filter(o=>parent[o.fi]>=0);if(!mapped.length)continue;
  if(owners.length>2||owners.some(o=>o.a===o.b)||owners.length===2&&owners[0].fi===owners[1].fi){report.nonManifoldEdges++;continue;}
  if(owners.length===1||mapped.length===1){report.boundaryEdges++;continue;}
  const [a,b]=mapped,[a0,a1]=endpoints(a),[b0,b1]=endpoints(b);
  if(same(a0,b0)&&same(a1,b1)){
   const ra=root(a.fi),rb=root(b.fi);parent[Math.max(ra,rb)]=Math.min(ra,rb);
  }else{
   report.seamEdges++;
   for(const o of mapped)if(preview.has(o.fi))report.previewSeams.push([uvs[o.fi][o.i],uvs[o.fi][(o.i+1)%uvs[o.fi].length]]);
  }
 }
 const islands=new Map();
 for(let fi=0;fi<faces.length;fi++)if(parent[fi]>=0){const r=root(fi);if(!islands.has(r))islands.set(r,islands.size);}
 report.islandCount=islands.size;
 report.faceIslands=Array.from(parent,(_,fi)=>parent[fi]>=0?islands.get(root(fi)):null);
 report.previewIslands=report.previewFaceIndices.map(fi=>report.faceIslands[fi]);
}
export function drawImportedUV(canvas,report,{padding=12,center=false,pixelRatio=1,view={},selectedIsland=null}={}){
 const ctx=canvas?.getContext?.('2d');if(!ctx)return false;
 const width=canvas.width,height=canvas.height;
 ctx.clearRect(0,0,width,height);ctx.fillStyle='#101722';ctx.fillRect(0,0,width,height);
 if(report.state!=='ready')return false;
 const {x,y}=uvProjection(width,height,report,{padding,center,view});
 ctx.strokeStyle='#69788e';ctx.lineWidth=pixelRatio;ctx.strokeRect(x(0),y(1),x(1)-x(0),y(0)-y(1));
 ctx.strokeStyle='#65d5f5';ctx.lineWidth=pixelRatio;
 // Bound each canvas path, including dense imports; no viewport render work.
 const colours=['#65d5f5','#b69aff','#8fe3a5','#f7cf72','#f39ac5','#82b3ff'];
 for(let i=0;i<report.previewFaces.length;i++){
  const face=report.previewFaces[i];ctx.strokeStyle=colours[(report.previewIslands?.[i]||0)%colours.length];
  ctx.beginPath();face.forEach(([u,v],i)=>i?ctx.lineTo(x(u),y(v)):ctx.moveTo(x(u),y(v)));ctx.closePath();ctx.stroke();
 }
 // Selection is view state only; preserve island colours/seams beneath it.
 if(Number.isInteger(selectedIsland))for(let i=0;i<report.previewFaces.length;i++){
  if(report.previewIslands?.[i]!==selectedIsland)continue;
  ctx.fillStyle='#ffe06a33';ctx.strokeStyle='#ffe06a';ctx.lineWidth=3*pixelRatio;
  ctx.beginPath();report.previewFaces[i].forEach(([u,v],j)=>j?ctx.lineTo(x(u),y(v)):ctx.moveTo(x(u),y(v)));ctx.closePath();ctx.fill();ctx.stroke();
 }
 ctx.strokeStyle='#ff9f43';ctx.lineWidth=2*pixelRatio;
 for(const [a,b] of report.previewSeams||[]){ctx.beginPath();ctx.moveTo(x(a[0]),y(a[1]));ctx.lineTo(x(b[0]),y(b[1]));ctx.stroke();}
 return true;
}

// Shared screen mapping for drawing and picking; UV coordinates remain read-only.
function uvProjection(width,height,report,{padding=12,center=false,view={}}={}){
 const {minU,minV,maxU,maxV}=report.bounds;
 // Normalize before subtracting so even large finite tiled UVs stay finite.
 const magnitude=Math.max(1,Math.abs(minU),Math.abs(minV),Math.abs(maxU),Math.abs(maxV));
 const span=Math.max(maxU/magnitude-minU/magnitude,maxV/magnitude-minV/magnitude);
 const scale=Math.max(1,Math.min(width,height)-2*padding)/span,zoom=view.zoom??1;
 const left=padding+(center?(width-2*padding-(maxU/magnitude-minU/magnitude)*scale)/2:0);
 const bottom=height-padding-(center?(height-2*padding-(maxV/magnitude-minV/magnitude)*scale)/2:0);
 const x=u=>(left+(u/magnitude-minU/magnitude)*scale-width/2)*zoom+width/2+(view.panX||0);
 const y=v=>(bottom-(v/magnitude-minV/magnitude)*scale-height/2)*zoom+height/2+(view.panY||0);
 return {x,y};
}
export function pickImportedUVIsland(width,height,report,point,options={}){
 if(report?.state!=='ready'||!Number.isFinite(point?.x)||!Number.isFinite(point?.y))return null;
 const {x,y}=uvProjection(width,height,report,options);
 // Reverse paint order gives deterministic topmost selection for stacked islands.
 for(let i=report.previewFaces.length-1;i>=0;i--){
  const face=report.previewFaces[i];if(face.length<3)continue;
  let inside=false,boundary=false;
  for(let j=0,k=face.length-1;j<face.length;k=j++){
   const ax=x(face[k][0]),ay=y(face[k][1]),bx=x(face[j][0]),by=y(face[j][1]);
   const dx=bx-ax,dy=by-ay,length=dx*dx+dy*dy,t=length?Math.max(0,Math.min(1,((point.x-ax)*dx+(point.y-ay)*dy)/length)):0;
   if(Math.hypot(point.x-ax-t*dx,point.y-ay-t*dy)<=1)boundary=true;
   if((ay>point.y)!==(by>point.y)&&point.x<(bx-ax)*(point.y-ay)/(by-ay)+ax)inside=!inside;
  }
  if(inside||boundary)return report.previewIslands?.[i]??null;
 }
 return null;
}

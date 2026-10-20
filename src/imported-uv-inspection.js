// Read-only inspection of the importer's existing face-corner channel. The
// exporter supplies its authoritative topology signature; no second UV owner.
export function inspectImportedUV(mesh,payload,topologySignature,{maxPreviewCorners=20000,includeEdgeOwners=false}={}){
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
 if(report.state==='ready')inspectConnectivity(faces,uvs,report,includeEdgeOwners);
 return report;
}
function inspectConnectivity(faces,uvs,report,includeEdgeOwners=false){
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
 if(includeEdgeOwners)report.edgeOwners=edges;
 const root=fi=>{while(parent[fi]!==fi){parent[fi]=parent[parent[fi]];fi=parent[fi];}return fi;};
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 const endpoints=o=>{const points=uvs[o.fi],next=(o.i+1)%points.length;return o.a<o.b?[points[o.i],points[next]]:[points[next],points[o.i]];};
 const preview=new Set(report.previewFaceIndices),seamFaces=[];
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
   for(const o of mapped)if(preview.has(o.fi)){report.previewSeams.push([uvs[o.fi][o.i],uvs[o.fi][(o.i+1)%uvs[o.fi].length]]);seamFaces.push(o.fi);}
  }
 }
 const islands=new Map();
 for(let fi=0;fi<faces.length;fi++)if(parent[fi]>=0){const r=root(fi);if(!islands.has(r))islands.set(r,islands.size);}
 report.islandCount=islands.size;
 report.faceIslands=Array.from(parent,(_,fi)=>parent[fi]>=0?islands.get(root(fi)):null);
 report.previewIslands=report.previewFaceIndices.map(fi=>report.faceIslands[fi]);
 report.previewSeamIslands=seamFaces.map(fi=>report.faceIslands[fi]);
}
export function drawImportedUV(canvas,report,{padding=12,center=false,pixelRatio=1,view={},selectedIsland=null,previewOffset=null,previewScale=null,previewRotation=null,checker=false,image=null}={}){
 const ctx=canvas?.getContext?.('2d');if(!ctx)return false;
 const width=canvas.width,height=canvas.height;
 ctx.clearRect(0,0,width,height);ctx.fillStyle='#101722';ctx.fillRect(0,0,width,height);
 if(report.state!=='ready')return false;
 const {x,y}=uvProjection(width,height,report,{padding,center,view});
 // Fixed 16×16 reference tile, using the exact navigation projection. Draw at
 // most 256 clipped rectangles even for extreme UV bounds/zoom; no image resource.
 if(checker){
  for(let row=0;row<16;row++)for(let col=0;col<16;col++){
   const left=Math.max(0,x(col/16)),right=Math.min(width,x((col+1)/16));
   const top=Math.max(0,y((row+1)/16)),bottom=Math.min(height,y(row/16));
   if(![left,right,top,bottom].every(Number.isFinite)||right<=left||bottom<=top)continue;
   ctx.fillStyle=(row+col)%2?'#26384c':'#1b2839';ctx.fillRect(left,top,right-left,bottom-top);
  }
 }
 // glTF UV0 maps image top to V=0. Our editor draws V upwards, so the
 // reference must be vertically flipped. Clip tile and canvas before transforming.
 if(image?.width>0&&image?.height>0){
  const x0=x(0),x1=x(1),y0=y(0),y1=y(1),left=Math.max(0,x0),right=Math.min(width,x1),top=Math.max(0,y1),bottom=Math.min(height,y0);
  if([x0,x1,y0,y1].every(Number.isFinite)&&right>left&&bottom>top&&x1>x0&&y0>y1){
   ctx.save();ctx.beginPath();ctx.rect(left,top,right-left,bottom-top);ctx.clip();
   ctx.translate(x0,y0);ctx.scale((x1-x0)/image.width,(y1-y0)/image.height);ctx.drawImage(image,0,0);ctx.restore();
  }
 }
 // Pencil preview moves only displayed selected corners; stored UV arrays stay read-only.
 const component=(p,k,moving)=>moving&&previewRotation?rotateImportedUVPoint(p,previewRotation.centre,previewRotation.degrees)[k]:moving&&previewScale?previewScale.centre[k]+(p[k]-previewScale.centre[k])*previewScale.factor:p[k]+(moving&&previewOffset?(k?previewOffset.v:previewOffset.u):0);
 const px=(p,moving)=>x(component(p,0,moving)),py=(p,moving)=>y(component(p,1,moving));
 ctx.strokeStyle='#69788e';ctx.lineWidth=pixelRatio;ctx.strokeRect(x(0),y(1),x(1)-x(0),y(0)-y(1));
 ctx.strokeStyle='#65d5f5';ctx.lineWidth=pixelRatio;
 // Bound each canvas path, including dense imports; no viewport render work.
 const colours=['#65d5f5','#b69aff','#8fe3a5','#f7cf72','#f39ac5','#82b3ff'];
 for(let i=0;i<report.previewFaces.length;i++){
  const face=report.previewFaces[i],moving=report.previewIslands?.[i]===selectedIsland;ctx.strokeStyle=colours[(report.previewIslands?.[i]||0)%colours.length];
  ctx.beginPath();face.forEach((p,i)=>i?ctx.lineTo(px(p,moving),py(p,moving)):ctx.moveTo(px(p,moving),py(p,moving)));ctx.closePath();ctx.stroke();
 }
 // Selection is view state only; preserve island colours/seams beneath it.
 if(Number.isInteger(selectedIsland))for(let i=0;i<report.previewFaces.length;i++){
  if(report.previewIslands?.[i]!==selectedIsland)continue;
  ctx.fillStyle='#ffe06a33';ctx.strokeStyle='#ffe06a';ctx.lineWidth=3*pixelRatio;
  ctx.beginPath();report.previewFaces[i].forEach((p,j)=>j?ctx.lineTo(px(p,true),py(p,true)):ctx.moveTo(px(p,true),py(p,true)));ctx.closePath();ctx.fill();ctx.stroke();
 }
 ctx.strokeStyle='#ff9f43';ctx.lineWidth=2*pixelRatio;
 for(let i=0;i<(report.previewSeams?.length||0);i++){const [a,b]=report.previewSeams[i],moving=report.previewSeamIslands?.[i]===selectedIsland;ctx.beginPath();ctx.moveTo(px(a,moving),py(a,moving));ctx.lineTo(px(b,moving),py(b,moving));ctx.stroke();}
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
 return {x,y,delta:(dx,dy)=>({u:dx/scale/zoom*magnitude,v:-dy/scale/zoom*magnitude})};
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

// Use the renderer's projection for CSS-pixel Pencil movement, independent of DPR.
export function importedUVScreenDelta(width,height,report,dx,dy,options={}){
 if(report?.state!=='ready'||![width,height,dx,dy].every(Number.isFinite))return null;
 const delta=uvProjection(width,height,report,options).delta(dx,dy);
 return Object.values(delta).every(Number.isFinite)?delta:null;
}

// Shared read-only bounds centre for exact edits and gesture previews. Includes
// every face of the selected island, even beyond the canvas preview budget.
export function importedUVIslandBounds(uvCorners,faces){
 if(!Array.isArray(faces)||!faces.length)return null;
 let minU=Infinity,minV=Infinity,maxU=-Infinity,maxV=-Infinity;
 for(const fi of faces){
  const face=uvCorners?.[fi];if(!Array.isArray(face)||!face.length)return null;
  for(const p of face){if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))return null;
   const [u,v]=p;minU=Math.min(minU,u);maxU=Math.max(maxU,u);minV=Math.min(minV,v);maxV=Math.max(maxV,v);
  }
 }
 return {minU,minV,maxU,maxV};
}
export function importedUVIslandCentre(uvCorners,faces){
 const b=importedUVIslandBounds(uvCorners,faces);
 return b?[b.minU/2+b.maxU/2,b.minV/2+b.maxV/2]:null;
}

// Shared point maths for preview and committed arbitrary-angle rotations.
// Exact quarter turns retain the accepted Rotate90 layout without trig drift.
export function rotateImportedUVPoint([u,v],[cu,cv],degrees){
 let angle=degrees%360;if(angle<0)angle+=360;
 if(angle===0)return [u,v];
 if(angle===90)return [cu+(cv-v),cv+(u-cu)];
 if(angle===180)return [cu+(cu-u),cv+(cv-v)];
 if(angle===270)return [cu+(v-cv),cv+(cu-u)];
 const radians=angle*Math.PI/180,c=Math.cos(radians),s=Math.sin(radians),du=u-cu,dv=v-cv;
 return [cu+du*c-dv*s,cv+du*s+dv*c];
}

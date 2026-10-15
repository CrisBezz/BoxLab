// Read-only inspection of the importer's existing face-corner channel. The
// exporter supplies its authoritative topology signature; no second UV owner.
export function inspectImportedUV(mesh,payload,topologySignature,{maxPreviewCorners=20000}={}){
 const faces=mesh?.faces||[],uvs=payload?.uvCorners;
 const report={state:'absent',faces:faces.length,mappedFaces:0,missingFaces:0,invalidFaces:0,outsideCorners:0,previewFaces:[],previewCorners:0,bounds:{minU:0,minV:0,maxU:1,maxV:1}};
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
  if(report.previewCorners+corners.length<=maxPreviewCorners){report.previewFaces.push(corners);report.previewCorners+=corners.length;}
 }
 report.state=report.invalidFaces?'invalid':report.mappedFaces?'ready':'absent';
 return report;
}
export function drawImportedUV(canvas,report){
 const ctx=canvas?.getContext?.('2d');if(!ctx)return false;
 const width=canvas.width,height=canvas.height;
 ctx.clearRect(0,0,width,height);ctx.fillStyle='#101722';ctx.fillRect(0,0,width,height);
 if(report.state!=='ready')return false;
 const {minU,minV,maxU,maxV}=report.bounds;
 // Normalize before subtracting so even large finite tiled UVs stay finite.
 const magnitude=Math.max(1,Math.abs(minU),Math.abs(minV),Math.abs(maxU),Math.abs(maxV));
 const span=Math.max(maxU/magnitude-minU/magnitude,maxV/magnitude-minV/magnitude);
 const scale=(Math.min(width,height)-24)/span;
 const x=u=>12+(u/magnitude-minU/magnitude)*scale;
 const y=v=>height-12-(v/magnitude-minV/magnitude)*scale;
 ctx.strokeStyle='#69788e';ctx.lineWidth=1;ctx.strokeRect(x(0),y(1),x(1)-x(0),y(0)-y(1));
 ctx.strokeStyle='#65d5f5';ctx.lineWidth=1;
 // Bound each canvas path, including dense imports; no viewport render work.
 for(const face of report.previewFaces){
  ctx.beginPath();face.forEach(([u,v],i)=>i?ctx.lineTo(x(u),y(v)):ctx.moveTo(x(u),y(v)));ctx.closePath();ctx.stroke();
 }
 return true;
}

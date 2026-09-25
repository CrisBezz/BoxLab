export function meshToOBJ(mesh,objectName='BoxLabMesh'){
  const lines=['# BoxLab OBJ export',`o ${objectName}`];
  mesh.vertices.forEach(v=>lines.push(`v ${fmt(v.x)} ${fmt(v.y)} ${fmt(v.z)}`));
  mesh.faces.forEach(face=>lines.push(`f ${face.map(i=>i+1).join(' ')}`));
  return lines.join('\n')+'\n';
}

export function downloadOBJ(mesh,filename){
  const pageVersion=document.title.match(/BoxLab v([^\s]+)/)?.[1];
  const resolvedFilename=pageVersion?filename.replace(/BoxLab-v[^-]+/,`BoxLab-v${pageVersion}`):filename;
  const blob=new Blob([meshToOBJ(mesh)],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=resolvedFilename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function fmt(value){return Number(value.toFixed(6)).toString();}

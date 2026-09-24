import {subdivide} from './subdivision.js?v=0.12';
import {applyMirror} from './mirror.js?v=0.12';
import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.445';

function fmt(value){return Number(Number(value).toFixed(6)).toString();}
export function safeOBJName(value,index=0){
  const clean=String(value||`Object ${index+1}`).trim().replace(/[\r\n]+/g,' ').replace(/\s+/g,' ');
  return clean||`Object ${index+1}`;
}
export function resolveExportMesh(object,subd=false){
  let mesh=object?.mesh?.clone?object.mesh.clone():object?.mesh;
  if(!mesh)return null;
  if(subd)mesh=subdivide(mesh,Math.max(1,Math.min(4,Number(object.settings?.subdLevel||1))));
  return applyMirror(mesh,object.settings?.mirror||{x:false,y:false,z:false});
}
function summaryLine(health){
  return `# BoxLab health: ${health.label} | boundary ${health.boundaryEdges} | non-manifold ${health.nonManifoldEdges} | winding ${health.inconsistentWindingEdges} | tris ${health.triangles} | quads ${health.quads} | ngons ${health.ngons}`;
}
export function buildSceneOBJ(objects,{subd=false,version='unknown'}={}){
  const lines=['# BoxLab scene OBJ export',`# BoxLab v${version}`,`# Export mode: ${subd?'SubD':'Base'}`];
  let offset=0,exported=0;
  const reports=[];
  for(let index=0;index<(objects||[]).length;index++){
    const object=objects[index],mesh=resolveExportMesh(object,subd);
    if(!mesh?.vertices?.length||!mesh?.faces?.length)continue;
    const name=safeOBJName(object.name,index),health=analyzeMeshHealth(mesh);
    reports.push({name,health,vertices:mesh.vertices.length,faces:mesh.faces.length});
    lines.push('',`# Object ${exported+1}: ${name}`,summaryLine(health),`o ${name}`);
    mesh.vertices.forEach(v=>lines.push(`v ${fmt(v.x)} ${fmt(v.y)} ${fmt(v.z)}`));
    let activeGroup=undefined;
    mesh.faces.forEach((face,faceIndex)=>{
      const group=typeof mesh.faceGroups?.[faceIndex]==='string'&&mesh.faceGroups[faceIndex].trim()?mesh.faceGroups[faceIndex].trim():null;
      if(group!==activeGroup){
        if(group)lines.push(`g ${group}`);
        else if(activeGroup!==undefined)lines.push('g');
        activeGroup=group;
      }
      lines.push(`f ${face.map(i=>i+1+offset).join(' ')}`);
    });
    offset+=mesh.vertices.length;exported++;
  }
  const open=reports.filter(r=>r.health.state==='open-clean').length;
  const issues=reports.filter(r=>r.health.state==='issues').length;
  const closed=reports.filter(r=>r.health.state==='closed-clean').length;
  lines.splice(3,0,`# Preflight: ${closed} closed clean | ${open} open clean | ${issues} issues`);
  return{content:lines.join('\n')+'\n',exported,vertices:offset,reports,preflight:{closed,open,issues}};
}

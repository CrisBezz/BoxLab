import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {EditableMesh} from '../src/mesh.js';
import {resolveExportMesh} from '../src/scene-obj-export-core.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
const source=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const cube=()=>({name:'Cube',mesh:EditableMesh.cube(),settings:{}});
function field(project,index,key){const f=project.json.meshes[index][key];return new DataView(project.bin.buffer,project.bin.byteOffset+f.offset,f.length);}
test('Native NOM uses the unchanged MeshUtilz donor header and validated section layout',()=>{
 assert.equal(createHash('sha256').update(template).digest('hex'),'9cc56cc4fdea095ec5b8eb917e0101b0e9433f5af54dd3e554ac5b76724010d8');
 const base=readNomadProject(template),out=buildNomadProject([cube()],template),p=readNomadProject(out.bytes);assert.equal(out.count,1);assert.equal(p.jo,base.jo);assert.equal(new DataView(out.bytes.buffer).getUint32(12,true),6);assert.equal(Number(new DataView(out.bytes.buffer).getBigUint64(40,true))%8,0);assert.equal(out.bytes.length,Number(new DataView(out.bytes.buffer).getBigUint64(16,true)));
});
test('Separate named meshes preserve shared vertices, quads, winding, coordinates and facegroups without source mutation',()=>{
 const a=cube();a.name='Body Ω';a.mesh.faceGroups=['Front','Back','Front',null,'Top','Top'];const b=cube();b.name='Trim';b.mesh.vertices.forEach(v=>v.y+=4);const before=[a.mesh.clone(),b.mesh.clone()];
 const out=buildNomadProject([a,b],template,{name:'BoxLab scene'}),p=readNomadProject(out.bytes);assert.equal(out.count,2);assert.equal(out.vertices,16);assert.equal(out.faces,12);assert.equal(p.json.scene[0].name,'BoxLab scene');assert.deepEqual(p.json.scene[0].children.map(n=>n.name),['Body Ω','Trim']);
 for(const [i,obj] of [a,b].entries()){
 const mesh=p.json.meshes[i];assert.equal(mesh.name,obj.name);assert.equal(mesh.count_vertex,8);assert.equal(mesh.count_face,6);assert.equal(mesh.mesh_type,undefined);assert.equal(mesh.config_tube,undefined);assert.equal(mesh.symmetry_x,false);
 const verts=field(p,i,'vertices'),faces=field(p,i,'faces'),groups=field(p,i,'faces_group');obj.mesh.vertices.forEach((v,j)=>['x','y','z'].forEach((axis,k)=>assert.equal(verts.getFloat32(j*12+k*4,true),Math.fround(v[axis]))));
 obj.mesh.faces.forEach((face,j)=>{assert.deepEqual(face.map((_,k)=>faces.getInt32(j*16+k*4,true)),face);assert.equal(mesh.groups[groups.getUint16(j*2,true)].name,obj.mesh.faceGroups[j]||'Main');});
 for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group']){const f=mesh[key];assert.equal(f.lz4,false);assert.equal(f.only_zeros,false);assert.ok(f.offset>=0&&f.offset+f.length<=p.bin.length);}
 assert.deepEqual(obj.mesh,before[i]);
 }
 assert.ok(p.json.meshes[1].vertices.offset>p.json.meshes[0].faces_group.offset);
});
test('Concave n-gons triangulate with original winding and inherited groups; triangles use validated NOM fourth-index convention',()=>{
 const mesh=new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[1,1,0],[0,2,0]],[[0,1,2,3,4]],null,['Concave']);const out=buildNomadProject([{name:'N-gon',mesh}],template),p=readNomadProject(out.bytes),v=field(p,0,'faces');assert.equal(out.faces,3);let area=0;
 for(let i=0;i<3;i++){const ids=[0,1,2,3].map(k=>v.getInt32(i*16+k*4,true));assert.equal(ids[2],ids[3]);const [a,b,c]=ids.slice(0,3).map(j=>mesh.vertices[j]);const cross=b.clone().sub(a).cross(c.clone().sub(a));assert.ok(cross.z>0);area+=cross.z/2;}assert.equal(area,3);assert.equal(p.json.meshes[0].groups[0].name,'Concave');
});
test('Base/Mirror/SubD use original export mesh resolver and omit hidden/reference/empty objects',()=>{
 const a=cube();a.settings={subdLevel:1,mirror:{x:true,y:false,z:false}};const before=a.mesh.clone();
 for(const subd of [false,true]){const expected=resolveExportMesh(a,subd),p=readNomadProject(buildNomadProject([a,{...cube(),visible:false},{...cube(),kind:'reference'},{name:'Empty',mesh:new EditableMesh([],[])}],template,{subd}).bytes);assert.equal(p.json.meshes.length,1);assert.equal(p.json.meshes[0].count_vertex,expected.vertices.length);assert.equal(p.json.meshes[0].count_face,expected.faces.length);}
 assert.deepEqual(a.mesh,before);
});
test('Malformed header, coordinates, indices and degenerate geometry fail before producing a file',()=>{
 assert.throws(()=>readNomadProject(new Uint8Array(56)),/header/);const broken=Uint8Array.from(template);new DataView(broken.buffer,broken.byteOffset,broken.byteLength).setBigUint64(40,1n,true);assert.throws(()=>readNomadProject(broken),/bounds/);
 assert.throws(()=>buildNomadProject([],template),/No visible/);
 for(const kind of ['coordinate','index','degenerate']){const a=cube();if(kind==='coordinate')a.mesh.vertices[0].x=Infinity;if(kind==='index')a.mesh.faces[0][0]=900;if(kind==='degenerate')a.mesh.vertices.forEach(v=>v.set(0,0,0));assert.throws(()=>buildNomadProject([a],template),/coordinates|indices|Degenerate/);}
});
function ui(){const saves=[],status={},button={disabled:false},note={textContent:'GLB instructions',hidden:false};let fetches=0,outcome='saved';
 const c={URL,Blob,shareButton:button,status,note,nameInput:{value:'Body/Trim'},cleanName:value=>value.replace('/','_'),objects:()=>[cube()],geometry:'base',buildNomadProject,fetch:async url=>{fetches++;assert.match(String(url),/src\/templates\/nomad-tube\.nom$/);return{ok:true,arrayBuffer:async()=>template};},downloadBlob:(...args)=>saves.push(args)};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function updateNote(){'),source.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/BoxLab/src/export-as-panel.js'"),c);return{c,saves,status,button,note,get fetches(){return fetches;},outcome:value=>outcome=value};}
test('Actual NOMAD UI builds native bytes with filename, MIME and browser download options; explanation disappears and template caches',async()=>{
 const f=ui();f.c.updateNote();assert.equal(f.button.textContent,'NOMAD');assert.equal(f.note.hidden,true);assert.equal(f.note.textContent,'');await f.c.exportNomad();assert.equal(f.button.disabled,false);const [blob,name,revokeAfter]=f.saves[0];assert.equal(name,'Body_Trim.nom');assert.equal(blob.type,'application/x-nomad-sculpt');assert.equal(revokeAfter,60000);assert.equal(readNomadProject(await blob.arrayBuffer()).json.meshes[0].count_face,6);assert.match(f.status.textContent,/1 object.*6 faces.*Open In/);await f.c.exportNomad();assert.equal(f.fetches,1);
 assert.match(source,/shareButton\?\.addEventListener\('click'.*exportNomad\(\)/);
});
test('NOMAD busy/no-mesh/download failure do not mutate geometry or report a successful save',async()=>{
 const f=ui();f.button.disabled=true;await f.c.exportNomad();assert.equal(f.saves.length,0);f.button.disabled=false;f.c.objects=()=>[];await f.c.exportNomad();assert.match(f.status.textContent,/no visible/);f.c.objects=()=>[cube()];f.c.downloadBlob=()=>{throw Error('disk failed');};await f.c.exportNomad();assert.match(f.status.textContent,/export failed.*disk failed/);assert.equal(f.button.disabled,false);
});
test('Existing save owner receives NOM extension and description while retaining picker cancellation',async()=>{
 let options,written;const c={format:'glb',extension:()=> 'glb',navigator:{},window:{showSaveFilePicker:async o=>{options=o;return{createWritable:async()=>({write:async b=>written=b,close:async()=>{}})}}},downloadBlob(){throw Error('Unexpected download');}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('async function saveBlob('),source.indexOf('function faceNormal(')),c);const blob=new Blob(['nom']);assert.equal(await c.saveBlob(blob,'Model.nom','application/x-nomad-sculpt',{description:'Nomad Sculpt project',suffix:'nom'}),'saved');assert.equal(options.types[0].accept['application/x-nomad-sculpt'][0],'.nom');assert.equal(written,blob);c.window.showSaveFilePicker=async()=>{throw {name:'AbortError'};};assert.equal(await c.saveBlob(blob,'Model.nom','application/x-nomad-sculpt',{suffix:'nom'}),'cancelled');
});

test('Native NOM uses a browser anchor download and retains URL for preview without calling share/save-picker',()=>{
 const calls=[],anchor={click(){calls.push('click');},remove(){calls.push('remove');}},timers=[];const c={URL:{createObjectURL:()=> 'blob:nom',revokeObjectURL:url=>calls.push(url)},document:{createElement:()=>anchor,body:{appendChild:()=>calls.push('append')}},setTimeout:(fn,ms)=>timers.push({fn,ms})};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function downloadBlob('),source.indexOf('async function shareBlob(')),c);c.downloadBlob(new Blob(['NOM']),'Body.nom',60000);assert.equal(anchor.download,'Body.nom');assert.equal(anchor.href,'blob:nom');assert.deepEqual(calls,['append','click','remove']);assert.equal(timers[0].ms,60000);timers[0].fn();assert.equal(calls.at(-1),'blob:nom');const nomad=source.slice(source.indexOf('async function exportNomad('),source.indexOf('function extension('));assert.doesNotMatch(nomad,/saveBlob|navigator.share|showSaveFilePicker/);
});

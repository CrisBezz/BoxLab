import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {EditableMesh} from '../../src/mesh.js';
import {evaluateTrianglePair} from '../../src/quad-clean-core.js';
import {resolveExportMesh,safeOBJName} from '../../src/scene-obj-export-core.js';
export const glbSource=name=>fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8');
// Node transport polyfill only. Real Three exporter/loader, geometry, fit/weld/
// reconstruction and metadata patch. No image decode/WebGL or browser File UI.
class BlobReader{
 readAsArrayBuffer(blob){blob.arrayBuffer().then(data=>{this.result=data;this.onload?.();this.onloadend?.();}).catch(e=>this.onerror?.(e));}
 readAsDataURL(blob){blob.arrayBuffer().then(data=>{this.result='data:'+blob.type+';base64,'+Buffer.from(data).toString('base64');this.onload?.();this.onloadend?.();});}
}
globalThis.FileReader??=BlobReader;
export function glbOwnerRuntime({importSource=glbSource('import-mesh.js'),exportSource=glbSource('export-as-panel.js')}={}){
 const added=[];let message='';
 const c={THREE,EditableMesh,evaluateTrianglePair,resolveExportMesh,safeOBJName,GLTFExporter,GLTFLoader,TextEncoder,TextDecoder,Uint8Array,DataView,ArrayBuffer,console,
  IMPORT_TARGET_SIZE:2,EDITABLE_WELD_TOLERANCE:1e-6,importKind:'editable',splitGroupsToggle:{checked:false},FileReader:BlobReader,
  setStatus:text=>message=text,fileBaseName:file=>file.name.replace(/\.[^.]+$/,''),__boxlabObjectManager:{addMesh:(mesh,name,options)=>added.push({mesh,name,...options})}};
 vm.createContext(c);
 vm.runInContext(importSource.slice(importSource.indexOf('function cloneJSON('),importSource.indexOf('kindButtons.forEach')),c);
 vm.runInContext(exportSource.slice(exportSource.indexOf('function faceNormal('),exportSource.indexOf('async function shareOpenIn(')),c);
 return {c,added,status:()=>message,build:(objects,subd=false)=>c.buildGLB(objects,subd),
  async decode(buffer){return (await new GLTFLoader().parseAsync(buffer,'')).scene;},
  async import(buffer,{split=false}={}){const scene=await this.decode(buffer),entries=c.importedMeshes(scene,{splitByGroups:split}),payload=c.parseGLBPassthrough(buffer);if(payload&&!split)entries.forEach((entry,i)=>entry.glbPassthrough=payload.objects[i]);c.addImported(entries,'RoundTrip',{reconstructQuads:true});return added;}
 };
}
export function decodeGLB(buffer){
 const bytes=new Uint8Array(buffer),view=new DataView(buffer);let json,bin;
 for(let offset=12;offset<bytes.length;){const len=view.getUint32(offset,true),type=view.getUint32(offset+4,true),part=bytes.slice(offset+8,offset+8+len);if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(part).trim());if(type===0x004e4942)bin=part;offset+=8+len;}
 return{json,bin};
}

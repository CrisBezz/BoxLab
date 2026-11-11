import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {createCageBatch} from '../../src/cage-render-batches.js';
const read=p=>fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const multi=read('src/multi-object.js'),main=read('src/main.js'),management=read('src/object-management.js');
export function extractFunction(source,name){const start=source.indexOf(`function ${name}(`);if(start<0)throw Error(name);const next=source.indexOf('\nfunction ',start+1);return source.slice(start,next<0?source.length:next);}
const mainLine=name=>{const start=main.indexOf(`function ${name}(`);return main.slice(start,main.indexOf('\n',start));};
export const oldReader=read('tests/fixtures/performance/group-context-1096.js');
export const newReader=extractFunction(management,'selectedWholeGroupId');
export const metadataReader=extractFunction(multi,'groupMetadata');
export function grid(n){const vertices=[],faces=[];for(let z=0;z<=n;z++)for(let x=0;x<=n;x++)vertices.push([x,((x*17+z*13)%31)/31,z]);for(let z=0;z<n;z++)for(let x=0;x<n;x++){const a=z*(n+1)+x;faces.push([a,a+1,a+n+2,a+n+1]);}return new EditableMesh(vertices,faces);}
export function cageHarness({legacy=false,mesh=grid(4),mode='face',group=false,hidden=false,soloId=null,mainSource=main,componentSelection=null}={}){
 class Group extends THREE.Group{}
 const apiTHREE={...THREE,Group},root=new Group(),objects=[{id:1,groupId:group?7:null,visible:!hidden,mesh:mesh.clone()},{id:2,groupId:group?7:null,visible:true,mesh:EditableMesh.cube()}];
 const selectedIds=new Set(group?[1,2]:[1]),historyMesh=mesh.clone(),h={undoStack:[historyMesh],redoStack:[]};let saves=0,clones=0;const cloneOwners=[];
 for(const m of [mesh,historyMesh]){const clone=m.clone,descriptor=Object.getOwnPropertyDescriptor(m,'clone'),wrapper=function(){clones++;return clone.call(this);};m.clone=wrapper;cloneOwners.push({m,descriptor,wrapper});}
 const material=new THREE.MeshBasicMaterial(),line=new THREE.LineBasicMaterial(),bridge={mesh};
 const c={THREE:apiTHREE,objects,activeId:1,activeRoot:null,activeBody:null,soloId,linkedSources:new Map(),state:()=>bridge,history:()=>h,document:{querySelector:()=>null,querySelectorAll:()=>[]},queueMicrotask:()=>{},saveActive:null,
  rebuildInactiveLayer:()=>{},queueOutliner:()=>{},createCageBatch,mesh,root,activeLoopSlides:[],activeLoopSlide:null,selection:componentSelection,selectionMode:mode,directTool:null,selectionHas:()=>false,edgeAxis:()=> 'neutral',axisLineMaterials:{neutral:line},creaseEdgeMaterial:line,edgeMaterial:line,selectedVertexMaterial:material,vertexMaterial:material,activeLoopMaterial:line,currentLoopMaterial:line,addSelectedEdgeOverlay:()=>{}};
 vm.createContext(c);
 vm.runInContext(['activeObject','groupMetadata','captureSettings','captureHistory','saveActive','activeShouldShow','installRenderObserver'].map(n=>extractFunction(multi,n)).join('\n')+'\n'+['selectionIndices','selectionHas','clearGroup'].map(n=>extractFunction(mainSource,n).split('\n')[0]).join('\n')+'\n'+extractFunction(mainSource,'addCage').split('\n')[0]+'\n'+extractFunction(mainSource,'addFacePickers').split('\n')[0],c);
 const originalSave=c.saveActive;c.saveActive=()=>{saves++;return originalSave();};
 const manager={get objects(){c.saveActive();return objects;},groupMetadata:c.groupMetadata};
 const selection={manager:()=>manager,objects:()=>manager.objects,selectedIds};selection.selectedObjects=()=>selection.objects().filter(o=>selectedIds.has(o.id));selection.groupMembers=id=>selection.objects().filter(o=>o.groupId===id);
 vm.createContext(selection);vm.runInContext(legacy?oldReader:newReader,selection);
 c.__boxlabObjectSelection={get wholeGroupId(){return selection.selectedWholeGroupId();}};
 c.installRenderObserver();
 const body=new THREE.Mesh(new THREE.BufferGeometry(),material);body.userData.kind='body';
 function build(){const start=performance.now();root.add(body);c.addCage();return performance.now()-start;}
 function signature(){return root.children.map(o=>({kind:o.userData.kind,index:o.userData.index,visible:o.visible,order:o.renderOrder,position:o.position.toArray(),positions:Array.from(o.geometry?.attributes.position?.array||[]),materialVisible:o.material?.visible,selected:o.userData.selected}));}
 function dispose(){const geometries=new Set(root.children.map(o=>o.geometry).filter(Boolean));for(const o of root.children){if(o.isInstancedMesh)o.dispose();if(o.material?.userData?.disposable)o.material.dispose();}for(const g of geometries)g.dispose();material.dispose();line.dispose();for(const {m,descriptor,wrapper} of cloneOwners)if(m.clone===wrapper){if(descriptor)Object.defineProperty(m,'clone',descriptor);else delete m.clone;}}
 return {build,signature,dispose,root,objects,mesh,selectedIds,manager,selection,c,counts:()=>({saves,clones})};
}

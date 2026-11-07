// Run from repo root: node scripts/benchmark-cage.mjs
// Executes the authoritative addCage with real Three geometry; no WebGL/GPU claim.
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createCageBatch} from '../src/cage-render-batches.js';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const start=source.indexOf('function addCage(){'),end=source.indexOf('\n',start),code=source.slice(start,end);
function fixture(n){const vertices=[],faces=[];for(let y=0;y<=n;y++)for(let x=0;x<=n;x++)vertices.push(new THREE.Vector3(x/n,y/n,0));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=y*(n+1)+x;faces.push([a,a+1,a+n+2,a+n+1]);}return new EditableMesh(vertices,faces);}
function run(n,legacy=false){const mesh=fixture(n),root=new THREE.Group(),material=new THREE.MeshBasicMaterial(),line=new THREE.LineBasicMaterial();mesh.edges();
 const c={THREE,createCageBatch,mesh,root,activeLoopSlides:[],activeLoopSlide:null,selection:null,selectionMode:'object',directTool:null,selectionHas:()=>false,axisLineMaterials:{neutral:line},creaseEdgeMaterial:line,edgeMaterial:line,selectedVertexMaterial:material,vertexMaterial:material};vm.createContext(c);vm.runInContext(legacy?fs.readFileSync(new URL('../tests/fixtures/performance/cage-809.js',import.meta.url),'utf8'):code,c);
 let edgeEnumerations=0;const originalEdges=mesh.edges.bind(mesh);mesh.edges=()=>{edgeEnumerations++;return originalEdges();};
 const start=performance.now();c.addCage();const ms=performance.now()-start,resources=root.children.filter(o=>o.material.visible!==false).length,unique=new Set(root.children.map(o=>o.geometry)),positionBytes=[...unique].reduce((sum,g)=>sum+(g?.attributes.position?.array.byteLength||0),0);
 root.children.forEach(o=>{if(o.isInstancedMesh)o.dispose();});unique.forEach(g=>g.dispose());material.dispose();line.dispose();return{faces:mesh.faces.length,vertices:mesh.vertices.length,edges:originalEdges().length,cageDrawObjects:resources,uniqueGeometries:unique.size,positionAttributeBytes:positionBytes,edgeEnumerations,constructionMs:Number(ms.toFixed(2))};}
run(4);console.log(JSON.stringify({scope:'Before exact .809 cage; after current cage. Node CPU construction only; active cage, no face pickers, no GPU rendering. Position bytes exclude normals, UVs, indices, driver and JS overhead.',node:process.version,results:[10,20,40].map(n=>({density:n,before:run(n,true),after:run(n)}))},null,2));

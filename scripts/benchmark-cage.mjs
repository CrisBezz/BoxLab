// Run from repo root: node scripts/benchmark-cage.mjs
// Executes the authoritative addCage with real Three geometry; no WebGL/GPU claim.
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const start=source.indexOf('function addCage(){'),end=source.indexOf('\n',start),code=source.slice(start,end);
function fixture(n){const vertices=[],faces=[];for(let y=0;y<=n;y++)for(let x=0;x<=n;x++)vertices.push(new THREE.Vector3(x/n,y/n,0));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=y*(n+1)+x;faces.push([a,a+1,a+n+2,a+n+1]);}return new EditableMesh(vertices,faces);}
function run(n,legacy=false){const mesh=fixture(n),root=new THREE.Group(),material=new THREE.MeshBasicMaterial(),line=new THREE.LineBasicMaterial();mesh.edges();
 const c={THREE,mesh,root,activeLoopSlides:[],activeLoopSlide:null,selection:null,selectionMode:'object',directTool:null,selectionHas:()=>false,axisLineMaterials:{neutral:line},creaseEdgeMaterial:line,edgeMaterial:line,selectedVertexMaterial:material,vertexMaterial:material};vm.createContext(c);vm.runInContext(legacy?code.replace('(mesh.creases.get(mesh.edgeKey(e.a,e.b))||0)>0','mesh.edgeCrease(index)>0'):code,c);
 let edgeEnumerations=0;const originalEdges=mesh.edges.bind(mesh);mesh.edges=()=>{edgeEnumerations++;return originalEdges();};
 const start=performance.now();c.addCage();const ms=performance.now()-start,resources=root.children.length,positionBytes=root.children.reduce((sum,o)=>sum+(o.geometry?.attributes.position?.array.byteLength||0),0);
 root.children.forEach(o=>o.geometry.dispose());material.dispose();line.dispose();return{faces:mesh.faces.length,vertices:mesh.vertices.length,edges:originalEdges().length,cageObjects:resources,positionAttributeBytes:positionBytes,edgeEnumerations,constructionMs:Number(ms.toFixed(2))};}
run(4);console.log(JSON.stringify({scope:'Node CPU construction only; active cage, no face pickers, no GPU rendering. Position bytes exclude normals, UVs, indices, driver and JS overhead.',node:process.version,results:[10,20,40].map(n=>({density:n,before:run(n,true),after:run(n)}))},null,2));

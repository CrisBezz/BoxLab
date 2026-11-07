import {PMREMGenerator} from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
// Reflection input belongs only to painted metallic materials, never the scene.
// Share one bounded PMREM per renderer while surfaces retain it.
function generateRoomMap(renderer){
 const room=new RoomEnvironment();let generator;
 try{generator=new PMREMGenerator(renderer);return generator.fromScene(room,0,.1,100,{size:128});}
 finally{room.dispose();generator?.dispose();}
}
export function createPaintEnvironmentPool(generate=generateRoomMap){
 const entries=new WeakMap();
 return {acquire(renderer){
  if(!renderer?.isWebGLRenderer)return null;
  let entry=entries.get(renderer);
  if(!entry){const target=generate(renderer);entry={target,count:0};entries.set(renderer,entry);}
  entry.count++;let released=false;
  return {texture:entry.target.texture,release(){if(released)return;released=true;if(--entry.count===0){entries.delete(renderer);entry.target.dispose();}}};
 }};
}
export const paintMaterialEnvironments=createPaintEnvironmentPool();

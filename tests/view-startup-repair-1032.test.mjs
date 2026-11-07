import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const source=fs.readFileSync(process.env.BOXLAB_RENDER_UI_SOURCE||new URL('../src/render-modes.js',import.meta.url),'utf8');
function button(mode){return {dataset:{render:mode},textContent:mode,ownListener:{},classList:{toggle(){}},closest(){return this;}};}
function runtime(initial=[],ready=false){
 let host={dataset:ready?{ready:'true'}:{},children:[...initial],handlers:[],querySelectorAll(){return this.children;},appendChild(b){this.children.push(b);},addEventListener(type,fn){if(type==='click')this.handlers.push(fn);},set innerHTML(markup){this.children=parse(markup);}};
 const parse=markup=>[...markup.matchAll(/data-render="([^"]+)"/g)].map(m=>button(m[1]));
 const listeners=[],modes=[],c={mode:'studio',document:{querySelector:()=>host,createElement:()=>({content:{children:[]},set innerHTML(s){this.content.children=parse(s);}}),addEventListener:(name,fn)=>listeners.push([name,fn])},setMode:m=>modes.push(m),installFacegroupControls(){},queueMicrotask:fn=>fn(),rebuild(){}};
 vm.createContext(c);const start=source.indexOf('function installUI(){'),end=source.indexOf('queueMicrotask(rebuild);',start);assert(start>=0&&end>start);vm.runInContext(source.slice(start,end),c);
 return {c,modes,listeners,get host(){return host;},replace(value){host=value;},toggle(){for(const [name,fn] of listeners)if(name==='toggle')fn({target:{id:'viewModes',open:true}});}};
}
test('1032 actual render installer preserves early Cavity/Silhouette nodes and binds original look actions exactly once',()=>{
 const cavity=button('cavity'),silhouette=button('silhouette'),r=runtime([cavity,silhouette]);assert(r.host.children.includes(cavity));assert(r.host.children.includes(silhouette));assert.equal(r.host.children.length,12);
 r.c.installUI();r.c.installUI();assert.equal(r.host.children.length,12);assert.equal(r.host.handlers.length,1);
 for(const mode of ['studio','solid','wire','facegroups','uvchecker','uvimage']){const target=r.host.children.find(b=>b.dataset.render===mode);assert(target);r.host.handlers[0]({target,preventDefault(){},stopPropagation(){}});}
 assert.deepEqual(r.modes,['studio','solid','wire','facegroups','uvchecker','uvimage']);
});
test('1032 native VIEW opening repairs a cleared ready host without timers, duplicate actions or disturbing remaining optional controls',()=>{
 const r=runtime([],true);assert.equal(r.host.children.length,10);const studio=r.host.children.find(b=>b.dataset.render==='studio');r.host.children=r.host.children.filter(b=>b.dataset.render!=='solid');const cavity=button('cavity');r.host.children.push(cavity);r.toggle();assert.equal(r.host.children.length,11);assert(r.host.children.includes(studio));assert(r.host.children.includes(cavity));assert.equal(r.host.handlers.length,1);
 r.host.children=[];r.toggle();r.toggle();assert.equal(r.host.children.length,10);assert.equal(r.host.handlers.length,1);
});
test('1032 shared 3D image resolver has no native inspection dependency; workspace alone supplies its native adapter',()=>{
 const root=new URL('../',import.meta.url),read=f=>fs.readFileSync(new URL(f,root),'utf8'),s=read('src/uv-image-preview.js');assert.doesNotMatch(s,/^import /m);assert.match(s,/resolveChoices=importedUVImageChoices/);
 const seen=new Set();function visit(file){if(seen.has(file))return;seen.add(file);for(const [,url] of read(file).matchAll(/^import .*?from ['"]([^'"]+)['"]/gm))if(url.startsWith('.'))visit(path.posix.normalize(path.posix.join(path.posix.dirname(file),url.split('?')[0])));}
 visit('src/render-modes.js');assert(!seen.has('src/nomad-uv-image-choices.js'));assert.match(read('src/uv-workspace.js'),/nativeImageChoices/);
});

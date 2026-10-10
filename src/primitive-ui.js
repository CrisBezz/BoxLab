import { makePrimitive,primitiveDensity } from './primitive-factory.js?v=0.36.18.771';
import { makeTextObject } from './text-object-core.js?v=0.36.18.771';
import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
import { createAddObjectPreview } from './add-object-preview.js?v=0.36.18.795';

const addButton=document.querySelector('#outlinerAddBtn'),status=document.querySelector('#selectionStatus');
let menu=null,fontPromise=null,preview=null;
const manager=()=>globalThis.__boxlabObjectManager;
const label=type=>type.charAt(0).toUpperCase()+type.slice(1);
const node=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
function closeMenu(){preview?.dispose();preview=null;menu?.remove();menu=null;}
function fontData(){if(!fontPromise)fontPromise=fetch(new URL('./fonts/helvetiker_regular.typeface.json?v=0.36.18.771',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Text font could not load; try again');return r.json();}).catch(e=>{fontPromise=null;throw e;});return fontPromise;}
function panel(title){closeMenu();const p=node('div');p.className='boxlab-primitive-menu';p.id='primitiveAddPanel';Object.assign(p.style,{zIndex:'2000',padding:'10px',border:'1px solid #ffffff29',borderRadius:'12px',background:'rgba(24,27,33,.98)',boxShadow:'0 14px 36px #0006'});p.append(node('strong',title));menu=p;return p;}
function button(parent,text,fn){const b=node('button',text);b.type='button';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn();});parent.append(b);return b;}
function showSettings(type){
 const text=type==='text',spec=text?{x:4,y:1,minX:1,minY:1,xLabel:'X · Curve detail',yLabel:'Y · Depth bands'}:primitiveDensity[type],p=panel('Add '+label(type));
 const body=node('div');body.style.display='grid';body.style.gap='8px';p.append(body);const inputs={};
 function field(name,title,kind,value,min,max){const row=node('label'),caption=node('span',title),input=node('input');input.type=kind;input.value=String(value);input.dataset.addSetting=name;input.setAttribute('aria-label',title);if(min!==undefined)input.min=String(min);if(max!==undefined)input.max=String(max);Object.assign(row.style,{display:'grid',gridTemplateColumns:'minmax(90px,1fr) minmax(120px,2fr) auto',gap:'8px',alignItems:'center'});row.append(caption,input);body.append(row);inputs[name]=input;if(kind==='range'){input.step='1';const out=node('output',String(value));row.append(out);input.addEventListener('input',()=>{out.textContent=input.value;update();});}else input.addEventListener('input',update);return input;}
 let word,thickness,data=null;
 if(text){word=field('text','Text','text','Text');word.maxLength=64;word.autocomplete='off';word.spellcheck=false;thickness=field('thickness','Thickness','number',.2,.01,100);thickness.step='.01';}
 field('x',spec.xLabel,'range',spec.x,spec.minX,text?16:32);field('y',spec.yLabel,'range',spec.y,spec.minY,32);
 const presets=node('div');Object.assign(presets.style,{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'});body.append(presets);for(const [i,name] of ['Low','Medium','High'].entries())button(presets,name,()=>{inputs.x.value=String(text?[2,4,8][i]:['cube','plane'].includes(type)?[1,2,4][i]:[8,12,16][i]);inputs.y.value=String(text||['cylinder','cone'].includes(type)?1:['cube','plane'].includes(type)?[1,2,4][i]:[4,6,8][i]);for(const key of ['x','y'])inputs[key].dispatchEvent(new Event('input',{bubbles:true}));});
 preview=createAddObjectPreview(body);
 const count=node('small');count.setAttribute('role','status');p.append(count);
 const apply=button(p,'Apply',()=>{
   let mesh;try{mesh=build();}catch(e){count.textContent=e.message;return;}
   const m=manager(),h=globalThis.__boxlabObjectHistory,before=h?.capture?.();if(!m?.addMesh||!before){count.textContent='Object creation is not ready; try again';return;}
   const created=m.addMesh(mesh,text?word.value.trim():label(type),{enterObjectMode:true});if(!created){count.textContent='Object could not be created';return;}
   globalThis.__boxlabObjectSelection?.single?.(created.id);h.checkpointSnapshot(before);
   if(status)status.textContent=`${text?'Text':label(type)} added • ${mesh.faces.length} faces`;closeMenu();
 });apply.dataset.addAction='apply';
 button(p,'Cancel',closeMenu).dataset.addAction='cancel';
 function build(){if(text){if(!data)throw new Error('Loading text font…');return makeTextObject(data,word.value,{thickness:thickness.value,x:inputs.x.value,y:inputs.y.value});}return makePrimitive(type,{x:inputs.x.value,y:inputs.y.value});}
 function update(){try{const mesh=build();preview?.setMesh(mesh);count.textContent=`${mesh.faces.length} faces · ${mesh.vertices.length} vertices`;apply.disabled=false;}catch(e){preview?.setMesh(null);count.textContent=e.message;apply.disabled=true;}}
 document.querySelector('#viewportWrap').append(p);placeToolSessionPanel(p);update();
 if(text){word.focus();word.select();fontData().then(font=>{if(menu!==p)return;data=font;update();}).catch(e=>{if(menu===p)count.textContent=e.message;});}
}
function buildMenu(){
 const p=panel('Add'),grid=node('div');Object.assign(grid.style,{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginTop:'8px'});
 for(const type of ['cube','plane','cylinder','sphere','cone','torus','text'])button(grid,label(type),()=>showSettings(type)).dataset.primitive=type;
 p.append(grid);
 button(p,'Revolve Profile',()=>{window.dispatchEvent(new CustomEvent('boxlab-add-revolve-profile'));closeMenu();}).dataset.specialObject='revolve-profile';
 button(p,'Sweep',()=>{window.dispatchEvent(new CustomEvent('boxlab-add-sweep-path'));closeMenu();}).dataset.specialObject='sweep-path';
 Object.assign(p.style,{position:'fixed',minWidth:'250px',maxHeight:'calc(100% - 16px)',overflowY:'auto'});document.body.append(p);const r=addButton.getBoundingClientRect(),w=p.offsetWidth||250;
 p.style.left=`${Math.max(8,Math.min(window.innerWidth-w-8,r.left))}px`;p.style.top=`${Math.max(8,Math.min(window.innerHeight-p.offsetHeight-8,r.bottom+6))}px`;
}
addButton?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(menu)closeMenu();else buildMenu();},true);
if(addButton)addButton.textContent='+ Add';
document.addEventListener('pointerdown',e=>{if(menu&&!menu.contains(e.target)&&e.target!==addButton)closeMenu();},true);
window.addEventListener('resize',closeMenu);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

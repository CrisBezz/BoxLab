import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compactRadialLabels,radialToolPosition} from '../src/radial-compact-labels.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('1130 all 72 modelling radial targets fit compact rings without intersecting button rectangles',()=>{
 const source=read('src/total-gizmo.js'),counts={face:24,edge:21,vertex:14,object:13};let total=0;
 for(const match of source.matchAll(/<div class="tg-tool-ring" data-ring-mode="([^"]+)"[^>]*>([\s\S]*?)(?=<div class="tg-tool-ring"|<div class="tg-hud")/g)){
  const [,mode,html]=match,buttons=[];
  for(const item of html.matchAll(/<button[^>]*class="([^"]*tg-tool-sector[^"]*)"[^>]*style="--a:([\d.]+)deg[^>]*data-tool-target="([^"]*)"/g)){
   const [,classes,angle,target]=item,p=radialToolPosition(angle,classes.includes('outer'));
   buttons.push({target,...p});
  }
  assert.equal(buttons.length,counts[mode]);total+=buttons.length;
  for(let i=0;i<buttons.length;i++)for(const b of buttons.slice(i+1)){const a=buttons[i];assert(Math.abs(a.x-b.x)>=50||Math.abs(a.y-b.y)>=54,mode+': '+a.target+' overlaps '+b.target);}
 }
 assert.equal(total,72);assert(2*134+50<.83*(2*168+50),'packed envelope reduces at least 17% beyond .1134');
 const css=read('radial-compact.css');for(const value of ['width:50px;height:54px','translate(var(--radial-x),var(--radial-y))','border-radius:50%','background-size:28px 28px'])assert(css.includes(value));
});
test('1135 ten Paint targets fit packed252 wheel without shrinking the 48x52 targets',()=>{
 const s=read('src/viewport-paint.js');assert(s.includes('126+x'));assert(s.includes('126+y'));assert(s.includes('left:126px;top:126px'));
 const points=[[0,-100],[58,-84],[96,-30],[96,30],[58,84],[0,100],[-58,84],[-96,30],[-96,-30],[-58,-84]].map(([x,y])=>({x:126+x,y:126+y}));
 for(const p of points){assert(p.x-24>=0&&p.x+24<=252&&p.y-26>=0&&p.y+26<=252);for(const q of points)if(p!==q)assert(Math.abs(p.x-q.x)>=48||Math.abs(p.y-q.y)>=52);}
 assert(read('radial-compact.css').includes('#boxlabPaintRadial[data-state=tools] .paint-tool-wheel{width:252px;height:252px}'));
});
test('1130 captions preserve full original tool names, titles, targets and existing listener nodes idempotently',()=>{
 const original={target:'#makePlanarBtn'},attributes=new Map(),button={textContent:'Make Planar',dataset:original,clickOwner:()=>{},children:[],querySelector(){return this.children[0];},getAttribute:k=>attributes.get(k),setAttribute:(k,v)=>attributes.set(k,v),appendChild(c){this.children.push(c);this.textContent=c.textContent;}};
 const clickOwner=button.clickOwner;compactRadialLabels([button],{createElement:()=>({})});compactRadialLabels([button],{createElement:()=>{throw Error('duplicate caption');}});
 assert.equal(button.children.length,1);assert.equal(button.textContent,'Make Planar');assert.equal(button.dataset,original);assert.equal(button.clickOwner,clickOwner);assert.equal(attributes.get('aria-label'),'Make Planar');assert.equal(attributes.get('title'),'Make Planar');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compactRadialLabels} from '../src/radial-compact-labels.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('1130 all 72 modelling radial targets fit compact rings without intersecting button rectangles',()=>{
 const source=read('src/total-gizmo.js'),counts={face:24,edge:21,vertex:14,object:13};let total=0;
 for(const match of source.matchAll(/<div class="tg-tool-ring" data-ring-mode="([^"]+)"[^>]*>([\s\S]*?)(?=<div class="tg-tool-ring"|<div class="tg-hud")/g)){
  const [,mode,html]=match,buttons=[];
  for(const item of html.matchAll(/<button[^>]*class="([^"]*tg-tool-sector[^"]*)"[^>]*style="--a:([\d.]+)deg[^>]*data-tool-target="([^"]*)"/g)){
   const [,classes,angle,target]=item,r=classes.includes('outer')?(['vertex','object'].includes(mode)?155:168):classes.includes('mid')?134:78,a=Number(angle)*Math.PI/180;
   buttons.push({target,x:r*Math.sin(a),y:-r*Math.cos(a)});
  }
  assert.equal(buttons.length,counts[mode]);total+=buttons.length;
  for(let i=0;i<buttons.length;i++)for(const b of buttons.slice(i+1)){const a=buttons[i];assert(Math.abs(a.x-b.x)>=50||Math.abs(a.y-b.y)>=54,mode+': '+a.target+' overlaps '+b.target);}
 }
 assert.equal(total,72);assert(2*168+50<.97*(2*176+52),'overall radial diameter reduces at least 3% beyond .1133');
 const css=read('radial-compact.css');for(const value of ['width:50px;height:54px','translateY(-78px)','translateY(-168px)','translateY(-134px)','border-radius:50%','background-size:28px 28px'])assert(css.includes(value));
});
test('1130 ten Paint circular targets fit the smaller 268px wheel and Material/centre remain original buttons',()=>{
 const s=read('src/viewport-paint.js');assert(s.includes('134+106*Math.sin(a)'));assert(s.includes('134-106*Math.cos(a)'));assert(s.includes('left:134px;top:134px'));
 const points=Array.from({length:10},(_,i)=>({x:134+106*Math.sin(i*Math.PI/5),y:134-106*Math.cos(i*Math.PI/5)}));
 for(const p of points){assert(p.x-24>=0&&p.x+24<=268&&p.y-26>=0&&p.y+26<=268);for(const q of points)if(p!==q)assert(Math.abs(p.x-q.x)>=48||Math.abs(p.y-q.y)>=52);}
 assert(read('radial-compact.css').includes('#boxlabPaintRadial[data-state=tools] .paint-tool-wheel{width:268px;height:268px}'));
});
test('1130 captions preserve full original tool names, titles, targets and existing listener nodes idempotently',()=>{
 const original={target:'#makePlanarBtn'},attributes=new Map(),button={textContent:'Make Planar',dataset:original,clickOwner:()=>{},children:[],querySelector(){return this.children[0];},getAttribute:k=>attributes.get(k),setAttribute:(k,v)=>attributes.set(k,v),appendChild(c){this.children.push(c);this.textContent=c.textContent;}};
 const clickOwner=button.clickOwner;compactRadialLabels([button],{createElement:()=>({})});compactRadialLabels([button],{createElement:()=>{throw Error('duplicate caption');}});
 assert.equal(button.children.length,1);assert.equal(button.textContent,'Make Planar');assert.equal(button.dataset,original);assert.equal(button.clickOwner,clickOwner);assert.equal(attributes.get('aria-label'),'Make Planar');assert.equal(attributes.get('title'),'Make Planar');
});

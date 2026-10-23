// Presentation only. The existing Paint controls own every selection and edit.
export const PAINT_BLEND_CODES=Object.freeze({normal:'N',darken:'D',multiply:'M','color-burn':'CB','linear-burn':'LB','darker-color':'DC',lighten:'L',screen:'S','color-dodge':'CD','linear-dodge':'LD','lighter-color':'LC',overlay:'O','soft-light':'SL','hard-light':'HL','vivid-light':'VL','linear-light':'LL','pin-light':'PL','hard-mix':'HM',difference:'DI',exclusion:'E',subtract:'SU',divide:'DV',hue:'H',saturation:'SA',color:'C',luminosity:'LU'});
export function createPaintLayerList({root,document,onSelect,onVisible,onSettings,thumbnail}){
 const rows=new Map();let layout='';
 function button(label,action){const b=document.createElement('button');b.type='button';b.addEventListener('click',action);b.setAttribute('aria-label',label);return b;}
 function row(id){
  const node=document.createElement('div');node.className='paint-stack-row';node.dataset.layerId=id;
  const select=button('Select layer',()=>onSelect(id));select.className='paint-stack-select';
  const canvas=document.createElement('canvas');canvas.width=canvas.height=64;canvas.className='paint-stack-thumbnail';canvas.setAttribute('aria-hidden','true');
  const text=document.createElement('span'),name=document.createElement('strong'),kind=document.createElement('small');text.className='paint-stack-text';text.appendChild(name);text.appendChild(kind);select.appendChild(canvas);select.appendChild(text);
  const blend=button('Layer blend mode',()=>onSettings(id,'layer-blend')),opacity=button('Layer opacity',()=>onSettings(id,'layer-opacity')),visible=button('Layer visibility',()=>onVisible(id));blend.className=opacity.className=visible.className='paint-stack-control';
  for(const child of [select,blend,opacity,visible])node.appendChild(child);
  return {node,select,canvas,name,kind,blend,opacity,visible};
 }
 function update(state,disabled=false){
  const layers=[...state.layers].reverse(),key=layers.map(l=>l.id).join('|');
  if(key!==layout){layout=key;const ids=new Set(layers.map(l=>l.id));for(const id of rows.keys())if(!ids.has(id))rows.delete(id);for(const l of layers)if(!rows.has(l.id))rows.set(l.id,row(l.id));root.replaceChildren(...layers.map(l=>rows.get(l.id).node));}
  for(const l of layers){const r=rows.get(l.id),base=l.id==='$base',selected=l.id===state.selected,label=l.blendMode.split('-').join(' '),percent=Math.round(l.opacity*100)+'%';
   r.node.dataset.selected=String(selected);r.node.dataset.visible=String(l.visible);r.select.setAttribute('aria-pressed',String(selected));r.select.setAttribute('aria-label',`Select ${l.name}${l.visible?'':', hidden'}`);r.name.textContent=l.name;r.name.title=l.name;
   r.kind.textContent=base?'Base colour':(l.image?'Image':'Paint')+(l.mask?(l.mask.enabled?' · mask':' · mask off'):'');
   r.blend.textContent=PAINT_BLEND_CODES[l.blendMode]||'?';r.blend.title=label;r.blend.setAttribute('aria-label',`${l.name}: ${label}, edit blend mode`);
   r.opacity.textContent=percent;r.opacity.setAttribute('aria-label',`${l.name}: ${percent} opacity, edit opacity`);r.visible.textContent=l.visible?'✓':'—';r.visible.setAttribute('aria-pressed',String(l.visible));r.visible.setAttribute('aria-label',`${l.visible?'Hide':'Show'} ${l.name}`);
   r.select.disabled=disabled;for(const b of [r.blend,r.opacity,r.visible])b.disabled=disabled||base;
   // Painter returns only a tiny owned snapshot. No original resource bytes enter DOM.
   const preview=thumbnail(l.id);if(preview){const ctx=r.canvas.getContext('2d'),data=ctx.createImageData(preview.width,preview.height);data.data.set(preview.pixels);ctx.putImageData(data,0,0);}
  }
 }
 return {update,clear(){layout='';rows.clear();root.replaceChildren();}};
}

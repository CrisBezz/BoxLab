// Presentation only: the original name/brush controls own painting and history.
export function createFacegroupList({root,document,onSelect}){
 const rows=new Map();let layout='';
 function update({names,colours,selected}){
  const key=JSON.stringify(names);
  if(key!==layout){
   layout=key;
   for(const name of rows.keys())if(!names.includes(name))rows.delete(name);
   for(const name of names)if(!rows.has(name)){
    const button=document.createElement('button');button.type='button';button.className='facegroup-list-row';
    const swatch=document.createElement('span');swatch.className='facegroup-list-swatch';swatch.setAttribute('aria-hidden','true');
    const label=document.createElement('strong');label.textContent=name;label.title=name;
    button.appendChild(swatch);button.appendChild(label);button.addEventListener('click',()=>onSelect(name));
    rows.set(name,{button,swatch});
   }
   if(names.length)root.replaceChildren(...names.map(name=>rows.get(name).button));
   else{const empty=document.createElement('small');empty.textContent='No named groups yet. Enter a name and paint faces.';root.replaceChildren(empty);}
  }
  for(const name of names){const row=rows.get(name);row.swatch.style.backgroundColor=colours.get(name);row.button.setAttribute('aria-pressed',String(name===selected));row.button.setAttribute('aria-label',`Paint group ${name}`);}
 }
 return {update};
}

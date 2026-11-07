// Numeric sRGB brush controls. The original colour input remains authoritative;
// dispatch its existing input event so stroke cancellation has one owner.
export function bindPaintColourControls(input){
 const colour=input('colour'),keys=['hex','red','green','blue','hue','saturation','brightness'],rgbKeys=keys.slice(1,4),hsbKeys=keys.slice(4);
 let hue=0,saturation=0,brightness=0,writing=false;
 const byte=n=>Math.round(n).toString(16).padStart(2,'0');
 function rgb(){return [1,3,5].map(i=>parseInt(colour.value.slice(i,i+2),16));}
 function renderHSB(){for(const [i,value] of [hue,saturation,brightness].entries())input(hsbKeys[i]).value=String(Math.round(value*10)/10);}
 function sync(){
  const values=rgb(),[r,g,b]=values.map(n=>n/255),high=Math.max(r,g,b),low=Math.min(r,g,b),delta=high-low;
  if(delta){hue=(high===r?(g-b)/delta+(g<b?6:0):high===g?(b-r)/delta+2:(r-g)/delta+4)*60;}
  // Remember hue through greys; remember saturation through black so Brightness
  // can bring back the intended colour without forcing another hue/saturation edit.
  if(high)saturation=delta/high*100;brightness=high*100;
  input('hex').value=colour.value.toUpperCase();values.forEach((v,i)=>input(rgbKeys[i]).value=String(v));renderHSB();
 }
 function publish(hex,{preserveHSB=false}={}){
  if(colour.disabled)return false;
  const changed=colour.value!==hex;colour.value=hex;
  const saved=[hue,saturation,brightness];sync();
  if(preserveHSB){[hue,saturation,brightness]=saved;renderHSB();}
  if(changed){writing=true;try{colour.dispatchEvent(new Event('input',{bubbles:true}));}finally{writing=false;}}
  return true;
 }
 function read(names,max){const values=names.map(k=>input(k).value.trim());if(values.some(v=>v===''))return null;const numbers=values.map(Number);return numbers.every((v,i)=>Number.isFinite(v)&&v>=0&&v<=max[i])?numbers:null;}
 function edit(key,commit=false){
  if(colour.disabled)return false;
  if(key==='hex'){
   let value=input('hex').value.trim().replace(/^#/,'');if(commit&&/^[a-f\d]{3}$/i.test(value))value=[...value].map(c=>c+c).join('');
   return /^[a-f\d]{6}$/i.test(value)&&publish('#'+value.toLowerCase());
  }
  if(rgbKeys.includes(key)){const values=read(rgbKeys,[255,255,255]);return values&&values.every(Number.isInteger)&&publish('#'+values.map(byte).join(''));}
  const values=read(hsbKeys,[360,100,100]);if(!values)return false;
  [hue,saturation,brightness]=values;
  const h=(hue%360)/60,s=saturation/100,v=brightness/100,c=v*s,x=c*(1-Math.abs(h%2-1)),m=v-c;
  const channels=h<1?[c,x,0]:h<2?[x,c,0]:h<3?[0,c,x]:h<4?[0,x,c]:h<5?[x,0,c]:[c,0,x];
  return publish('#'+channels.map(n=>byte((n+m)*255)).join(''),{preserveHSB:true});
 }
 for(const key of keys){
  input(key).addEventListener('input',()=>edit(key));
  input(key).addEventListener('change',()=>{if(!edit(key,true))sync();});
 }
 colour.addEventListener('input',()=>{if(!writing)sync();});sync();
 return {sync,setDisabled(disabled){for(const key of keys)input(key).disabled=disabled;}};
}

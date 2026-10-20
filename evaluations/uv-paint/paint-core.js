import {captureAlphaTip,alphaTipCoverage} from './alpha-tip.js?v=0.36.18.929';
// Isolated comparison document. One opaque colour layer per candidate, not scene history.
export const RESOLUTION=512;
export function brushSettings(value={}){
 const s={colour:'#e34b37',radius:10,hardness:.7,opacity:1,pressure:true,...value};
 if(!/^#[\da-f]{6}$/i.test(s.colour)||![s.radius,s.hardness,s.opacity].every(Number.isFinite)||s.radius<1||s.radius>48||s.hardness<0||s.hardness>1||s.opacity<0||s.opacity>1||typeof s.pressure!=='boolean'||!Number.isFinite(s.tipRotation??0)||Math.abs(s.tipRotation??0)>360)throw Error('Invalid brush settings');
 return Object.freeze(s);
}
export function createPaintLayer(size=RESOLUTION,{transparent=false}={}){
 if(typeof transparent!=='boolean')throw Error('Invalid paint layer alpha mode');
 if(!Number.isInteger(size)||size<16||size>512)throw Error('Comparison map budget exceeded');
 const pixels=new Uint8Array(size*size*4).fill(transparent?0:255);let before=null,coverage=null,settings=null,changed=false,disposed=false,dirty=true,erasing=false,blur=null;
 function applyCoverage(at,a,rgb){
  if(a<=coverage[at])return false;coverage[at]=a;let touched=false;
    const offset=at*4;
    if(blur){
     const x=at%size,y=Math.floor(at/size),label=blur[at],sum=[0,0,0];let weight=0,alpha=0;
     for(const [dx,dy,w] of [[0,0,4],[-1,0,1],[1,0,1],[0,-1,1],[0,1,1]]){
      const nx=x+dx,ny=y+dy,n=nx+ny*size;if(nx<0||nx>=size||ny<0||ny>=size||blur[n]!==label)continue;
      const k=n*4,aw=before[k+3]/255*w;weight+=w;alpha+=aw;for(let c=0;c<3;c++)sum[c]+=before[k+c]*aw;
     }
     const sourceAlpha=before[offset+3]/255,targetAlpha=alpha/weight,outAlpha=sourceAlpha*(1-a)+targetAlpha*a;
     for(let c=0;c<3;c++){const next=outAlpha?Math.round((before[offset+c]*sourceAlpha*(1-a)+sum[c]/weight*a)/outAlpha):before[offset+c];if(pixels[offset+c]!==next){pixels[offset+c]=next;touched=true;}}
     const next=Math.round(outAlpha*255);if(pixels[offset+3]!==next){pixels[offset+3]=next;touched=true;}return touched;
    }
    if(erasing){const next=Math.round(before[offset+3]*(1-a));if(pixels[offset+3]!==next){pixels[offset+3]=next;touched=true;}return touched;}
    const baseAlpha=before[offset+3]/255,outAlpha=a+baseAlpha*(1-a);
    for(let k=0;k<3;k++){
     const i=offset+k,next=transparent?Math.round((rgb[k]*a+before[i]*baseAlpha*(1-a))/outAlpha):Math.round(before[i]*(1-a)+rgb[k]*a);
     if(pixels[i]!==next){pixels[i]=next;touched=true;}
    }
    if(transparent){const next=Math.round(outAlpha*255);if(pixels[offset+3]!==next){pixels[offset+3]=next;touched=true;}}
  return touched;
 }
 return {
  pixels,size,
  begin(value,{erase=false,filter=null}={}){if(typeof erase!=='boolean'||erase&&!transparent)throw Error('Alpha erasing requires a transparent paint layer');if(disposed||before)throw Error('Paint layer unavailable');if(filter&&(!(filter.domains instanceof Int32Array)||filter.domains.length!==size*size||erase))throw Error('Invalid Blur domain');settings=brushSettings(value);blur=filter?filter.domains.slice():null;erasing=erase;if(settings.alphaTip)settings={...settings,alphaTip:captureAlphaTip(settings.alphaTip)};before=pixels.slice();coverage=new Float32Array(size*size);changed=false;},
  stamp(u,v,pressure=1,face=null){
   if(blur&&(!Number.isInteger(face)||face<0))return false;
   if(disposed||!before||![u,v,pressure].every(Number.isFinite)||u<0||u>1||v<0||v>1)return false;
   const p=settings.pressure?Math.min(1,Math.max(0,pressure)):1;if(!p||!settings.opacity)return false;
   const radius=Math.max(.35,settings.radius*p),cx=u*(size-1),cy=v*(size-1),rgb=[1,3,5].map(i=>parseInt(settings.colour.slice(i,i+2),16)),extent=settings.alphaTip?radius*Math.SQRT2:radius,angle=(settings.tipRotation??0)*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle);let touched=false;
   for(let y=Math.max(0,Math.floor(cy-extent-1));y<=Math.min(size-1,Math.ceil(cy+extent+1));y++)for(let x=Math.max(0,Math.floor(cx-extent-1));x<=Math.min(size-1,Math.ceil(cx+extent+1));x++){
    if(blur&&blur[x+y*size]!==face)continue;
    if(settings.alphaTip){const a=settings.opacity*alphaTipCoverage(settings.alphaTip,(x-cx)/radius,(y-cy)/radius,cos,sin);if(applyCoverage(x+y*size,a,rgb))touched=true;continue;}
    const d=Math.hypot(x-cx,y-cy),edge=Math.min(1,Math.max(0,radius+.5-d));if(!edge)continue;
    const t=Math.min(1,Math.max(0,(1-d/radius)/Math.max(.00001,1-settings.hardness))),falloff=t*t*(3-2*t);
    const a=settings.opacity*edge*(d/radius<=settings.hardness?1:falloff),at=x+y*size;if(a<=coverage[at])continue;
    if(applyCoverage(at,a,rgb))touched=true;
   }
   if(touched){dirty=true;changed=true;}return touched;
  },
  fill(){
   if(disposed||!before||blur)throw Error('Paint layer unavailable for fill');
   const rgb=[1,3,5].map(i=>parseInt(settings.colour.slice(i,i+2),16));let touched=false;
   for(let at=0;at<size*size;at++)if(applyCoverage(at,settings.opacity,rgb))touched=true;
   if(touched){dirty=true;changed=true;}return touched;
  },
  finish(cancel=false){if(!before)return false;const did=changed;if(cancel&&changed){pixels.set(before);dirty=true;}before=coverage=settings=blur=null;changed=false;return !cancel&&did;},
  restore(data){if(disposed||before||!(data instanceof Uint8Array)||data.length!==pixels.length)throw Error('Invalid paint snapshot');pixels.set(data);dirty=true;},
  consumeDirty(){const was=dirty;dirty=false;return was;},
  dispose(){if(disposed)return;this.finish(true);disposed=true;pixels.fill(transparent?0:255);},
  get drawing(){return !!before;}
 };
}
export function createPaintComparison(size=RESOLUTION,limit=6){
 if(!Number.isInteger(limit)||limit<1||limit>6)throw Error('History budget exceeded');
 const layers=[createPaintLayer(size),createPaintLayer(size)],undo=[],redo=[];let before=null,disposed=false;
 function snapshot(){return layers.map(l=>l.pixels.slice());}
 function restore(s){layers.forEach((l,i)=>l.restore(s[i]));}
 return {layers,
  begin(settings){if(disposed||before)throw Error('Comparison unavailable');const valid=brushSettings(settings);before=snapshot();layers.forEach(l=>l.begin(valid));},
  finish(cancel=false){if(!before)return false;const changed=layers.map(l=>l.finish(cancel)).some(Boolean);if(changed){undo.push(before);if(undo.length>limit)undo.shift();redo.length=0;}before=null;return changed;},
  undo(){if(disposed||before||!undo.length)return false;redo.push(snapshot());restore(undo.pop());return true;},
  redo(){if(disposed||before||!redo.length)return false;undo.push(snapshot());restore(redo.pop());return true;},
  dispose(){if(disposed)return;this.finish(true);disposed=true;undo.length=redo.length=0;layers.forEach(l=>l.dispose());},
  get state(){return {drawing:!!before,undo:undo.length,redo:redo.length};}
 };
}
export function topDownPixels(layer){const out=new Uint8ClampedArray(layer.pixels.length),stride=layer.size*4;for(let y=0;y<layer.size;y++)out.set(layer.pixels.subarray(y*stride,(y+1)*stride),(layer.size-1-y)*stride);return out;}

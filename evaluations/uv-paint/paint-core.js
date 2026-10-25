import {captureAlphaTip,alphaTipCoverage} from './alpha-tip.js?v=0.36.18.929';
// Isolated comparison document. One opaque colour layer per candidate, not scene history.
export const RESOLUTION=512;
export function brushSettings(value={}){
 const s={colour:'#e34b37',radius:10,hardness:.7,opacity:1,pressure:true,...value};
 if(!/^#[\da-f]{6}$/i.test(s.colour)||![s.radius,s.hardness,s.opacity].every(Number.isFinite)||s.radius<1||s.radius>48||s.hardness<0||s.hardness>1||s.opacity<0||s.opacity>1||typeof s.pressure!=='boolean'||!Number.isFinite(s.tipRotation??0)||Math.abs(s.tipRotation??0)>360)throw Error('Invalid brush settings');
 return Object.freeze(s);
}
// Repeat the existing centre4/cardinal1 kernel over the stroke-start snapshot.
// Premultiplied doubles retain one-pass rounding and prevent transparent RGB halos.
// Two bounded buffers are reused; only the finished target lives for the contact.
function blurSnapshot(bytes,size,domains,links,amount){
 let source=new Float64Array(bytes.length),uniform=true;
 for(let k=0;k<bytes.length;k+=4){const a=bytes[k+3]/255;source[k]=bytes[k]*a;source[k+1]=bytes[k+1]*a;source[k+2]=bytes[k+2]*a;source[k+3]=a;if(k&&(bytes[k]!==bytes[0]||bytes[k+1]!==bytes[1]||bytes[k+2]!==bytes[2]||bytes[k+3]!==bytes[3]))uniform=false;}
 if(uniform)return source;let out=new Float64Array(bytes.length);
 for(let pass=0;pass<amount;pass++){
  for(let at=0;at<domains.length;at++){
   const k=at*4,label=domains[at];if(label<0){out[k]=source[k];out[k+1]=source[k+1];out[k+2]=source[k+2];out[k+3]=source[k+3];continue;}
   let r=source[k]*4,g=source[k+1]*4,b=source[k+2]*4,a=source[k+3]*4,weight=4;
   for(let side=0;side<4;side++){
    let n;if(links)n=links[at*4+side];else{const x=at%size,y=Math.floor(at/size);n=side===0?(x?at-1:-1):side===1?(x+1<size?at+1:-1):side===2?(y?at-size:-1):(y+1<size?at+size:-1);if(n>=0&&domains[n]!==label)n=-1;}
    if(n<0)continue;const j=n*4;weight++;r+=source[j];g+=source[j+1];b+=source[j+2];a+=source[j+3];
   }
   out[k]=r/weight;out[k+1]=g/weight;out[k+2]=b/weight;out[k+3]=a/weight;
  }
  const previous=source;source=out;out=previous;
 }
 return source;
}
export function createPaintLayer(size=RESOLUTION,{transparent=false}={}){
 if(typeof transparent!=='boolean')throw Error('Invalid paint layer alpha mode');
 if(!Number.isInteger(size)||size<16||size>1024)throw Error('Comparison map budget exceeded');
 const pixels=new Uint8Array(size*size*4).fill(transparent?0:255);let before=null,coverage=null,settings=null,changed=false,disposed=false,dirty=true,erasing=false,blur=null,blurTarget=null,smudging=false,pickup=null,smudgeWork=0,limited=false,connections=null;
 // A small tip-local reservoir, never an atlas-to-atlas line. Pick up only the
 // current original polygon; an unproven face change/miss starts fresh without ink.
 // Mix in 25% stroke-start paint per spaced dab. Premultiplied colour and alpha
 // travel together; raw grayscale masks/scalars use this same equal-RGB operation.
 function carry(cx,cy,face,radius,cos,sin){
  const extent=Math.ceil(settings.radius*(settings.alphaTip?Math.SQRT2:1)+1),width=extent*2+1,x=Math.round(cx),y=Math.round(cy);
  if(pickup&&pickup.face===face&&pickup.x===x&&pickup.y===y)return false;
  const first=!pickup||pickup.face!==face;
  const connected=first&&Number.isInteger(pickup?.face)&&connections?.has(Math.min(face,pickup.face)+':'+Math.max(face,pickup.face));
  const work=width*width+(connected?pickup.valid.length:0);
  if(smudgeWork+work>8e6){limited=true;return false;}
  smudgeWork+=work;
  // A rotationally invariant premultiplied mean crosses a proven manifold edge.
  // No assumption that the two islands share UV orientation, scale or position.
  let mean=null;
  if(connected){const sum=[0,0,0,0];let weight=0;for(let i=0;i<pickup.valid.length;i++)if(pickup.valid[i]){
   const dx=(i%width-pickup.extent)/pickup.radius,dy=(Math.floor(i/width)-pickup.extent)/pickup.radius;
   const w=settings.alphaTip?alphaTipCoverage(settings.alphaTip,dx,dy,cos,sin):Math.hypot(dx,dy)<=1?1:0;
   if(!w)continue;weight+=w;for(let c=0;c<4;c++)sum[c]+=pickup.values[i*4+c]*w;
  }if(weight)mean=sum.map(v=>v/weight);}
  if(!pickup)pickup={face,x,y,extent,width,values:new Float32Array(width*width*4),valid:new Uint8Array(width*width)};
  else if(first){pickup.valid.fill(0);pickup.face=face;}
  const s=pickup;s.x=x;s.y=y;s.radius=radius;
  for(let dy=-extent;dy<=extent;dy++)for(let dx=-extent;dx<=extent;dx++){
   const px=x+dx,py=y+dy,i=dx+extent+(dy+extent)*width,k=i*4,at=px+py*size;
   if(px<0||px>=size||py<0||py>=size||blur[at]!==face){s.valid[i]=0;continue;}
   const a=before[at*4+3]/255,retain=mean||s.valid[i] ? .75 : 0;
   for(let c=0;c<3;c++)s.values[k+c]=(mean?mean[c]:s.values[k+c])*retain+before[at*4+c]*a*(1-retain);
   s.values[k+3]=(mean?mean[3]:s.values[k+3])*retain+a*(1-retain);s.valid[i]=1;
  }
  return !first||!!mean;
 }
 function resetPickup(){if(pickup)pickup.face=null;}
 function applyCoverage(at,a,rgb,smudgeAt=-1){
  if(a<=0||!smudging&&a<=coverage[at])return false;
  if(smudging){a=Math.max(a,coverage[at]);coverage[at]=a;}else coverage[at]=a;let touched=false;
    const offset=at*4;
    if(blur){
     const target=smudging?pickup.values:blurTarget,j=smudging?smudgeAt:offset;
     const sourceAlpha=before[offset+3]/255,targetAlpha=target[j+3],outAlpha=sourceAlpha*(1-a)+targetAlpha*a;
     for(let c=0;c<3;c++){const next=outAlpha?Math.round((before[offset+c]*sourceAlpha*(1-a)+target[j+c]*a)/outAlpha):before[offset+c];if(pixels[offset+c]!==next){pixels[offset+c]=next;touched=true;}}
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
  pixels,size,get limited(){return limited;},
  // Renew per-input work without changing the contact snapshot, coverage or pickup.
  resetWorkBudget(){smudgeWork=0;limited=false;},
  begin(value,{erase=false,filter=null,smudge=false}={}){
   if(typeof erase!=='boolean'||erase&&!transparent)throw Error('Alpha erasing requires a transparent paint layer');if(disposed||before)throw Error('Paint layer unavailable');
   if(typeof smudge!=='boolean'||smudge&&(!filter||erase))throw Error('Smudge requires face ownership');
   const edges=filter?.connectedFaces;
   if(edges!=null&&(!Array.isArray(edges)||edges.length>60000||Array.from(edges).some(p=>!Array.isArray(p)||p.length!==2||[p[0],p[1]].some(n=>!Number.isInteger(n)||n<0||n>=20000)||p[0]>=p[1])))throw Error('Invalid Smudge face connections');
   if(filter&&(!(filter.domains instanceof Int32Array)||filter.domains.length!==size*size||erase))throw Error('Invalid Blur domain');
   if(filter?.neighbours!=null&&(!(filter.neighbours instanceof Int32Array)||filter.neighbours.length!==size*size*4||filter.neighbours.some(n=>n< -1||n>=size*size)))throw Error('Invalid Blur neighbours');
   const amount=filter?.amount===undefined?1:filter.amount;if(filter&&(!Number.isInteger(amount)||amount<1||amount>32))throw Error('Blur amount must be 1 to 32');
   let valid=brushSettings(value);if(valid.alphaTip)valid={...valid,alphaTip:captureAlphaTip(valid.alphaTip)};
   const domains=filter?filter.domains.slice():null,links=!smudge&&filter?.neighbours?.slice()||null,start=pixels.slice(),target=filter&&!smudge&&valid.opacity?blurSnapshot(start,size,domains,links,amount):null;
   settings=valid;blur=domains;blurTarget=target;erasing=erase;before=start;coverage=new Float32Array(size*size);changed=false;smudging=smudge;pickup=null;smudgeWork=0;limited=false;connections=smudge?new Set((edges||[]).map(p=>p[0]+':'+p[1])):null;
  },
  stamp(u,v,pressure=1,face=null){
   if(blur&&(!Number.isInteger(face)||face<0)){resetPickup();return false;}
   if(disposed||!before||![u,v,pressure].every(Number.isFinite)||u<0||u>1||v<0||v>1)return false;
   const p=settings.pressure?Math.min(1,Math.max(0,pressure)):1;if(!p||!settings.opacity){resetPickup();return false;}
   const radius=Math.max(.35,settings.radius*p),cx=u*(size-1),cy=v*(size-1),rgb=[1,3,5].map(i=>parseInt(settings.colour.slice(i,i+2),16)),extent=settings.alphaTip?radius*Math.SQRT2:radius,angle=(settings.tipRotation??0)*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle);let touched=false;
   if(smudging&&!carry(cx,cy,face,radius,cos,sin))return false;
   for(let y=Math.max(0,Math.floor(cy-extent-1));y<=Math.min(size-1,Math.ceil(cy+extent+1));y++)for(let x=Math.max(0,Math.floor(cx-extent-1));x<=Math.min(size-1,Math.ceil(cx+extent+1));x++){
    if(blur&&blur[x+y*size]!==face)continue;
    if(smudging&&(Math.abs(x-pickup.x)>pickup.extent||Math.abs(y-pickup.y)>pickup.extent))continue;
    const sample=smudging?(x-pickup.x+pickup.extent+(y-pickup.y+pickup.extent)*pickup.width):-1;
    if(smudging&&!pickup.valid[sample])continue;
    if(settings.alphaTip){const a=settings.opacity*alphaTipCoverage(settings.alphaTip,(x-cx)/radius,(y-cy)/radius,cos,sin);if(applyCoverage(x+y*size,a,rgb,sample*4))touched=true;continue;}
    const d=Math.hypot(x-cx,y-cy),edge=Math.min(1,Math.max(0,radius+.5-d));if(!edge)continue;
    const t=Math.min(1,Math.max(0,(1-d/radius)/Math.max(.00001,1-settings.hardness))),falloff=t*t*(3-2*t);
    const a=settings.opacity*edge*(d/radius<=settings.hardness?1:falloff),at=x+y*size;if(!smudging&&a<=coverage[at])continue;
    if(applyCoverage(at,a,rgb,sample*4))touched=true;
   }
   if(touched){dirty=true;changed=true;}return touched;
  },
  fill(){
   if(disposed||!before||blur)throw Error('Paint layer unavailable for fill');
   const rgb=[1,3,5].map(i=>parseInt(settings.colour.slice(i,i+2),16));let touched=false;
   for(let at=0;at<size*size;at++)if(applyCoverage(at,settings.opacity,rgb))touched=true;
   if(touched){dirty=true;changed=true;}return touched;
  },
  resetPickup,
  finish(cancel=false){if(!before)return false;const did=changed;if(cancel&&changed){pixels.set(before);dirty=true;}before=coverage=settings=blur=blurTarget=pickup=connections=null;smudging=false;smudgeWork=0;changed=false;return !cancel&&did;},
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

// Lossless 8-bit grayscale PNG for glTF's scalar G/B channels. Canvas encoders
// may retain four RGBA channels; do not let that multiply native image-pool cost.
// PNG colour type 0, adaptive byte filters and CRC follow https://www.w3.org/TR/png-3/.
const crcTable=Uint32Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);return c>>>0;});
function chunk(type,data){
 const out=new Uint8Array(data.length+12),v=new DataView(out.buffer);v.setUint32(0,data.length);
 for(let i=0;i<4;i++)out[4+i]=type.charCodeAt(i);out.set(data,8);
 let crc=0xffffffff;for(let i=4;i<out.length-4;i++)crc=(crc>>>8)^crcTable[(crc^out[i])&255];v.setUint32(out.length-4,(crc^0xffffffff)>>>0);return out;
}
function paeth(a,b,c){const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;}
export async function encodeNomadScalarPNG(rgba,width,height,channel){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width>2048||height>2048||![1,2].includes(channel)||!(rgba instanceof Uint8Array||rgba instanceof Uint8ClampedArray)||rgba.length!==width*height*4)throw Error('NOMAD scalar PNG input is invalid');
 if(typeof globalThis.CompressionStream!=='function')throw Error('NOMAD scalar PNG compression is unavailable in this browser');
 const rows=new Uint8Array((width+1)*height),trial=new Uint8Array(width),best=new Uint8Array(width);let previous=new Uint8Array(width),current=new Uint8Array(width);
 for(let y=0;y<height;y++){
  for(let x=0;x<width;x++)current[x]=rgba[(y*width+x)*4+channel];
  let bestScore=Infinity,bestType=0;
  for(let type=0;type<5;type++){
   let score=0;
   for(let x=0;x<width;x++){
    const left=x?current[x-1]:0,up=previous[x],upperLeft=x?previous[x-1]:0;
    const predictor=type===0?0:type===1?left:type===2?up:type===3?(left+up)>>>1:paeth(left,up,upperLeft);
    const value=(current[x]-predictor)&255;trial[x]=value;score+=Math.min(value,256-value);
   }
   if(score<bestScore){bestScore=score;bestType=type;best.set(trial);}
  }
  const at=y*(width+1);rows[at]=bestType;rows.set(best,at+1);[previous,current]=[current,previous];
 }
 return packagePNG(rows,width,height,0);
}
// Opaque sRGB colour transport; UV-v0-first rows stay in their original order.
export async function encodeNomadColourPNG(rgba,width,height){return encodeRGBPNG(rgba,width,height,true);}
// Packed scalar RGB uses the same PNG owner without colour metadata or conversion.
export async function encodeNomadDataPNG(rgba,width,height){return encodeRGBPNG(rgba,width,height,false);}
async function encodeRGBPNG(rgba,width,height,colour){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<16||height<16||width>1024||height>1024||!(rgba instanceof Uint8Array)||rgba.length!==width*height*4)throw Error('Paint PNG input is invalid');
 const stride=width*3+1,rows=new Uint8Array(stride*height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){const i=(y*width+x)*4;if(rgba[i+3]!==255)throw Error('Paint PNG requires opaque pixels');const at=y*stride+1+x*3;rows[at]=rgba[i];rows[at+1]=rgba[i+1];rows[at+2]=rgba[i+2];}
 return packagePNG(rows,width,height,2,colour);
}
async function packagePNG(rows,width,height,type,colour=true){
 if(typeof globalThis.CompressionStream!=='function')throw Error('NOMAD PNG compression is unavailable in this browser');
 const compressed=new Uint8Array(await new Response(new Blob([rows]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer());
 const header=new Uint8Array(13),view=new DataView(header.buffer);view.setUint32(0,width);view.setUint32(4,height);header[8]=8;header[9]=type; // scalar remains type0 without colour metadata
 const parts=[new Uint8Array([137,80,78,71,13,10,26,10]),chunk('IHDR',header),...(type===2&&colour?[chunk('sRGB',new Uint8Array([0]))]:[]),chunk('IDAT',compressed),chunk('IEND',new Uint8Array())],size=parts.reduce((n,b)=>n+b.length,0);
 if(size>8*1024*1024)throw Error('NOMAD converted map exceeds 8 MB');
 const png=new Uint8Array(size);let at=0;for(const part of parts){png.set(part,at);at+=part.length;}return png;
}

// Preview-only alpha removal BEFORE browser decoding/resampling can discard RGB
// beneath alpha zero. Source PNG bytes and colour/profile chunks are untouched.
export async function opaqueNomadColourPNG(data){
 const fail=()=>{throw Error('Unsupported or invalid native colour PNG preview');};
 if(!(data instanceof Uint8Array)||data.length>8*1024*1024||data.length<45||![137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v))fail();
 const view=new DataView(data.buffer,data.byteOffset,data.byteLength),parts=[],idats=[];let width,height,type,depth,ended=false,transparent=false;
 for(let at=8;at<data.length;){
  if(at+12>data.length)fail();const n=view.getUint32(at);if(n>data.length-at-12)fail();
  const name=String.fromCharCode(...data.subarray(at+4,at+8)),body=data.subarray(at+8,at+8+n);
  let crc=0xffffffff;for(let i=at+4;i<at+8+n;i++)crc=(crc>>>8)^crcTable[(crc^data[i])&255];if(((crc^0xffffffff)>>>0)!==view.getUint32(at+8+n))fail();
  if(at===8&&name!=='IHDR')fail();
  if(name==='IHDR'){
   if(width!==undefined||n!==13)fail();width=view.getUint32(at+8);height=view.getUint32(at+12);depth=body[8];type=body[9];
   if(!width||!height||width>2048||height>2048||width*height>4*1024*1024||body[10]||body[11]||body[12]||![0,2,3,4,6].includes(type))fail();
  }
  if(name==='acTL'||name==='fcTL'||name==='fdAT')fail();
  if(name==='IDAT')idats.push(body);
  if(name==='tRNS')transparent=true;
  if(name!=='tRNS')parts.push({name,bytes:data.subarray(at,at+n+12)});
  at+=n+12;if(name==='IEND'){if(n||at!==data.length)fail();ended=true;break;}
 }
 if(!ended||!idats.length)fail();
 if(type!==4&&type!==6){if(!transparent)return data;return joinPNG(parts.map(p=>p.bytes));}
 if(depth!==8||typeof DecompressionStream!=='function'||typeof CompressionStream!=='function')fail();
 const bpp=type===6?4:2,stride=width*bpp,expected=(stride+1)*height,raw=new Uint8Array(expected);
 const reader=new Blob(idats).stream().pipeThrough(new DecompressionStream('deflate')).getReader();let filled=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;if(value.length>expected-filled){await reader.cancel();fail();}raw.set(value,filled);filled+=value.length;}}finally{reader.releaseLock();}
 if(filled!==expected)fail();
 // Unfilter using ORIGINAL previous rows. Replace alpha only after RGB recovery.
 const rows=new Uint8Array(expected);let previous=new Uint8Array(stride);
 for(let y=0;y<height;y++){
  const at=y*(stride+1),filter=raw[at],row=new Uint8Array(stride);if(filter>4)fail();
  for(let x=0;x<stride;x++){const a=x>=bpp?row[x-bpp]:0,b=previous[x],c=x>=bpp?previous[x-bpp]:0;const p=filter===0?0:filter===1?a:filter===2?b:filter===3?(a+b)>>>1:paeth(a,b,c);row[x]=(raw[at+1+x]+p)&255;}
  rows.set(row,at+1);for(let x=bpp-1;x<stride;x+=bpp)rows[at+1+x]=255;previous=row;
 }
 const compressed=new Uint8Array(await new Response(new Blob([rows]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer());
 let written=false;return joinPNG(parts.flatMap(p=>{if(p.name!=='IDAT')return [p.bytes];if(written)return [];written=true;return [chunk('IDAT',compressed)];}));
}
function joinPNG(parts){
 const size=8+parts.reduce((n,p)=>n+p.length,0);if(size>8*1024*1024)throw Error('Native colour preview exceeds 8 MB');
 const out=new Uint8Array(size);out.set([137,80,78,71,13,10,26,10]);let at=8;for(const p of parts){out.set(p,at);at+=p.length;}return out;
}

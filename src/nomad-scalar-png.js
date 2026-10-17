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
 const compressed=new Uint8Array(await new Response(new Blob([rows]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer());
 const header=new Uint8Array(13),view=new DataView(header.buffer);view.setUint32(0,width);view.setUint32(4,height);header[8]=8; // colour type 0, no alpha/profile/gamma chunks
 const parts=[new Uint8Array([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',compressed),chunk('IEND',new Uint8Array())],size=parts.reduce((n,b)=>n+b.length,0);
 if(size>8*1024*1024)throw Error('NOMAD converted map exceeds 8 MB');
 const png=new Uint8Array(size);let at=0;for(const part of parts){png.set(part,at);at+=part.length;}return png;
}

import assert from 'node:assert/strict';
import {inflateSync} from 'node:zlib';
export function crc(a){let c=0xffffffff;for(const b of a){c^=b;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
// Independent PNG reader for test verification; real zlib, chunk CRCs and inverse
// PNG byte filters. Supports 8-bit grayscale, RGB and RGBA transport fixtures only.
export function inspectPNG(bytes){
 const b=Buffer.from(bytes),width=b.readUInt32BE(16),height=b.readUInt32BE(20),bitDepth=b[24],colorType=b[25],parts=[],chunks=[];assert.equal(bitDepth,8);assert([0,2,6].includes(colorType));
 for(let at=8;at<b.length;){const n=b.readUInt32BE(at),type=b.toString('ascii',at+4,at+8);assert.equal(b.readUInt32BE(at+8+n),crc(b.subarray(at+4,at+8+n)));chunks.push(type);if(type==='IDAT')parts.push(b.subarray(at+8,at+8+n));at+=n+12;}
 const raw=inflateSync(Buffer.concat(parts)),bpp=colorType===0?1:colorType===2?3:4,stride=width*bpp,rgba=new Uint8Array(width*height*4),filters=[];assert.equal(raw.length,(stride+1)*height);let previous=new Uint8Array(stride);
 for(let y=0;y<height;y++){
  const at=y*(stride+1),filter=raw[at],row=new Uint8Array(stride);filters.push(filter);assert(filter>=0&&filter<=4);
  for(let x=0;x<stride;x++){
   const a=x>=bpp?row[x-bpp]:0,b=previous[x],c=x>=bpp?previous[x-bpp]:0;let predictor=0;
   if(filter===1)predictor=a;else if(filter===2)predictor=b;else if(filter===3)predictor=Math.floor((a+b)/2);else if(filter===4){const p=a+b-c,dist=[Math.abs(p-a),Math.abs(p-b),Math.abs(p-c)];predictor=dist[0]<=dist[1]&&dist[0]<=dist[2]?a:dist[1]<=dist[2]?b:c;}
   row[x]=(raw[at+x+1]+predictor)%256;
  }
  for(let x=0;x<width;x++){const i=(y*width+x)*4;if(colorType===0){rgba[i]=rgba[i+1]=rgba[i+2]=row[x];rgba[i+3]=255;}else if(colorType===2){rgba.set(row.subarray(x*3,x*3+3),i);rgba[i+3]=255;}else rgba.set(row.subarray(x*4,x*4+4),i);}previous=row;
 }
 return {width,height,bitDepth,colorType,rgba,filters,chunks};
}

import * as watlas from './uv-vendor/watlas.js?v=0.36.18.1189';
import {runAutoUnwrap} from './auto-unwrap-core.js?v=0.36.18.1193';
self.onmessage=async event=>{
 try{
  self.postMessage({stage:'Loading unwrap engine'});
  const response=await fetch(new URL('./uv-vendor/watlas.wasm.base64?v=0.36.18.1189',import.meta.url));if(!response.ok)throw Error('Auto Unwrap engine could not be loaded');
  const binary=atob((await response.text()).trim()),wasmBinary=Uint8Array.from(binary,c=>c.charCodeAt(0));await watlas.Initialize({wasmBinary});
  self.postMessage({stage:'Unwrapping and validating'});
  const result=await runAutoUnwrap(event.data,watlas);self.postMessage({result});
 }catch(error){self.postMessage({error:error?.message||'Auto Unwrap failed'});}
};

import fs from 'node:fs/promises';
import wabtFactory from 'wabt';
const wabt=await wabtFactory(),root=new URL('../src/wasm/',import.meta.url);
const module=wabt.parseWat('body-pack.wat',await fs.readFile(new URL('body-pack.wat',root),'utf8'));
try{module.resolveNames();module.validate();const {buffer}=module.toBinary({canonicalize_lebs:true,write_debug_names:false});await fs.writeFile(new URL('body-pack.wasm',root),buffer);}finally{module.destroy();}

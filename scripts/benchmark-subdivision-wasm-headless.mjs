import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reportArg=process.argv.slice(2).find(value=>value.startsWith('--output='))?.slice('--output='.length)
  ?? process.argv.slice(2).find((value,index,args)=>args[index-1]==='--output');
const timestamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'').replace(/Z$/,'Z');
const outputPath=path.resolve(root,reportArg||`benchmark-artifacts/subdivision-wasm-headless-${timestamp}.json`);
const mime={'.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.wasm':'application/wasm'};

function serveRepository(){
  const server=http.createServer(async(req,res)=>{
    try{
      if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
      const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
      const file=path.resolve(root,`.${pathname}`);
      if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
      const info=await fs.stat(file);
      const target=info.isDirectory()?path.join(file,'index.html'):file;
      const body=req.method==='HEAD'?null:await fs.readFile(target);
      res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream','cache-control':'no-store'});
      res.end(body);
    }catch{res.writeHead(404);res.end('Not found');}
  });
  return new Promise((resolve,reject)=>{
    server.once('error',reject);
    server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));
  });
}

const {server,port}=await serveRepository();
let browser;
try{
  const managed=chromium.executablePath();
  const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ||(existsSync(managed)?managed:existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
  browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const pageErrors=[];
  page.on('pageerror',error=>pageErrors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')pageErrors.push(message.text());});
  await page.route('https://cdn.jsdelivr.net/npm/three@0.179.1/build/**',async route=>{
    const url=new URL(route.request().url());
    const name=path.basename(url.pathname);
    if(!/^three(?:\.core)?\.js$/.test(name)){await route.abort();return;}
    const asset=path.join(root,'node_modules/three/build',name);
    if(!existsSync(asset)){await route.abort();return;}
    await route.fulfill({path:asset,contentType:'text/javascript; charset=utf-8'});
  });
  const pageUrl=`http://127.0.0.1:${port}/docs/subdivision-benchmark-1036.html?headless=1`;
  const response=await page.goto(pageUrl,{waitUntil:'load',timeout:30000});
  if(!response?.ok())throw new Error(`Benchmark page returned HTTP ${response?.status()??'no response'}`);
  await page.locator('#wasm').click();
  await page.waitForFunction(()=>{
    const status=document.querySelector('#progress')?.textContent||'';
    const report=document.querySelector('#report')?.value||'';
    return status.startsWith('Comparison complete.')&&report.length>0;
  },null,{timeout:360000});
  if(pageErrors.length)throw new Error(`Browser reported errors: ${pageErrors.join(' | ')}`);
  const report=JSON.parse(await page.locator('#report').inputValue());
  if(report.protocol!=='subdivision-wasm-v1')throw new Error(`Unexpected benchmark protocol: ${report.protocol}`);
  if(report.results?.length!==11)throw new Error(`Expected 11 completed workload comparisons; got ${report.results?.length??0}`);
  if(report.results.some(row=>row.correctness?.passed!==true||row.outputFaces>report.outputFaceCap))throw new Error('A workload failed parity or exceeded the output face cap');
  if(report.results.some(row=>row.samplesMs?.js?.length!==5||row.samplesMs?.wasm?.length!==5||row.orders?.length!==5))throw new Error('A workload did not complete all five measured pairs');
  report.execution={kind:'headless-browser',browser:'Chromium',browserVersion:browser.version(),headless:true,runner:process.env.GITHUB_ACTIONS==='true'?'GitHub Actions':'local',capturedAt:new Date().toISOString(),pageUrl};
  await fs.mkdir(path.dirname(outputPath),{recursive:true});
  await fs.writeFile(outputPath,JSON.stringify(report,null,2)+'\n');
  console.log(`Completed ${report.results.length} subdivision JS/WASM comparisons in headless Chromium.`);
  console.log(`Parity: ${report.results.length}/${report.results.length}; decision: ${report.decision} (lab only).`);
  for(const row of report.results)console.log(`${row.sourceFaces} faces · L${row.levels} · JS ${row.metrics.js.medianMs.toFixed(2)} ms · WASM ${row.metrics.wasm.medianMs.toFixed(2)} ms · ${row.decision}`);
  console.log(`Report: ${path.relative(root,outputPath)}`);
}catch(error){
  console.error(error.stack||error);
  process.exitCode=1;
}finally{
  await browser?.close().catch(()=>{});
  await new Promise(resolve=>server.close(resolve));
}

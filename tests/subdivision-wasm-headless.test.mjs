import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('headless Chromium runs the real subdivision comparison page and saves its report for CI',()=>{
 const pkg=JSON.parse(read('package.json'));
 const runner=read('scripts/benchmark-subdivision-wasm-headless.mjs');
 const workflow=read('.github/workflows/through-regression.yml');
 const page=read('docs/subdivision-benchmark-1036.html');
 assert.equal(pkg.scripts['benchmark:subdivision:headless'],'node scripts/benchmark-subdivision-wasm-headless.mjs');
 assert.equal(pkg.devDependencies.playwright,'1.62.1');
 assert.match(runner,/from 'playwright'/);
 assert.match(runner,/docs\/subdivision-benchmark-1036\.html\?headless=1/);
 assert.match(runner,/locator\('#wasm'\)\.click\(\)/);
 assert.match(runner,/report\.results\?\.length!==11/);
 assert.match(runner,/browserVersion:browser\.version\(\)/);
 assert.match(runner,/await fs\.writeFile\(outputPath/);
 assert.match(runner,/Access-Control-Allow-Origin/);
 assert.match(runner,/Comparison button did not start/);
 assert.match(runner,/Comparison did not complete/);
 assert.match(workflow,/playwright install --with-deps chromium/);
 assert.match(workflow,/benchmark:subdivision:headless/);
 assert.match(workflow,/actions\/upload-artifact@v4/);
 assert.match(page,/two warm-up pairs and five alternating measured pairs/);
 assert.match(page,/decision:'LAB_ONLY'/);
});

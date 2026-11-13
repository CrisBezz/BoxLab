import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {formatSubdivisionActionsSummary} from '../scripts/subdivision-headless-summary.mjs';

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
 assert.match(runner,/formatSubdivisionActionsSummary\(report\)/);
 assert.match(runner,/GITHUB_STEP_SUMMARY/);
 assert.match(runner,/await fs\.appendFile\(process\.env\.GITHUB_STEP_SUMMARY,formatSubdivisionActionsSummary\(report\)/);
 assert.match(runner,/node_modules\/three/);
 assert.match(runner,/replaceAll\('https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.179\.1\//);
 assert.match(runner,/requestfailed/);
 assert.match(runner,/pathname==='\/favicon\.ico'/);
 assert.match(runner,/HTTP \$\{response\.status\(\)\}/);
 assert.match(runner,/Comparison button did not start/);
 assert.match(runner,/Comparison did not complete/);
 assert.match(workflow,/playwright install --with-deps chromium/);
 assert.match(workflow,/benchmark:subdivision:headless/);
 assert.match(workflow,/actions\/upload-artifact@v4/);
 assert.match(page,/two warm-up pairs and five alternating measured pairs/);
 assert.match(page,/decision:'LAB_ONLY'/);
});

test('headless comparison summary renders each workload for the Actions run page',()=>{
 const results=Array.from({length:11},(_,index)=>({sourceFaces:16*(index+1),levels:1+(index%3),metrics:{js:{medianMs:1.25},wasm:{medianMs:0.75}},decision:index===0?'PASS':'REVIEW'}));
 const summary=formatSubdivisionActionsSummary({decision:'LAB_ONLY',results});
 assert.match(summary,/Overall: LAB_ONLY \(lab only\) · exact parity 11\/11/);
 assert.match(summary,/\| Source faces \| Levels \| JS median \| WASM median \| Row decision \|/);
 assert.equal((summary.match(/\| (?:16|32|48|64|80|96|112|128|144|160|176) \|/g)||[]).length,11);
 assert.match(summary,/1\.25 ms \| 0\.75 ms \| PASS/);
 assert.match(summary,/not iPad timings or a production WASM promotion/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertShellRelease} from './helpers/release-contract.mjs';

const page=fs.readFileSync(new URL('../docs/displacement-preview-gate-1041.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell-comparison.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('.1041 exposes an isolated displacement feasibility gate without changing the active project',()=>{
 assert.match(page,/does not modify the open BoxLab project/);
 assert.match(page,/generated grayscale PNG height maps/);
 assert.match(page,/subdivideWithCornerUVs/);
 assert.match(page,/displacementMap:texture/);
 assert.match(page,/EXT_disjoint_timer_query_webgl2/);
 assert.match(page,/MAX_CORNER_UV_SUBDIVISION_FACES/);
 assert.match(page,/MAX_CORNER_UV_SUBDIVISION_CORNERS/);
 assert.match(page,/stopMs=1200,samples=3/);
 assert.match(page,/stoppedEarly,stopReason/);
 assert.match(page,/not BoxLab viewport frame-time/);
 assert.match(shell,/Open displacement feasibility gate · \.1041/);
 assert.match(shell,/\.\/docs\/displacement-preview-gate-1041\.html\?v=0\.36\.18\.1041/);
});

test('.1041 release markers and direct benchmark asset are coherent',()=>{
 assert.equal(version,'0.36.18.1041');
 assertShellRelease(index,version);
 assert.match(index,/shell-comparison\.js\?v=0\.36\.18\.1041/);
 assert(fs.existsSync(new URL('../docs/displacement-preview-gate-1041.html',import.meta.url)));
});

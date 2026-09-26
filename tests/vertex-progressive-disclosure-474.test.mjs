import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('474 Vertex Slide settings are hidden at rest and shown only while Slide is active',()=>{
  assert.match(session,/#precisionVertexSlideRow,#precisionVertexSlideReadout/);
  assert.match(session,/:has\(#vertexSlideBtn\.active\) #precisionVertexSlideRow/);
  assert.match(session,/:has\(#vertexSlideBtn\.active\) #precisionVertexSlideReadout/);
});

test('474 Vertex Bevel settings are hidden at rest and shown only while Bevel is active',()=>{
  assert.match(session,/#precisionVertexBevelRow,#precisionVertexBevelRow \+ div,\.vertex-bevel-options/);
  assert.match(session,/:has\(#vertexBevelBtn\.active\) #precisionVertexBevelRow/);
  assert.match(session,/:has\(#vertexBevelBtn\.active\) \.vertex-bevel-options/);
});

test('474 disclosure is presentation-only and cache-hopped through tool-session-ui',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.474/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
});

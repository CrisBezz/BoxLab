from pathlib import Path

main=Path('src/main.js')
s=main.read_text()

old="const raycaster=new THREE.Raycaster();raycaster.params.Line.threshold=.09;const pointer=new THREE.Vector2();let drag=null;"
new="const raycaster=new THREE.Raycaster();raycaster.params.Line.threshold=.09;const pointer=new THREE.Vector2();let drag=null,backgroundTap=null;"
if old not in s: raise SystemExit('drag declaration not found')
s=s.replace(old,new,1)

old="canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;"
new="canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;if(backgroundTap&&backgroundTap.pointerId!==event.pointerId)backgroundTap.cancelled=true;"
if old not in s: raise SystemExit('pointerdown opener not found')
s=s.replace(old,new,1)

old="const hit=pick(event);if(!hit){clearSelection();renderMesh();return;}"
new="const hit=pick(event);if(!hit){if(event.isPrimary)backgroundTap={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false,cancelled:false};return;}backgroundTap=null;"
if old not in s: raise SystemExit('blank pointerdown selection block not found')
s=s.replace(old,new,1)

marker="canvas.addEventListener('pointermove',event=>{if(!drag||drag.pointerId!==event.pointerId)return;"
insert="canvas.addEventListener('pointermove',event=>{if(!backgroundTap||backgroundTap.pointerId!==event.pointerId)return;if(Math.hypot(event.clientX-backgroundTap.startX,event.clientY-backgroundTap.startY)>=EDIT_DRAG_THRESHOLD)backgroundTap.moved=true;});\ncanvas.addEventListener('pointerup',event=>{if(!backgroundTap||backgroundTap.pointerId!==event.pointerId)return;const tap=backgroundTap;backgroundTap=null;const moved=tap.moved||Math.hypot(event.clientX-tap.startX,event.clientY-tap.startY)>=EDIT_DRAG_THRESHOLD;if(!tap.cancelled&&!moved){clearSelection();renderMesh();}});\ncanvas.addEventListener('pointercancel',event=>{if(backgroundTap?.pointerId===event.pointerId)backgroundTap=null;});\n"
if marker not in s: raise SystemExit('pointermove marker not found')
s=s.replace(marker,insert+marker,1)
main.write_text(s)

index=Path('index.html')
h=index.read_text()
h=h.replace('BoxLab v0.36.18.268','BoxLab v0.36.18.269')
h=h.replace('v0.36.18.268</span>','v0.36.18.269</span>')
h=h.replace('./src/loose-bootstrap.js?v=0.36.18.268','./src/loose-bootstrap.js?v=0.36.18.269')
h=h.replace('./src/main.js?v=0.36.18.267','./src/main.js?v=0.36.18.269')
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.269"}\n')

legacy=Path('tests/unified-toggle-selection.test.mjs')
legacy_text=legacy.read_text()
old_test="""test('blank component-area tap clears selection without Multi mode distinction',()=>{\n  assert.match(main,/const hit=pick\\(event\\);if\\(!hit\\)\\{clearSelection\\(\\);renderMesh\\(\\);return;\\}/);\n});"""
new_test="""test('blank component-area tap still clears selection, but only after tap confirmation',()=>{\n  assert.match(main,/if\\(!tap\\.cancelled&&!moved\\)\\{clearSelection\\(\\);renderMesh\\(\\);\\}/);\n  assert.doesNotMatch(main,/const hit=pick\\(event\\);if\\(!hit\\)\\{clearSelection\\(\\);renderMesh\\(\\);return;\\}/);\n});"""
if old_test not in legacy_text: raise SystemExit('legacy blank-selection test not found')
legacy.write_text(legacy_text.replace(old_test,new_test,1))

test=Path('tests/selection-navigation-retention.test.mjs')
test.write_text("""import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('blank pointer-down arms deselect instead of clearing immediately',()=>{
  assert.match(main,/if\(!hit\)\{if\(event\.isPrimary\)backgroundTap=\{pointerId:event\.pointerId,startX:event\.clientX,startY:event\.clientY,moved:false,cancelled:false\};return;\}backgroundTap=null;/);
  assert.doesNotMatch(main,/if\(!hit\)\{clearSelection\(\);renderMesh\(\);return;\}/);
});

test('navigation movement preserves current selection',()=>{
  assert.match(main,/Math\.hypot\(event\.clientX-backgroundTap\.startX,event\.clientY-backgroundTap\.startY\)>=EDIT_DRAG_THRESHOLD\)backgroundTap\.moved=true/);
  assert.match(main,/if\(!tap\.cancelled&&!moved\)\{clearSelection\(\);renderMesh\(\);\}/);
});

test('second pointer cancels pending blank deselect for pan and pinch',()=>{
  assert.match(main,/if\(backgroundTap&&backgroundTap\.pointerId!==event\.pointerId\)backgroundTap\.cancelled=true/);
});

test('269 cache-hops main runtime',()=>{
  assert.match(index,/main\.js\?v=0\.36\.18\.269/);
});
""")

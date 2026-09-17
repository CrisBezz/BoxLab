from pathlib import Path
import re

styles=Path('styles.css')
s=styles.read_text()
marker='/* v0.36.18.271 selection button layout - iPad-safe */'
css='''\n/* v0.36.18.271 selection button layout - iPad-safe */\n.selection-dock{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;align-items:stretch;}\n#paintSelectDepth{order:1;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px;grid-column:span 2;padding:2px;}\n#paintSelectDepth [data-paint-depth]{order:initial!important;width:100%!important;min-width:0;}\n#lassoSelectBtn{order:2;}\n#deselectAllBtn{order:3;}\n#selectAllBtn{order:4;}\n#invertSelectionBtn{order:5;}\n'''
if marker not in s:
    s += css
styles.write_text(s)

index=Path('index.html')
h=index.read_text()
h=re.sub(r'BoxLab v0\.36\.18\.270','BoxLab v0.36.18.271',h)
h=re.sub(r'v0\.36\.18\.270</span>','v0.36.18.271</span>',h)
h=re.sub(r'\./src/loose-bootstrap\.js\?v=0\.36\.18\.270','./src/loose-bootstrap.js?v=0.36.18.271',h)
h=re.sub(r'(href=["\'](?:\./)?styles\.css)(?:\?v=[^"\']*)?(["\'])',r'\1?v=0.36.18.271\2',h,count=1)
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.271"}\n')

test=Path('tests/selection-button-layout.test.mjs')
test.write_text('''import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\nconst css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');\nconst index=readFileSync(new URL('../index.html',import.meta.url),'utf8');\n\ntest('Selection primary controls use iPad-safe 3 by 2 layout',()=>{\n  assert.match(css,/v0\\.36\\.18\\.271 selection button layout - iPad-safe/);\n  assert.match(css,/#paintSelectDepth\\{order:1;display:grid!important;grid-template-columns:repeat\\(2,minmax\\(0,1fr\\)\\);gap:2px;grid-column:span 2;padding:2px;\\}/);\n  assert.match(css,/#lassoSelectBtn\\{order:2;\\}/);\n  assert.match(css,/#deselectAllBtn\\{order:3;\\}/);\n  assert.match(css,/#selectAllBtn\\{order:4;\\}/);\n  assert.match(css,/#invertSelectionBtn\\{order:5;\\}/);\n});\n\ntest('271 cache-hops stylesheet',()=>{\n  assert.match(index,/styles\\.css\\?v=0\\.36\\.18\\.271/);\n});\n''')

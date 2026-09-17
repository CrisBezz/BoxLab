from pathlib import Path

# Selection dock: 3 columns x 2 rows, visual order only.
styles=Path('styles.css')
s=styles.read_text()
marker='/* v0.36.18.270 selection button layout */'
css='''\n/* v0.36.18.270 selection button layout */\n.selection-dock{grid-template-columns:repeat(3,minmax(0,1fr));}\n#paintSelectDepth{display:contents;}\n#paintSelectDepth [data-paint-depth="visible"]{order:1;}\n#paintSelectDepth [data-paint-depth="through"]{order:2;}\n#lassoSelectBtn{order:3;}\n#deselectAllBtn{order:4;}\n#selectAllBtn{order:5;}\n#invertSelectionBtn{order:6;}\n'''
if marker not in s:
    s += css
styles.write_text(s)

index=Path('index.html')
h=index.read_text()
h=h.replace('BoxLab v0.36.18.269','BoxLab v0.36.18.270')
h=h.replace('v0.36.18.269</span>','v0.36.18.270</span>')
h=h.replace('./src/loose-bootstrap.js?v=0.36.18.269','./src/loose-bootstrap.js?v=0.36.18.270')
# Force the stylesheet cache hop regardless of its previous query string.
import re
h=re.sub(r'(href=["\'](?:\./)?styles\.css)(?:\?v=[^"\']*)?(["\'])',r'\1?v=0.36.18.270\2',h,count=1)
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.270"}\n')

test=Path('tests/selection-button-layout.test.mjs')
test.write_text('''import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\nconst css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');\nconst index=readFileSync(new URL('../index.html',import.meta.url),'utf8');\n\ntest('Selection primary controls render as requested 3 by 2 grid',()=>{\n  assert.match(css,/\\.selection-dock\\{grid-template-columns:repeat\\(3,minmax\\(0,1fr\\)\\);\\}/);\n  assert.match(css,/#paintSelectDepth\\{display:contents;\\}/);\n  assert.match(css,/#paintSelectDepth \\[data-paint-depth="visible"\\]\\{order:1;\\}/);\n  assert.match(css,/#paintSelectDepth \\[data-paint-depth="through"\\]\\{order:2;\\}/);\n  assert.match(css,/#lassoSelectBtn\\{order:3;\\}/);\n  assert.match(css,/#deselectAllBtn\\{order:4;\\}/);\n  assert.match(css,/#selectAllBtn\\{order:5;\\}/);\n  assert.match(css,/#invertSelectionBtn\\{order:6;\\}/);\n});\n\ntest('270 cache-hops stylesheet',()=>{\n  assert.match(index,/styles\\.css\\?v=0\\.36\\.18\\.270/);\n});\n''')

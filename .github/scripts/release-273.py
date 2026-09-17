from pathlib import Path
import re

index=Path('index.html')
h=index.read_text()
h=re.sub(r'BoxLab v0\.36\.18\.\d+','BoxLab v0.36.18.273',h,count=1)
h=re.sub(r'(<span id="appVersion">v0\.36\.18\.)\d+(</span>)',r'\g<1>273\2',h,count=1)
h=re.sub(r'(src="\./src/loose-bootstrap\.js\?v=0\.36\.18\.)\d+(")',r'\g<1>273\2',h,count=1)
# Keep the confirmed-good .270 Selection stylesheet exactly pinned.
h=re.sub(r'(href="\./styles\.css\?v=0\.36\.18\.)\d+(")',r'\g<1>270\2',h,count=1)
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.273"}\n')

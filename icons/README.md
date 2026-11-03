# BoxLab install artwork — .1069

Approved Three Box Symbol: green upper hollow box, blue lower-left and red
lower-right, with the marked bottom-centre point removed to form a notch.
User approved the final generated image on 3 November 2026.

These opaque RGB PNGs are proportional exports of that approved raster, with no
crop, added rounded corners, artwork changes or transparency. The 512px image is
the largest shipped copy for future reuse.

| File | Purpose |
| --- | --- |
| boxlab-1069-180.png | Safari/iPadOS apple-touch-icon |
| boxlab-1069-192.png | Web-app manifest icon |
| boxlab-1069-512.png | Web-app manifest icon / reusable artwork |
| boxlab-1069-32.png | Browser favicon |

Active references live in index.html and manifest.webmanifest. Preserve the
relative manifest start URL and the existing src/pwa-install.js File menu owner.
Safari uses its own Share → Add to Home Screen action; the File button provides
that guidance. Existing installed shortcuts are not forcibly changed by this
release. Future artwork replacements should use new filenames to refresh caches.

Approved original raster SHA-256:
`33df05036c61aa3c1af8efa0a97e41e99bbb5638527c2e56d945d11a0e4be7d9`.

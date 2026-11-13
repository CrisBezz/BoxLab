import { build } from 'esbuild';

await build({
  absWorkingDir: process.cwd(),
  entryPoints: ['src/helios-vendor/boxlab-entry.ts'],
  outfile: 'src/helios-tracer.bundle.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  external: ['three', 'three/*'],
  legalComments: 'inline',
  sourcemap: false,
  minify: true,
  banner: {
    js: '/* HeliosStudio integration bundle; source commit 3ca8ac22b011f42ed83555720cc6cd71e6b57329. Rebuild with npm run build:helios-tracer. */',
  },
});

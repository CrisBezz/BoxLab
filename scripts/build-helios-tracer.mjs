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
    js: '/* HeliosStudio integration bundle; source commit 0e79c5163e5d87703d369250e1a9fff9e2b9085f. Rebuild with npm run build:helios-tracer. */',
  },
});

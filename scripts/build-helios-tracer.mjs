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
    js: '/* HeliosStudio integration bundle; source commit 44a7565e24ee96ea7907716dc67b1b97a810a63d. Rebuild with npm run build:helios-tracer. */',
  },
});

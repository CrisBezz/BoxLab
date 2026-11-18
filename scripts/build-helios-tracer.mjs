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
    js: '/* HeliosStudio 0.1.4 integration base 0e79c5163e5d87703d369250e1a9fff9e2b9085f; BoxLab .1190 selectively ports H1 texture safety from HeliosStudio 0.1.5 cb4e68d04f3837f12266468e3cca59450ae9081a; retains packed metalness and surface opacity. Rebuild with npm run build:helios-tracer. */',
  },
});

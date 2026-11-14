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
    js: '/* HeliosStudio integration bundle; source commit 33fd410091aed8f9ea251c1f7f0fd42bb4be5b4e. Rebuild with npm run build:helios-tracer. */',
  },
});

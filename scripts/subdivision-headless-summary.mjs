const escapeCell=value=>String(value).replaceAll('|','\\|').replaceAll('\n',' ');
const milliseconds=value=>Number.isFinite(value)?`${value.toFixed(2)} ms`:'—';

export function formatSubdivisionActionsSummary(report){
  const results=Array.isArray(report?.results)?report.results:[];
  const rows=results.map(row=>`| ${escapeCell(row.sourceFaces)} | ${escapeCell(row.levels)} | ${milliseconds(row.metrics?.js?.medianMs)} | ${milliseconds(row.metrics?.wasm?.medianMs)} | ${escapeCell(row.decision)} |`);
  return [
    '## BoxLab subdivision JS / WASM comparison',
    '',
    `**Overall: ${escapeCell(report?.decision??'UNKNOWN')} (lab only) · exact parity ${results.length}/${results.length}.**`,
    '',
    '| Source faces | Levels | JS median | WASM median | Row decision |',
    '| ---: | ---: | ---: | ---: | :--- |',
    ...rows,
    '',
    'Hosted headless Chromium timings are comparative lab evidence; they are not iPad timings or a production WASM promotion.',
    ''
  ].join('\n');
}

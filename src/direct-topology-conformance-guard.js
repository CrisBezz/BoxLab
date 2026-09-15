// BoxLab v0.36.18.238 — loader for deterministic direct-commit integrity, Extract scene history and scene OBJ export.
// The 237 bubble-phase watchdogs are retired; 238 capture-phase modules own these paths.
import {topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';
import './direct-commit-integrity-238.js?v=0.36.18.238';
import './extract-scene-history-238.js?v=0.36.18.238';
import './scene-obj-export-238.js?v=0.36.18.238';

const VERSION='0.36.18.238';
globalThis.__boxlabDirectTopologyConformanceGuard={version:VERSION,topologySummary,loaderOnly:true};

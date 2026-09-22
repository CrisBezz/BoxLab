// BoxLab v0.36.18.239 — loader for deterministic direct-commit integrity, Extract scene history and scene OBJ export.
// 239 validates the actual final active-object mesh, independent of mesh object identity.
import {topologySummary} from './topology-seam-conformance.js?v=0.36.18.239';
import './direct-commit-integrity-239.js?v=0.36.18.239';
import './extract-scene-history-238.js?v=0.36.18.238';
import './scene-obj-export-238.js?v=0.36.18.238';

const VERSION='0.36.18.242';
globalThis.__boxlabDirectTopologyConformanceGuard={version:VERSION,topologySummary,loaderOnly:true};

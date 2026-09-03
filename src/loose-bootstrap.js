import { EditableMesh } from './mesh.js';
import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js?v=0.22.0';
import { installBevelTopology } from './bevel-topology.js?v=0.28.3';
import { installRoundedLoopBevel } from './rounded-loop-bevel.js?v=0.28.8';
import { installGeneralEdgeBevelTopology } from './general-edge-bevel-topology.js?v=0.28.7';
import { installMultiEdgeChamferTopology } from './multi-edge-chamfer-topology.js?v=0.28.8';
import { installPerimeterFanBevel } from './perimeter-fan-bevel.js?v=0.28.11';
import { installGeneralizedEdgeFanBevel } from './generalized-edge-fan-bevel.js?v=0.28.12';
import { installBevelSelection } from './bevel-selection.js?v=0.28.9';
import { installPerimeterBevelRouting } from './perimeter-bevel-routing.js?v=0.28.12';
import { installBevelWatertightGuard } from './bevel-watertight-guard.js?v=0.18.5';
import { installVertexBevelTopology } from './vertex-bevel-topology.js?v=0.28.3';
import { installMultiVertexBevelTopology } from './multi-vertex-bevel-topology.js?v=0.30.0';
import { installFaceTransform } from './face-transform.js?v=0.12';
import { installFaceRegion } from './face-region.js?v=0.30.3';
import './selection-transform-state.js?v=0.12';
import './face-pick-repair.js?v=0.12';

installLooseTopology(EditableMesh);
// main.js imports mesh.js?v=0.12, which is a distinct ES-module identity in some browsers.
// Install only loose-edge support onto that live modelling class so Join can create
// an edge between vertices that do not already share a face, and Fill can consume it.
installLooseTopology(LiveEditableMesh);
installBridgeTopology(EditableMesh);
installBevelTopology(EditableMesh);
installRoundedLoopBevel(EditableMesh);
installGeneralEdgeBevelTopology(EditableMesh);
installMultiEdgeChamferTopology(EditableMesh);
installPerimeterFanBevel(EditableMesh);
installGeneralizedEdgeFanBevel(EditableMesh);
installBevelSelection(EditableMesh);
installPerimeterBevelRouting(EditableMesh);
installBevelWatertightGuard(EditableMesh);
installVertexBevelTopology(EditableMesh);
installMultiVertexBevelTopology(EditableMesh);
installFaceTransform();
installFaceRegion(EditableMesh);

import('./loop-offset.js?v=0.32.19');

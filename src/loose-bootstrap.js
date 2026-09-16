import { EditableMesh } from './mesh.js';
import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js?v=0.36.11.1';
import { installUnequalBridge } from './bridge-unequal.js?v=0.36.18.244';
import { installUnequalBridgeQuality } from './bridge-unequal-quality.js?v=0.36.18.245';
import { installTransactionalBridge } from './bridge-transactional.js?v=0.36.18.243';
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
// Install loose-edge and Bridge support onto both identities so the live modelling
// mesh receives the same protected topology operations.
installLooseTopology(LiveEditableMesh);
installBridgeTopology(EditableMesh);
installBridgeTopology(LiveEditableMesh);
installUnequalBridge(EditableMesh);
installUnequalBridge(LiveEditableMesh);
installUnequalBridgeQuality(EditableMesh);
installUnequalBridgeQuality(LiveEditableMesh);
installTransactionalBridge(EditableMesh);
installTransactionalBridge(LiveEditableMesh);
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

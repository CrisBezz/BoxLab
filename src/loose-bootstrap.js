import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js?v=0.22.0';
import { installBevelTopology } from './bevel-topology.js?v=0.28.3';
import { installRoundedLoopBevel } from './rounded-loop-bevel.js?v=0.28.8';
import { installGeneralEdgeBevelTopology } from './general-edge-bevel-topology.js?v=0.28.7';
import { installMultiEdgeChamferTopology } from './multi-edge-chamfer-topology.js?v=0.28.8';
import { installBevelSelection } from './bevel-selection.js?v=0.28.8';
import { installBevelWatertightGuard } from './bevel-watertight-guard.js?v=0.18.5';
import { installVertexBevelTopology } from './vertex-bevel-topology.js?v=0.28.3';
import { installFaceTransform } from './face-transform.js?v=0.12';
import { installFaceRegion } from './face-region.js?v=0.13';
import './selection-transform-state.js?v=0.12';
import './face-pick-repair.js?v=0.12';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installBevelTopology(EditableMesh);
installRoundedLoopBevel(EditableMesh);
installGeneralEdgeBevelTopology(EditableMesh);
installMultiEdgeChamferTopology(EditableMesh);
installBevelSelection(EditableMesh);
installBevelWatertightGuard(EditableMesh);
installVertexBevelTopology(EditableMesh);
installFaceTransform();
installFaceRegion(EditableMesh);

import('./loop-offset.js?v=0.17.3');

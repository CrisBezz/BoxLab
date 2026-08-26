import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js';
import { installBevelTopology } from './bevel-topology.js?v=0.14';
import { installFaceTransform } from './face-transform.js?v=0.12';
import { installFaceRegion } from './face-region.js?v=0.13';
import './selection-transform-state.js?v=0.12';
import './face-pick-repair.js?v=0.12';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installBevelTopology(EditableMesh);
installFaceTransform();
installFaceRegion(EditableMesh);

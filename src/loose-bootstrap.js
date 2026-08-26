import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js';
import { installFaceTransform } from './face-transform.js?v=0.11.3';
import { installFaceRegion } from './face-region.js?v=0.11.3';
import './selection-transform-state.js?v=0.11.3';
import './face-pick-repair.js?v=0.11.3';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installFaceTransform();
installFaceRegion(EditableMesh);

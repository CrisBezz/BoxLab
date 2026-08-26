import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js';
import { installDissolveTopology } from './dissolve-topology.js?v=0.12';
import { installFaceTransform } from './face-transform.js?v=0.12';
import { installFaceRegion } from './face-region.js?v=0.12';
import './selection-transform-state.js?v=0.12';
import './face-pick-repair.js?v=0.12';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installDissolveTopology(EditableMesh);
installFaceTransform();
installFaceRegion(EditableMesh);

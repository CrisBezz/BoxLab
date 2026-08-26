import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js';
import './face-pick-repair.js?v=0.11.2';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);

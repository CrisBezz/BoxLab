import { EditableMesh } from './mesh.js';
import { installLooseTopology } from './loose-topology.js';
import { installBridgeTopology } from './bridge-topology.js';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);

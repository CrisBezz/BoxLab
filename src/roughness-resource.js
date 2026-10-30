// Committed scalar bytes are shared read-only; edits replace the resource.
import {createScalarResourceCodec} from './scalar-paint-resource.js?v=0.36.18.1026';
const codec=createScalarResourceCodec('roughness');
export const captureRoughnessResource=codec.capture,copyRoughnessResource=codec.copy,encodeRoughnessEntry=codec.encode,decodeRoughnessEntry=codec.decode,roughnessEntryBytes=codec.entryBytes;

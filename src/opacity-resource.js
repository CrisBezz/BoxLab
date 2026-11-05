// Authored opacity uses the existing strict linear R8 scalar resource format.
import {createScalarResourceCodec} from './scalar-paint-resource.js?v=0.36.18.1075';
const codec=createScalarResourceCodec('opacity');
export const captureOpacityResource=codec.capture,copyOpacityResource=codec.copy,encodeOpacityEntry=codec.encode,decodeOpacityEntry=codec.decode,opacityEntryBytes=codec.entryBytes;

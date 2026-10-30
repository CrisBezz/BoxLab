// Committed scalar bytes are shared read-only; edits replace the resource.
import {createScalarResourceCodec} from './scalar-paint-resource.js?v=0.36.18.1027';
const codec=createScalarResourceCodec('metalness');
export const captureMetalnessResource=codec.capture,copyMetalnessResource=codec.copy,encodeMetalnessEntry=codec.encode,decodeMetalnessEntry=codec.decode,metalnessEntryBytes=codec.entryBytes;
